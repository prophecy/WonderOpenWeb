
// --------------------------------------------------------------------------------
// SHARED VARS & PARAMETERS
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// Environment Configurations

const ENV_PROD = "ENV_PROD";
const ENV_DEV = "ENV_DEV";

const BASE_URL_DEV = "https://dev.oishidrink.com/eato/asset/";
const BASE_URL_PROD = "https://www.oishidrink.com/eato/asset/";

// **** **** **** ****  **** **** **** ****  **** **** **** ****  **** **** **** ****
// Change ENV (Environment)
const ENV = ENV_PROD;

// --------------------------------------------------------------------------------
// Configuration logic
var BASE_URL = undefined;

if (ENV === ENV_PROD)
    BASE_URL = BASE_URL_PROD;
else if (ENV === ENV_DEV)
    BASE_URL = BASE_URL_DEV;

const CONFIG = {
    ENV: ENV,
    GET_THEME_URL: BASE_URL + "getTheme.aspx",
    BASE_TEX_URL: BASE_URL,
}

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

// stub
// Handle bubbles of face #0
/*
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
*/

// Food feeder for player #0

var foodFeederRoot0 = Scene.root.find('foodFeederRoot0');

var crushPoolList0 = [];
for (var i=0; i<10; ++i)
    crushPoolList0.push(Scene.root.find('crush0' + i));

var crushPoolMeshList0 = [];
for (var i=0; i<10; ++i)
    crushPoolMeshList0.push(Scene.root.find('crush0' + i + "_mesh"));

// Face

const facePoint0 = Patches.getVectorValue("facePoint0");
const facePoint1 = Patches.getVectorValue("facePoint1");

const facemesh0 = Scene.root.find("facemesh0");
// Stub
//const facemesh1 = Scene.root.find("facemesh1");

// Debug
const dbgTxtTheme = Scene.root.find('dbg_txt_theme');
const dbgTxtFace = Scene.root.find('dbg_txt_face')
const dbgTxtProd = Scene.root.find('dbg_txt_prod');
const dbgCanvas = Scene.root.find('debugPanelCanvas');

// --------------------------------------------------------------------------------
// RESOURCES for GYOZA THEME

const headGyozaRoot = Scene.root.find('head_gyoza_root');

// stub
const headHachimakiMesh = Scene.root.find("head_hachimaki_mesh");
const headHachimakiTex = "head_hachimaki";
// stub
//const headHachimaki1Mesh = Scene.root.find("head_hachimaki1_mesh");
const facePaintGyozaMat = Materials.get("face_paint_gyoza_mat");
const facePaintSandwichMat = Materials.get("face_paint_sandwich_mat");
const facePaintInvisibleMat = Materials.get("face_paint_invisible_mat");

// --------------------------------------------------------------------------------
// RESOURCES for SANDWICH THEME
// stub
/*
const headSandwichRoot = Scene.root.find("head_sandwich_root");
const headGlassesMesh = Scene.root.find("head_glasses_mesh");
const headGlassesTex = "head_glasses";

const headSwirl0 = Scene.root.find("head_swirl0");
const headSwirl1 = Scene.root.find("head_swirl1");
const headSwirl0Mesh = Scene.root.find("head_swirl0_mesh");
const headSwirl1Mesh = Scene.root.find("head_swirl1_mesh");

const headSandwichRoot1 = Scene.root.find("head_sandwich_root1");
const headGlasses1Mesh = Scene.root.find("head_glasses1_mesh");
const headSwirl01Mesh = Scene.root.find("head_swirl01_mesh");
const headSwirl11Mesh = Scene.root.find("head_swirl11_mesh");

const headSwirlTex = "head_swirl";

const frontLogoSandwich = Scene.root.find("front_logo_sandwich");
*/

// --------------------------------------------------------------------------------
// RESOURCES for TAKOYAKI THEME

// stub
/*
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

// Head, takoyaki
const headTakoyakiRoot = Scene.root.find("head_takoyaki_root");
const headTakoyakiCatEarsMesh = Scene.root.find("head_takoyaki_cat_ears_mesh");
const headTakoyakiNoseMesh = Scene.root.find("head_takoyaki_nose_mesh");
const headTakoyakiWhisker0Mesh = Scene.root.find("head_takoyaki_whisker0_mesh");
const headTakoyakiWhisker1Mesh = Scene.root.find("head_takoyaki_whisker1_mesh");
const headCatEarsTex = "head_takoyaki_cat_ears";
const headNoseTex = "head_takoyaki_nose";
const headWhiskerTex = "head_takoyaki_whiskers";

const headTakoyakiRoot1 = Scene.root.find("head_takoyaki_root1");
const headTakoyakiCatEars1Mesh = Scene.root.find("head_takoyaki_cat_ears1_mesh");
const headTakoyakiNose1Mesh = Scene.root.find("head_takoyaki_nose1_mesh");
const headTakoyakiWhisker01Mesh = Scene.root.find("head_takoyaki_whisker01_mesh");
const headTakoyakiWhisker11Mesh = Scene.root.find("head_takoyaki_whisker11_mesh");

// Head, takoyaki special
const headTakoyakiSpecialRoot = Scene.root.find("head_takoyaki_spec_root");
const headTakoyakiBigMesh = Scene.root.find("head_takoyaki_big_mesh");
const headTakoyakiBackMesh = Scene.root.find("head_takoyaki_back_mesh");
const headTakoyakiBigTex = "head_takoyaki_big";
const headTakoyakiBackTex = "head_takoyaki_back";

const headTakoyakiSpecial1Root = Scene.root.find("head_takoyaki_spec_root1");
const headTakoyakiBig1Mesh = Scene.root.find("head_takoyaki_big1_mesh");
const headTakoyakiBack1Mesh = Scene.root.find("head_takoyaki_back1_mesh");

const pinkyFaceMat = Materials.get("pinky_face_mat");

const frontLogoTakoyaki = Scene.root.find("front_logo_takoyaki");
*/

// --------------------------------------------------------------------------------
// RESOURCES for CRABSTICK THEME
// stub
/*
const headCrabstickRoot = Scene.root.find("head_crabstick_root");
const headCrabstickHatMesh = Scene.root.find("head_crabstick_hat_mesh");
const headCrabstickScalfMesh = Scene.root.find("head_crabstick_scalf_mesh");

const headCrabstickRoot1 = Scene.root.find("head_crabstick_root1");
const headCrabstickHat1Mesh = Scene.root.find("head_crabstick_hat1_mesh");
const headCrabstickScalf1Mesh = Scene.root.find("head_crabstick_scalf1_mesh");

const headCrabstickHatTex = "head_crabstick_hat_tex";
const headCrabstickScalfTex = "head_crabstick_scalf_tex";

const frontCrabstick = Scene.root.find("front_crabstick");
const crabstickFrontBareCrabMesh = Scene.root.find("bare_crab_mesh");
const crabstickFrontHoldingCrabMesh = Scene.root.find("holding_crab_mesh");
const crabstickFrontLogoCrabMesh = Scene.root.find("logo_crab_mesh");

const frontLogoCrabstick = Scene.root.find("front_logo_crabstick");
*/

// --------------------------------------------------------------------------------
// RESOURCES for RAMEN THEME
// stub
/*
const headRamenRoot = Scene.root.find("head_ramen_root");
const headRamenEyesMesh = Scene.root.find("head_ramen_eyes_mesh");
const headRamenEyesTex = "head_ramen_eyes_tex";

const headRamenRoot1 = Scene.root.find("head_ramen_root1");
const headRamenEyes1Mesh = Scene.root.find("head_ramen_eyes1_mesh");

const frontMealRoot = Scene.root.find("front_meal");
const mealFrontFlagMesh = Scene.root.find("flag_mesh");
const mealFrontBowlMesh = Scene.root.find("bowl_mesh");
const mealFrontStillRamenMesh = Scene.root.find("still_ramen_mesh");

const mealShopstick00_pivot = Scene.root.find("shopstick00_pivot");
const mealShopstick01_pivot = Scene.root.find("shopstick01_pivot");

const mealShopstick00mesh = Scene.root.find("shopstick00_mesh");
const mealShopstick01mesh = Scene.root.find("shopstick01_mesh");

const frontLogoRamen0 = Scene.root.find("front_logo_ramen0");
const frontLogoRamen1 = Scene.root.find("front_logo_ramen1");
*/
// --------------------------------------------------------------------------------
// RESOURCES for NEW PRODUCT

const bodySegmentationRect = Scene.root.find("body_segment_rect");

const newFrontRoot = Scene.root.find("new_front_root");

const newQuoteBg = Scene.root.find("new_quote_bg");
const newQuoteBgMesh = Scene.root.find("new_quote_bg_mesh");

const newQuoteTxt = Scene.root.find("new_quote_text");
const newQuoteTxtMesh = Scene.root.find("new_quote_text_mesh");

const newProdBig = Scene.root.find("new_prod_big");
const newProdBigMesh = Scene.root.find("new_prod_big_mesh");

const newProdSmall = Scene.root.find("new_prod_small");
const newProdSmallMesh = Scene.root.find("new_prod_small_mesh");

const newGyozaLeft = Scene.root.find("new_gyoza_left");
const newGyozaLeftMesh = Scene.root.find("new_gyoza_left_mesh");

const newGyozaRight = Scene.root.find("new_gyoza_right");
const newGyozaRightMesh = Scene.root.find("new_gyoza_right_mesh");

const newTakoyakiRoot = Scene.root.find("takoyaki_root");
const newSmokeRoot = Scene.root.find("smoke_root");
const newGyozaRoot = Scene.root.find("new_gyoza_root");

const facemesh0Tako = Scene.root.find("facemesh0_tako");

const howToRect = Scene.root.find("howto_rect");

const takoDirectionalLight0 = Scene.root.find("tako_directional_ligh0");

// --------------------------------------------------------------------------------
// RESOURCES for SWIRL SANDWICH

const sandwichRoot = Scene.root.find("sandwich_root");
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

// --------------------------------------------------------------------------------
// SHARED VARS & CALLBACKS

const MOUTH_OPENNESS_MIN_THRESHOLD = 0.1;
const MOUTH_CLOSSNESS_MAX_THRESHOLD = 0.07;

var feedTimeDriverList = [];
var crushTimeDriverList = [];

var currentData = {};

const SWIRL_RADIOUS = 12.0;
const SWIRL_DURATION = 3000;

const HEAD_MAT_LIST = [
    "head_mat0", "head_mat1", "head_mat2", "head_mat3", 
    "head_mat4",
];

const CRUSH_MAT_LIST = [
    "crush_mat0", "crush_mat1", "crush_mat2", "crush_mat3",
]

const CRUSH_TEX_LIST = [
    "ext_crush_tex0", "ext_crush_tex1", "ext_crush_tex2", "ext_crush_tex3",
]

const PROD_TEX_LOOKUP_TABLE = {

    gyoza_pork_5pcs: "theme_gyoza/product/pork_5pcs.png",
    gyoza_pork_12pcs: "theme_gyoza/product/pork_12pcs.png",
    gyoza_takoyaki_5pcs: "theme_gyoza/product/takoyaki_5pcs.png",
    gyoza_shrimp_12pcs: "theme_gyoza/product/shrimp_12pcs.png",
    gyoza_chicken_yuzu_5pcs: "theme_gyoza/product/chicken_yuzu_5pcs.png",
    gyoza_chicken_yuzu_12pcs: "theme_gyoza/product/chicken_yuzu_12pcs.png",
    gyoza_pork_mala_5pcs: "theme_gyoza/product/pork_mala_5pcs.png",
    gyoza_pork_mala_12pcs: "theme_gyoza/product/pork_mala_12pcs.png",

    gyoza_reserved_00: "theme_gyoza/product/reserved_00.png",
    gyoza_reserved_01: "theme_gyoza/product/reserved_01.png",

    sandwich_alaska_wakame: "theme_sandwich/product/alaska_wakame.png",
    sandwich_tuna: "theme_sandwich/product/tuna.png",
    sandwich_ham_egg: "theme_sandwich/product/ham_egg.png",
    sandwich_crabstick_wasabi: "theme_sandwich/product/crabstick_wasabi.png",

    sandwich_reserved_00: "theme_sandwich/product/reserved_00.png",
    sandwich_reserved_01: "theme_sandwich/product/reserved_01.png",

    crabstick_kani_kamaboko: "theme_crabstick/product/kani_kamaboko.png",
    crabstick_kani_alaska: "theme_crabstick/product/kani_alaska.png",

    crabstick_reserved_00: "theme_crabstick/product/reserved_00.png",
    crabstick_reserved_01: "theme_crabstick/product/reserved_01.png",

    takoyaki_takoyaki: "theme_tako/product/takoyaki.png",

    takoyaki_reserved_00: "theme_tako/product/reserved_00.png",
    takoyaki_reserved_01: "theme_tako/product/reserved_01.png",

    meal_yakisoba: "theme_meal/product/yakisoba.png",
    meal_clams: "theme_meal/product/clams.png",
    meal_kraphrao: "theme_meal/product/kraphrao.png",
    meal_keemao: "theme_meal/product/keemao.png",

    meal_reserved_00: "theme_meal/product/reserved_00.png",
    meal_reserved_01: "theme_meal/product/reserved_01.png",
}

const THEME_NAME_LOOKUP_TABLE = {

    gyoza: "Gyoza",
    sandwich: "Sandwich",
    crabstick: "Crab Stick",
    takoyaki: "Tokoyaki",
    meal: "Meal",
}

const FOOD_TEX_LOOKUP_TABLE = {

    gyoza: [
        "theme_gyoza/gyoza_00.png", "theme_gyoza/gyoza_01.png", 
    ],
    sandwich: [
        "theme_sandwich/sw2.png", "theme_sandwich/sw3.png", "theme_sandwich/sw4.png", "theme_sandwich/sw8.png", "theme_sandwich/sw10.png"
    ],
    crabstick: [
        "theme_crabstick/crab_4.png", "theme_crabstick/crab_5.png", "theme_crabstick/crab_6.png", 
    ],
    takoyaki: [
        "theme_tako/ta4.png", "theme_tako/ta5.png", "theme_tako/ta6.png", 
    ],
    meal: [ ],
}

const CRUSH_TEX_LOOKUP_TABLE = {

    gyoza: [
        "theme_gyoza/gyoza_02.png", "theme_gyoza/gyoza_03.png", "theme_gyoza/gyoza_04.png", "theme_gyoza/gyoza_05.png",
    ],
    sandwich: [
        "theme_sandwich/sw2.png", "theme_sandwich/sw3_2.png", "theme_sandwich/sw9.png", "theme_sandwich/sw10_2.png",
        "theme_sandwich/sw11.png", "theme_sandwich/sw12.png"
    ],
    crabstick: [
        "theme_crabstick/crab_7.png", "theme_crabstick/crab_8.png", "theme_crabstick/crab_9.png", 
    ],
    takoyaki: [
        "theme_tako/ta7.png", "theme_tako/ta8.png", "theme_tako/ta9.png", "theme_tako/ta10.png", 
        "theme_tako/ta11.png", 
    ],
    meal: [ ],
}

const FACE_NAME_LOOKUP_TABLE = {

    gyoza: "gyoza",
    sandwich: "sandwich",
    crabstick: "crabstick",
    takoyaki: "takoyaki",
    takoyaki_special: "takoyaki_special",
    meal: "meal",
}

// --------------------------------------------------------------------------------
// NEW DESIGN VARS
// --------------------------------------------------------------------------------

const NEW_DESIGN_MAT_LIST = [
    "new_design_mat0", "new_design_mat1", "new_design_mat2", "new_design_mat3", 
    "new_design_mat4", "new_design_mat5", "new_design_mat6", "new_design_mat7",  
    "new_design_mat8", "new_design_mat9", "new_design_mat10", "new_design_mat11", 
    "new_design_mat12", "new_design_mat13", "new_design_mat14", "new_design_mat15", 
];

const NEW_DESIGN_TEX_LIST = [
    "ext_new_design_tex0", "ext_new_design_tex1", "ext_new_design_tex2", "ext_new_design_tex3", 
    "ext_new_design_tex4", "ext_new_design_tex5", "ext_new_design_tex6", "ext_new_design_tex7", 
    "ext_new_design_tex8", "ext_new_design_tex9", "ext_new_design_tex10", "ext_new_design_tex11", 
    "ext_new_design_tex12", "ext_new_design_tex13", "ext_new_design_tex14", "ext_new_design_tex15", 
];

const NEW_DESIGN_URL_TABLE = {
    
    // Gyoza sample
    gyoza_bubble_bg: "new_design/sample_gyoza/01_01_bg.png",
    gyoza_bubble_txt_00: "new_design/sample_gyoza/tx_01.png",
    gyoza_bubble_txt_01: "new_design/sample_gyoza/tx_02.png",
    gyoza_feed_00: "new_design/sample_gyoza/01_04_gyuza1_action.png",
    gyoza_feed_01: "new_design/sample_gyoza/01_04_gyuza2_action.png",
    gyoza_feed_02: "new_design/sample_gyoza/01_04_gyuza3_action.png",
    gyoza_prod_small: "new_design/sample_gyoza/01_03_product.png",
    gyoza_prod_big: "new_design/sample_gyoza/01_03_product2_action.png",
    gyoza_prod_bg: "new_design/sample_gyoza/01_02_bg2.png",

    // Takoyaki sample
    takoyaki_bubble_bg: "new_design/sample_takoyaki/bubble.png",
    takoyaki_bubble_txt: "new_design/sample_takoyaki/copy.png",
    takoyaki_prod: "new_design/sample_takoyaki/takopack.png",

    // Sandwich sample
    sandwich_bubble_bg: "new_design/sample_sandwich/bb_sandwich.png",
    sandwich_bubble_txt: "new_design/sample_takoyaki/copy.png",
    sandwich_prod: "new_design/sample_sandwich/sandwich_crab.png",
};

// --------------------------------------------------------------------------------
// SCENE LOGIC
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// @ DEBUGGING

//Diagnostics.watch("facePoint0 X ", facePoint0.x);
//Diagnostics.watch("facePoint0 Y ", facePoint0.y);
//Diagnostics.watch("facePoint0 Z ", facePoint0.z);

//Diagnostics.watch("Mouth Openness - ", FaceTracking.face(0).mouth.openness);
//Diagnostics.watch("Mouth Center X ", FaceTracking.face(0).mouth.center.x);
//Diagnostics.watch("Mouth Center Y ", FaceTracking.face(0).mouth.center.y);
//Diagnostics.watch("Mouth Center Z ", FaceTracking.face(0).mouth.center.z);

// Toggle show/hidden debug panel
TouchGestures.onLongPress().subscribe(function (gesture) {

    var isHidden = dbgCanvas.hidden.pinLastValue();
    dbgCanvas.hidden = !isHidden;
});

TouchGestures.onTap().subscribe(function (gesture) {
    changeTheme();
});

// --------------------------------------------------------------------------------
// @ START

const SHOW_ANIM_DURATION = 300;

var curTheme = undefined;

// ********************************************************************************
// This function starts first, but call at the last line

function main() {

    initSwirlSandwich(frontSwirl, frontSandwichList, frontSandwichMeshList, true);
    initSwirlSandwich(backSwirl, backSandwichList, backSandwichMeshList, false);
        
    hideAllThemes();
    showSandwich();    
}

// ********************************************************************************

function changeTheme() {

    hideAllThemes();

    // Change theme
    if (curTheme === THEME_NAME_LOOKUP_TABLE.gyoza)
        showTakoyaki();
    else if (curTheme === THEME_NAME_LOOKUP_TABLE.takoyaki)
        showSandwich();
    else if (curTheme === THEME_NAME_LOOKUP_TABLE.sandwich)
        showGyoza();
}

function hideAllThemes() {

    //newQuoteBg.hidden = true;
    //newQuoteTxt.hidden = true;
    //newProdBig.hidden = true;
    //newProdSmall.hidden = true;

    newSmokeRoot.hidden = true;
    newTakoyakiRoot.hidden = true;
    newGyozaRoot.hidden = true;    
    facemesh0.hidden = true;
    facemesh0Tako.hidden = true;
    sandwichRoot.hidden = true;
    headGyozaRoot.hidden = true;
    bodySegmentationRect.hidden = true;
    takoDirectionalLight0.hidden = true;
}

function showGyoza() {

    curTheme = THEME_NAME_LOOKUP_TABLE.gyoza;

    headGyozaRoot.hidden = false;
    facemesh0.hidden = false;
    newGyozaRoot.hidden = false;
    headGyozaRoot.hidden = false;

    loadNewDesignGyoza();
    runGyozaSequence();
    applyRotationBounceLessDelay(newGyozaLeft, 0, 20, 700);
    applyRotationBounceLessDelay(newGyozaRight, 0, 50, 600);

    facemesh0.material = facePaintGyozaMat;
}

function showTakoyaki() {

    curTheme = THEME_NAME_LOOKUP_TABLE.takoyaki;

    newTakoyakiRoot.hidden = false;
    facemesh0Tako.hidden = false;
    takoDirectionalLight0.hidden = false;

    loadNewDesignTakoyaki();
}

function showCrabstick() {

    curTheme = THEME_NAME_LOOKUP_TABLE.crabstick;

}

function showSandwich() {

    curTheme = THEME_NAME_LOOKUP_TABLE.sandwich;

    facemesh0.hidden = false;
    sandwichRoot.hidden = false;
    bodySegmentationRect.hidden = false;

    facemesh0.material = facePaintSandwichMat;

    loadNewDesignSandwich();
}

function initSwirlSandwich(swirl, sandwichList, sandwichMeshList, isFront) {

    // Setup object transform
    const SWIRL_RADIOUS = 12.0;
    const SWIRL_DURATION = 3000;

    for (var i=0; i<sandwichList.length; ++i) {

        var radian = Math.PI * 2.0 / sandwichList.length * i;

        var x = Math.cos(radian) * SWIRL_RADIOUS;
        var z = Math.sin(radian) * SWIRL_RADIOUS;

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

var gyozaSeqMatList = [];

function loadNewDesignGyoza() {

    var curResIndex = 0;

    setupMaterial(newQuoteBgMesh, curResIndex++, NEW_DESIGN_URL_TABLE.gyoza_bubble_bg);
    setupMaterial(newQuoteTxtMesh, curResIndex++, NEW_DESIGN_URL_TABLE.gyoza_bubble_txt_00);
    setupMaterial(newProdBigMesh, curResIndex++, NEW_DESIGN_URL_TABLE.gyoza_prod_big);
    setupMaterial(newProdSmallMesh, curResIndex++, NEW_DESIGN_URL_TABLE.gyoza_prod_big);

    // Add gyoza sequence
    var mat = getMaterialWithDiffuseByUrl(
        NEW_DESIGN_MAT_LIST[curResIndex], 
        NEW_DESIGN_TEX_LIST[curResIndex], 
        BASE_URL + NEW_DESIGN_URL_TABLE.gyoza_feed_00);
    gyozaSeqMatList.push(mat);
    ++curResIndex;

    mat = getMaterialWithDiffuseByUrl(
        NEW_DESIGN_MAT_LIST[curResIndex], 
        NEW_DESIGN_TEX_LIST[curResIndex], 
        BASE_URL + NEW_DESIGN_URL_TABLE.gyoza_feed_01);
    gyozaSeqMatList.push(mat);
    ++curResIndex;

    mat = getMaterialWithDiffuseByUrl(
        NEW_DESIGN_MAT_LIST[curResIndex], 
        NEW_DESIGN_TEX_LIST[curResIndex], 
        BASE_URL + NEW_DESIGN_URL_TABLE.gyoza_feed_02);
    gyozaSeqMatList.push(mat);
    ++curResIndex;
    
    newGyozaLeftMesh.material = newGyozaRightMesh.material = gyozaSeqMatList[0];
    
    function setupMaterial(mesh, index, texName) {

        mesh.material = getMaterialWithDiffuseByUrl(
            NEW_DESIGN_MAT_LIST[index], 
            NEW_DESIGN_TEX_LIST[index], 
            BASE_URL + texName);    
    }    
}

function loadNewDesignTakoyaki() {

    var curResIndex = 0;

    setupMaterial(newQuoteBgMesh, curResIndex++, NEW_DESIGN_URL_TABLE.takoyaki_bubble_bg);
    setupMaterial(newQuoteTxtMesh, curResIndex++, NEW_DESIGN_URL_TABLE.takoyaki_bubble_txt);
    setupMaterial(newProdBigMesh, curResIndex++, NEW_DESIGN_URL_TABLE.takoyaki_prod);
    setupMaterial(newProdSmallMesh, curResIndex++, NEW_DESIGN_URL_TABLE.takoyaki_prod);

    function setupMaterial(mesh, index, texName) {

        mesh.material = getMaterialWithDiffuseByUrl(
            NEW_DESIGN_MAT_LIST[index], 
            NEW_DESIGN_TEX_LIST[index], 
            BASE_URL + texName);    
    }
}

function loadNewDesignSandwich() {

    var curResIndex = 0;

    setupMaterial(newQuoteBgMesh, curResIndex++, NEW_DESIGN_URL_TABLE.sandwich_bubble_bg);
    setupMaterial(newQuoteTxtMesh, curResIndex++, NEW_DESIGN_URL_TABLE.sandwich_bubble_txt);
    setupMaterial(newProdBigMesh, curResIndex++, NEW_DESIGN_URL_TABLE.sandwich_prod);
    setupMaterial(newProdSmallMesh, curResIndex++, NEW_DESIGN_URL_TABLE.sandwich_prod);

    function setupMaterial(mesh, index, texName) {

        mesh.material = getMaterialWithDiffuseByUrl(
            NEW_DESIGN_MAT_LIST[index], 
            NEW_DESIGN_TEX_LIST[index], 
            BASE_URL + texName);    
    }
}

applyParalaxMovement(newFrontRoot, undefined, 0.1, 0.1);

var curGyozaLeftSeqIndex = 0;
var curGyozaRightSeqIndex = 0;

function runGyozaSequence() {

    Time.setInterval(updateLeftSeq, 700);
    Time.setInterval(updateRightSeq, 600); 
    
    function updateLeftSeq() {

        newGyozaLeftMesh.material = gyozaSeqMatList[curGyozaLeftSeqIndex];
        
        if (++curGyozaLeftSeqIndex >= gyozaSeqMatList.length)
            curGyozaLeftSeqIndex = 0;
    }

    function updateRightSeq() {

        newGyozaRightMesh.material = gyozaSeqMatList[curGyozaRightSeqIndex];
        
        if (++curGyozaRightSeqIndex >= gyozaSeqMatList.length)
            curGyozaRightSeqIndex = 0;
    }
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

function showNewQuote() {

    newQuoteBg.hidden = false;

    const driverParams = {

        durationMilliseconds: SHOW_ANIM_DURATION,
        loopCount: 1,
        mirror: false  
    };

    const timeDriver = Animation.timeDriver(driverParams);
    const sampler = Animation.samplers.easeInOutQuad(0, 1);
    const anim = Animation.animate(timeDriver, sampler);

    newQuoteBg.transform.scaleX = anim;
    newQuoteBg.transform.scaleZ = anim;

    timeDriver.start();
}

function hideNewQuote() {

    newQuoteBg.hidden = true;
}

function showNewQuoteTxt() {

    newQuoteTxt.hidden = false;

    const driverParams = {

        durationMilliseconds: SHOW_ANIM_DURATION,
        loopCount: 1,
        mirror: false  
    };

    const timeDriver = Animation.timeDriver(driverParams);
    const sampler = Animation.samplers.easeInOutQuad(0, 1);
    const anim = Animation.animate(timeDriver, sampler);

    newQuoteTxt.transform.scaleX = anim;
    newQuoteTxt.transform.scaleZ = anim;

    timeDriver.start();
}

function hideNewQuoteText() {

    newQuoteTxt.hidden = true;
}

function showNewProdInit() {

    newProdSmall.hidden = false;

    const driverParams = {

        durationMilliseconds: SHOW_ANIM_DURATION,
        loopCount: 1,
        mirror: false  
    };

    const timeDriver = Animation.timeDriver(driverParams);
    const sampler = Animation.samplers.easeInOutQuad(0, 1);
    const anim = Animation.animate(timeDriver, sampler);

    newProdSmall.transform.scaleX = anim;
    newProdSmall.transform.scaleZ = anim;

    timeDriver.start();
}

function showNewProdBig() {

    newProdBig.hidden = false;
    newProdSmall.hidden = true;
}

function showNewProdSmall() {

    newProdSmall.hidden = false;
    newProdBig.hidden = true;
}

function hideNewProd() {

    newProdBig.hidden = true;
    newProdSmall.hidden = true;
}

function initHead() {

    var faceName = currentData.face;

    if (faceName.localeCompare(FACE_NAME_LOOKUP_TABLE.gyoza) == 0)
        showGyoza();
    else if (faceName.localeCompare(FACE_NAME_LOOKUP_TABLE.sandwich) == 0)
        showSandwich();
    else if (faceName.localeCompare(FACE_NAME_LOOKUP_TABLE.crabstick) == 0)
        showCrabstick();
    else if (faceName.localeCompare(FACE_NAME_LOOKUP_TABLE.takoyaki) == 0)
        showTakoyaki();
    else if (faceName.localeCompare(FACE_NAME_LOOKUP_TABLE.takoyaki_special) == 0)
        showTakoyakiSpecial();
    else if (faceName.localeCompare(FACE_NAME_LOOKUP_TABLE.meal) == 0)
        showRamen();
    else
        Diagnostics.log("Face key not found with value: '" + faceName + "'");
    
    function showGyoza() {

        // Apply head mat and tex
        var curMatIndex = 0;

        var mat = getMaterialWithDiffuse(HEAD_MAT_LIST[curMatIndex++], headHachimakiTex);
        headHachimakiMesh.material = mat;
        // stub
        //headHachimaki1Mesh.material = mat;

        headGyozaRoot.hidden = false;
        // stub
        //headGyozaRoot1.hidden = false;

        // Apply face paint mat and tex
        //facemesh0.material = facePaintGyozaMat;
        // stub
        //facemesh1.material = facePaintGyozaMat;
    }

    function showSandwich() {

        // Apply head mat and tex
        var curMatIndex = 0;
        var tmpMat = undefined;
        
        headGlassesMesh.material = tmpMat = getMaterialWithDiffuse(HEAD_MAT_LIST[curMatIndex++], headGlassesTex);
        headGlasses1Mesh.material = tmpMat;

        headSwirl0Mesh.material = tmpMat = getMaterialWithDiffuse(HEAD_MAT_LIST[curMatIndex++], headSwirlTex);
        headSwirl01Mesh.material = tmpMat;

        headSwirl1Mesh.material = tmpMat = getMaterialWithDiffuse(HEAD_MAT_LIST[curMatIndex++], headSwirlTex);
        headSwirl11Mesh.material = tmpMat;

        headSandwichRoot.hidden = false;
        headSandwichRoot1.hidden = false;

        // Apply face paint mat and tex
        facemesh0.material = pinkyFaceMat;
        facemesh1.material = pinkyFaceMat;

        // Use swirl glasses
        applySpinMovement(headSwirl0Mesh, 2000);
        applySpinMovement(headSwirl1Mesh, 2000);

        // Apply face paint mat and tex
        facemesh0.material = facePaintInvisibleMat;
        facemesh1.material = facePaintInvisibleMat;
    }

    function showTakoyaki() {

        // Apply head mat and tex
        var curMatIndex = 0;
        var tmpMat = undefined;

        headTakoyakiCatEarsMesh.material = tmpMat = getMaterialWithDiffuse(HEAD_MAT_LIST[curMatIndex++], headCatEarsTex);
        headTakoyakiCatEars1Mesh.material = tmpMat;

        headTakoyakiNoseMesh.material = tmpMat = getMaterialWithDiffuse(HEAD_MAT_LIST[curMatIndex++], headNoseTex);
        headTakoyakiNose1Mesh.material = tmpMat;

        headTakoyakiWhisker0Mesh.material = tmpMat = getMaterialWithDiffuse(HEAD_MAT_LIST[curMatIndex++], headWhiskerTex);
        headTakoyakiWhisker01Mesh.material = tmpMat;

        headTakoyakiWhisker1Mesh.material = tmpMat = getMaterialWithDiffuse(HEAD_MAT_LIST[curMatIndex++], headWhiskerTex);
        headTakoyakiWhisker11Mesh.material = tmpMat;

        headTakoyakiRoot.hidden = false;
        headTakoyakiRoot1.hidden = false;
        
        // Apply face paint mat and tex
        facemesh0.material = pinkyFaceMat;
        facemesh1.material = pinkyFaceMat;
    }

    function showTakoyakiSpecial() {

        var curMatIndex = 0;
        var tmpMat = undefined;

        headTakoyakiBigMesh.material = tmpMat = getMaterialWithDiffuse(HEAD_MAT_LIST[curMatIndex++], headTakoyakiBigTex);
        headTakoyakiBig1Mesh.material = tmpMat;

        headTakoyakiBackMesh.material = tmpMat = getMaterialWithDiffuse(HEAD_MAT_LIST[curMatIndex++], headTakoyakiBackTex);
        headTakoyakiBack1Mesh.material = tmpMat;

        headTakoyakiSpecialRoot.hidden = false;
        headTakoyakiSpecial1Root.hidden = false;

        // Apply face paint mat and tex
        facemesh0.material = pinkyFaceMat;
        facemesh1.material = pinkyFaceMat;
    }

    function showCrabstick() {

        var curMatIndex = 0;
        var tmpMat = undefined;

        headCrabstickHatMesh.material = tmpMat = getMaterialWithDiffuse(HEAD_MAT_LIST[curMatIndex++], headCrabstickHatTex);
        headCrabstickHat1Mesh.material = tmpMat;

        headCrabstickScalfMesh.material = tmpMat = getMaterialWithDiffuse(HEAD_MAT_LIST[curMatIndex++], headCrabstickScalfTex);
        headCrabstickScalf1Mesh.material = tmpMat

        headCrabstickRoot.hidden = false;
        headCrabstickRoot1.hidden = false;

        // Apply face paint mat and tex
        facemesh0.material = facePaintInvisibleMat;
        facemesh1.material = facePaintInvisibleMat;
    }

    function showRamen() {

        var curMatIndex = 0;
        var tmpMat = undefined;

        headRamenEyesMesh.material = tmpMat = getMaterialWithDiffuse(HEAD_MAT_LIST[curMatIndex++], headRamenEyesTex);
        headRamenEyes1Mesh.material = tmpMat;

        headRamenRoot.hidden = false;
        headRamenRoot1.hidden = false;

        // Apply face paint mat and tex
        facemesh0.material = facePaintInvisibleMat;
        facemesh1.material = facePaintInvisibleMat;
    }
}

foodFeederRoot0.hidden = true;

/*
// Get theme
getThemeData(CONFIG.GET_THEME_URL, function(data, err) { 
     
    if (!!data) {
        
        Diagnostics.log("theme: "  + data.theme);
        Diagnostics.log("face: " + data.face);
        Diagnostics.log("product: " + data.product);

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
    initFoodFeeder();
});
*/

// Init with gyoza face

currentData.face = FACE_NAME_LOOKUP_TABLE.gyoza;

initHead();

// Init bubbles' tex
function initBubbleTex() {

    var texName = "bubbleTex";
    var texUrl = CONFIG.BASE_TEX_URL + "getQuote.png"

    for (var i=0; i<7; ++i) {

        var tex = Textures.get(texName + i);
        tex.url = texUrl;
    }
}

initBubbleTex();

// Handle env obj movements
//applyBalloonMovement(gyozaFloat, 0.6, 0.4, 0.2, 1500, -3000, 4500);
//applyRotationBounce(prodPlane0, 50, 20, 1800); // The small one
//applyRotationBounce(prodPlane1, 0, 50, 1600); // The big one
//applyRotationBounce(prodPlane2, 50, 20, 2000); // The big one

//applyParalaxMovement(undefined, prodRoot, 0.1, 0.1);

// --------------------------------------------------------------------------------
// @ FACE DETECTED

// Bubble transformations
const X_SIDE_WEIGHT = 0.14;
const Y_SIDE_WEIGHT = 0.15;
const BUBBLE_POSITION_Y = -8.8;
const TARGET_BUBBLE_SCALE = 0.0028;

// Stub
// Bubble list mgr vars
//var currentBibbleIndex = 0;
//const BUBBLE_SIZE = bubbleList0.length;
//var isBubbleVisible = false;

// Hide all bubbles
//function hideAllBubbles(bubbleList) {
//    for (var i=0; i<bubbleList.length; ++i)
//        bubbleList[i].hidden = true;
//} 
    
//hideAllBubbles(bubbleList0);
//hideAllBubbles(bubbleList1);
    
function onFaceTracked(faceIndex) {

    howToRect.hidden = true;

    if (faceIndex != 0)
        return;

    showNewQuote();

    const quoteTxtTimer = Time.setInterval(showQuoteText, 500);
    const prodTimer = Time.setInterval(showProd, 1000);

    function showQuoteText() {

        showNewQuoteTxt();

        // clear interval
        Time.clearInterval(quoteTxtTimer);
    }

    function showProd() {

        showNewProdInit();

        // clear interval
        Time.clearInterval(prodTimer);
    }
}

function onFaceUntracked(faceIndex) {

    if (faceIndex != 0)
        return;

    hideNewQuote();
    hideNewQuoteText();
    hideNewProd();
}

handleFaceTrackingState(0, function() { onFaceTracked(0); }, function() { onFaceUntracked(0); });
handleFaceTrackingState(1, function() { onFaceTracked(1); }, function() { onFaceUntracked(1); });

// --------------------------------------------------------------------------------
// @ OPEN MOUTH

newGyozaRoot.hidden = true;

function onFace0MouthOpen() {

    showNewProdBig();

    if (curTheme === THEME_NAME_LOOKUP_TABLE.gyoza)
        newGyozaRoot.hidden = false;
    else if (curTheme === THEME_NAME_LOOKUP_TABLE.takoyaki)
        newSmokeRoot.hidden = false;
}

function onFace0MouthClose() {

    showNewProdSmall();

    newGyozaRoot.hidden = true;
    newSmokeRoot.hidden = true;
}

handleMouthOpeningState(
    0, 
    MOUTH_OPENNESS_MIN_THRESHOLD, MOUTH_CLOSSNESS_MAX_THRESHOLD, 
    onFace0MouthOpen, onFace0MouthClose);


// --------------------------------------------------------------------------------
// GENERIC FUNCTIONS
// --------------------------------------------------------------------------------

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

function getMaterialWithDiffuse(matName, texName) {

    var mat = Materials.get(matName);
    var tex = Textures.get(texName);
    
    mat.diffuse = tex;
    return mat;
}

function getMaterialWithDiffuseByUrl(matName, texName, url) {

    Diagnostics.log("Get mat: " + matName);
    Diagnostics.log("Get tex: " + texName);
    Diagnostics.log("Load texture with URL: " + url);

    var tex = Textures.get(texName);
    tex.url = url;

    var mat = Materials.get(matName);

    mat.diffuse = tex;
    return mat;
}

// Handle mouth opening state

function handleMouthOpeningState(faceIndex, openMinThres, closeMaxThres, openCallback, closCallback) {

    var mouth = FaceTracking.face(faceIndex).mouth;

    var mouthOpen = mouth.openness.gt(Reactive.val(openMinThres));
    var mouthClose = mouth.openness.lt(Reactive.val(closeMaxThres));
    
    mouthOpen.monitor().subscribe(function(flag) {
        if (flag.newValue)
            openCallback();
    });

    mouthClose.monitor().subscribe(function(flag) {
        if (flag.newValue)
            closCallback();
    });
}

// [2019.06.13] Fixed face not show on iOS
//     This is about Facebook AR platform implementation problem occuring when user's face is tracked before finish loading.
//        Then cause mismatch state
var isFaceTracked = [ false, false ];

function checkTrackedStateWithDelay(faceIndex, trackCallback, untrackCallback) {

    const interval = Time.setInterval(checkTrackedState, 400);

    function checkTrackedState() {

        var state = FaceTracking.face(faceIndex).isTracked.pinLastValue();

        if (state != isFaceTracked[faceIndex]) {

            if (state == true)
                trackCallback();
            else
                untrackCallback();

            Time.clearInterval(interval);
        }
    }
}

function handleFaceTrackingState(faceIndex, trackCallback, untrackCallback) {

    checkTrackedStateWithDelay(faceIndex, trackCallback, untrackCallback);

    // Monitor tracking state
    FaceTracking.face(faceIndex).isTracked.monitor().subscribe(function(e) {

        if (isFaceTracked[faceIndex] != e.newValue) {

            isFaceTracked[faceIndex] = e.newValue;
        
            if (e.newValue)
                trackCallback();
            else
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

function applySpinMovement(obj, duration) {

    var time_driver = Animation.timeDriver({
        durationMilliseconds: duration,
        loopCount: Infinity
    });
    
    // Create a rotation sampler using Rotation objects generated
    // by the previously-defined axisRotation() method.
    var rotation_sampler = Animation.samplers.polyline({
        keyframes: [
            axisRotation(0, 1, 0, 0),
            axisRotation(0, 1, 0, 90),
            axisRotation(0, 1, 0, 180),
            axisRotation(0, 1, 0, 270),
            axisRotation(0, 1, 0, 356)
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

function applyFoodSpinMovement(obj, duration) {

    var time_driver = Animation.timeDriver({
        durationMilliseconds: duration,
        loopCount: Infinity
    });
    
    // Create a rotation sampler using Rotation objects generated
    // by the previously-defined axisRotation() method.
    var rotation_sampler = Animation.samplers.polyline({
        keyframes: [
            axisRotation(1, 0, 0, 360),
            axisRotation(1, 0, 0, 270),
            axisRotation(1, 0, 0, 180),
            axisRotation(1, 0, 0, 90),
            axisRotation(1, 0, 0, 0),
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

function applyShopsticksBound(obj, minAngle, maxAngle, duration) {

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
            0, 5, 7, 9,
        ]
    });

    // Start the animation
    var rotation_signal = Animation.animate(time_driver, rotation_sampler);
    
    obj.transform.rotation = rotation_signal;

    time_driver.start();
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

function applyRotationBounceLessDelay(obj, minAngle, maxAngle, duration) {

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
            0, 6, 8, 10,
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

    const ySideNorm = -1.0;
    const shownBubbleY = range * Y_SIDE_WEIGHT * ySideNorm;

    // Bind the translation animation signal to the x-axis position signal of the plane
    obj.transform.x = shownBubbleX;
    //obj.transform.y = positionY;
    obj.transform.y = shownBubbleY;
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

function handleFoodFeeder(foodObjList, crushObjList, args) {

    // Start animation
    if (currentData.theme === THEME_NAME_LOOKUP_TABLE.meal) {

        startRamenFeeder();
        startNormalCrushFeeder();
    }
}

function startRamenFeeder() {

    // Todo: Fix intensive looping here

    // For object
    var ramenRoot = Scene.root.find("ramenRoot0");
    var ramen00Mesh = Scene.root.find("ramen_00_mesh");

    // Translate animation
    const RAMEN_MAX_OFFSET = -5.0;
    const RAMEN_DELTA_TIME = 600;
    const RAMEN_MASK_DELTA_TIME = 200;

    // --------------------------------------------------------------------------------
    // ramen effect

    // Load diffuse tex
    var url = CONFIG.BASE_TEX_URL + "theme_meal/ramen_512.png";
    var diffuseTex = Textures.get("ext_ramen_tex0");
    diffuseTex.url = url;

    // Apply to mat
    var mat = Materials.get("ramen_mat");
    mat.diffuse = diffuseTex;

    var maskMatList = [
        Materials.get("ramen_mask_mat0"), Materials.get("ramen_mask_mat1"), 
        Materials.get("ramen_mask_mat2"), Materials.get("ramen_mask_mat3"), 
        Materials.get("ramen_mask_mat4"), Materials.get("ramen_mask_mat5"), 
        //Materials.get("ramen_mask_mat6"), Materials.get("ramen_mask_mat7"), 
        //Materials.get("ramen_mask_mat8"), 
    ]

    // Apply diffuse tex
    for (var i=0; i<maskMatList.length; ++i)
        maskMatList[i].diffuse = diffuseTex;
    
    // Start anim
    const interval = { 
        durationMilliseconds: RAMEN_DELTA_TIME,
        loopCount: Infinity,
        mirror: false  
    };

    const driver = Animation.timeDriver(interval);
    const samp = Animation.samplers.linear(0, RAMEN_MAX_OFFSET);
    const anim = Animation.animate(driver, samp);

    ramenRoot.transform.z = anim;

    driver.start();

    driver.onAfterIteration().subscribe(function () {
       
        ramen00Mesh.material = maskMatList[0];
    });

    // Update mask
    ramen00Mesh.material = maskMatList[0];

    const maskTimer = Time.setInterval(updateMask, RAMEN_MASK_DELTA_TIME);

    function updateMask() {

        const zVal = ramenRoot.transform.z.pinLastValue();
        const ratio = zVal / RAMEN_MAX_OFFSET;
        const length = maskMatList.length;
        const index = Math.floor( length * ratio );

        ramen00Mesh.material = maskMatList[index];

        // To clear interval
        //Time.clearInterval(maskTimer);
    }
}

function startNormalCrushFeeder(crushObjList, args) {

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

// ********************************************************************************
// Keep this block at the last line of code
main()
// ********************************************************************************