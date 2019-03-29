// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
// Camera canvas
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------

var mediaMgr = {

    augmentedImage: null,
    canvas: undefined,

    context: undefined,
    video: undefined,

    modeVideo: "modeVideo",
    modeCamera: "modeCamera",
    mode: undefined,

    start: function() {

        mode = this.modeVideo;

        // Verify vars
        isValid = !!this.augmentedImage && !!this.canvas;

        if (!this.augmentedImage) {

            wonderCore.log("augmentedImage is undefined");
            return;   
        }

        if (!this.canvas) {

            wonderCore.log("canvas is undefined");
            return;
        }

        // Todo: Get context from canvas
        //&& !!this.context && !!this.video

        if (mode === this.modeVideo) {

            // Todo: Get video from context

            this.video.addEventListener("play", function() {
        
                self.width = self.video.width;  
                self.height = self.video.height; 
            
            }, false);
        }
    },

    computeFrame: function() {

        var image = this.video;
        var cols = image.width;
        var rows = image.height;
        vcanvas.width = cols;
        vcanvas.height = rows;
        context.drawImage(image, 0, 0, image.width, image.height, 0, 0, cols, rows);

        var imageData = context.getImageData(0, 0, cols, rows);
        var dataBuffer = new jsfeat.data_t(cols * rows, imageData.data.buffer);
        var mat = new jsfeat.matrix_t(cols, rows, jsfeat.U8_t | jsfeat.C4_t, dataBuffer);

        var gray = new jsfeat.matrix_t(mat.cols, mat.rows, jsfeat.U8_t | jsfeat.C1_t);
        jsfeat.imgproc.grayscale(mat.data, mat.cols, mat.rows, gray);

        context.putImageData(matrix2img(gray), 0, 0);

        crossScriptMatching(image);

        // Todo: move this code block to the proper place
        //     This is just hotfix
        var oContext = overlay.getContext('2d');
        oContext.clearRect(0, 0, overlay.width, overlay.height);
        //renderSatisfyPatternShaper(oContext, 0);
        //renderSmoothShape(oContext);

        // Todo: move this code block to the proper place
        // Draw image on C+ cluster
        oContext.drawImage(chickenOnMars, bound2X0, bound2Y0, 
                            Math.abs(bound2X1 - bound2X0), 
                            Math.abs(bound2Y2 - bound2Y0));
    }

};


/*
// Load image as augmented data
var chickenOnMars = new Image();
chickenOnMars.src = "../resources/superb_chicken_on_mars.png";



// Get access to the camera!
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

    computeFrame = function() {

        var image = this.video;
        var cols = image.width;
        var rows = image.height;
        vcanvas.width = cols;
        vcanvas.height = rows;
        context.drawImage(image, 0, 0, image.width, image.height, 0, 0, cols, rows);

        var imageData = context.getImageData(0, 0, cols, rows);
        var dataBuffer = new jsfeat.data_t(cols * rows, imageData.data.buffer);
        var mat = new jsfeat.matrix_t(cols, rows, jsfeat.U8_t | jsfeat.C4_t, dataBuffer);

        var gray = new jsfeat.matrix_t(mat.cols, mat.rows, jsfeat.U8_t | jsfeat.C1_t);
        jsfeat.imgproc.grayscale(mat.data, mat.cols, mat.rows, gray);

        context.putImageData(matrix2img(gray), 0, 0);

        crossScriptMatching(image);

        // Todo: move this code block to the proper place
        //     This is just hotfix
        var oContext = overlay.getContext('2d');
        oContext.clearRect(0, 0, overlay.width, overlay.height);
        //renderSatisfyPatternShaper(oContext, 0);
        //renderSmoothShape(oContext);

        // Todo: move this code block to the proper place
        // Draw image on C+ cluster
        oContext.drawImage(chickenOnMars, bound2X0, bound2Y0, 
                            Math.abs(bound2X1 - bound2X0), 
                            Math.abs(bound2Y2 - bound2Y0));
    }
    
    timerCallback = function() {  
        if (this.video.paused || this.video.ended) {  
            return;  
        }  

        this.computeFrame();  
        var self = this;  

        setTimeout(function () {  
            self.timerCallback();  
        }, 16); // roughly 60 frames per second  
    }

    this.video.addEventListener("play", function() {
    
        self.width = self.video.width;  
        self.height = self.video.height; 
        self.timerCallback();
    
    }, false);
}
*/