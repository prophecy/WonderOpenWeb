
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
const WorldTransform = require('WorldTransform');

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

// Food feeder for player #0

var foodFeederRoot0 = Scene.root.find('foodFeederRoot0');

var testyPool0 = Scene.root.find("testyPool0");
var crushPool0 = Scene.root.find("crushPool0");
var ramenPool0 = Scene.root.find("ramenPool0");

var foodPoolList0 = [];
for (var i=0; i<32; ++i)
    foodPoolList0.push(Scene.root.find('testy0' + i));

var foodPoolMeshList0 = [];
for (var i=0; i<32; ++i)
    foodPoolMeshList0.push(Scene.root.find('testy0' + i + "_mesh"));

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
const facemesh1 = Scene.root.find("facemesh1");

// Product

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

const gyozaFloat = Scene.root.find('gyoza_float');

const gyozaFloatMesh = Scene.root.find('gyoza_float_mesh');
const gyozaLogoMesh = Scene.root.find('gyoza_logo_mesh');

const gyozaFrontTex0 = 'gyoza_front_tex0';
const gyozaFrontTex1 = 'gyoza_front_tex1';

const headGyozaRoot = Scene.root.find('head_gyoza_root');
const headGyozaRoot1 = Scene.root.find('head_gyoza_root1');

const headHachimakiMesh = Scene.root.find("head_hachimaki_mesh");
const headHachimakiTex = "head_hachimaki";

const headHachimaki1Mesh = Scene.root.find("head_hachimaki1_mesh");

const facePaintGyozaMat = Materials.get("face_paint_gyoza_mat");

const facePaintInvisibleMat = Materials.get("face_paint_invisible_mat");

const frontLogoGyoza = Scene.root.find("front_logo_gyoza");

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

// --------------------------------------------------------------------------------
// RESOURCES for CRABSTICK THEME

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

// --------------------------------------------------------------------------------
// RESOURCES for RAMEN THEME

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

const FRONT_TEX_LIST = [
    "ext_front_tex0", "ext_front_tex1", "ext_front_tex2", "ext_front_tex3", 
    "ext_front_tex4", "ext_front_tex5", "ext_front_tex6", "ext_front_tex7", 
];

const HEAD_MAT_LIST = [
    "head_mat0", "head_mat1", "head_mat2", "head_mat3", 
    "head_mat4",
];

const FOOD_MAT_LIST = [
    "food_mat0", "food_mat1", "food_mat2", "food_mat3",
];

const FOOD_TEX_LIST = [
    "ext_food_tex0", "ext_food_tex1", "ext_food_tex2", "ext_food_tex3",
]

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
/*
TouchGestures.onLongPress().subscribe(function (gesture) {

    var isHidden = dbgCanvas.hidden.pinLastValue();
    dbgCanvas.hidden = !isHidden;
});
*/

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

    var prodKey = currentData.product;
    var prodTex = undefined;

    if (!(prodKey in PROD_TEX_LOOKUP_TABLE)) {

        Diagnostics.log("Texture name not found with key: " + prodKey);

        if (CONFIG.ENV === ENV_DEV)
            prodTex = Textures.get("not_found_tex");
        else if (CONFIG.ENV === ENV_PROD)
            prodTex = Textures.get("transparent");
    }
    else {

        // Get product texture
        var texName = PROD_TEX_LOOKUP_TABLE[prodKey];

        Diagnostics.log("Got texture name: " + texName);   

        prodTex = Textures.get("ext_prod_tex0");
        prodTex.url = CONFIG.BASE_TEX_URL + texName;
    }

    // Apply texture to product material
    var prodMat = Materials.get(PROD_MAT_NAME);

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
    else if (themeName.localeCompare(THEME_NAME_LOOKUP_TABLE.crabstick) == 0)
        showCrabstick();
    else if (themeName.localeCompare(THEME_NAME_LOOKUP_TABLE.meal) == 0)
        showMeal();
    else
        Diagnostics.log("Theme key not found with value: '" + themeName + "'");

    function showGyoza() {

        // Apply mat for Gyoza theme
        var meshList = [
            gyozaFloatMesh, frontLogoGyoza,
        ]

        var texPathList = [
            "theme_gyoza/front_00.png", "theme_gyoza/front_01.png",
        ]

        for (var i = 0; i<meshList.length; ++i) {

            var url = CONFIG.BASE_TEX_URL + texPathList[i];

            var tex = Textures.get(FRONT_TEX_LIST[i]);
            tex.url = url;

            meshList[i].material = getMaterialWithDiffuse(FRONT_MAT_LIST[i], FRONT_TEX_LIST[i]);
        }

        frontGyoza.hidden = false;
    }

    function showSandwich() {

        // Apply mat for sandwich theme
        var meshList = [
            frontLogoSandwich, sandwichFrontCrabstickMesh, sandwichFrontMesh, sandwichFrontEggMesh,
            sandwichFrontHam0Mesh, sandwichFrontHam1Mesh,
        ]

        var texPathList = [
            "theme_sandwich/sw7.png", "theme_sandwich/sw4.png", "theme_sandwich/sw2.png", "theme_sandwich/sw3.png",
            "theme_sandwich/sw8.png", "theme_sandwich/sw8.png"
        ]

        for (var i = 0; i<meshList.length; ++i) {

            var url = CONFIG.BASE_TEX_URL + texPathList[i];

            var tex = Textures.get(FRONT_TEX_LIST[i]);
            tex.url = url;

            meshList[i].material = getMaterialWithDiffuse(FRONT_MAT_LIST[i], FRONT_TEX_LIST[i]);
        }

        frontSandwich.hidden = false;
    }

    function showTakoyaki() {

        // Apply mat for takoyami theme
        var meshList = [
            takoyakiFrontSnack0Mesh, takoyakiFrontSnack1Mesh, takoyakiFrontTakoMesh, frontLogoTakoyaki,
        ]

        var texPathList = [
            "theme_tako/ta12.png", "theme_tako/ta12.png", "theme_tako/ta3_2.png", "theme_tako/logo_tako.png",
        ]

        for (var i = 0; i<meshList.length; ++i) {

            var url = CONFIG.BASE_TEX_URL + texPathList[i];

            var tex = Textures.get(FRONT_TEX_LIST[i]);
            tex.url = url;

            meshList[i].material = getMaterialWithDiffuse(FRONT_MAT_LIST[i], FRONT_TEX_LIST[i]);
        }

        frontTakoyaki.hidden = false;
    }

    function showCrabstick() {

        // Apply mat for crabstick theme
        var meshList = [
            crabstickFrontBareCrabMesh, crabstickFrontHoldingCrabMesh, frontLogoCrabstick,
        ]

        var texPathList = [
            "theme_crabstick/crab_12.png", "theme_crabstick/crab_10_L.png", "theme_crabstick/crab_10.png",
        ]

        for (var i = 0; i<meshList.length; ++i) {

            var url = CONFIG.BASE_TEX_URL + texPathList[i];

            var tex = Textures.get(FRONT_TEX_LIST[i]);
            tex.url = url;

            meshList[i].material = getMaterialWithDiffuse(FRONT_MAT_LIST[i], FRONT_TEX_LIST[i]);
        }

        frontCrabstick.hidden = false;
    }

    function showMeal() {

        // Apply mat for meal theme
        var meshList = [
            mealFrontFlagMesh, frontLogoRamen0, frontLogoRamen1,
        ]

        var texPathList = [
            "theme_meal/ramen3.png", "theme_meal/ramen1.png", "theme_meal/ramen_still.png",
        ]

        for (var i = 0; i<meshList.length; ++i) {

            var url = CONFIG.BASE_TEX_URL + texPathList[i];

            var tex = Textures.get(FRONT_TEX_LIST[i]);
            tex.url = url;

            meshList[i].material = getMaterialWithDiffuse(FRONT_MAT_LIST[i], FRONT_TEX_LIST[i]);
        }

        frontMealRoot.hidden = false;
    }
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
        headHachimaki1Mesh.material = mat;

        headGyozaRoot.hidden = false;
        headGyozaRoot1.hidden = false;

        // Apply face paint mat and tex
        facemesh0.material = facePaintGyozaMat;
        facemesh1.material = facePaintGyozaMat;
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
        //facemesh0.material = facePaintInvisibleMat;
        //facemesh1.material = facePaintInvisibleMat;
    }
}

foodFeederRoot0.hidden = true;

function initFoodFeeder() {
    
    // Setup materials & textures
    var themeName = currentData.theme;

    if (themeName.localeCompare(THEME_NAME_LOOKUP_TABLE.gyoza) == 0)
        setupGyozaFoodMat();
    else if (themeName.localeCompare(THEME_NAME_LOOKUP_TABLE.sandwich) == 0)
        setupSandwichFoodMat();
    else if (themeName.localeCompare(THEME_NAME_LOOKUP_TABLE.takoyaki) == 0)
        setupTakoyakiFoodMat();
    else if (themeName.localeCompare(THEME_NAME_LOOKUP_TABLE.crabstick) == 0)
        setupCrabstickFoodMat();
    else if (themeName.localeCompare(THEME_NAME_LOOKUP_TABLE.meal) == 0)
        setupMealFoodMat();
    else
        Diagnostics.log("Theme key not found with value: '" + themeName + "'");
    
    function setupGyozaFoodMat() {

        ramenPool0.hidden = true;
        setupFoodMat(FOOD_TEX_LOOKUP_TABLE.gyoza);
        setupCrushMat(CRUSH_TEX_LOOKUP_TABLE.gyoza);
    }

    function setupSandwichFoodMat() {

        ramenPool0.hidden = true;
        setupFoodMat(FOOD_TEX_LOOKUP_TABLE.sandwich);
        setupCrushMat(CRUSH_TEX_LOOKUP_TABLE.sandwich);
    }

    function setupCrabstickFoodMat() {

        ramenPool0.hidden = true;
        setupFoodMat(FOOD_TEX_LOOKUP_TABLE.crabstick);
        setupCrushMat(CRUSH_TEX_LOOKUP_TABLE.crabstick);
    }

    function setupTakoyakiFoodMat() {

        ramenPool0.hidden = true;
        setupFoodMat(FOOD_TEX_LOOKUP_TABLE.takoyaki);
        setupCrushMat(CRUSH_TEX_LOOKUP_TABLE.takoyaki);
    }

    function setupMealFoodMat() {

        testyPool0.hidden = true;
        crushPool0.hidden = true;

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
    }

    function setupFoodMat(texPathList) {
        setupMatTex(texPathList, FOOD_MAT_LIST, FOOD_TEX_LIST, foodPoolMeshList0);
    }

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

    // Handle object
    handleFoodFeeder(foodPoolList0, crushPoolList0, foodFeederArgs);
    handleFoodFeeder(foodPoolList1, crushPoolList1, foodFeederArgs);
}

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

    // Show only ramen
    currentData.theme = THEME_NAME_LOOKUP_TABLE.meal;
    currentData.face = FACE_NAME_LOOKUP_TABLE.meal;
    currentData.product = PROD_TEX_LOOKUP_TABLE.meal_kraphrao;

    //initProduct();
    //initFrontFrame();
    //initHead();
    initFoodFeeder();
});

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
applyBalloonMovement(gyozaFloat, 0.6, 0.4, 0.2, 1500, -3000, 4500);
applyRotationBounce(prodPlane0, 50, 20, 1800); // The small one
applyRotationBounce(prodPlane1, 0, 50, 1600); // The big one
applyRotationBounce(prodPlane2, 50, 20, 2000); // The big one

applyParalaxMovement(undefined, prodRoot, 0.1, 0.1);

// --------------------------------------------------------------------------------
// @ FACE DETECTED

// Bubble transformations
const X_SIDE_WEIGHT = 0.14;
const Y_SIDE_WEIGHT = 0.15;
const BUBBLE_POSITION_Y = -8.8;
const TARGET_BUBBLE_SCALE = 0.0028;

// Bubble list mgr vars
var currentBibbleIndex = 0;
const BUBBLE_SIZE = bubbleList0.length;
var isBubbleVisible = false;

// Hide all bubbles
function hideAllBubbles(bubbleList) {
    for (var i=0; i<bubbleList.length; ++i)
        bubbleList[i].hidden = true;
} 
    
hideAllBubbles(bubbleList0);
hideAllBubbles(bubbleList1);
    
function onFaceTracked(faceIndex) {

    if (faceIndex != 0)
        return;

    if (!isBubbleVisible) {

        var curBubble = bubbleList0[currentBibbleIndex];
        showBubble(curBubble, facePoint0, X_SIDE_WEIGHT, BUBBLE_POSITION_Y, TARGET_BUBBLE_SCALE, true);    
        isBubbleVisible = true;
    }
}

function onFaceUntracked(faceIndex) {

    if (faceIndex != 0)
        return;

    var curBubble = bubbleList0[currentBibbleIndex];
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

    // Manipulate ramen transform here

    foodFeederRoot0.hidden = false;

    // Set logic to specific theme
    if (currentData.theme == THEME_NAME_LOOKUP_TABLE.meal) {

        mealFrontStillRamenMesh.hidden = true;
        frontLogoRamen1.hidden = true;
    }
}

function onFace0MouthClose() {

    //Diagnostics.log("onFaceMouthClose");

    foodFeederRoot0.hidden = true;

    // Set logic to specific theme
    if (currentData.theme == THEME_NAME_LOOKUP_TABLE.meal) {

        mealFrontStillRamenMesh.hidden = false;
        frontLogoRamen1.hidden = false;
    }
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
    }
    else {

        /* // Use food effect V1
        var testyPoolContainer = Scene.root.find("testyPoolContainer");
        testyPoolContainer.transform.x = 0;
        testyPoolContainer.transform.y = 0;
        testyPoolContainer.transform.z = 0;
        testyPoolContainer.transform.rotationX = 0;
        testyPoolContainer.transform.rotationY = 0;
        testyPoolContainer.transform.rotationZ = 0;
        testyPool0.transform.x = 0;
        testyPool0.transform.y = 0;
        testyPool0.transform.z = 0;
        testyPool0.transform.rotationX = 0;
        testyPool0.transform.rotationY = 0;
        testyPool0.transform.rotationZ = 0;
        startNormalFoodFeeder(foodObjList, args);
        */

        startFoodFeederV2(foodObjList, args);
        startNormalCrushFeeder(crushObjList, args);
    }
}

function startFoodFeederV2(foodObjList, args) {

    var RADIUS = 120;
    var VARIANT = 3;

    // This line is generated by my code
    // https://github.com/prophecy/JupyterTreasure/blob/master/ParticleAndSpace/rand_space_test.ipynb
    var positionDataList = [[0.5, 0.0, 0.33334982101141, -3.141592653589793], [0.4903926402016152, 0.09754516100806412, 0.46842710660150877, -2.945243112740431], [0.46193976625564337, 0.1913417161825449, 0.8839066245390096, -2.748893571891069], [0.4157348061512726, 0.2777851165098011, 0.12137837693082998, -2.552544031041707], [0.3535533905932738, 0.3535533905932738, 0.32717713553909844, -2.356194490192345], [0.27778511650980114, 0.4157348061512726, 0.8182034317356615, -2.1598449493429825], [0.19134171618254492, 0.46193976625564337, 0.536854630610528, -1.9634954084936207], [0.09754516100806417, 0.4903926402016152, 0.2844606399775256, -1.7671458676442586], [3.061616997868383e-17, 0.5, 0.6465451404809336, -1.5707963267948966], [-0.0975451610080641, 0.4903926402016152, 0.17338180021830063, -1.3744467859455345], [-0.19134171618254486, 0.46193976625564337, 0.010980740051857452, -1.1780972450961724], [-0.277785116509801, 0.4157348061512727, 0.9460418690482676, -0.9817477042468106], [-0.35355339059327373, 0.3535533905932738, 0.651944823493125, -0.7853981633974483], [-0.4157348061512727, 0.2777851165098011, 0.7002338474529368, -0.589048622548086], [-0.46193976625564337, 0.19134171618254495, 0.19016005328993268, -0.39269908169872414], [-0.4903926402016152, 0.0975451610080643, 0.17562483870307088, -0.1963495408493623], [-0.5, 6.123233995736766e-17, 0.5016377600353438, 0.0], [-0.4903926402016152, -0.09754516100806418, 0.795380246080834, 0.1963495408493623], [-0.4619397662556434, -0.19134171618254484, 0.39687383843712876, 0.39269908169872414], [-0.41573480615127273, -0.277785116509801, 0.20302102091906538, 0.589048622548086], [-0.35355339059327384, -0.35355339059327373, 0.9334190292976969, 0.7853981633974483], [-0.2777851165098011, -0.4157348061512726, 0.7820873692113656, 0.9817477042468106], [-0.19134171618254517, -0.46193976625564326, 0.5756959232309105, 1.178097245096172], [-0.09754516100806433, -0.49039264020161516, 0.6274769677975915, 1.3744467859455343], [-9.184850993605148e-17, -0.5, 0.6459109815125021, 1.5707963267948966], [0.09754516100806415, -0.4903926402016152, 0.5152847505661805, 1.7671458676442588], [0.191341716182545, -0.4619397662556433, 0.06653534997140886, 1.9634954084936211], [0.2777851165098009, -0.41573480615127273, 0.9835949086218772, 2.1598449493429825], [0.3535533905932737, -0.35355339059327384, 0.9052709690794294, 2.356194490192345], [0.4157348061512726, -0.2777851165098011, 0.7806837457248509, 2.552544031041707], [0.46193976625564326, -0.1913417161825452, 0.20997480564056825, 2.7488935718910685], [0.49039264020161516, -0.09754516100806436, 0.502660261699298, 2.945243112740431]];

    // Setup food positioning
    for (var i=0; i<foodObjList.length; ++i) {

        if (i >= positionDataList.length)
            break;

        var px = positionDataList[i][2];
        var py = positionDataList[i][1];
        var pz = positionDataList[i][0];
        
        foodObjList[i].transform.x = (px * VARIANT) - (VARIANT * 0.5);
        foodObjList[i].transform.y = py * RADIUS;
        foodObjList[i].transform.z = pz * RADIUS;
    }

    applyFoodSpinMovement(testyPool0, 3000);

    for (var i=0; i<foodObjList.length; ++i) {

        var rad = positionDataList[i][3];

        var signal0 = testyPool0.transform.rotationX.sub(rad).lt(Reactive.val(0.5 * Math.PI));
        var signal1 = testyPool0.transform.rotationX.sub(rad).gt(Reactive.val(-0.5 * Math.PI));
        var signal3 = testyPool0.transform.rotationX.sub(rad).gt(Reactive.val(1.5 * Math.PI));        
        var signalOut = signal0.and(signal1).or(signal3);

        foodObjList[i].hidden = signalOut.not();
    }

    // Rotate food objs
    for (var i=0; i<foodObjList.length; ++i) {

        var rad = positionDataList[i][3];
        foodObjList[i].transform.rotationX = (Math.PI * 0.5) - rad;
    }

    Diagnostics.watch("rx: ", testyPool0.transform.rotationX);

    var rad = positionDataList[10][3];
    Diagnostics.watch("rx2: ", testyPool0.transform.rotationX.sub(rad).gt(Reactive.val(Math.PI)));
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

function startNormalFoodFeeder(foodObjList, args) {

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


