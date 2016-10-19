var restify = require('restify');
var builder = require('botbuilder');
var apiai = require('apiai');
var app = apiai("db847b425ad44ca38e2d696d8b0750cd");

//=========================================================
// Bot Setup
//=========================================================



// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
var connector = new builder.ChatConnector({
    appId: '4f5df286-2591-477d-af7d-547dd13a0156',
    appPassword: 'oTwfDnKyx1gCwiQoP53k2oC'
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Global Actions
//=========================================================

bot.endConversationAction('goodbye', 'Goodbye :)', { matches: /^goodbye/i });

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', [
    function (session) {
        //console.log("hi");
        //console.log(session.user.name);
        //console.log(session);
        //session.send('Hi, Welcome to the Verizon, How can we help??');
       // console.log(JSON.stringify(session)); 
       //session.send('Ok... Changed your name to %s', session.userData.name);
        session.beginDialog('/startsession');
    }
]);

bot.dialog('/startsession', [
    function (session)
           { 
                var options =
                    {
                        sessionId: '94642ab5-31b3-4eac-aa1f-d4ef57284007'
                    } 
                console.log("inside startsession");
                var request = app.textRequest(session.message.text, options);   
                request.on('response', function (response) 
                {        
                   /* var intent = response.result.action;
                    //console.log(JSON.stringify(response));     
                    session.send(response.result.fulfillment.speech);   
                    console.log(response.result.fulfillment.data);
                    console.log(response.result.fulfillment.data.facebook.attachment);
                    
                    var msg = new builder.Message(session).sourceEvent(
                    {
                        facebook: response.result.fulfillment.data.facebook.attachment
                    });
                    //console.log(msg); 
                    
                    session.send(msg);   */
                    
                    var actualFBMessage={"attachment":{"type":"template","payload":{"template_type":"generic","elements":[{"title":"Login to Verizon","image_url":"https://www.verizon.com/cs/groups/public/documents/adacct/vzlogo_lg.png","buttons":[{"type":"account_link","url":"https://www98.verizon.com/foryourhome/myaccount/ngen/upr/bots/preauth.html"}]}]}}};
                    var datResponse={"speech":"Sign in ","data":{"facebook": actualFBMessage},"contextOut":[{"name":"sigin", "lifespan":2, "parameters":{"type":"signin"}}],"source":"apiaiwebhook"};
                    session.send(datResponse);
                });  
                request.on('error', function (error)
                {
                   console.log(error);  
                }); 
                request.end();
           }
]);









