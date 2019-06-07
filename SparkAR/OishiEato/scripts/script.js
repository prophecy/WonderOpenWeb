
// --------------------------------------------------------------------------------
// SHARED VARS & PARAMETERS
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// IMPORT EXTERNAL MODULES

const Scene = require('Scene');
const Diagnostics = require('Diagnostics');
const FaceTracking = require('FaceTracking');
const Reactive = require('Reactive');
const Patches = require('Patches');
const Animation = require('Animation');
const Time = require('Time');
const Networking = require('Networking');
const Materials = require('Materials');
const Textures = require('Textures');
const TouchGestures = require('TouchGestures');
const CameraInfo = require('CameraInfo');

// --------------------------------------------------------------------------------
// SCENE DATABASE

// Handle bubbles of face #0
var bubbleList0 = [];
bubbleList0.push(Scene.root.find('bubble00'));
bubbleList0.push(Scene.root.find('bubble01'));
bubbleList0.push(Scene.root.find('bubble02'));
bubbleList0.push(Scene.root.find('bubble03'));
bubbleList0.push(Scene.root.find('bubble04'));
bubbleList0.push(Scene.root.find('bubble05'));
bubbleList0.push(Scene.root.find('bubble06'));

// Verify
for (var i=0; i<bubbleList0.length; ++i)
    if (bubbleList0[i] === undefined)
        Diagnostics.log("obj is undefined");

// Handle bubbles of face #1
var bubbleList1 = [];
bubbleList1.push(Scene.root.find('bubble10'));
bubbleList1.push(Scene.root.find('bubble11'));
bubbleList1.push(Scene.root.find('bubble12'));
bubbleList1.push(Scene.root.find('bubble13'));
bubbleList1.push(Scene.root.find('bubble14'));
bubbleList1.push(Scene.root.find('bubble15'));
bubbleList1.push(Scene.root.find('bubble16'));

// Verify
for (var i=0; i<bubbleList1.length; ++i)
    if (bubbleList1[i] === undefined)
        Diagnostics.log("obj is undefined");

var foodFeederRoot0 = Scene.root.find('footFeederRoot0');

var testyPoolList = [];
testyPoolList.push(Scene.root.find('testy0'));
testyPoolList.push(Scene.root.find('testy1'));
testyPoolList.push(Scene.root.find('testy2'));
testyPoolList.push(Scene.root.find('testy3'));
testyPoolList.push(Scene.root.find('testy4'));
testyPoolList.push(Scene.root.find('testy5'));
testyPoolList.push(Scene.root.find('testy6'));
testyPoolList.push(Scene.root.find('testy7'));
testyPoolList.push(Scene.root.find('testy8'));
testyPoolList.push(Scene.root.find('testy9'));
testyPoolList.push(Scene.root.find('testy10'));
testyPoolList.push(Scene.root.find('testy11'));
testyPoolList.push(Scene.root.find('testy12'));
testyPoolList.push(Scene.root.find('testy13'));
testyPoolList.push(Scene.root.find('testy14'));
testyPoolList.push(Scene.root.find('testy15'));

var crushPoolList = [];
crushPoolList.push(Scene.root.find('crush0'));
crushPoolList.push(Scene.root.find('crush1'));
crushPoolList.push(Scene.root.find('crush2'));
crushPoolList.push(Scene.root.find('crush3'));
crushPoolList.push(Scene.root.find('crush4'));
crushPoolList.push(Scene.root.find('crush5'));
crushPoolList.push(Scene.root.find('crush6'));
crushPoolList.push(Scene.root.find('crush7'));
crushPoolList.push(Scene.root.find('crush8'));
crushPoolList.push(Scene.root.find('crush9'));

const facePoint0 = Patches.getVectorValue("facePoint0");
const facePoint1 = Patches.getVectorValue("facePoint1");

const facemesh0 = Scene.root.find("facemesh0");
const facemesh1 = Scene.root.find("facemesh1");

const prodRoot = Scene.root.find('prod_root');

const prodPlane0 = Scene.root.find('prod_plane0');
const prodPlane1 = Scene.root.find('prod_plane1');
const prodPlane2 = Scene.root.find('prod_plane2');

const prodPlane0Mesh = Scene.root.find('prod_plane0_mesh');
const prodPlane1Mesh = Scene.root.find('prod_plane1_mesh');
const prodPlane2Mesh = Scene.root.find('prod_plane2_mesh');

const frontRoot = Scene.root.find('front_root');

// Debug
const dbgTxtTheme = Scene.root.find('dbg_txt_theme');
const dbgTxtFace = Scene.root.find('dbg_txt_face')
const dbgTxtProd = Scene.root.find('dbg_txt_prod');
const dbgCanvas = Scene.root.find('debugPanelCanvas');

// --------------------------------------------------------------------------------
// RESOURCES for GYOZA THEME

const frontGyoza = Scene.root.find('front_gyoza');

const gyozaFrontPlane0 = Scene.root.find('gyoza_front_plane0');
const gyozaFrontPlane1 = Scene.root.find('gyoza_front_plane1');

const gyozaFrontPlane0Mesh = Scene.root.find('gyoza_front_plane0_mesh');
const gyozaFrontPlane1Mesh = Scene.root.find('gyoza_front_plane1_mesh');

const gyozaFrontTex0 = 'gyoza_front_tex0';
const gyozaFrontTex1 = 'gyoza_front_tex1';

const headGyozaRoot = Scene.root.find('head_gyoza_root');

const headHachimakiMesh = Scene.root.find("head_hachimaki_mesh");
const headHachimakiTex = "head_hachimaki";

const facePaintGyozaMat = Materials.get("face_paint_gyoza_mat");

// --------------------------------------------------------------------------------
// RESOURCES for SANDWICH THEME

const frontSandwich = Scene.root.find('front_sandwich');

const sandwichFrontFlag = Scene.root.find('sandwich_front_flag');
const samdwichFrontCrabstick = Scene.root.find('sandwich_front_crabstick');
const sandwichFront = Scene.root.find('sandwich_front');
const sandwichFrontEgg = Scene.root.find('sandwich_front_egg');
const sandwichFrontHam0 = Scene.root.find('sandwich_front_ham0');
const sandwichFrontHam1 = Scene.root.find('sandwich_front_ham1');

const sandwichFrontFlagMesh = Scene.root.find('sandwich_front_flag_mesh');
const sandwichFrontCrabstickMesh = Scene.root.find('sandwich_front_crabstick_mesh');
const sandwichFrontMesh = Scene.root.find('sandwich_front_mesh');
const sandwichFrontEggMesh = Scene.root.find('sandwich_front_egg_mesh');
const sandwichFrontHam0Mesh = Scene.root.find('sandwich_front_ham0_mesh');
const sandwichFrontHam1Mesh = Scene.root.find('sandwich_front_ham1_mesh');

const sandwichFragTex = "sandwich_flag_tex";
const sandwichFullTex = "sandwich_full_tex";
const sandwichHalfTex = "sandwich_half_tex";
const sandwichEggFullTex = "sandwich_egg_full_tex";
const sandwichEggHalfTex = "sandwich_egg_helf_tex";
const sandwichHamFullTex = "sandwich_ham_full_tex";
const sandwichHamHalfTex = "sandwich_ham_half_tex";
const sandwichCrabstickVibTex = "sandwich_crabstick_vib_tex";
const sandwichCrabstickFullTex = "sandwich_crabstick_full_tex";
const sandwichCrabstickHalfTex = "sandwich_crabstick_half_tex";
const sandwichCrush0Tex = "sandwich_crush_0_tex";
const sandwichCrush1Tex = "sandwich_crush_1_tex";
const sandwichGlassesTex = "sandwich_glasses_tex";
const sandwichSwirlTex = "sandwich_swirl_tex";

const headSandwichRoot = Scene.root.find("head_sandwich_root");

const headGlassesMesh = Scene.root.find("head_glasses_mesh");
const headGlassesTex = "head_glasses";
const headSwirl0Mesh = Scene.root.find("head_swirl0_mesh");
const headSwirl1Mesh = Scene.root.find("head_swirl1_mesh");
const headSwirlTex = "head_swirl";

// --------------------------------------------------------------------------------
// RESOURCES for TAKOYAKI THEME

const frontTakoyaki = Scene.root.find('front_takoyaki');

const takoyakiFrontSnack0 = Scene.root.find("takoyaki_front_snack0");
const takoyakiFrontSnack1 = Scene.root.find("takoyaki_front_snack1");
const takoyakiFrontTako = Scene.root.find("takoyaki_front_tako");
const takoyakiFrontOishi = Scene.root.find("takoyaki_front_oishi");

const takoyakiFrontSnack0Mesh = Scene.root.find("takoyaki_front_snack0_mesh");
const takoyakiFrontSnack1Mesh = Scene.root.find("takoyaki_front_snack1_mesh");
const takoyakiFrontTakoMesh = Scene.root.find("takoyaki_front_tako_mesh");
const takoyakiFrontOishiMesh = Scene.root.find("takoyaki_front_oishi_mesh");

const takoyakiFrontSnackTex = "takoyaki_front_snack_tex";
const takoyakiFrontTakoTex = "takoyaki_front_tako_tex";
const takoyakiFrontOishiTex = "takoyaki_front_oishi_tex";

// --------------------------------------------------------------------------------
// URL
var GET_THEME_URL = "https://dev.oishidrink.com/eato/asset/getTheme.aspx";

// --------------------------------------------------------------------------------
// SHARED VARS & CALLBACKS

const MOUTH_OPENNESS_MIN_THRESHOLD = 0.1;
const MOUTH_CLOSSNESS_MAX_THRESHOLD = 0.07;

var feedTimeDriverList = [];
var crushTimeDriverList = [];

var currentData = {};

const PROD_MAT_NAME = "prod_mat0";

const FRONT_MAT_LIST = [
    "front_mat0", "front_mat1", "front_mat2", "front_mat3",
    "front_mat4", "front_mat5", "front_mat6", "front_mat7"
];

const HEAD_MAT_LIST = [
    "head_mat0", "head_mat1", "head_mat2", "head_mat3",
    "head_mat4"
];

// Create lookup table between SERVER data and texture name
const PROD_NAME_LOOKUP_TABLE = {

    gyoza_pork_5pcs: "Gyoza Pork 5pcs",
    gyoza_pork_12pcs: "Gyoza Pork12pcs",
    gyoza_takoyaki_5pcs: "Gyoza Takoyaki 5pcs",
    gyoza_chicken_12pcs: "Gyoza Chicken 12pcs",
    gyoza_shrimp_12pcs: "Gyoza Shrimp12pcs",

    sandwich_alaska_wakame: "Sandwich Alaska&Wakame",
    sandwich_tuna: "Sandwich Tuna",
    sandwich_ham_egg: "Sandwich Ham&Egg",

    crabstick_alaska: "Crab Stick Alaska",
    crabstick_kamaboko: "Crab Stick Kamaboko",

    takoyaki: "Tokoyaki",

    meal_yakisoba: "Meal Yakisoba",
    meal_clams: "Meal Clams",

    npd_gyoza_yuzu: "NPD Gyoza Yuzu",
    npd_sandwich_crabstick_wasabi: "NPD Sandwich Crabstick &Wasabi",
    npd_meal_in_7_11: "NPD Meal in 7-11",
    npd_gyoza_pork_mala: "NPD Gyoza Pork Mala",
}

const PROD_TEX_LOOKUP_TABLE = {

    gyoza_pork_5pcs: "gyoza_prod_tex0",
    gyoza_pork_12pcs: "gyoza_prod_tex0",
    gyoza_takoyaki_5pcs: "gyoza_prod_tex0",
    gyoza_chicken_12pcs: "gyoza_prod_tex0",
    gyoza_shrimp_12pcs: "gyoza_prod_tex0",

    sandwich_alaska_wakame: "sandwich_prod_tex0",
    sandwich_tuna: "sandwich_prod_tex0",
    sandwich_ham_egg: "sandwich_prod_tex0",

    crabstick_alaska: "not_found_tex",
    crabstick_kamaboko: "not_found_tex",

    takoyaki: "takoyaki_prod_tex0",

    meal_yakisoba: "not_found_tex",
    meal_clams: "not_found_tex",

    npd_gyoza_yuzu: "not_found_tex",
    npd_sandwich_crabstick_wasabi: "not_found_tex",
    npd_meal_in_7_11: "not_found_tex",
    npd_gyoza_pork_mala: "not_found_tex",

    // For development
    not_found_tex: "not_found_tex",
}

const THEME_NAME_LOOKUP_TABLE = {

    gyoza: "Gyoza",
    sandwich: "Sandwich",
    crabstick: "Crab Stick",
    takoyaki: "Tokoyaki",
    meal: "Meal",
}

// --------------------------------------------------------------------------------
// SCENE LOGIC
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// @ DEBUGGING

Diagnostics.watch("facePoint0 X ", facePoint0.x);
Diagnostics.watch("facePoint0 Y ", facePoint0.y);
Diagnostics.watch("facePoint0 Z ", facePoint0.z);

Diagnostics.watch("Mouth Openness - ", FaceTracking.face(0).mouth.openness);
Diagnostics.watch("Mouth Center X ", FaceTracking.face(0).mouth.center.x);
Diagnostics.watch("Mouth Center Y ", FaceTracking.face(0).mouth.center.y);
Diagnostics.watch("Mouth Center Z ", FaceTracking.face(0).mouth.center.z);

// Toggle show/hidden debug panel
TouchGestures.onLongPress().subscribe(function (gesture) {

    var isHidden = dbgCanvas.hidden.pinLastValue();
    dbgCanvas.hidden = !isHidden;
});

// --------------------------------------------------------------------------------
// @ START

// Send events for data analytics
CameraInfo.isCapturingPhoto.monitor().subscribe(function(value) {

    Diagnostics.log("Capturing Proto: value: " + value.newValue);

    // If new value == true -> means begin
    //        value == false -> means finish
});

CameraInfo.isRecordingVideo.monitor().subscribe(function(value) {

    Diagnostics.log("Recording Video: value: " + value.newValue);

    // If new value == true -> means begin
    //        value == false -> means finish
});

function initProduct() {

    var prodName = currentData.product;
    var prodKey = undefined;
    var texName = undefined;

    var prodKeys = Object.keys(PROD_NAME_LOOKUP_TABLE);

    //Diagnostics.log("prodKeys: " + prodKeys);

    // Search product key (O(n))
    for (var i=0; i<prodKeys.length; ++i) {

        var key = prodKeys[i];

        if (prodName.localeCompare(PROD_NAME_LOOKUP_TABLE[key]) == 0) {

            prodKey = key;
            break;
        }
    }

    if (prodKey === undefined) {

        Diagnostics.log("Product key not found with value: '" + prodName + "'");

        texName = PROD_TEX_LOOKUP_TABLE.not_found_tex;
    }
    else {

        Diagnostics.log("Got product key: " + prodKey);

        // Get product texture
        texName = PROD_TEX_LOOKUP_TABLE[prodKey];
    
        if (texName === undefined) {
    
            Diagnostics.log("Texture name not found with key: " + prodKey);
            return;
        }
         
        Diagnostics.log("Got texture name: " + texName);    
    }
    
    // Apply texture to product material
    var prodMat = Materials.get(PROD_MAT_NAME);
    var prodTex = Textures.get(texName);
    prodMat.diffuse = prodTex;

    // Apply material to product object
    prodPlane0Mesh.material = prodMat;
    prodPlane1Mesh.material = prodMat; 
    prodPlane2Mesh.material = prodMat;
}

function initFrontFrame() {

    var themeName = currentData.theme;

    if (themeName.localeCompare(THEME_NAME_LOOKUP_TABLE.gyoza) == 0)
        showGyoza();
    else if (themeName.localeCompare(THEME_NAME_LOOKUP_TABLE.sandwich) == 0)
        showSandwich();
    else if (themeName.localeCompare(THEME_NAME_LOOKUP_TABLE.takoyaki) == 0)
        showTakoyaki();
    else
        Diagnostics.log("Theme key not found with value: '" + themeName + "'");

    function showGyoza() {

        // Apply mat for Gyoza theme
        var curMatIndex = 0;
        gyozaFrontPlane0Mesh.material = getMaterialWithDiffuse(FRONT_MAT_LIST[curMatIndex++], gyozaFrontTex0);
        gyozaFrontPlane1Mesh.material = getMaterialWithDiffuse(FRONT_MAT_LIST[curMatIndex++], gyozaFrontTex1);

        // Show them all!
        frontGyoza.hidden = false;
    }

    function showSandwich() {

        // Apply mat for sandwich theme
        var curMatIndex = 0;
        sandwichFrontFlagMesh.material = getMaterialWithDiffuse(FRONT_MAT_LIST[curMatIndex++], sandwichFragTex);
        sandwichFrontCrabstickMesh.material = getMaterialWithDiffuse(FRONT_MAT_LIST[curMatIndex++], sandwichCrabstickVibTex);
        sandwichFrontMesh.material = getMaterialWithDiffuse(FRONT_MAT_LIST[curMatIndex++], sandwichFullTex);
        sandwichFrontEggMesh.material = getMaterialWithDiffuse(FRONT_MAT_LIST[curMatIndex++], sandwichEggFullTex);
        sandwichFrontHam0Mesh.material = getMaterialWithDiffuse(FRONT_MAT_LIST[curMatIndex++], sandwichHamFullTex);
        sandwichFrontHam1Mesh.material = getMaterialWithDiffuse(FRONT_MAT_LIST[curMatIndex++], sandwichHamFullTex);

        frontSandwich.hidden = false;
    }

    function showTakoyaki() {

        var curMatIndex = 0;
        takoyakiFrontSnack0Mesh.material = getMaterialWithDiffuse(FRONT_MAT_LIST[curMatIndex++], takoyakiFrontSnackTex);
        takoyakiFrontSnack1Mesh.material = getMaterialWithDiffuse(FRONT_MAT_LIST[curMatIndex++], takoyakiFrontSnackTex);
        takoyakiFrontTakoMesh.material = getMaterialWithDiffuse(FRONT_MAT_LIST[curMatIndex++], takoyakiFrontTakoTex);
        takoyakiFrontOishiMesh.material = getMaterialWithDiffuse(FRONT_MAT_LIST[curMatIndex++], takoyakiFrontOishiTex);

        frontTakoyaki.hidden = false;
    }
}

function initHead() {

    //showGyoza();
    showSandwich();

    function showGyoza() {

        // Apply head mat and tex
        var curMatIndex = 0;
        headHachimakiMesh.material = getMaterialWithDiffuse(HEAD_MAT_LIST[curMatIndex++], headHachimakiTex);

        headGyozaRoot.hidden = false;

        // Apply face paint mat and tex
        facemesh0.material = facePaintGyozaMat;
        facemesh1.material = facePaintGyozaMat;
    }

    function showSandwich() {

        // Apply head mat and tex
        var curMatIndex = 0;
        headGlassesMesh.material = getMaterialWithDiffuse(HEAD_MAT_LIST[curMatIndex++], headGlassesTex);
        headSwirl0Mesh.material = getMaterialWithDiffuse(HEAD_MAT_LIST[curMatIndex++], headSwirlTex);
        headSwirl1Mesh.material = getMaterialWithDiffuse(HEAD_MAT_LIST[curMatIndex++], headSwirlTex);

        headSandwichRoot.hidden = false;

        // Apply face paint mat and tex
    }

    function showTakoyaki() {

    }

    function showTakoyakiSpecial() {

    }

    function showCrabstick() {

    }

    function showRamen() {

    }
}

// Get theme
getThemeData(GET_THEME_URL, function(data, err) { 
     
    if (!!data) {
        
        //Diagnostics.log("theme: "  + data.theme);
        //Diagnostics.log("face: " + data.face);
        //Diagnostics.log("product: " + data.product);
        dbgTxtTheme.text = data.theme;
        dbgTxtFace.text = data.face;
        dbgTxtProd.text = data.product;

        // Update current data
        currentData = data;
    }
    else {

        Diagnostics.log("err: " + JSON.stringify(err));
    }

    initProduct();
    initFrontFrame();
    initHead();
});
 
// Handle env obj movements
applyBalloonMovement(gyozaFrontPlane0, 0.6, 0.4, 0.2, 1500, -3000, 4500);
applyRotationBounce(prodPlane0, 50, 20, 1800); // The small one
applyRotationBounce(prodPlane1, 0, 50, 1600); // The big one
applyRotationBounce(prodPlane2, 50, 20, 2000); // The big one

applyParalaxMovement(undefined, prodRoot, 0.1, 0.1);

// Init food feeder
const foodFeederArgs = {

    range: 50.0,

    feedVariantX: 2.0,
    feedVariantY: 2.0,
    yAngleVariant: 180.0,

    FEED_SET_COUNT: 16,

    feedInterval: 200,
    feedDuration: 800,

    crushDuration: 300,
    crushInterval: 100,

    crushVarianceX: 7.0,
    crushVarianceY: 7.0,
    crushVarianceZ: 7.0,
}

foodFeederRoot0.hidden = true;
initFoodFeeder(testyPoolList, crushPoolList, foodFeederArgs);

// --------------------------------------------------------------------------------
// @ FACE DETECTED

// Bubble transformations
const X_SIDE_WEIGHT = 0.14; 
const BUBBLE_POSITION_Y = -8.8;
const TARGET_BUBBLE_SCALE = 0.0032;

// Bubble list mgr vars
var currentBibbleIndex = 0;
const BUBBLE_SIZE = bubbleList0.length;
var isBubbleVisible = false;
var curFaceOwnBubble = -1;

// Hide all bubbles
function hideAllBubbles(bubbleList) {
    for (var i=0; i<bubbleList.length; ++i)
        bubbleList[i].hidden = true;
} 
    
hideAllBubbles(bubbleList0);
hideAllBubbles(bubbleList1);
    
function onFaceTracked(faceIndex) {

    var curBubble = undefined;
    var curFacePoint = undefined;

    Diagnostics.log("Face #" + faceIndex + " is tracked");

    if (faceIndex == 0) {

        curBubble = bubbleList0[currentBibbleIndex];
        curFacePoint = facePoint0;
    }
    else if (faceIndex == 1) {

        curBubble = bubbleList1[currentBibbleIndex];
        curFacePoint = facePoint1;
    }

    // Check is in front of the other
    if (!isBubbleVisible) {

        showBubble(curBubble, curFacePoint, X_SIDE_WEIGHT, BUBBLE_POSITION_Y, TARGET_BUBBLE_SCALE, true);
        curFaceOwnBubble = faceIndex;
    }
    
    isBubbleVisible = true;
}

function onFaceUntracked(faceIndex) {

    var curBubble = undefined;
 
    Diagnostics.log("Face #" + faceIndex + " is untracked");

    if (faceIndex == 0)
        curBubble = bubbleList0[currentBibbleIndex];
    else if (faceIndex == 1)
        curBubble = bubbleList1[currentBibbleIndex];
 
    hideBubble(curBubble);

    if (! (++currentBibbleIndex < BUBBLE_SIZE))
        currentBibbleIndex = 0;

    isBubbleVisible = false;
}

handleFaceTrackingState(0, function() { onFaceTracked(0); }, function() { onFaceUntracked(0); });
handleFaceTrackingState(1, function() { onFaceTracked(1); }, function() { onFaceUntracked(1); });

// --------------------------------------------------------------------------------
// @ OPEN MOUTH

function onFace0MouthOpen() {

    //Diagnostics.log("onFace0MouthOpen"); 

    var mouth = FaceTracking.face(0).mouth;
    
    foodFeederRoot0.transform.x = mouth.center.x;
    foodFeederRoot0.transform.y = mouth.center.y;
    foodFeederRoot0.transform.z = mouth.center.z;

    foodFeederRoot0.hidden = false;
}

function onFace0MouthClose() {

    //Diagnostics.log("onFaceMouthClose");

    foodFeederRoot0.hidden = true;
}

handleMouthOpeningState(
    0, 
    MOUTH_OPENNESS_MIN_THRESHOLD, MOUTH_CLOSSNESS_MAX_THRESHOLD, 
    onFace0MouthOpen, onFace0MouthClose);


// --------------------------------------------------------------------------------
// GENERIC FUNCTIONS
// --------------------------------------------------------------------------------

function getMaterialWithDiffuse(matName, texName) {

    var mat = Materials.get(matName);
    var tex = Textures.get(texName);

    mat.diffuse = tex;
    return mat;
}

// Handle mouth opennes

// TRICKED: Use this line to bind signal 
//var mouth = FaceTracking.face(faceIndex).mouth;
       
function handleMouthOpeningState(faceIndex, openMinThres, closeMaxThres, openCallback, closCallback) {

    var mouthOpen = FaceTracking.face(faceIndex).mouth.openness.gt(Reactive.val(openMinThres));
    var mouthClose = FaceTracking.face(faceIndex).mouth.openness.lt(Reactive.val(closeMaxThres));
    
    mouthOpen.monitor().subscribe(function(flag) {
        if (flag.newValue)
            openCallback();
    });

    mouthClose.monitor().subscribe(function(flag) {
        if (flag.newValue)
            closCallback();
    });
}

function handleFaceTrackingState(faceIndex, trackCallback, untrackCallback) {

    // Check weather the face is tracked
    FaceTracking.face(faceIndex).isTracked.monitor().subscribe(function(e) {
        
        var mouthCenterPoint = [0, 0, 0];
        
        var mouth = FaceTracking.face(faceIndex).mouth;
    
        // Untracked to tracked state
        if (e.newValue) {
    
            // Reset counter
            var counter = 3;
    
            // Show feed effect by face+mouth transform
            var valXSub = mouth.center.x.monitor().subscribe(function(v) {
                mouthCenterPoint[0] = v.newValue;
                valXSub.unsubscribe();
                notifyIfTracked();
            }); 
    
            var valYSub = mouth.center.y.monitor().subscribe(function(v) {
                mouthCenterPoint[1] = v.newValue;
                valYSub.unsubscribe();
                notifyIfTracked();
            });
    
            var valZSub = mouth.center.z.monitor().subscribe(function(v) {
                mouthCenterPoint[2] = v.newValue;
                valZSub.unsubscribe();
                notifyIfTracked();
            });

            function notifyIfTracked() {

                --counter;

                if (counter == 0)
                    trackCallback(mouthCenterPoint);
            }
        }
        // Tracked to untracked state
        else {
            
            untrackCallback();
        }
    }); 
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

function applyBalloonMovement(obj, rx, ry, rz, tx, ty, tz) {

    var originList = [
        obj.transform.x.pinLastValue(), 
        obj.transform.y.pinLastValue(), 
        obj.transform.z.pinLastValue()
    ];

    var radiousList = [rx, ry, rz];
    var timeList = [tx, ty, tz];
    var transAnimList = [];

    for (var i=0; i<3; ++i) {

        const showTimeDriverParameters = {
            durationMilliseconds: timeList[i],
            loopCount: Infinity,
            mirror: true  
        };

        const timeDriver = Animation.timeDriver(showTimeDriverParameters);

        // Translate animation
        const curRadious = radiousList[i];
        const min = originList[i] - curRadious;
        const max = originList[i] + curRadious;
        const transSampler = Animation.samplers.easeInOutQuad(min, max);
        const transAnim = Animation.animate(timeDriver, transSampler);
    
        transAnimList.push(transAnim);

        timeDriver.start();
    }

    obj.transform.x = transAnimList[0];
    obj.transform.y = transAnimList[1];
    obj.transform.z = transAnimList[2];
}

function applyParalaxMovement(fLayer, bLayer, fw, bw) {

    if (fLayer != undefined) {

        fLayer.transform.x = Reactive.mul(facePoint0.x, fw);
        fLayer.transform.y = Reactive.mul(facePoint0.y, fw);
    }

    if (bLayer != undefined) {

        bLayer.transform.x = Reactive.mul(facePoint0.x, -bw);
        bLayer.transform.y = Reactive.mul(facePoint0.y, -bw);
    }
}

function applyRotationBounce(obj, minAngle, maxAngle, duration) {

    var time_driver = Animation.timeDriver({
        durationMilliseconds: duration,
        loopCount: Infinity
    });

    // Create a rotation sampler using Rotation objects generated
    // by the previously-defined axisRotation() method.
    var rotation_sampler = Animation.samplers.polyline({
        keyframes: [
            axisRotation(0, 1, 0, minAngle),
            axisRotation(0, 1, 0, minAngle),

            axisRotation(0, 1, 0, maxAngle),

            axisRotation(0, 1, 0, minAngle),
        ],
        knots: [
            0, 12, 13, 14,
        ]
    });

    // Start the animation
    var rotation_signal = Animation.animate(time_driver, rotation_sampler);
    
    obj.transform.rotation = rotation_signal;

    time_driver.start();
}

// --------------------------------------------------------------------------------
// SPECIFIC FUNCTIONS
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// Bubble animation

function showBubble(obj, facePoint, xSideWeight, positionY, targetBubbleScale, isAlwaysLeft) { 

    const facePointX = facePoint.x.pinLastValue(); 
    const facePointY = facePoint.y.pinLastValue();
    const facePointZ = facePoint.z.pinLastValue();

    obj.hidden = false;

    const showTimeDriverParameters = {

        durationMilliseconds: 200,
        loopCount: 1,
        mirror: false  
    };

    // Range affects scale and position
    var range = Math.sqrt(facePointX*facePointX + facePointY*facePointY + facePointZ*facePointZ);

    // Use this value to select bubble showing side
    var xSideNorm = -1.0 * (facePointX / Math.abs(facePointX));
    if (isAlwaysLeft)
        xSideNorm = 1.0;

    var shownBubbleX = range * xSideNorm * xSideWeight;

    // Bind the translation animation signal to the x-axis position signal of the plane
    obj.transform.x = shownBubbleX;
    obj.transform.y = positionY;
    obj.transform.z = 0.0;

    // Create a time driver using the parameters
    const timeDriver = Animation.timeDriver(showTimeDriverParameters);

    // Get scale factors (Linearly positive correlated with absolute Euclidean distance from camera)
    //     Find distance from bubble to camera | Given camera is always be at ( 0, 0, 0 )
    
    var bubbleScale = targetBubbleScale * range;
     
    // Scale animation
    const scaleQuadraticSampler = Animation.samplers.easeInOutQuad(0, bubbleScale);
    const scaleAnimation = Animation.animate(timeDriver, scaleQuadraticSampler);

    obj.transform.scaleX = scaleAnimation;
    obj.transform.scaleZ = scaleAnimation;

    // Start the time driver (unlike value drivers this needs to be done explicitly)
    timeDriver.start();
}

function hideBubble(obj) {

    const hideTimeDriverParameters = {
        durationMilliseconds: 100,
        loopCount: 1,
        mirror: false  
    };

    // Create a time driver using the parameters
    const timeDriver = Animation.timeDriver(hideTimeDriverParameters);

    // Scale with animation
    var curBubbleScale = obj.transform.scaleX.pinLastValue();

    const scaleQuadraticSampler = Animation.samplers.easeInOutQuad(curBubbleScale, 0);
    const scaleAnimation = Animation.animate(timeDriver, scaleQuadraticSampler);

    obj.transform.scaleX = scaleAnimation;
    obj.transform.scaleZ = scaleAnimation;

    // Start the time driver (unlike value drivers this needs to be done explicitly)
    timeDriver.start(); 

    var handler = timeDriver.onAfterIteration().subscribe(function() {

        // Hide current bubble
        obj.hidden = true;

        handler.unsubscribe();
    });
}       

// --------------------------------------------------------------------------------
// Food feeder

function initFoodFeeder(foodObjList, crushObjList, args) {

    // Create object list from randrom number

    var xPointList = [
        -4.64605, 2.01145, 0.15905, -5.46574, 1.48324, -0.88440, 5.19227, -0.17623, -4.53221, 3.80409,
        -0.58917, -7.88229, 0.28566, -2.71326, -4.56251, 1.48852, 7.26982, -1.98159, -4.68881, 5.47105
    ];
    var yPointList = [
        -4.02526, 3.29644, -4.92173, 4.44748, 1.83189, 5.47964, 3.90241, -5.72946, -0.65139, 5.41456,
        -5.93434, 4.94540, 5.72991, -6.85919, -4.76642, 2.35872, -3.66115, 2.37872, 2.26890, -6.83019
    ];
    var yAngleList = [
        0.88630, -0.34092, -0.36846, 0.48486, -0.67216, 0.76679, -0.03117, 0.98991, 0.38995, -0.14609,
        0.80563, -0.07388, 0.56158, -0.68193, -0.38198, 0.07115, -0.72906, -0.09344, 0.37989, 0.87110
    ];
    var isFoodFlip = [
        1, 1, 0, 0, 0, 1, 0, 0, 1, 0,
        1, 1, 1, 0, 0, 0, 1, 0, 1, 0
    ];
     
    var crushYAngleList0 = [
        -0.08104, 0.44314, 0.52326, -0.30244, 0.82356, -0.26104, -0.85587, 0.80953, 0.90391, -0.21765
    ];

    var crushYAngleList1 = [
        0.89408, -0.70547, 0.91741, -0.60386, 0.20676,-0.97222, 0.50191, 0.53523, -0.42530, 0.93437
    ]; 

    var crushNormDirList = [];
    for (var i=0; i<crushYAngleList0.length; ++i) {

        var radx = crushYAngleList0[i] * 2.0 * Math.PI;
        var rady = crushYAngleList1[i] * 2.0 * Math.PI;

        crushNormDirList.push([Math.cos(radx), Math.sin(rady)]);
    }

    // --------------------------------------------------------------------------------
    // Feeder efx function
    
    function runFeedInterval(objList, index, duration) {

        // Manipulate position transition
        const shootFoodInterval = {
            durationMilliseconds: duration,
            loopCount: Infinity,
            mirror: false  
        };

        var feedTimeDriver = Animation.timeDriver(shootFoodInterval);
 
        const txSamp = Animation.samplers.easeInOutQuad(xPointList[index] * args.feedVariantX, 0.0);
        const txAnim = Animation.animate(feedTimeDriver, txSamp);

        const tySamp = Animation.samplers.easeInOutQuad(yPointList[index] * args.feedVariantY, 0.0);
        const tyAnim = Animation.animate(feedTimeDriver, tySamp);

        const tzSamp = Animation.samplers.easeInOutQuad(args.range, 0.0);
        const tzAnim = Animation.animate(feedTimeDriver, tzSamp);
        
        // Show object
        objList[index].hidden = false; 
            
        objList[index].transform.x = txAnim;
        objList[index].transform.y = tyAnim;
        objList[index].transform.z = tzAnim;

        feedTimeDriver.start();

        if (!(feedTimeDriverList.length > index))
            feedTimeDriverList.push(feedTimeDriver);
        else
            feedTimeDriverList[index] = feedTimeDriver;

        // Manipulate angle
        objList[index].transform.rotationX = 0.0;

        // Flip randomly
        if (isFoodFlip[index] == 1)
            objList[index].transform.rotationY = 180.0;
        else
            objList[index].transform.rotationY = 0.0;
        
        objList[index].transform.rotationZ = yAngleList[index] * args.yAngleVariant;
    }

    // --------------------------------------------------------------------------------
    // Crush efx function

    function runCrushInterval(objList, index, crushDuration, varianceX, varianceY, varianceZ) {

        // Manipulate crush angle
        const crushInterval = { 
            durationMilliseconds: crushDuration,
            loopCount: Infinity,
            mirror: false  
        };
        var crushTimeDriver = Animation.timeDriver(crushInterval);

        const cxSamp = Animation.samplers.easeInOutQuad(0, crushNormDirList[index][0] * varianceX);
        const cxAnim = Animation.animate(crushTimeDriver, cxSamp);

        const cySamp = Animation.samplers.easeInOutQuad(0, crushNormDirList[index][1] * varianceY);
        const cyAnim = Animation.animate(crushTimeDriver, cySamp);

        const czSamp = Animation.samplers.easeInOutQuad(0, varianceZ);
        const czAnim = Animation.animate(crushTimeDriver, czSamp);

        // Show object
        objList[index].hidden = false;

        objList[index].transform.x = cxAnim;
        objList[index].transform.y = cyAnim;
        objList[index].transform.z = czAnim;

        crushTimeDriver.start();

        if (!(crushTimeDriverList.length > index))
            crushTimeDriverList.push(crushTimeDriver);
        else
            crushTimeDriverList[index] = crushTimeDriver; 
    }

    // --------------------------------------------------------------------------------
    // Start food feeder effect
    const feederTimeInMilliseconds = args.feedInterval;
    const feederIntervalTimer = Time.setInterval(shouldStartFeed, feederTimeInMilliseconds);
    var feedIndex = 0;

    // Hide all
    for (var i=0; i<foodObjList.length; ++i)
        foodObjList[i].hidden = true;

    function shouldStartFeed() {

        runFeedInterval(foodObjList, feedIndex++, args.feedDuration);

        if (feedIndex >= foodObjList.length)
            Time.clearInterval(feederIntervalTimer);
    }

    // --------------------------------------------------------------------------------
    // Start crush effect

    const crushTimeInMilliseconds = args.crushInterval;
    const crushIntervalTimer = Time.setInterval(shouldStartCrush, crushTimeInMilliseconds);
    var crushIndex = 0;

    // Hide all
    for (var i=0; i<crushObjList.length; ++i)
        crushObjList[i].hidden = true;

    function shouldStartCrush() {

        if (crushIndex >= crushObjList.length) {

            Time.clearInterval(crushIntervalTimer);
            return;
        }

        runCrushInterval(crushObjList, crushIndex++, args.crushDuration, 
            args.crushVarianceX, args.crushVarianceY, args.crushVarianceZ);

    }
}

// --------------------------------------------------------------------------------
// NETWORKING
// --------------------------------------------------------------------------------

function getThemeData(url, callback) {

	const request = {
		method: 'GET',
		headers: { 'Content-type': 'application/json' }
	};
    
    Networking.fetch(url, request).then(function(result) {
    
        // Check the status of the result
        // (https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
        if ((result.status >= 200) && (result.status < 300)) {
    
            Diagnostics.log('HTTP request success');
            
            // If the request was successful, chain the JSON forward
            return result.json();
        }
    
        // If the request was not successful, throw an error
        throw new Error('HTTP status code - ' + result.status);
    
    }).then(function(json) {
    
        // Log the JSON obtained by the successful request
        //Diagnostics.log('Successfully Get - ' + JSON.stringify(json));

        if (callback != undefined)
            callback(json, null);
    
    }).catch(function(error) {
    /*
        // Log any errors that may have happened with the request
        Diagnostics.log('error.message: ' + error.message);
        Diagnostics.log('error: ' + error);

        if (callback != undefined)
            callback(null, error);
    */
    });
}


