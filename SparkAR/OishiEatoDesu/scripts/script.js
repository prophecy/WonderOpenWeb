//==============================================================================
// Require
//==============================================================================

const Scene = require('Scene');
const Diagnostics = require('Diagnostics');
const FaceTracking = require('FaceTracking');

var quote = Scene.root.find('quote');

//==============================================================================
// Plane tracking and the whole state management
//==============================================================================

//const face = FaceTracking.face(0);

FaceTracking.count.monitor().subscribe( function(e) {
    // if count is greater then zero, then we have a face, so show 
    // the cloud setting hidden to false
    if (e.newValue > 0) {
        quote.hidden = false;
    } else {
    // otherwise we hide the cloud
    quote.hidden = true;
    }
})