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

const swirl = Scene.root.find("swirl");
const sandwichList = [];
const sandwichMeshList = [];

for (var i=0; i<7; ++i)
    sandwichList.push(Scene.root.find("sandwich" + i));

for (var i=0; i<7; ++i)
    sandwichMeshList.push(Scene.root.find("sandwich" + i + "_mesh"));

function initSwirlSandwich() {

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
initSwirlSandwich();