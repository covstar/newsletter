const express = require("express");

const https = require("https");

const bodyParser = require("body-parser");

const request = require("request");

const app = express();
        app.use(express.static("public"));

        app.use(bodyParser.urlencoded({extended: true}));


            app.get("/", function(req, res){
                res.sendFile(__dirname + "/signup.html");
            })

        app.post("/", function(req, res){

                const firstName = req.body.firstName;
                const lastName = req.body.lastName;
                const email = req.body.email;

            const data = {
                members: [
                    {
                        email_address: email,
                        status: "subscribed",
                        merge_fields: {
                            FNAME: firstName,
                            LNAME: lastName
                        }
                    }
                ]
            }


            const jsonData = JSON.stringify(data);

            const url = "https://us14.api.mailchimp.com/3.0/lists/950d57e5d5";

            const options = {
                method: "POST",
                auth: "covstar:1bebbcff13befc5ca61a2c186a3ce9f8-us14" 
                
            }
            
        
            const request =  https.request(url, options, function(response){

                // if response is successfully posted or not 
                if(response.statusCode === 200){
                    res.sendFile(__dirname + "/success.html")
                }else{
                    res.sendFile(__dirname + "/failure.html")
                }

                
                    response.on("data", function(data){
                        console.log(JSON.parse(data));
                    })  
                })

                request.write(jsonData);
                request.end();
                
            });

            // redirecting after failure or success
            app.post("/failure", function(req, res){
                res.redirect("/");
            })

            app.post("/success", function(req, res){
                res.redirect("/");
            });


app.listen(process.env.PORT || 3000, function(){
    console.log("Started listening on port 3000");
});

 


