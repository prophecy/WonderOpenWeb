
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
const FaceGestures = require('FaceGestures');
const IrisTracking = require("IrisTracking");

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
const facemesh0Meal = Scene.root.find("facemesh0_meal");

const howtoRect = Scene.root.find("howto_rect");
const howtoBgRect = Scene.root.find("howto_bg_rect");

//const takoDirectionalLight0 = Scene.root.find("tako_directional_ligh0");

const mealShopstick00mesh = Scene.root.find("shopstick00_mesh");
const mealShopstick01mesh = Scene.root.find("shopstick01_mesh");

const mealShopstick00_pivot = Scene.root.find("shopstick00_pivot");
const mealShopstick01_pivot = Scene.root.find("shopstick01_pivot");

// For sandwich
const newHand = Scene.root.find("new_hand");
const newHandMesh = Scene.root.find("new_hand_mesh");

// For crabstick
const newCrabBg = Scene.root.find("new_crab_bg");
const newCrabBgMesh = Scene.root.find("new_crab_bg_mesh");
const newCrabFg = Scene.root.find("new_crab_fg");
const newCrabFgMesh = Scene.root.find("new_crab_fg_mesh");
const newCrabLogo = Scene.root.find("new_crab_logo");
const newCrabLogoMesh = Scene.root.find("new_crab_logo_mesh");
const newRamen = Scene.root.find("new_ramen");
const newRamenMesh = Scene.root.find("new_ramen_mesh");

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
// RESOURCES for CRABSTICK

const laserBeamLeft = Scene.root.find("laser_beam_left");
const laserBeamLeftMesh = Scene.root.find("laser_beam_left_mesh");

const laserBeamRight = Scene.root.find("laser_beam_right");
const laserBeamRightMesh = Scene.root.find("laser_beam_right_mesh");

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
    meal: [ 
        "theme_meal/ramen_detail1.png", "theme_meal/ramen_detail2.png", 
        "theme_meal/ramen_detail3.png", "theme_meal/ramen_detail4.png", 
    ],
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
    gyoza_bubble_txt_00: "new_design/sample_takoyaki/copy.png",
    gyoza_bubble_txt_01: "new_design/sample_takoyaki/copy.png",
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
    sandwich_hand: "new_design/sample_sandwich/hand.png",

    // Crabstick sample
    crabstick_bubble_bg: "new_design/sample_crabstick/new_crab.png",
    crabstick_bubble_txt: "new_design/sample_takoyaki/copy.png",
    crabstick_prod: "new_design/sample_crabstick/crab_pack.png",
    crabstick_crab_bg: "new_design/sample_crabstick/handcrab1.png",
    crabstick_crab_fg: "new_design/sample_crabstick/handcrab1.2.png",
    crabstick_crab_logo: "new_design/sample_crabstick/handcrab_logo.png",

    // Meal sample
    meal_bubble_bg: "new_design/sample_meal/bb_ramen.png",
    meal_bubble_txt: "new_design/sample_takoyaki/copy.png",
    meal_prod: "new_design/sample_meal/ramenL.png",
    meal_ramen: "new_design/sample_meal/ramen_still.png",
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

    handleEyeOpeningState(0, 0, function() { onEyeOpened(0, 0); }, function() { onEyeClosed(0, 0); });
    handleEyeOpeningState(0, 1, function() { onEyeOpened(0, 1); }, function() { onEyeClosed(0, 1); });    

    handleFaceTrackingState(0, function() { onFaceTracked(0); }, function() { onFaceUntracked(0); });
    handleFaceTrackingState(1, function() { onFaceTracked(1); }, function() { onFaceUntracked(1); });

    handleMouthOpeningState(
        0, 
        MOUTH_OPENNESS_MIN_THRESHOLD, MOUTH_CLOSSNESS_MAX_THRESHOLD, 
        onFace0MouthOpen, onFace0MouthClose);

    handleFoodFeeder(crushPoolList0);
}

function startGame() {

    hideHowtoWithDelay();
    
    //showGyoza();
    //showSandwich();
    //showCrabstick();
    showMeal();
    //showTakoyaki();
}

const HIDE_HOWTO_DELAY = 1500;

function hideHowtoWithDelay() {

    const timer = Time.setInterval(hideHowto, HIDE_HOWTO_DELAY);

    function hideHowto() {

        howtoRect.hidden = true;
        howtoBgRect.hidden = true;

        // clear interval
        Time.clearInterval(timer);
    }
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
        showCrabstick();
    else if (curTheme === THEME_NAME_LOOKUP_TABLE.crabstick)
        showMeal();
    else if (curTheme === THEME_NAME_LOOKUP_TABLE.meal)
        showGyoza();
}

function hideAllThemes() {

    newSmokeRoot.hidden = true;
    newTakoyakiRoot.hidden = true;
    newGyozaRoot.hidden = true;    
    facemesh0.hidden = true;
    facemesh0Tako.hidden = true;
    sandwichRoot.hidden = true;
    headGyozaRoot.hidden = true;
    bodySegmentationRect.hidden = true;
    //takoDirectionalLight0.hidden = true;
    laserBeamLeft.hidden = true;
    laserBeamRight.hidden = true;
    newGyozaLeft.hidden = true;
    newGyozaRight.hidden = true;
    facemesh0Meal.hidden = true;
    newHand.hidden = true;
    newCrabBg.hidden = true;
    newCrabFg.hidden = true;
    newCrabLogo.hidden = true;
    newRamen.hidden = true;
}

const QUOTE_PROD_POSITION = {

    gyoza: {
        new_prod_small: [30, 0, 10],
        new_prod_big: [30, 0, 10],
        new_quote_bg: [-8.39964, 0, 10],
        new_quote_text: [-8.39964, 0, 10],
    },
    sandwich: {
        new_prod_small: [-25, 0, 27],
        new_prod_big: [-25, 0, 27],
        new_quote_bg: [6, 0, 10],
        new_quote_text: [6, 0, 10],
        hand: [-30, 0, 36],
    },
    crabstick: {
        new_prod_small: [-25, 0, 27],
        new_prod_big: [-25, 0, 27],
        new_quote_bg: [0, 0, 5],
        new_quote_text: [0, 0, 5],
        new_crab_bg: [-12, 0, 40],
        new_crab_fg: [-12, 0, 40],
        new_crab_logo: [26, 0, 40],
    },
    takoyaki: {
        new_prod_small: [30, 0, 10],
        new_prod_big: [30, 0, 10],
        new_quote_bg: [-8.39964, 0, 10],
        new_quote_text: [-8.39964, 0, 10],
    },
    meal: {
        new_prod_small: [-26, 0, 29],
        new_prod_big: [-26, 0, 29],
        new_quote_bg: [6, 0, 5],
        new_quote_text: [6, 0, 5],
        new_ramen: [-35, 0, 12],
    },
};

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
    //takoDirectionalLight0.hidden = false;

    loadNewDesignTakoyaki();
}

function showCrabstick() {

    curTheme = THEME_NAME_LOOKUP_TABLE.crabstick;
    facemesh0.hidden = false;

    facemesh0.material = facePaintInvisibleMat;

    newCrabBg.hidden = false;
    newCrabFg.hidden = false;
    newCrabLogo.hidden = false;

    loadNewDesignCrabstick();
}

function showSandwich() {

    curTheme = THEME_NAME_LOOKUP_TABLE.sandwich;

    facemesh0.hidden = false;
    sandwichRoot.hidden = false;
    bodySegmentationRect.hidden = false;
    newHand.hidden = false;

    facemesh0.material = facePaintSandwichMat;

    loadNewDesignSandwich();
}

function showMeal() {

    curTheme = THEME_NAME_LOOKUP_TABLE.meal;

    facemesh0.hidden = false;
    facemesh0Meal.hidden = false;
    newRamen.hidden = false;

    loadNewDesignMeal();
}

function initSwirlSandwich(swirl, sandwichList, sandwichMeshList, isFront) {

    // Setup object transform
    const SWIRL_RADIOUS = 12.0;
    const SWIRL_DURATION = 6000;

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
        applySwirlMovement(obj, 0, 1, 0, SWIRL_DURATION);
    }

    applySwirlMovement(swirl, 0, 1, 0, SWIRL_DURATION);
}

var gyozaSeqMatList = [];

function setupQuoteProdPosition(positionData) {

    newQuoteBg.transform.x = positionData.new_quote_bg[0];
    newQuoteBg.transform.y = positionData.new_quote_bg[1];
    newQuoteBg.transform.z = positionData.new_quote_bg[2];

    newQuoteTxt.transform.x = positionData.new_quote_text[0];
    newQuoteTxt.transform.y = positionData.new_quote_text[1];
    newQuoteTxt.transform.z = positionData.new_quote_text[2];

    newProdBig.transform.x = positionData.new_prod_big[0];
    newProdBig.transform.y = positionData.new_prod_big[1];
    newProdBig.transform.z = positionData.new_prod_big[2];

    newProdSmall.transform.x = positionData.new_prod_small[0];
    newProdSmall.transform.y = positionData.new_prod_small[1];
    newProdSmall.transform.z = positionData.new_prod_small[2];
}

function loadNewDesignGyoza() {

    var curResIndex = 0;

    setupMaterial(newQuoteBgMesh, curResIndex++, NEW_DESIGN_URL_TABLE.gyoza_bubble_bg);
    setupMaterial(newQuoteTxtMesh, curResIndex++, NEW_DESIGN_URL_TABLE.gyoza_bubble_txt_00);
    setupMaterial(newProdBigMesh, curResIndex++, NEW_DESIGN_URL_TABLE.gyoza_prod_big);
    setupMaterial(newProdSmallMesh, curResIndex++, NEW_DESIGN_URL_TABLE.gyoza_prod_big);

    // Setup position
    setupQuoteProdPosition(QUOTE_PROD_POSITION.gyoza);
    
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

    // Setup position
    setupQuoteProdPosition(QUOTE_PROD_POSITION.takoyaki);
    
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

    setupMaterial(newHandMesh, curResIndex++, NEW_DESIGN_URL_TABLE.sandwich_hand);

    // Setup position
    setupQuoteProdPosition(QUOTE_PROD_POSITION.sandwich);

    newHand.transform.x = QUOTE_PROD_POSITION.sandwich.hand[0];
    newHand.transform.y = QUOTE_PROD_POSITION.sandwich.hand[1];
    newHand.transform.z = QUOTE_PROD_POSITION.sandwich.hand[2];
    
    function setupMaterial(mesh, index, texName) {

        mesh.material = getMaterialWithDiffuseByUrl(
            NEW_DESIGN_MAT_LIST[index], 
            NEW_DESIGN_TEX_LIST[index], 
            BASE_URL + texName);    
    }
}

function loadNewDesignCrabstick() {

    var curResIndex = 0;

    setupMaterial(newQuoteBgMesh, curResIndex++, NEW_DESIGN_URL_TABLE.crabstick_bubble_bg);
    setupMaterial(newQuoteTxtMesh, curResIndex++, NEW_DESIGN_URL_TABLE.crabstick_bubble_txt);
    setupMaterial(newProdBigMesh, curResIndex++, NEW_DESIGN_URL_TABLE.crabstick_prod);
    setupMaterial(newProdSmallMesh, curResIndex++, NEW_DESIGN_URL_TABLE.crabstick_prod);

    setupMaterial(newCrabBgMesh, curResIndex++, NEW_DESIGN_URL_TABLE.crabstick_crab_bg);
    setupMaterial(newCrabFgMesh, curResIndex++, NEW_DESIGN_URL_TABLE.crabstick_crab_fg);
    setupMaterial(newCrabLogoMesh, curResIndex++, NEW_DESIGN_URL_TABLE.crabstick_crab_logo);

    newCrabBg.transform.x = QUOTE_PROD_POSITION.crabstick.new_crab_bg[0];
    newCrabBg.transform.y = QUOTE_PROD_POSITION.crabstick.new_crab_bg[1];
    newCrabBg.transform.z = QUOTE_PROD_POSITION.crabstick.new_crab_bg[2];
    
    newCrabFg.transform.x = QUOTE_PROD_POSITION.crabstick.new_crab_fg[0];
    newCrabFg.transform.y = QUOTE_PROD_POSITION.crabstick.new_crab_fg[1];
    newCrabFg.transform.z = QUOTE_PROD_POSITION.crabstick.new_crab_fg[2];

    newCrabLogo.transform.x = QUOTE_PROD_POSITION.crabstick.new_crab_logo[0];
    newCrabLogo.transform.y = QUOTE_PROD_POSITION.crabstick.new_crab_logo[1];
    newCrabLogo.transform.z = QUOTE_PROD_POSITION.crabstick.new_crab_logo[2];

    // Setup position
    setupQuoteProdPosition(QUOTE_PROD_POSITION.crabstick);
    
    function setupMaterial(mesh, index, texName) {

        mesh.material = getMaterialWithDiffuseByUrl(
            NEW_DESIGN_MAT_LIST[index], 
            NEW_DESIGN_TEX_LIST[index], 
            BASE_URL + texName);    
    }
}

function loadNewDesignMeal() {

    var curResIndex = 0;

    setupMaterial(newQuoteBgMesh, curResIndex++, NEW_DESIGN_URL_TABLE.meal_bubble_bg);
    setupMaterial(newQuoteTxtMesh, curResIndex++, NEW_DESIGN_URL_TABLE.meal_bubble_txt);
    setupMaterial(newProdBigMesh, curResIndex++, NEW_DESIGN_URL_TABLE.meal_prod);
    setupMaterial(newProdSmallMesh, curResIndex++, NEW_DESIGN_URL_TABLE.meal_prod);

    setupMaterial(newRamenMesh, curResIndex++, NEW_DESIGN_URL_TABLE.meal_ramen);

    newRamen.transform.x = QUOTE_PROD_POSITION.meal.new_ramen[0];
    newRamen.transform.y = QUOTE_PROD_POSITION.meal.new_ramen[1];
    newRamen.transform.z = QUOTE_PROD_POSITION.meal.new_ramen[2];

    // Setup position
    setupQuoteProdPosition(QUOTE_PROD_POSITION.meal);
    
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

var hasStarted = false;

function onFaceTracked(faceIndex) {

    if (!hasStarted) {

        startGame();
        hasStarted = true;
    }

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

    // Show the current theme
    if (curTheme === THEME_NAME_LOOKUP_TABLE.gyoza)
        showGyoza();
    else if (curTheme === THEME_NAME_LOOKUP_TABLE.sandwich)
        showSandwich();
    else if (curTheme === THEME_NAME_LOOKUP_TABLE.crabstick)
        showCrabstick();
    else if (curTheme === THEME_NAME_LOOKUP_TABLE.takoyaki)
        showTakoyaki();
    else if (curTheme === THEME_NAME_LOOKUP_TABLE.meal)
        showMeal();
}

function onFaceUntracked(faceIndex) {

    if (faceIndex != 0)
        return;

    hideNewQuote();
    hideNewQuoteText();
    hideNewProd();
    hideAllThemes();
}

function onEyeOpened(faceIndex, eyeIndex) {

    //Diagnostics.log("On eye open! eyeIndex: " + eyeIndex);

    if (curTheme !== THEME_NAME_LOOKUP_TABLE.crabstick)
        return;

    var face = FaceTracking.face(faceIndex);

    if (eyeIndex == 0) {

        laserBeamLeft.hidden = false;

        // Iris ref
        // https://developers.facebook.com/docs/ar-studio/tracking-people-and-places/faces/Iris-tracking/
        var eyeballInfo = IrisTracking.leftEyeball(face);

        laserBeamLeft.transform.position = eyeballInfo.iris;
        //laserBeamLeft.transform.rotation = eyeballInfo.rotation;
    }
    else if (eyeIndex == 1) {

        laserBeamRight.hidden = false;

        var eyeballInfo = IrisTracking.rightEyeball(face);

        laserBeamRight.transform.position = eyeballInfo.iris;
        //laserBeamRight.transform.rotation = eyeballInfo.rotation;
    }
}

function onEyeClosed(faceIndex, eyeIndex) {

    //Diagnostics.log("On eye close! eyeIndex: " + eyeIndex);
    
    if (curTheme !== THEME_NAME_LOOKUP_TABLE.crabstick)
        return;

    if (eyeIndex == 0)
        laserBeamLeft.hidden = true;
    else if (eyeIndex == 1)
        laserBeamRight.hidden = true;
}

// --------------------------------------------------------------------------------
// @ OPEN MOUTH

newGyozaRoot.hidden = true;

function onFace0MouthOpen() {

    showNewProdBig();

    if (curTheme === THEME_NAME_LOOKUP_TABLE.gyoza) {

        newGyozaRoot.hidden = false;
        newGyozaLeft.hidden = false;
        newGyozaRight.hidden = false;
    }
    else if (curTheme === THEME_NAME_LOOKUP_TABLE.takoyaki) {

        //newSmokeRoot.hidden = false;
    }
    else if (curTheme == THEME_NAME_LOOKUP_TABLE.meal) {

        var mouth = FaceTracking.face(0).mouth;

        foodFeederRoot0.hidden = false;
        newRamen.hidden = true;

        foodFeederRoot0.transform.x = mouth.center.x;
        foodFeederRoot0.transform.y = mouth.center.y;
        foodFeederRoot0.transform.z = mouth.center.z;
    }   
}

function onFace0MouthClose() {

    showNewProdSmall();

    newGyozaRoot.hidden = true;
    newGyozaLeft.hidden = false;
    newGyozaRight.hidden = false;

    //newSmokeRoot.hidden = true;

    foodFeederRoot0.hidden = true;

    if (curTheme == THEME_NAME_LOOKUP_TABLE.meal) {

        newRamen.hidden = false;
    }
}

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

// Check eye closing/opening and blink from
// Reference: https://developers.facebook.com/docs/ar-studio/reference/classes/facegesturesmodule/
function handleEyeOpeningState(faceIndex, eyeIndex, openCallback, closeCallback) {

    var face = FaceTracking.face(faceIndex);

    var hasEyeClosed = undefined;

    // Get from closeness callback
    if (eyeIndex == 0)
        hasEyeClosed = FaceGestures.hasLeftEyeClosed(face);
    else if (eyeIndex == 1)
        hasEyeClosed = FaceGestures.hasRightEyeClosed(face);

    // Monitor from closeness callback
    hasEyeClosed.monitor().subscribe(function(val) {

        if (val.newValue == true)
            closeCallback(faceIndex, eyeIndex);
        else
            openCallback(faceIndex, eyeIndex);
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

function handleFoodFeeder(crushObjList) {

    // Setup mat
    setupCrushMat(CRUSH_TEX_LOOKUP_TABLE.meal);
    /*
    // Setup shopstick
    var url = CONFIG.BASE_TEX_URL + "theme_meal/chopsticks.png"
    var tex = Textures.get(FOOD_TEX_LIST[0]);
    var mat = Materials.get(FOOD_MAT_LIST[0]);

    tex.url = url;
    mat.diffuse = tex;
    */

    mealShopstick00mesh.material = Materials.get("new_chopstick_mat");
    mealShopstick01mesh.material = Materials.get("new_chopstick_mat");

    // Animate shopsticks
    applyShopsticksBound(mealShopstick00_pivot, -10, 20, 600);
    applyShopsticksBound(mealShopstick01_pivot, 0, 30, 600);

    function setupCrushMat(texPathList) {
        setupMatTex(texPathList, CRUSH_MAT_LIST, CRUSH_TEX_LIST, crushPoolMeshList0);
    }

    function setupMatTex(texPathList, matList, texList, objList) {

        var curMatIndex = 0; // mat index MUST be = tex index
        var curTexUrlIndex = 0;

        for (var i=0; i<objList.length; ++i) {

            // Get tex name
            var texName = texPathList[curTexUrlIndex];

            // Move to the next name index
            if (++curTexUrlIndex >= texPathList.length)
                curTexUrlIndex = 0;

            // Get mat & text
            var mat = Materials.get(matList[curMatIndex]);
            var tex = Textures.get(texList[curMatIndex]);

            // Move to the next mat index
            if (++curMatIndex >= matList.length)
                curMatIndex = 0;

            // Set tex URL
            var url = CONFIG.BASE_TEX_URL + texName;
            //Diagnostics.log("url: " + url);
            tex.url = url
            
            // Apply tex to mat
            mat.diffuse = tex;

            // Get obj
            var obj = objList[i];

            // Apply mat to obj
            obj.material = mat;
        }
    }

    // Setup parameters
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

    startRamenFeeder();
    startNormalCrushFeeder(crushObjList, foodFeederArgs);
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