
const Scene = require('Scene');
const Reactive = require('Reactive');
const Animation = require('Animation');
const Diagnostics = require('Diagnostics');
const Networking = require('Networking');

var train = Scene.root.find('plane_01');

Diagnostics.log(train);

//==============================================================================
// Animate the plane's horizontal position continuously
//==============================================================================

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

//==============================================================================
// Session ID handler
//==============================================================================

const domain = 'https://powerful-lowlands-46130.herokuapp.com';
const randomId = domain + '/random_id';

// Send the request to the url
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
	
	Diagnostics.log("request: " + JSON.stringify(request));
	
	//==============================================================================
	// Send the request and log the results
	//==============================================================================
	
	// Send the request to the url
	Networking.fetch(randomId, request).then(function(result) {
	
		// Check the status of the result
		// (https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
		if ((result.status >= 200) && (result.status < 300)) {
	
			Diagnostics.log('Get random ID success');
			
			// If the request was successful, chain the JSON forward
			return result.json();
		}
	
		// If the request was not successful, throw an error
		throw new Error('HTTP status code - ' + result.status);
	
	}).then(function(json) {
	
		// Log the JSON obtained by the successful request
		Diagnostics.log('Get random ID success: ' + json);
		
		var randId = json.data.rand_id;
		Diagnostics.log("randId: " + randId);

		//nameTxt.text = randId;
	
	}).catch(function(error) {
	
		// Log any errors that may have happened with the request
		Diagnostics.log('error.message: ' + error.message);
		Diagnostics.log('error: ' + error);
	});
}

getRandomId();