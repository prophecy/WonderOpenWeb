/*****************************************************************************************/
//    MY OWN SOURCE CODE IS HERE .... ... .. .  .   .
/*****************************************************************************************/

var rootPath = require("./AppConfig").rootPath;
var WonderPath = require(rootPath + "Utility").SetupWonderPath(rootPath);

var WonderHttpServer = require(WonderPath("WonderHttpServer"));
var mongoose = WonderHttpServer.GetMongoose();

/*****************************************************************************************/
//    MongoDB Schema .... ... .. .  .   .
/*****************************************************************************************/

var greetingSchema = mongoose.Schema({
    
    greeting: String,
    
});

var Greeting = mongoose.model("greeting", greetingSchema);

var ScoreSchema = mongoose.Schema({

    username: String,
    score: String,
})

var Score = mongoose.model("score", ScoreSchema);

/*****************************************************************************************/
//    Express API(s) .... ... .. .  .   .
/*****************************************************************************************/

exports.PostScore = function(req, res, next) {

    console.log("username: " + req.username);

    if (!req.body || !req.body.score){

        res.error = {code:"invalidArgument", message:"Invalid argument"};
        next();
        return;
    }

    var score = JSON.stringify(req.body.score);
    console.log("score: " + score);

    res.data = { message: "I have your score: " + score };
    next();
}

exports.SayGreeting = function(req, res, next) {

    var greetingTxt = "Somewher over the rainbow~";

    console.log("I gonna say, " + greetingTxt);

    Greeting.update(
        { "greeting": greetingTxt },
        { $set: 
            {
                "greeting": greetingTxt
            }
        },
        { upsert: true },
        function (err, result) {

            if (err) {

                console.log("Omg! It's error");

                res.error = err;
                next();
                return;
            }

            console.log("Success");

            res.data = { message: "Says, " + greetingTxt }
            next();
        }
    );
}