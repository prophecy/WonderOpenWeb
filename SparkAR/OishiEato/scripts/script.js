
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
    GET_ASSET_LIST_URL: BASE_URL + "getAssetList.aspx",
    POST_STAT_URL: BASE_URL + "arstat.aspx",
    BASE_TEX_URL: BASE_URL,
    BASE_BUBBLE_URL: "new_design/sample_quote/",
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
const Random = require('Random');

// --------------------------------------------------------------------------------
// SCENE DATABASE

// Food feeder for player #0
var foodFeederRoot0 = Scene.root.find('foodFeederRoot0');
//var testyPool0 = Scene.root.find("testyPool0");
//var testyPool01 = Scene.root.find("testyPool01");

//var foodPoolList0 = [];
//for (var i=0; i<32; ++i)
//    foodPoolList0.push(Scene.root.find('testy0' + i));

//var foodPoolMeshList0 = [];
//for (var i=0; i<32; ++i)
//    foodPoolMeshList0.push(Scene.root.find('testy0' + i + "_mesh"));

//var foodPoolList01 = [];
//for (var i=0; i<32; ++i)
//    foodPoolList01.push(Scene.root.find('testy001' + i));

//var foodPoolMeshList01 = [];
//for (var i=0; i<32; ++i)
//    foodPoolMeshList01.push(Scene.root.find('testy001' + i + "_mesh"));    

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

// Debug
const dbgTxtTheme = Scene.root.find('dbg_txt_theme');
const dbgTxtFace = Scene.root.find('dbg_txt_face')
const dbgTxtProd = Scene.root.find('dbg_txt_prod');
const dbgCanvas = Scene.root.find('debugPanelCanvas');

// --------------------------------------------------------------------------------
// RESOURCES for GYOZA THEME

const headGyozaRoot = Scene.root.find('head_gyoza_root');
const headGyozaRoot1 = Scene.root.find('head_gyoza_root1');


// --------------------------------------------------------------------------------
// RESOURCES for materials
const facePaintGyozaMat = Materials.get("face_paint_gyoza_mat");
const facePaintSandwichMat = Materials.get("face_paint_sandwich_mat");
const facePaintInvisibleMat = Materials.get("face_paint_invisible_mat");
const facePaintCheekMat = Materials.get("face_paint_cheek_mat");
const faceTracker0Mat = Materials.get("face_tracker0_mat");
const faceTracker1Mat = Materials.get("face_tracker1_mat");

const invisibleMat = Materials.get("invisible_mat");

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

const newProdSmallFront = Scene.root.find("new_prod_small_front");
const newProdSmallFrontMesh = Scene.root.find("new_prod_small_front_mesh");

const newProdBigFront = Scene.root.find("new_prod_big_front");
const newProdBigFrontMesh = Scene.root.find("new_prod_big_front_mesh");

const newGyozaLeft = Scene.root.find("new_gyoza_left");
const newGyozaLeftMesh = Scene.root.find("new_gyoza_left_mesh");

const newGyozaRight = Scene.root.find("new_gyoza_right");
const newGyozaRightMesh = Scene.root.find("new_gyoza_right_mesh");

const newTakoyakiRoot = Scene.root.find("takoyaki_root");
const newGyozaRoot = Scene.root.find("new_gyoza_root");
const newTakoyakiTray = Scene.root.find("new_takoyaki_tray");
const newTakoyakiTrayMesh = Scene.root.find("new_takoyaki_tray_mesh");

const facemesh0Tako = Scene.root.find("facemesh0_tako");
const facemesh1Tako = Scene.root.find("facemesh1_tako");

const facemesh0Meal = Scene.root.find("facemesh0_meal");
const facemesh1Meal = Scene.root.find("facemesh1_meal");

const howtoRect = Scene.root.find("howto_rect");
const howtoBgRect = Scene.root.find("howto_bg_rect");
const openMouthRect = Scene.root.find("open_mouth_rect");
openMouthRect.hidden = true;

const mealShopstick00mesh = Scene.root.find("shopstick00_mesh");
const mealShopstick01mesh = Scene.root.find("shopstick01_mesh");

const mealShopstick00_pivot = Scene.root.find("shopstick00_pivot");
const mealShopstick01_pivot = Scene.root.find("shopstick01_pivot");

// For sandwich
const newHand = Scene.root.find("new_hand");
const newHandMesh = Scene.root.find("new_hand_mesh");
const newSandwichCheek0Mesh = Scene.root.find("sandwich_cheek0_mesh");

// For crabstick
const newCrabBg = Scene.root.find("new_crab_bg");
const newCrabBgMesh = Scene.root.find("new_crab_bg_mesh");
const newCrabFg = Scene.root.find("new_crab_fg");
const newCrabFgMesh = Scene.root.find("new_crab_fg_mesh");
const newCrabLogo = Scene.root.find("new_crab_logo");
const newCrabLogoMesh = Scene.root.find("new_crab_logo_mesh");
const frontGyozaTableRect = Scene.root.find("front_gyoza_table");
const frontGyozaTrayRect = Scene.root.find("front_gyoza_tray");

// For meal (Ramen)
const newRamen = Scene.root.find("new_ramen");
const newRamenMesh = Scene.root.find("new_ramen_mesh");
const frontRamenFlagRect = Scene.root.find("front_ramen_flag");

const ramenPool0 = Scene.root.find("ramenPool0");

// --------------------------------------------------------------------------------
// RESOURCES for SWIRL SANDWICH

const sandwichRoot = Scene.root.find("sandwich_root");
const frontSwirl = Scene.root.find("swirl_foreground");
const backSwirl = Scene.root.find("swirl_background");
const sandwichSwirlRoot = Scene.root.find("sandwich_swirl_root");

const sandwichRoot1 = Scene.root.find("sandwich_root1");
const frontSwirl1 = Scene.root.find("swirl_foreground1");
const backSwirl1 = Scene.root.find("swirl_background1");

const frontSandwichList = [];
const frontSandwichMeshList = [];
const backSandwichList = [];
const backSandwichMeshList = [];

for (var i=0; i<12; ++i)
    frontSandwichList.push(Scene.root.find("sandwichf" + i));
for (var i=0; i<12; ++i)
    frontSandwichMeshList.push(Scene.root.find("sandwich_planef" + i + "_mesh"));

for (var i=0; i<12; ++i)
    backSandwichList.push(Scene.root.find("sandwichb" + i));
for (var i=0; i<12; ++i)
    backSandwichMeshList.push(Scene.root.find("sandwich_planeb" + i + "_mesh"));

const frontSandwichList1 = [];
const frontSandwichMeshList1 = [];
const backSandwichList1 = [];
const backSandwichMeshList1 = [];

for (var i=0; i<7; ++i)
    frontSandwichList1.push(Scene.root.find("sandwichf" + i + "_1"));
for (var i=0; i<7; ++i)
    frontSandwichMeshList1.push(Scene.root.find("sandwichf" + i + "_1_mesh"));

for (var i=0; i<7; ++i)
    backSandwichList1.push(Scene.root.find("sandwichb" + i + "_1"));
for (var i=0; i<7; ++i)
    backSandwichMeshList1.push(Scene.root.find("sandwichb" + i + "_1_mesh"));

// --------------------------------------------------------------------------------
// RESOURCES for CRABSTICK

const laserBeamLeft = Scene.root.find("laser_beam_left");
const laserBeamRight = Scene.root.find("laser_beam_right");

const laserBeamLeft1 = Scene.root.find("laser_beam_left1");
const laserBeamRight1 = Scene.root.find("laser_beam_right1");

// --------------------------------------------------------------------------------
// SHARED VARS & CALLBACKS

const MOUTH_OPENNESS_MIN_THRESHOLD = 0.1;
const MOUTH_CLOSSNESS_MAX_THRESHOLD = 0.07;

var feedTimeDriverList = [];
var crushTimeDriverList = [];

const SWIRL_RADIOUS = 12.0;
const SWIRL_DURATION = 6000;

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

const THEME_NAME_LOOKUP_REVERSE_MAP = {

    "Gyoza": "gyoza",
    "Sandwich": "sandwich",
    "Crab Stick": "crabstick",
    "Tokoyaki": "takoyaki",
    "Meal": "meal",
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
    "new_design_mat16", "new_design_mat17", "new_design_mat18", "new_design_mat19", 
];

const NEW_DESIGN_TEX_LIST = [
    "ext_new_design_tex0", "ext_new_design_tex1", "ext_new_design_tex2", "ext_new_design_tex3", 
    "ext_new_design_tex4", "ext_new_design_tex5", "ext_new_design_tex6", "ext_new_design_tex7", 
    "ext_new_design_tex8", "ext_new_design_tex9", "ext_new_design_tex10", "ext_new_design_tex11", 
    "ext_new_design_tex12", "ext_new_design_tex13", "ext_new_design_tex14", "ext_new_design_tex15", 
    "ext_new_design_tex16", "ext_new_design_tex17", "ext_new_design_tex18", "ext_new_design_tex19", 
];

const NEW_DESIGN_URL_TABLE = {
    
    invisible: "new_design/transparent.png",

    // Gyoza sample
    gyoza_bubble_bg: "new_design/sample_gyoza/01_01_bg.png",
    gyoza_bubble_txt_00: "new_design/sample_takoyaki/copy.png",
    gyoza_bubble_txt_01: "new_design/sample_takoyaki/copy.png",
    gyoza_feed_00: "new_design/sample_gyoza/01_04_gyuza1_action.png",
    gyoza_feed_01: "new_design/sample_gyoza/01_04_gyuza2_action.png",
    gyoza_feed_02: "new_design/sample_gyoza/01_04_gyuza3_action.png",
    gyoza_feed_03: "new_design/sample_gyoza/01_04_gyuza4_action.png",
    gyoza_prod_small: "new_design/sample_gyoza/01_03_product.png",
    gyoza_prod_big: "new_design/sample_gyoza/01_03_product2_action.png",
    gyoza_prod_bg: "new_design/sample_gyoza/01_02_bg2.png",

    // Takoyaki sample
    takoyaki_bubble_bg: "new_design/sample_takoyaki/bubble.png",
    takoyaki_bubble_txt: "new_design/sample_takoyaki/copy.png",
    takoyaki_prod: "new_design/sample_takoyaki/takopack.png",
    takoyaki_tray: "new_design/sample_takoyaki/takoyaki.png",

    // Sandwich sample
    sandwich_bubble_bg: "new_design/sample_sandwich/bb_sandwich.png",
    sandwich_bubble_txt: "new_design/sample_takoyaki/copy.png",
    sandwich_prod: "new_design/sample_sandwich/sandwich_crab.png",
    sandwich_hand: "new_design/sample_sandwich/hand.png",
    sandwich_ingredient: [
        "new_design/sample_sandwich/sw10.png", // Crabstick
        "new_design/sample_sandwich/tuna.png", // Tuna
        "new_design/sample_sandwich/seaweed.png", // Seaweed
        "new_design/sample_sandwich/sw3.png", // Egg
        "new_design/sample_sandwich/ham.png", // Ham
        "theme_sandwich/sw2.png", // Whole piece sandwich
    ],
    sandwich_cheek_0: "new_design/sample_sandwich/cheek.png",
    sandwich_cheek_1: "new_design/sample_sandwich/cheek2.png",

    // Crabstick sample (Crabstick is the new gyoza)
    crabstick_bubble_bg: "new_design/sample_crabstick/new_crab.png",
    crabstick_bubble_txt: "new_design/sample_takoyaki/copy.png",
    crabstick_prod: "new_design/sample_crabstick/crab_pack.png",
    crabstick_crab_bg: "new_design/sample_crabstick/handcrab1.png",
    crabstick_crab_fg: "new_design/sample_crabstick/handcrab1.2.png",
    crabstick_crab_logo: "new_design/sample_crabstick/handcrab_logo.png",
    crabstick_gyoza_table: "new_design/sample_crabstick/gyoza_theme2_table.png",
    crabstick_gyoza_tray: "new_design/sample_crabstick/gyoza_theme2.2.png",

    // Meal sample
    meal_bubble_bg: "new_design/sample_meal/bb_ramen.png",
    meal_bubble_txt: "new_design/sample_takoyaki/copy.png",
    meal_prod: "new_design/sample_meal/ramenL.png",
    meal_ramen: "new_design/sample_meal/ramen_still.png",
    meal_flag: "new_design/sample_meal/flag.png",
};

const FOOD_TEX_LOOKUP_TABLE = {

    gyoza: [
        "theme_gyoza/gyoza_00.png", "theme_gyoza/gyoza_01.png", 
    ],
    //sandwich: [
        //"theme_sandwich/sw2.png", "theme_sandwich/sw3.png", "theme_sandwich/sw4.png", "theme_sandwich/sw8.png", "theme_sandwich/sw10.png"
    //],
    sandwich: NEW_DESIGN_URL_TABLE.sandwich_ingredient,
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

// --------------------------------------------------------------------------------
// CORE DATA
// --------------------------------------------------------------------------------

var currentThemeData = {};

function storeData(data) {

    currentThemeData = data;

    //Diagnostics.log("currentThemeData: " + JSON.stringify(currentThemeData));

    // Set default quote data if NOT exist
    if (currentThemeData["quote"] == undefined) {

        var QUOTE_COUNT = 75;
        var quote = {};
        
        quote.indices = [];
        for (var i=0; i<QUOTE_COUNT; ++i)
            quote.indices.push(i+1); // Because asset index start at 1

        quote.method = "rand"; // rand | seq

        currentThemeData.quote = quote;
    }

    // Run quote
    quote.curIndex = 0;

    // Run random
    if (currentThemeData.quote.method == "rand") {

        // Run random using shuffle bag
        for (var i=0; i<currentThemeData.quote.indices.length; ++i) {

            var curIndex = i;
            var curVal = currentThemeData.quote.indices[i];
            var randIndex = Math.floor(Random.random() * currentThemeData.quote.indices.length);
            var randVal = currentThemeData.quote.indices[randIndex];

            // Swap
            currentThemeData.quote.indices[curIndex] = randVal;
            currentThemeData.quote.indices[randIndex] = curVal;
        }
    }

    //Diagnostics.log("quote: " + JSON.stringify(currentThemeData.quote));
}

function getNpdList() {

    if (!currentThemeData.assetlist)
        return;

    for (var i=0; i<currentThemeData.assetlist.length; ++i) {

        var item = currentThemeData.assetlist[i];

        if (item.type == "productNPD")
            return item.items;
    }

    // Return empty arry if no NPD
    return [];
}

function getItemList() {

    if (!currentThemeData.assetlist)
        return;

    var itemList = [];

    for (var i=0; i<currentThemeData.assetlist.length; ++i) {

        var item = currentThemeData.assetlist[i];

        if (item.type == "product")
            itemList.push(item);
    }

    return itemList;
}

// Store round order, so the game will loop in the certain way
var themeOrder = [];
var itemQueue = [];

var itemIndex = {
    gyoza: -1,
    sandwich: -1,
    crabstick: -1,
    takoyaki: -1,
    meal: -1,
}

var productCounter = {
    gyoza: -1,
    sandwich: -1,
    crabstick: -1,
    takoyaki: -1,
    meal: -1,
}

var currentRound = 0;

function resetProductCounter() {

    productCounter.gyoza = -1;
    productCounter.sandwich = -1;
    productCounter.crabstick = -1;
    productCounter.takoyaki = -1;
    productCounter.meal = -1;
}

var currentProductTitle = undefined;

function setCurrentProduct(themeData) {

    var prodTitle = undefined;

    if (themeData.type == "productNPD") {

        prodTitle = themeData.title;
    }
    else if (themeData.type = "product") {

        var theme = themeData.theme;
        
        Diagnostics.log("themeData: " + JSON.stringify(themeData));
        Diagnostics.log("productCounter: " + JSON.stringify(productCounter));

        var themeKey = THEME_NAME_LOOKUP_REVERSE_MAP[theme];
        prodTitle = themeData.items[productCounter[themeKey]].title;
    }

    Diagnostics.log("Got product title: " + prodTitle);
    currentProductTitle = prodTitle;
}

function nextProductCounter(themeData) {

    //Diagnostics.log("themeData: " + JSON.stringify(themeData));

    if (themeData.type == "productNPD")
        return;

    var itemList = getItemList();

    var theme = themeData.theme;
    var themeKey = THEME_NAME_LOOKUP_REVERSE_MAP[theme];
    Diagnostics.log("themeKey: " + themeKey + " from theme: " + theme);

    var item = itemList[itemIndex[themeKey]];
    if (++productCounter[themeKey] >= item.items.length)
        productCounter[themeKey] = 0;

    // Debug productCounter
    Diagnostics.log("productCounter: " + JSON.stringify(productCounter));
}

// Beware, this's in O(n)
function isThemeExistInRoundOrder(theme) {

    for (var i=0; i<themeOrder.length; ++i) {

        var it = themeOrder[i];
        if (theme == it)
            return true;
    }

    return false;
}

function createDataRoundZero() {
    
    // Clear
    themeOrder = [];
    itemQueue = [];

    // Add npd item
    var npdList = getNpdList();
    for (var i=0; i<npdList.length; ++i) {

        var item = npdList[i];
        item.type = "productNPD";
        itemQueue.push(item);
        
        var isExist = isThemeExistInRoundOrder(item.theme);
        if (!isExist)
            themeOrder.push(item.theme);
    }
    
    // Add item
    var itemList = getItemList();
    for (var i=0; i<itemList.length; ++i) {

        var item = itemList[i];
        item.type = "product";

        var isExist = isThemeExistInRoundOrder(item.theme);
        if (!isExist) {
            itemQueue.push(item);
            themeOrder.push(item.theme);
        }
    }

    resetProductCounter();
}

function setupItemIndex() {

    var itemList = getItemList();
    for (var i=0; i<itemList.length; ++i) {

        var item = itemList[i];
        var themeKey = THEME_NAME_LOOKUP_REVERSE_MAP[item.theme];
        Diagnostics.log("ThemeKey: " + themeKey + " from theme: " + item.theme);

        itemIndex[themeKey] = i;
    }
}

function createDataRoundMoreThanZero() {

    // Clear
    itemQueue = [];

    // Get item
    var itemList = getItemList();

    // Add item
    for (var i=0; i<themeOrder.length; ++i) {

        var index = -1;

        var theme = themeOrder[i];
        var themeKey = THEME_NAME_LOOKUP_REVERSE_MAP[theme];
        Diagnostics.log("ThemeKey: " + themeKey + " from theme: " + theme);

        index = itemIndex[themeKey];

        if (index < 0 || index >= itemList.length) {
            Diagnostics.log("Index out of bound!");
            continue;
        }

        itemQueue.push(itemList[index]);
    }
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
TouchGestures.onLongPress().subscribe(function (gesture) {

    var isHidden = dbgCanvas.hidden.pinLastValue();
    dbgCanvas.hidden = !isHidden;
});

TouchGestures.onTap().subscribe(function (gesture) {

    if (hasStarted)
        changeTheme();
});

// --------------------------------------------------------------------------------
// @ START

const SHOW_ANIM_DURATION = 300;

var curTheme = undefined;

// ********************************************************************************
// This function starts first, but call at the last line

function main() {

    //initSwirlSandwich(frontSwirl1, frontSandwichList1, frontSandwichMeshList1, true);
    //initSwirlSandwich(backSwirl1, backSandwichList1, backSandwichMeshList1, false);
    
    initSwirlSandwich(frontSwirl, frontSandwichList, frontSandwichMeshList, true);
    initSwirlSandwich(backSwirl, backSandwichList, backSandwichMeshList, false);
    
    hideAllThemes();

    // Handle eye state for face #0
    handleEyeOpeningState(0, 0, function() { onEyeOpened(0, 0); }, function() { onEyeClosed(0, 0); });
    handleEyeOpeningState(0, 1, function() { onEyeOpened(0, 1); }, function() { onEyeClosed(0, 1); }); 
    
    // Handle eye state for face #1
    handleEyeOpeningState(1, 0, function() { onEyeOpened(1, 0); }, function() { onEyeClosed(1, 0); });
    handleEyeOpeningState(1, 1, function() { onEyeOpened(1, 1); }, function() { onEyeClosed(1, 1); }); 
    
    // Handle face tracking state
    handleFaceTrackingState(0, function() { onFaceTracked(0); }, function() { onFaceUntracked(0); });
    handleFaceTrackingState(1, function() { onFaceTracked(1); }, function() { onFaceUntracked(1); });

    handleMouthOpeningState(
        0, 
        MOUTH_OPENNESS_MIN_THRESHOLD, MOUTH_CLOSSNESS_MAX_THRESHOLD, 
        onFace0MouthOpen, onFace0MouthClose);

    //handleFoodFeeder(crushPoolList0, foodPoolList0, foodPoolList01, foodPoolMeshList0, foodPoolMeshList01);
    handleFoodFeeder(crushPoolList0, undefined, undefined, undefined, undefined);

    // Request
    getThemeData(function(data, error) {

        if (data) {

            storeData(data);
            //Diagnostics.log("data: " + JSON.stringify(data));
            setupItemIndex();
            //Diagnostics.log("itemIndex: " + JSON.stringify(itemIndex));
            
            // The lines below is for debugging
            //var npdList = getNpdList();
            //Diagnostics.log("npdLits.length: " + npdList.length);
            //Diagnostics.log("npdList: " + JSON.stringify(npdList));
            //var itemList = getItemList();
            //Diagnostics.log("itemList.length: " + itemList.length);
            //Diagnostics.log("itemList: " + JSON.stringify(itemList));
            //createDataRoundZero();
            //Diagnostics.log("itemQueue: " + JSON.stringify(itemQueue));
            //Diagnostics.log("roundOrder: " + JSON.stringify(themeOrder));
            //createDataRoundMoreThanZero();
            //Diagnostics.log("itemQueue: " + JSON.stringify(itemQueue));
            //Diagnostics.log("roundOrder: " + JSON.stringify(themeOrder));
        }
        else {

            Diagnostics.log("API request error!");
        }
    });
}

function startGame() {

    hideHowtoWithDelay();
    
    // Start round
    createDataRoundZero();

    // Show first theme
    var firstTheme = itemQueue[0];

    // Pop the theme
    itemQueue.shift();

    Diagnostics.log("themeOrder: " + JSON.stringify(themeOrder));
    Diagnostics.log("firstTheme: " + JSON.stringify(firstTheme));
    Diagnostics.log("currentRound: " + currentRound);

    nextProductCounter(firstTheme);
    setCurrentProduct(firstTheme);
    
    if (THEME_NAME_LOOKUP_TABLE.gyoza == firstTheme.theme) {

        showOpenMouthAwhile();
        showGyoza();
    }
    else if (THEME_NAME_LOOKUP_TABLE.sandwich == firstTheme.theme)
        showSandwich(SANDWICH_MODE_SWIRL);
    else if (THEME_NAME_LOOKUP_TABLE.crabstick == firstTheme.theme)
        showCrabstick();
    else if (THEME_NAME_LOOKUP_TABLE.meal == firstTheme.theme) {

        showOpenMouthAwhile();
        showMeal();
    }
    else if (THEME_NAME_LOOKUP_TABLE.takoyaki == firstTheme.theme)
        showTakoyaki();
    
    // Debug - Show tako when start
    //showTakoyaki();
    //currentProductTitle = "takoyaki_takoyaki";
    // Debug, show sandwich when start
    //showSandwich(SANDWICH_MODE_SWIRL);
    //currentProductTitle = "sandwich_alaska_wakame";
    // For the build of 2 sandwiches
    //showMeal();
    //currentProductTitle = "meal_kraphrao";
    //showCrabstick();
    //showMeal();
}

function changeTheme() {

    // Is end round, create the new round
    if (itemQueue.length <= 0) {

        currentRound += 1;
        Diagnostics.log("Create new round: currentRound: " + currentRound);
        
        createDataRoundMoreThanZero();
    }

    var nextTheme = itemQueue[0];
    itemQueue.shift();

    // Hide themes
    hideAllThemes();

    nextProductCounter(nextTheme);
    setCurrentProduct(nextTheme);

    // Change theme
    if (THEME_NAME_LOOKUP_TABLE.gyoza == nextTheme.theme) {

        showOpenMouthAwhile();
        showGyoza();
    }
    else if (THEME_NAME_LOOKUP_TABLE.sandwich == nextTheme.theme)
        showSandwich(SANDWICH_MODE_SWIRL);
    else if (THEME_NAME_LOOKUP_TABLE.crabstick == nextTheme.theme)
        showCrabstick();
    else if (THEME_NAME_LOOKUP_TABLE.meal == nextTheme.theme) {

        showOpenMouthAwhile();
        showMeal();
    }
    else if (THEME_NAME_LOOKUP_TABLE.takoyaki == nextTheme.theme)
        showTakoyaki();

    /* // This is to show only 2 sandwich themes
    if (currentSandwichMode == SANDWICH_MODE_SWIRL)
        showSandwich(SANDWICH_MODE_EAT);
    else if (currentSandwichMode == SANDWICH_MODE_EAT)
        showSandwich(SANDWICH_MODE_SWIRL);
    */
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

function showOpenMouthAwhile() {

    openMouthRect.hidden = false;
    howtoBgRect.hidden = false;

    const timer = Time.setInterval(hideOpenMouth, HIDE_HOWTO_DELAY);

    function hideOpenMouth() {

        openMouthRect.hidden = true;
        howtoBgRect.hidden = true;

        // clear interval
        Time.clearInterval(timer);
    }
}

// ********************************************************************************

function hideAllThemes() {

    newTakoyakiRoot.hidden = true;
    newGyozaRoot.hidden = true;    
    facemesh0.hidden = true;
    facemesh0Tako.hidden = true;
    facemesh1Tako.hidden = true;
    sandwichRoot.hidden = true;
    sandwichRoot1.hidden = true;
    headGyozaRoot.hidden = true;
    headGyozaRoot1.hidden = true;
    bodySegmentationRect.hidden = true;
    //takoDirectionalLight0.hidden = true;
    laserBeamLeft.hidden = true;
    laserBeamRight.hidden = true;
    laserBeamLeft1.hidden = true;
    laserBeamRight1.hidden = true;
    newGyozaLeft.hidden = true;
    newGyozaRight.hidden = true;
    facemesh0Meal.hidden = true;
    facemesh1Meal.hidden = true;
    newHand.hidden = true;
    newCrabBg.hidden = true;
    newCrabFg.hidden = true;
    newCrabLogo.hidden = true;
    newRamen.hidden = true;
    foodFeederRoot0.hidden = true;
    newProdSmallFront.hidden = true;
    newProdBigFront.hidden = true;
    frontGyozaTableRect.hidden = true;
    frontGyozaTrayRect.hidden = true;
    newTakoyakiTray.hidden = true;
    frontRamenFlagRect.hidden = true;
}

const QUOTE_PROD_TRANSFORM = {

    gyoza: {
        // Point
        new_prod_small: [30, 0, 10],
        new_prod_big: [30, 0, 10],
        new_quote_bg: [-10, 0, 13],
        new_quote_text: [-10, 0, 13],
        // Scale
        new_prod_small_scale: [1, 1, 1],
        new_prod_big_scale: [1, 1, 1],
        new_quote_bg_scale: [1, 1, 1],
        new_quote_text_scale: [1, 1, 1],
        // Rotation
        new_prod_small_rotation: [0, 0, 0],
        new_prod_big_rotation: [0, 0, 0],
    },
    sandwich: {
        // Point
        new_prod_small: [27, 0, 25],
        new_prod_big: [24, 0, 19],
        new_quote_bg: [-8, 0, 5],
        new_quote_text: [-8, 0, 5],

        // Scale
        new_prod_small_scale: [1.45, 1.45, 1.45],
        new_prod_big_scale: [1.3, 1.3, 1.3],
        new_quote_bg_scale: [1, 1, 1],
        new_quote_text_scale: [1, 1, 1],

        // Rotation
        new_prod_small_rotation: [0, 0, 0],
        new_prod_big_rotation: [0, 0, 0],

        hand: [-30, 0, 36],
    },
    crabstick: {
        // Point
        new_prod_small: [27, 0, 30],
        new_prod_big: [27, 0, 26],
        new_quote_bg: [-7, 0, 5],
        new_quote_text: [-7, 0, 5],
        // Scale
        new_prod_small_scale: [1, 1, 1],
        new_prod_big_scale: [1, 1, 1],
        new_quote_bg_scale: [1, 1, 1],
        new_quote_text_scale: [1, 1, 1],
        // Rotation
        new_prod_small_rotation: [0, -8, 0],
        new_prod_big_rotation: [0, -8, 0],

        new_crab_bg: [-12, 0, 40], // Obsolete
        new_crab_fg: [-12, 0, 40], // Obsolete
        new_crab_logo: [30, 0, 38], // Obsolete
    },
    takoyaki: {
        // Point
        new_prod_small: [30, 0, 10], // Obsolete
        new_prod_big: [30, 0, 10], // Obsolete
        new_quote_bg: [10, 0, 5],
        new_quote_text: [10, 0, 5],
        // Scale
        new_prod_small_scale: [1, 1, 1],
        new_prod_big_scale: [1, 1, 1],
        new_quote_bg_scale: [1, 1, 1],
        new_quote_text_scale: [1, 1, 1],
        // Rotation
        new_prod_small_rotation: [0, 0, 0],
        new_prod_big_rotation: [0, 0, 0],

        tray: [-30, 0, 30],
        tray_scale: [2, 2, 2],
    },
    meal: {
        // Point
        new_prod_small: [23.5, 0, 25],
        new_prod_big: [22.5, 0, 26],
        new_quote_bg: [-8, 0, 15],
        new_quote_text: [-8, 0, 15],
        // Scale
        new_prod_small_scale: [1, 1, 1],
        new_prod_big_scale: [1, 1, 1],
        new_quote_bg_scale: [1, 1, 1],
        new_quote_text_scale: [1, 1, 1],
        // Rotation
        new_prod_small_rotation: [0, 45, 0],
        new_prod_big_rotation: [0, 45, 0],

        new_ramen: [-35, 0, 12],
    },
};

var gyozaSeqMatList = [];
var hasStartGyoza = false;

function showGyoza() {

    curTheme = THEME_NAME_LOOKUP_TABLE.gyoza;

    headGyozaRoot.hidden = false;
    headGyozaRoot1.hidden = false;
    facemesh0.hidden = false;
    newGyozaRoot.hidden = false;

    loadNewDesignGyoza();
    if (!hasStartGyoza)
        runGyozaSequence();
    applyRotationBounceLessDelay(newGyozaLeft, 0, 20, 700);
    applyRotationBounceLessDelay(newGyozaRight, 0, 50, 600);

    facemesh0.material = facePaintGyozaMat;
    facemesh1.material = facePaintGyozaMat;

    showNewProdSmall();

    if (isMouthOpening[0])
        onFace0MouthOpen();
    else if (isMouthOpening[1])
        onFace1MouthOpen();
    
    function loadNewDesignGyoza() {

        // Reset qyozaSeqMatList
        gyozaSeqMatList = [];

        var curResIndex = 0;
    
        setupMaterial(newQuoteBgMesh, curResIndex++, NEW_DESIGN_URL_TABLE.gyoza_bubble_bg);
        setupMaterial(newQuoteTxtMesh, curResIndex++, getCurBubbleTxtUrl());
    
        var prodUrl = getCurProdTxtUrl(THEME_NAME_LOOKUP_TABLE.gyoza)
        setupMaterial(newProdBigMesh, curResIndex++, prodUrl);
        setupMaterial(newProdSmallMesh, curResIndex++, prodUrl);
    
        // Setup position
        setupQuoteProdPosition(QUOTE_PROD_TRANSFORM.gyoza);
        
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

        mat = getMaterialWithDiffuseByUrl(
            NEW_DESIGN_MAT_LIST[curResIndex], 
            NEW_DESIGN_TEX_LIST[curResIndex], 
            BASE_URL + NEW_DESIGN_URL_TABLE.gyoza_feed_03);
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
    
    hasStartGyoza = true;
}

function showTakoyaki() {

    curTheme = THEME_NAME_LOOKUP_TABLE.takoyaki;

    newTakoyakiRoot.hidden = false;
    facemesh0Tako.hidden = false;
    facemesh1Tako.hidden = false;
    //takoDirectionalLight0.hidden = false;
    newTakoyakiTray.hidden = false;

    loadNewDesignTakoyaki();
    showNewProdSmall();

    function loadNewDesignTakoyaki() {

        var curResIndex = 0;

        setupMaterial(newQuoteBgMesh, curResIndex++, NEW_DESIGN_URL_TABLE.takoyaki_bubble_bg);
        setupMaterial(newQuoteTxtMesh, curResIndex++, getCurBubbleTxtUrl());

        setupMaterial(newProdBigMesh, curResIndex++, NEW_DESIGN_URL_TABLE.invisible);
        setupMaterial(newProdSmallMesh, curResIndex++, NEW_DESIGN_URL_TABLE.invisible);

        setupMaterial(newTakoyakiTrayMesh, curResIndex++, NEW_DESIGN_URL_TABLE.takoyaki_tray);

        newTakoyakiTray.transform.x = QUOTE_PROD_TRANSFORM.takoyaki.tray[0];
        newTakoyakiTray.transform.y = QUOTE_PROD_TRANSFORM.takoyaki.tray[1];
        newTakoyakiTray.transform.z = QUOTE_PROD_TRANSFORM.takoyaki.tray[2];

        newTakoyakiTray.transform.scaleX = QUOTE_PROD_TRANSFORM.takoyaki.tray_scale[0];
        newTakoyakiTray.transform.scaleY = QUOTE_PROD_TRANSFORM.takoyaki.tray_scale[1];
        newTakoyakiTray.transform.scaleZ = QUOTE_PROD_TRANSFORM.takoyaki.tray_scale[2];

        // Setup position
        setupQuoteProdPosition(QUOTE_PROD_TRANSFORM.takoyaki);
        
        function setupMaterial(mesh, index, texName) {

            mesh.material = getMaterialWithDiffuseByUrl(
                NEW_DESIGN_MAT_LIST[index], 
                NEW_DESIGN_TEX_LIST[index], 
                BASE_URL + texName);    
        }
    }
}

// **** Warning ! Crabstick is the new gyoza !
function showCrabstick() {

    curTheme = THEME_NAME_LOOKUP_TABLE.crabstick;
    facemesh0.hidden = false;
    facemesh1.hidden = false;

    facemesh0.material = facePaintInvisibleMat;
    facemesh1.material = facePaintInvisibleMat;

    //newCrabBg.hidden = false;
    //newCrabFg.hidden = false;
    //newCrabLogo.hidden = false;

    newProdBigFront.hidden = false;
    newProdSmallFront.hidden = false;

    frontGyozaTableRect.hidden = false;
    frontGyozaTrayRect.hidden = false;

    loadNewDesignCrabstick();
    showNewProdSmall();

    // This make sure to beam when any eye is opened
    for (var i=0; i<2; ++i)
        for (var j=0; j<2; ++j)
            if (!isEyeClose[i][j])
                onEyeOpened(i, j);
        
    function loadNewDesignCrabstick() {

        var curResIndex = 0;

        setupMaterial(newQuoteBgMesh, curResIndex++, NEW_DESIGN_URL_TABLE.crabstick_bubble_bg);
        setupMaterial(newQuoteTxtMesh, curResIndex++, getCurBubbleTxtUrl());

        var prodUrl = getCurProdTxtUrl(THEME_NAME_LOOKUP_TABLE.crabstick)
        setupMaterial(newProdBigFrontMesh, curResIndex++, prodUrl);
        setupMaterial(newProdSmallFrontMesh, curResIndex++, prodUrl);

        setupMaterial(newCrabBgMesh, curResIndex++, NEW_DESIGN_URL_TABLE.crabstick_crab_bg);
        setupMaterial(newCrabFgMesh, curResIndex++, NEW_DESIGN_URL_TABLE.crabstick_crab_fg);
        setupMaterial(newCrabLogoMesh, curResIndex++, NEW_DESIGN_URL_TABLE.crabstick_crab_logo);

        newCrabBg.transform.x = QUOTE_PROD_TRANSFORM.crabstick.new_crab_bg[0];
        newCrabBg.transform.y = QUOTE_PROD_TRANSFORM.crabstick.new_crab_bg[1];
        newCrabBg.transform.z = QUOTE_PROD_TRANSFORM.crabstick.new_crab_bg[2];
        
        newCrabFg.transform.x = QUOTE_PROD_TRANSFORM.crabstick.new_crab_fg[0];
        newCrabFg.transform.y = QUOTE_PROD_TRANSFORM.crabstick.new_crab_fg[1];
        newCrabFg.transform.z = QUOTE_PROD_TRANSFORM.crabstick.new_crab_fg[2];

        newCrabLogo.transform.x = QUOTE_PROD_TRANSFORM.crabstick.new_crab_logo[0];
        newCrabLogo.transform.y = QUOTE_PROD_TRANSFORM.crabstick.new_crab_logo[1];
        newCrabLogo.transform.z = QUOTE_PROD_TRANSFORM.crabstick.new_crab_logo[2];

        setupMaterial(frontGyozaTableRect, curResIndex++, NEW_DESIGN_URL_TABLE.crabstick_gyoza_table);
        setupMaterial(frontGyozaTrayRect, curResIndex++, NEW_DESIGN_URL_TABLE.crabstick_gyoza_tray);

        // Setup position
        setupQuoteProdPosition(QUOTE_PROD_TRANSFORM.crabstick);
        
        function setupMaterial(mesh, index, texName) {

            mesh.material = getMaterialWithDiffuseByUrl(
                NEW_DESIGN_MAT_LIST[index], 
                NEW_DESIGN_TEX_LIST[index], 
                BASE_URL + texName);    
        }
    }
}

var hasStartSandwich = false;

const SANDWICH_MODE_SWIRL = 0;
const SANDWICH_MODE_EAT = 1;

var currentSandwichMode = undefined;

function showSandwich(mode) {

    curTheme = THEME_NAME_LOOKUP_TABLE.sandwich;
    currentSandwichMode = mode;

    facemesh0.hidden = false;
    facemesh1.hidden = false;

    sandwichRoot.hidden = false;
    sandwichRoot1.hidden = false;

    if (mode == SANDWICH_MODE_SWIRL) {

        bodySegmentationRect.hidden = false;
        sandwichSwirlRoot.hidden = false;
    }
    else if (mode == SANDWICH_MODE_EAT) {

        bodySegmentationRect.hidden = true;
        sandwichSwirlRoot.hidden = true;
    }

    newHand.hidden = false;

    facemesh0.material = faceTracker0Mat;
    facemesh1.material = faceTracker1Mat;

    showNewProdSmall();
    loadNewDesignSandwich();

    function loadNewDesignSandwich() {

        var curResIndex = 0;

        setupMaterial(newQuoteBgMesh, curResIndex++, NEW_DESIGN_URL_TABLE.sandwich_bubble_bg);
        setupMaterial(newQuoteTxtMesh, curResIndex++, getCurBubbleTxtUrl());

        var prodUrl = getCurProdTxtUrl(THEME_NAME_LOOKUP_TABLE.sandwich)
        setupMaterial(newProdBigMesh, curResIndex++, prodUrl);
        setupMaterial(newProdSmallMesh, curResIndex++, prodUrl);

        //setupMaterial(newHandMesh, curResIndex++, NEW_DESIGN_URL_TABLE.sandwich_hand);

        if (mode == SANDWICH_MODE_SWIRL) {

            // Apply mat for each swirl sandwich
            var ingMatList = [];
            for (var i=0; i<NEW_DESIGN_URL_TABLE.sandwich_ingredient.length; ++i) {

                var url = BASE_URL + NEW_DESIGN_URL_TABLE.sandwich_ingredient[i];

                //Diagnostics.log(
                //    "MatName: " + NEW_DESIGN_MAT_LIST[curResIndex] +
                //    " TexName: " + NEW_DESIGN_TEX_LIST[curResIndex]
                //    );

                //Diagnostics.log("url: " + url);

                var mat = getMaterialWithDiffuseByUrl(
                    NEW_DESIGN_MAT_LIST[curResIndex], 
                    NEW_DESIGN_TEX_LIST[curResIndex], 
                    url);

                ingMatList.push(mat); 
                
                ++curResIndex;
            }

            var ingIndex = 0;
            for (var i=0; i<frontSandwichMeshList.length; ++i) {

                var frontMesh = frontSandwichMeshList[i];
                frontMesh.material = ingMatList[ingIndex];

                var backMesh = backSandwichMeshList[i];
                backMesh.material = ingMatList[ingIndex];

                if (++ingIndex >= ingMatList.length)
                    ingIndex = 0;
            }

            // Apply mat for each swirl sandwich
            var ingMatList = [];
            for (var i=0; i<NEW_DESIGN_URL_TABLE.sandwich_ingredient.length; ++i) {

                var url = BASE_URL + NEW_DESIGN_URL_TABLE.sandwich_ingredient[i];

                Diagnostics.log(
                    "MatName: " + NEW_DESIGN_MAT_LIST[curResIndex] +
                    " TexName: " + NEW_DESIGN_TEX_LIST[curResIndex]
                    );

                Diagnostics.log("url: " + url);

                var mat = getMaterialWithDiffuseByUrl(
                    NEW_DESIGN_MAT_LIST[curResIndex], 
                    NEW_DESIGN_TEX_LIST[curResIndex], 
                    url);

                ingMatList.push(mat); 
                
                ++curResIndex;
            }

            var ingIndex = 0;
            for (var i=0; i<frontSandwichMeshList.length; ++i) {

                var frontMesh = frontSandwichMeshList[i];
                frontMesh.material = ingMatList[ingIndex];

                var backMesh = backSandwichMeshList[i];
                backMesh.material = ingMatList[ingIndex];

                if (++ingIndex >= ingMatList.length)
                    ingIndex = 0;
            }

            Diagnostics.log("curResIndex: " + curResIndex);

            // Set cheek texture
            setupMaterial(newSandwichCheek0Mesh, curResIndex++, NEW_DESIGN_URL_TABLE.sandwich_cheek_0);
        }
        else if (mode == SANDWICH_MODE_EAT) {

            // Set cheek texture
            setupMaterial(newSandwichCheek0Mesh, curResIndex++, NEW_DESIGN_URL_TABLE.sandwich_cheek_1);
        }

        // Setup position
        setupQuoteProdPosition(QUOTE_PROD_TRANSFORM.sandwich);

        newHand.transform.x = QUOTE_PROD_TRANSFORM.sandwich.hand[0];
        newHand.transform.y = QUOTE_PROD_TRANSFORM.sandwich.hand[1];
        newHand.transform.z = QUOTE_PROD_TRANSFORM.sandwich.hand[2];
        
        function setupMaterial(mesh, index, texName) {

            mesh.material = getMaterialWithDiffuseByUrl(
                NEW_DESIGN_MAT_LIST[index], 
                NEW_DESIGN_TEX_LIST[index], 
                BASE_URL + texName);    
        }
    }

    hasStartSandwich = true;
}

function showMeal() {

    curTheme = THEME_NAME_LOOKUP_TABLE.meal;

    facemesh0.hidden = false;
    facemesh0Meal.hidden = false;
    facemesh1Meal.hidden = false;
    //newRamen.hidden = false;
    frontRamenFlagRect.hidden = false;

    facemesh0.material = facePaintInvisibleMat;
    facemesh1.material = facePaintInvisibleMat;

    loadNewDesignMeal();
    showNewProdSmall();

    if (isMouthOpening[0])
        onFace0MouthOpen();
    else if (isMouthOpening[1])
        onFace1MouthOpen();
    
    function loadNewDesignMeal() {

        var curResIndex = 0;

        setupMaterial(newQuoteBgMesh, curResIndex++, NEW_DESIGN_URL_TABLE.meal_bubble_bg);
        setupMaterial(newQuoteTxtMesh, curResIndex++, getCurBubbleTxtUrl());

        var prodUrl = getCurProdTxtUrl(THEME_NAME_LOOKUP_TABLE.meal)
        setupMaterial(newProdBigMesh, curResIndex++, prodUrl);
        setupMaterial(newProdSmallMesh, curResIndex++, prodUrl);

        //setupMaterial(newRamenMesh, curResIndex++, NEW_DESIGN_URL_TABLE.meal_ramen);
        setupMaterial(frontRamenFlagRect, curResIndex++, NEW_DESIGN_URL_TABLE.meal_flag);

        newRamen.transform.x = QUOTE_PROD_TRANSFORM.meal.new_ramen[0];
        newRamen.transform.y = QUOTE_PROD_TRANSFORM.meal.new_ramen[1];
        newRamen.transform.z = QUOTE_PROD_TRANSFORM.meal.new_ramen[2];

        // Setup position
        setupQuoteProdPosition(QUOTE_PROD_TRANSFORM.meal);
        
        function setupMaterial(mesh, index, texName) {

            mesh.material = getMaterialWithDiffuseByUrl(
                NEW_DESIGN_MAT_LIST[index], 
                NEW_DESIGN_TEX_LIST[index], 
                BASE_URL + texName);    
        }
    }
}

const sandwichRotationRef = Scene.root.find("sandwich_rotation_ref");
rotateSandwichRef();
function rotateSandwichRef() {
            
    const swirlParms = {
        durationMilliseconds: SWIRL_DURATION,
        loopCount: Infinity,
        mirror: false  
    };

    const driver = Animation.timeDriver(swirlParms);
    const sampler = Animation.samplers.linear(0, Math.PI * 2.0 * -1.0);
    const anim = Animation.animate(driver, sampler);

    sandwichRotationRef.transform.rotationY = anim;

    driver.start();
}

function initSwirlSandwich(swirl, sandwichList, sandwichMeshList, isFront) {

    for (var i=0; i<sandwichList.length; ++i) {

        var obj = sandwichList[i];

        // Hide front when z < 0
        var hideFrontSignel = obj.transform.z.lt(0);

        if (isFront)
            obj.hidden = hideFrontSignel;
        else
            obj.hidden = hideFrontSignel.not();
    }

    for (var i=0; i<sandwichMeshList.length; ++i) {

        // Vars
        var obj = sandwichList[i];
        var mesh = sandwichMeshList[i];

        // Rotate
        /*
        const swirlParms = {
            durationMilliseconds: SWIRL_DURATION,
            loopCount: Infinity,
            mirror: false  
        };

        const driver = Animation.timeDriver(swirlParms);
        const sampler = Animation.samplers.linear(0, Math.PI * 2.0);
        const anim = Animation.animate(driver, sampler);
    
        mesh.transform.rotationY = anim;

        driver.start();
        */
        // Translate
        var objRad = Math.PI * 2.0 * (i / sandwichMeshList.length);
        var cos = Reactive.cos(sandwichRotationRef.transform.rotationY.add(objRad));
        sandwichList[i].transform.x = Reactive.mul(cos, SWIRL_RADIOUS);
        var sin = Reactive.sin(sandwichRotationRef.transform.rotationY.add(objRad));
        sandwichList[i].transform.z = Reactive.mul(sin, SWIRL_RADIOUS);
    }
}

function setupQuoteProdPosition(transformData) {

    newQuoteBg.transform.x = transformData.new_quote_bg[0];
    newQuoteBg.transform.y = transformData.new_quote_bg[1];
    newQuoteBg.transform.z = transformData.new_quote_bg[2];

    newQuoteBg.transform.scaleX = transformData.new_quote_bg_scale[0];
    newQuoteBg.transform.scaleY = transformData.new_quote_bg_scale[1];
    newQuoteBg.transform.scaleZ = transformData.new_quote_bg_scale[2];

    newQuoteTxt.transform.x = transformData.new_quote_text[0];
    newQuoteTxt.transform.y = transformData.new_quote_text[1];
    newQuoteTxt.transform.z = transformData.new_quote_text[2];

    newQuoteTxt.transform.scaleX = transformData.new_quote_text_scale[0];
    newQuoteTxt.transform.scaleY = transformData.new_quote_text_scale[1];
    newQuoteTxt.transform.scaleZ = transformData.new_quote_text_scale[2];

    newProdBig.transform.x = transformData.new_prod_big[0];
    newProdBig.transform.y = transformData.new_prod_big[1];
    newProdBig.transform.z = transformData.new_prod_big[2];

    newProdBig.transform.scaleX = transformData.new_prod_big_scale[0];
    newProdBig.transform.scaleY = transformData.new_prod_big_scale[1];
    newProdBig.transform.scaleZ = transformData.new_prod_big_scale[2];

    newProdBig.transform.rotationX = transformData.new_prod_big_rotation[0] * Math.PI / 180.0;
    newProdBig.transform.rotationY = transformData.new_prod_big_rotation[1] * Math.PI / 180.0;
    newProdBig.transform.rotationZ = transformData.new_prod_big_rotation[2] * Math.PI / 180.0;

    newProdSmall.transform.x = transformData.new_prod_small[0];
    newProdSmall.transform.y = transformData.new_prod_small[1];
    newProdSmall.transform.z = transformData.new_prod_small[2];

    newProdSmall.transform.scaleX = transformData.new_prod_small_scale[0];
    newProdSmall.transform.scaleY = transformData.new_prod_small_scale[1];
    newProdSmall.transform.scaleZ = transformData.new_prod_small_scale[2];

    newProdSmall.transform.rotationX = transformData.new_prod_small_rotation[0] * Math.PI / 180.0;
    newProdSmall.transform.rotationY = transformData.new_prod_small_rotation[1] * Math.PI / 180.0;
    newProdSmall.transform.rotationZ = transformData.new_prod_small_rotation[2] * Math.PI / 180.0;

    // Front prod
    newProdBigFront.transform.x = transformData.new_prod_big[0];
    newProdBigFront.transform.y = transformData.new_prod_big[1];
    newProdBigFront.transform.z = transformData.new_prod_big[2];

    newProdBigFront.transform.scaleX = transformData.new_prod_big_scale[0];
    newProdBigFront.transform.scaleY = transformData.new_prod_big_scale[1];
    newProdBigFront.transform.scaleZ = transformData.new_prod_big_scale[2];

    newProdBigFront.transform.rotationX = transformData.new_prod_big_rotation[0] * Math.PI / 180.0;
    newProdBigFront.transform.rotationY = transformData.new_prod_big_rotation[1] * Math.PI / 180.0;
    newProdBigFront.transform.rotationZ = transformData.new_prod_big_rotation[2] * Math.PI / 180.0;

    newProdSmallFront.transform.x = transformData.new_prod_small[0];
    newProdSmallFront.transform.y = transformData.new_prod_small[1];
    newProdSmallFront.transform.z = transformData.new_prod_small[2];

    newProdSmallFront.transform.scaleX = transformData.new_prod_small_scale[0];
    newProdSmallFront.transform.scaleY = transformData.new_prod_small_scale[1];
    newProdSmallFront.transform.scaleZ = transformData.new_prod_small_scale[2];

    newProdSmallFront.transform.rotationX = transformData.new_prod_small_rotation[0] * Math.PI / 180.0;
    newProdSmallFront.transform.rotationY = transformData.new_prod_small_rotation[1] * Math.PI / 180.0;
    newProdSmallFront.transform.rotationZ = transformData.new_prod_small_rotation[2] * Math.PI / 180.0;
}

var currentBubbleName = undefined;

function getCurBubbleTxtUrl() {

    var indices = currentThemeData.quote.indices;
    var curIndex = currentThemeData.quote.curIndex
    var bubbleIndex = indices[curIndex];

    var bubbleName = "quote" + bubbleIndex;
    currentBubbleName = bubbleName;

    var bubbleUrl = CONFIG.BASE_BUBBLE_URL + bubbleName + ".png";
    Diagnostics.log("bubbleUrl: " + bubbleUrl);

    if (++currentThemeData.quote.curIndex >= currentThemeData.quote.length)
        currentThemeData.quote.curIndex = 0;

    return bubbleUrl;
}

function getCurProdTxtUrl(theme) {

    return PROD_TEX_LOOKUP_TABLE[currentProductTitle];
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
    newProdSmallFront.hidden = false;

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

    if (curTheme == THEME_NAME_LOOKUP_TABLE.crabstick) {

        newProdBigFront.hidden = false;
        newProdSmallFront.hidden = true;           
    }
    else {

        newProdSmallFront.hidden = true;
        newProdBigFront.hidden = true;
    }
}

function showNewProdSmall() {

    newProdSmall.hidden = false;
    newProdBig.hidden = true;

    if (curTheme == THEME_NAME_LOOKUP_TABLE.crabstick) {

        newProdSmallFront.hidden = false;
        newProdBigFront.hidden = true;
    }
    else {

        newProdSmallFront.hidden = true;
        newProdBigFront.hidden = true;
    }
}

function hideNewProd() {

    newProdBig.hidden = true;
    newProdSmall.hidden = true;

    if (curTheme == THEME_NAME_LOOKUP_TABLE.crabstick) {

        newProdBigFront.hidden = true;
        newProdSmallFront.hidden = true;
    }
    else {

        newProdSmallFront.hidden = true;
        newProdBigFront.hidden = true;
    }
}

foodFeederRoot0.hidden = true;

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

// --------------------------------------------------------------------------------
// @ FACE DETECTED

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
        showSandwich(SANDWICH_MODE_SWIRL);
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

    //Diagnostics.log("faceIndex: " + faceIndex + " eyeIndex: " + eyeIndex);

    var curLaserBeamLeft = laserBeamLeft;
    var curLaserBeamRight = laserBeamRight;

    if (faceIndex == 1) {

        curLaserBeamLeft = laserBeamLeft1;
        curLaserBeamRight = laserBeamRight1;
    }

    if (eyeIndex == 0) {

        curLaserBeamLeft.hidden = false;

        // Iris ref
        // https://developers.facebook.com/docs/ar-studio/tracking-people-and-places/faces/Iris-tracking/
        var eyeballInfo = IrisTracking.leftEyeball(face);

        curLaserBeamLeft.transform.position = eyeballInfo.iris;
        //curLaserBeamRight.transform.rotation = eyeballInfo.rotation;
    }
    else if (eyeIndex == 1) {

        curLaserBeamRight.hidden = false;

        var eyeballInfo = IrisTracking.rightEyeball(face);

        curLaserBeamRight.transform.position = eyeballInfo.iris;
        //curLaserBeamRight.transform.rotation = eyeballInfo.rotation;
    }
}

function onEyeClosed(faceIndex, eyeIndex) {

    //Diagnostics.log("On eye close! eyeIndex: " + eyeIndex);
    
    if (curTheme !== THEME_NAME_LOOKUP_TABLE.crabstick)
        return;

    if (faceIndex == 0) {

        if (eyeIndex == 0)
            laserBeamLeft.hidden = true;
        else if (eyeIndex == 1)
            laserBeamRight.hidden = true;
    }
    else if (faceIndex == 1) {

        if (eyeIndex == 0)
            laserBeamLeft1.hidden = true;
        else if (eyeIndex == 1)
            laserBeamRight1.hidden = true;
    }
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
    else if (curTheme === THEME_NAME_LOOKUP_TABLE.sandwich) {

        if (currentSandwichMode == SANDWICH_MODE_EAT) {

            foodFeederRoot0.hidden = false;

            newRamen.hidden = true;
            ramenPool0.hidden = true;
            testyPool0.hidden = false;
            testyPool01.hidden = false;
    
            var mouth = FaceTracking.face(0).mouth;
            foodFeederRoot0.transform.x = mouth.center.x;
            foodFeederRoot0.transform.y = mouth.center.y;
            foodFeederRoot0.transform.z = mouth.center.z;
        }
    }
    else if (curTheme == THEME_NAME_LOOKUP_TABLE.meal) {

        var mouth = FaceTracking.face(0).mouth;

        foodFeederRoot0.hidden = false;
        newRamen.hidden = true;
        ramenPool0.hidden = false;
        testyPool0.hidden = true;
        testyPool01.hidden = true;

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
// SPECIFIC FUNCTIONS
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// Bubble animation

const Y_SIDE_WEIGHT = 1.0;

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

function handleFoodFeeder(crushObjList, foodObjList0, foodObjList1, 
    foodPoolMeshList0, foodPoolMeshList1) {

    // Setup mat
    //setupFoodMat(FOOD_TEX_LOOKUP_TABLE.sandwich, foodPoolMeshList0);
    //setupFoodMat(FOOD_TEX_LOOKUP_TABLE.sandwich, foodPoolMeshList1);

    setupCrushMat(CRUSH_TEX_LOOKUP_TABLE.meal);
    
    mealShopstick00mesh.material = Materials.get("new_chopstick_mat");
    mealShopstick01mesh.material = Materials.get("new_chopstick_mat");

    // Animate shopsticks
    applyShopsticksBound(mealShopstick00_pivot, -10, 20, 600);
    applyShopsticksBound(mealShopstick01_pivot, 0, 30, 600);
    
    function setupFoodMat(texPathList, meshList) {
        setupMatTex(texPathList, FOOD_MAT_LIST, FOOD_TEX_LIST, meshList);
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

        crushVarianceX: 3.5,
        crushVarianceY: 3.5,
        crushVarianceZ: 3.5,
    }

    startRamenFeeder();
    startNormalCrushFeeder(crushObjList, foodFeederArgs);

    //startFoodFeederV2(foodObjList0, testyPool0);
    //startFoodFeederV2(foodObjList1, testyPool01);

    //startFoodFeederV3(foodObjList0, testyPool0);
    //startFoodFeederV3(foodObjList1, testyPool01);
}

function startFoodFeederV3(foodObjList, testyPool) {

    // LERP in normalized range
    const DURATION = 2000;

    const interval = { 
        durationMilliseconds: DURATION,
        loopCount: Infinity,
        mirror: false  
    };

    const driver = Animation.timeDriver(interval);
    const samp = Animation.samplers.linear(0, 1);
    const anim = Animation.animate(driver, samp);

    driver.start();

    // Adjust signal with offset
    for (var i=0; i<foodObjList.length; ++i) {

        //var offset = 0.5; // [0, 1]
        var offset = Random.random();
        var offsetSignal = anim.add(offset).mod(Reactive.val(1.0));
    
        // Manipulate obj transform
        const RANGE = 40;
        const TAIL = 20 * Random.random();
        var obj = foodObjList[i];
        obj.transform.z = offsetSignal.sub(1).mul(Reactive.val((RANGE + TAIL) * -1.0));

        const VARIANT = 20;
        const nVec = Random.random();
        obj.transform.x = offsetSignal.sub(1).mul(Reactive.val(VARIANT*nVec - VARIANT*0.5));

        const SHIFT = 20;
        obj.transform.y = offsetSignal.sub(1).mul(Reactive.val(SHIFT));
    }
}

function startFoodFeederV2(foodObjList, testyPool) {

    var RADIUS = 80;
    var VARIANT = 5;

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

    // Manipulate spin movement
    applyFoodSpinMovement(testyPool, 3000);
    /* // Alternal rotation using Euler 
    runFoodSpinMoveMent(3000);
    function runFoodSpinMoveMent(duration) {

        const swirlParms = {
            durationMilliseconds: duration,
            loopCount: Infinity,
            mirror: false  
        };

        const driver = Animation.timeDriver(swirlParms);
        const sampler = Animation.samplers.linear(0, Math.PI * 2.0 * -1.0);
        const anim = Animation.animate(driver, sampler);

        testyPool0.transform.rotationX = anim;

        driver.start();
    }
    */

    for (var i=0; i<foodObjList.length; ++i) {

        var rad = positionDataList[i][3];

        var signal0 = testyPool0.transform.rotationX.sub(rad).lt(Reactive.val(0.5 * Math.PI));
        var signal1 = testyPool0.transform.rotationX.sub(rad).gt(Reactive.val(-0.5 * Math.PI));
        var signal3 = testyPool0.transform.rotationX.sub(rad).gt(Reactive.val(1.5 * Math.PI));        
        var signalOut = signal0.and(signal1).or(signal3);

        var obj = foodObjList[i];
        
        // This technique improve performance tremendously comparing with visible/invisible
        // The old technique -> obj.hidden = signalOut.not();
        const HIDDEN_POINT = 10000; 
        obj.transform.x = signalOut.ifThenElse(Reactive.val(0), Reactive.val(HIDDEN_POINT));
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
        Materials.get("ramen_mask_mat1"), 
        Materials.get("ramen_mask_mat2"), Materials.get("ramen_mask_mat3"), 
        Materials.get("ramen_mask_mat4"), Materials.get("ramen_mask_mat5"), 
        Materials.get("ramen_mask_mat6"), Materials.get("ramen_mask_mat7"), 
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

        if (index < maskMatList.length)
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

function getThemeData(callback) {

    startGetRequest(CONFIG.GET_ASSET_LIST_URL, function(data, err) {

        Diagnostics.log("id: " + data.id);
        callback(data, err);
    });
}

// mode ∈ {"photocapture" | "videocapture" }
function postCaptureStat(mode) {

    var indices = currentThemeData.quote.indices;
    var curIndex = currentThemeData.quote.curIndex
    var bubbleIndex = indices[curIndex];

    // Get current person
    var body = {
        idinfo: currentThemeData.id,
        logtype: mode,
        param1: isFaceTracked,
        param2: curTheme,
        param3: currentProductTitle,
        param4: currentBubbleName
    };

    Diagnostics.log("postCaptureState: body: " + JSON.stringify(body));

    startPostRequest(CONFIG.POST_STAT_URL, body, function(data, err) {

        if (data != undefined)
            Diagnostics.log("Post capture stat success");
        else
            Diagnostics.log("Post capture error: " + JSON.stringify(err));
    })
}


// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

// GENERIC FUNCTIONS

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

function startGetRequest(url, callback) {

	const request = {
		method: 'GET',
		headers: { 'Content-type': 'application/json' }
	};
    
    startRequest(url, request, callback);
}

function startPostRequest(url, body, callback) {

	const request = {
		method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(body)
	};
    
    startRequest(url, request, callback);
}

function startRequest(url, request, callback) {

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
    
        // Log any errors that may have happened with the request
        Diagnostics.log('error.message: ' + error.message);
        Diagnostics.log('error: ' + error);

        if (callback != undefined)
            callback(null, error);
    });
}

// Send events for data analytics
CameraInfo.isCapturingPhoto.monitor().subscribe(function(value) {

    Diagnostics.log("Capturing Proto: value: " + value.newValue);

    // If new value == true -> means begin
    //        value == false -> means finish

    if (value.newValue)
        postCaptureStat("photocapture");
});

CameraInfo.isRecordingVideo.monitor().subscribe(function(value) {

    Diagnostics.log("Recording Video: value: " + value.newValue);

    // If new value == true -> means begin
    //        value == false -> means finish

    if (value.newValue)
        postCaptureStat("videocapture");
});

function getMaterialWithDiffuse(matName, texName) {

    var mat = Materials.get(matName);
    var tex = Textures.get(texName);
    
    mat.diffuse = tex;
    return mat;
}

function getMaterialWithDiffuseByUrl(matName, texName, url) {

    //Diagnostics.log("Get mat: " + matName);
    //Diagnostics.log("Get tex: " + texName);
    //Diagnostics.log("Load texture with URL: " + url);

    var tex = Textures.get(texName);
    tex.url = url;

    var mat = Materials.get(matName);

    mat.diffuse = tex;
    return mat;
}

// Handle mouth opening state

var isMouthOpening = [ false, false ];

function checkMouthOpeningStateWithDelay(faceIndex, openMinThres, closeMaxThres, openCallback, closCallback) {

    const interval = Time.setInterval(checkMouthOpeningState, 400);

    function checkMouthOpeningState() {

        var mouth = FaceTracking.face(faceIndex).mouth;

        var mouthOpen = mouth.openness.gt(Reactive.val(openMinThres));
        //var mouthClose = mouth.openness.lt(Reactive.val(closeMaxThres));

        var state = mouthOpen.pinLastValue();

        if (state != isMouthOpening[faceIndex]) {

            isMouthOpening[faceIndex] = state;

            if (state)
                openCallback();
            else
                closCallback();
        }
        
        Time.clearInterval(interval);
    }
}


function handleMouthOpeningState(faceIndex, openMinThres, closeMaxThres, openCallback, closCallback) {

    checkMouthOpeningStateWithDelay(faceIndex, openMinThres, closeMaxThres, openCallback, closCallback);

    var mouth = FaceTracking.face(faceIndex).mouth;

    var mouthOpen = mouth.openness.gt(Reactive.val(openMinThres));
    var mouthClose = mouth.openness.lt(Reactive.val(closeMaxThres));
    
    mouthOpen.monitor().subscribe(function(flag) {

        if (flag.newValue) {

            isMouthOpening[faceIndex] = true;
            openCallback();
        }
    });

    mouthClose.monitor().subscribe(function(flag) {

        if (flag.newValue) {

            isMouthOpening[faceIndex] = false;
            closCallback();
        }
    });
}

var isEyeClose = [ 
    [ false, false ], // Face #0 [ left, right ]
    [ false, false ]  // Face #1 [ left, right ]
];

function checkEyeOpeningStateWithDelay(faceIndex, eyeIndex, openCallback, closeCallback) {
    
    //Diagnostics.log("faceIndex: " + faceIndex + " eyeIndex: " + eyeIndex);

    const interval = Time.setInterval(checkOpeningState, 400);

    function checkOpeningState() {

        var face = FaceTracking.face(faceIndex);
        var state = undefined;

        if (eyeIndex == 0)
            state = FaceGestures.hasLeftEyeClosed(face).pinLastValue();
        else if (eyeIndex == 1)
            state = FaceGestures.hasRightEyeClosed(face).pinLastValue();

        if (state == undefined)
            return;

        if (state != isEyeClose[faceIndex][eyeIndex]) {

            //Diagnostics.log("state: " + state);

            isEyeClose[faceIndex][eyeIndex] = state;

            if (state == true)
                closeCallback(faceIndex, eyeIndex);
            else
                openCallback(faceIndex, eyeIndex);
        }

        Time.clearInterval(interval);
    }
}

// Check eye closing/opening and blink from
// Reference: https://developers.facebook.com/docs/ar-studio/reference/classes/facegesturesmodule/
function handleEyeOpeningState(faceIndex, eyeIndex, openCallback, closeCallback) {

    checkEyeOpeningStateWithDelay(faceIndex, eyeIndex, openCallback, closeCallback);

    var face = FaceTracking.face(faceIndex);

    var hasEyeClosed = undefined;

    // Get from closeness callback
    if (eyeIndex == 0)
        hasEyeClosed = FaceGestures.hasLeftEyeClosed(face);
    else if (eyeIndex == 1)
        hasEyeClosed = FaceGestures.hasRightEyeClosed(face);

    // Monitor from closeness callback
    hasEyeClosed.monitor().subscribe(function(val) {

        isEyeClose[faceIndex][eyeIndex] = val.newValue;
        
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
        }

        Time.clearInterval(interval);
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

// ********************************************************************************
// Keep this block at the last line of code
main()
// ********************************************************************************