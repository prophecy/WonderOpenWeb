//==============================================================================
// Welcome to scripting in Spark AR Studio! Helpful links:
//
// Scripting Basics - https://fb.me/spark-scripting-basics
// Reactive Programming - https://fb.me/spark-reactive-programming
// Scripting Object Reference - https://fb.me/spark-scripting-reference
// Changelogs - https://fb.me/spark-changelog
//==============================================================================

// How to load in modules
const Diagnostics = require("Diagnostics");
const Scene = require("Scene");
const Animation = require("Animation");
const Reactive = require("Reactive");

const frontSwirl = Scene.root.find("swirl_foreground");
const backSwirl = Scene.root.find("swirl_background");

const frontSandwichList = [];
const frontSandwichMeshList = [];
const backSandwichList = [];
const backSandwichMeshList = [];

for (var i=0; i<7; ++i)
    frontSandwichList.push(Scene.root.find("sandwichf" + i));
for (var i=0; i<7; ++i)
    frontSandwichMeshList.push(Scene.root.find("sandwichf" + i + "_mesh"));

for (var i=0; i<7; ++i)
    backSandwichList.push(Scene.root.find("sandwichb" + i));
for (var i=0; i<7; ++i)
    backSandwichMeshList.push(Scene.root.find("sandwichb" + i + "_mesh"));

initSwirlSandwich(frontSwirl, frontSandwichList, frontSandwichMeshList, true);
initSwirlSandwich(backSwirl, backSandwichList, backSandwichMeshList, false);

// Functions

function initSwirlSandwich(swirl, sandwichList, sandwichMeshList, isFront) {

    // Setup object transform
    const RADIOUS = 13.0;
    const SWIRL_DURATION = 3000;

    for (var i=0; i<sandwichList.length; ++i) {

        var radian = Math.PI * 2.0 / sandwichList.length * i;

        var x = Math.cos(radian) * RADIOUS;
        var z = Math.sin(radian) * RADIOUS;

        var obj = sandwichList[i];
        
        obj.transform.x = x;
        obj.transform.z = z;

        obj.transform.rotationY = (Math.PI * 0.5) - radian;

        // Visibility signals
        var signal0 = swirl.transform.rotationZ.sub(radian).gt(Reactive.val(0));
        var signal1 = swirl.transform.rotationZ.sub(radian).lt(Reactive.val(-Math.PI));

//        var signal0 = swirl.transform.rotationX.sub(radian).lt(Reactive.val(0.5 * Math.PI));
  //      var signal1 = swirl.transform.rotationX.sub(radian).gt(Reactive.val(-0.5 * Math.PI));
    //    var signal3 = swirl.transform.rotationX.sub(radian).gt(Reactive.val(1.5 * Math.PI));        
      //  var signalOut = signal0.and(signal1).or(signal3);

        var signalOut = signal0.or(signal1);

        if (isFront)
            obj.hidden = signalOut;
        else
            obj.hidden = signalOut.not();
    }

    for (var i=0; i<sandwichMeshList.length; ++i) {

        var obj = sandwichMeshList[i];
        applySwirlMovement(obj, 0, 0, -1, SWIRL_DURATION);
    }

    applySwirlMovement(swirl, 0, 1, 0, SWIRL_DURATION);
}

function axisRotation(axis_x, axis_y, axis_z, angle_degrees) {
    var norm = Math.sqrt(axis_x*axis_x + axis_y*axis_y + axis_z*axis_z);
    axis_x /= norm;
    axis_y /= norm;
    axis_z /= norm;
    var angle_radians = angle_degrees * Math.PI / 180.0;
    var cos = Math.cos(angle_radians/2);
    var sin = Math.sin(angle_radians/2);
    return Reactive.rotation(
        cos, axis_x*sin, axis_y*sin, axis_z*sin);
}

function applySwirlMovement(obj, a, b, c, duration) {

    var time_driver = Animation.timeDriver({
        durationMilliseconds: duration,
        loopCount: Infinity
    });
    
    // Create a rotation sampler using Rotation objects generated
    // by the previously-defined axisRotation() method.
    var rotation_sampler = Animation.samplers.polyline({
        keyframes: [
            axisRotation(a, b, c, 360),
            axisRotation(a, b, c, 270),
            axisRotation(a, b, c, 180),
            axisRotation(a, b, c, 90),
            axisRotation(a, b, c, 0),
        ],
        knots: [
            0, 2, 4, 6, 8
        ]
    });

    // Start the animation
    var rotation_signal = Animation.animate(time_driver, rotation_sampler);
    time_driver.start();

    obj.transform.rotation = rotation_signal;
}