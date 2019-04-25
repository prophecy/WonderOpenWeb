//==============================================================================
// Require
//==============================================================================

const Scene = require('Scene');
const Animation = require('Animation');
const Diagnostics = require('Diagnostics');
const Networking = require('Networking');
const Patches = require('Patches');

//==============================================================================
// Data Models
//==============================================================================

var apiDataModel = {
	randId: undefined,
	sceneId: undefined
}

var trackingDataModel = {
	canTrack: false,
}

var gameState = {
	none: 0,
	ready: 1,

	currentState: 0, // none by default
}

//==============================================================================
// Main logic
//==============================================================================

function startIfReady() {
	/*
	if (apiDataModel.randId !== undefined &&
		apiDataModel.sceneId !== undefined &&
		trackingDataModel.canTrack === true)
		{
			// Start the game
			if (gameState.currentState === gameState.none)
			{
				Diagnostics.log("Start game");
				startGame();
			}

			// Set game state
			gameState.currentState = gameState.ready;
		}
		*/
}

function startGame() {

	if (apiDataModel.sceneId === "shinkansen")
		startTrainScene();
}

//==============================================================================
// Plane tracking and the whole state management
//==============================================================================

Patches.setBooleanValue("isScanInstVisible", true);
var targetPlane = Scene.root.find('planeTracker0');

// Track target image
// Ref: https://developers.facebook.com/docs/ar-studio/docs/visual-programming/javascript-to-patch-bridging/
var confidenceSub = targetPlane.confidence.monitor().subscribe(function (e) {

	Diagnostics.log("e.newValue: " + e.newValue);

	if (e.newValue == 'HIGH') {
		confidenceSub.unsubscribe();

		Diagnostics.log("Object tracking ready!");

		// Update the Script to Editor signal named "targetFound
		//Patches.setPulseValue("targetFound", Reactive.once());
		trackingDataModel.canTrack = true;
		startIfReady();

		// Hide instruction
		Patches.setBooleanValue("isScanInstVisible", false);

		// Open scene manually
		startTrainScene();
	}
});

//==============================================================================
// Animate the plane's horizontal position continuously
//==============================================================================

function startTrainScene() {
	
	var train = Scene.root.find('plane_01');

	// Set visibility
	Patches.setBooleanValue("trainSceneVisible", true);
	
	// Create a set of time driver parameters
	const timeDriverParameters = {
	
		// The duration of the driver
		durationMilliseconds: 7500,
	
		// The number of iterations before the driver stops
		loopCount: Infinity,
	
		// Should the driver 'yoyo' back and forth
		mirror: false
	};
	
	// Create a time driver using the parameters
	const timeDriver = Animation.timeDriver(timeDriverParameters);
	
	// Create a sampler with a quadratic change in and out from -5 to 5
	const quadraticSampler = Animation.samplers.easeInOutQuad(-900, 900);
	
	// Create an animation combining the driver and sampler
	const translationAnimation = Animation.animate(timeDriver, quadraticSampler);
	
	train.transform.x = translationAnimation;
	
	// Start the time driver (unlike value drivers this needs to be done explicitly)
	timeDriver.start();		
}

//==============================================================================
// APIs
//==============================================================================

const domain = 'https://powerful-lowlands-46130.herokuapp.com';
const sceneInfo = domain + '/scene_info';
const randomId = domain + '/random_id';

// API when state
getSceneInfo();
getRandomId();

//==============================================================================
// Scene info

function getSceneInfo() {

	Diagnostics.log("getSceneInfo()");

	// Create a request object
	const request = {
	
		// The HTTP Method of the request
		// (https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
		method: 'GET',
	
		// The HTTP Headers of the request
		// (https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
		headers: {
			'Content-type': 'application/json'
		}
	};
	
	Diagnostics.log("SceneInfo: request: " + JSON.stringify(request));
	
	// Send the request to the url
	Networking.fetch(sceneInfo, request).then(function(result) {
	
		// Check the status of the result
		// (https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
		if ((result.status >= 200) && (result.status < 300)) {
	
			Diagnostics.log('SceneInfo: success');
			
			// If the request was successful, chain the JSON forward
			return result.json();
		}
	
		// If the request was not successful, throw an error
		throw new Error('SceneInfo: HTTP status code - ' + result.status);
	
	}).then(function(json) {
	
		var sceneId = json.data.scene_id;
		Diagnostics.log("SceneInfo: scene_id " + sceneId);

		apiDataModel.sceneId = sceneId;
		startIfReady();
	
	}).catch(function(error) {
	
		// Log any errors that may have happened with the request
		Diagnostics.log('SceneInfo: error.message: ' + error.message);
		Diagnostics.log('SceneInfo: error: ' + error);
	});
}

//==============================================================================
// Random ID

function getRandomId() {

	Diagnostics.log("getRandomId()");

	// Create a request object
	const request = {
	
		// The HTTP Method of the request
		// (https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
		method: 'GET',
	
		// The HTTP Headers of the request
		// (https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
		headers: {
			'Content-type': 'application/json'
		}
	};
	
	Diagnostics.log("RandId: request: " + JSON.stringify(request));
	
	// Send the request to the url
	Networking.fetch(randomId, request).then(function(result) {
	
		// Check the status of the result
		// (https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
		if ((result.status >= 200) && (result.status < 300)) {
	
			Diagnostics.log('RandId: success');
			
			// If the request was successful, chain the JSON forward
			return result.json();
		}
	
		// If the request was not successful, throw an error
		throw new Error('RandId: HTTP status code - ' + result.status);
	
	}).then(function(json) {
	
		var randId = json.data.rand_id;
		Diagnostics.log("randId: " + randId);

		apiDataModel.randId = randId;
		startIfReady();
	
	}).catch(function(error) {
	
		// Log any errors that may have happened with the request
		Diagnostics.log('RandId: error.message: ' + error.message);
		Diagnostics.log('RandId: error: ' + error);
	});
}