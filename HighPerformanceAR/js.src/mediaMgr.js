// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
// Video canvas
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------

var mediaMgr = {

    augmentedImage: undefined,
    canvas: undefined,

    video: undefined,
    context: undefined,

    modeVideo: "modeVideo",
    modeCamera: "modeCamera",
    mode: undefined,

    videoToImageRatio: 1.0,

    start: function() {

        mode = this.modeVideo;

        // Verify
        if (!this.augmentedImage) {

            wonderCore.log("augmentedImage is undefined");
            return;   
        }

        if (!this.canvas) {

            wonderCore.log("canvas is undefined");
            return;
        }

        this.context = this.canvas.getContext('2d');

        if (mode === this.modeVideo) {

            if (!this.video) {

                wonderCore.log("video is undefined");
                return;
            }

            this.video.addEventListener("play", function() {

                // Do nothing
            }, false);
        }
    },

    processMedia: function() {

        if (this.video.paused || this.video.ended) {  
            return;  
        }  

        // Render video on canvas
        var width = this.video.videoWidth;
        var height = this.video.videoHeight;
        var cols = this.video.videoWidth * this.videoToImageRatio;
        var rows = this.video.videoHeight * this.videoToImageRatio;

        this.canvas.width = cols;
        this.canvas.height = rows;

        this.context.drawImage(this.video, 0, 0, width, height, 0, 0, cols, rows);

        // Render grayscale on the same canvas
        var imageData = this.context.getImageData(0, 0, cols, rows);
        var dataBuffer = new jsfeat.data_t(cols * rows, imageData.data.buffer);
        var mat = new jsfeat.matrix_t(cols, rows, jsfeat.U8_t | jsfeat.C4_t, dataBuffer);

        var gray = new jsfeat.matrix_t(mat.cols, mat.rows, jsfeat.U8_t | jsfeat.C1_t);
        jsfeat.imgproc.grayscale(mat.data, mat.cols, mat.rows, gray);
        this.context.putImageData(matrix2img(gray), 0, 0);
    }
};