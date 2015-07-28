
var service = Titanium.Android.currentService;
var intent = service.intent;
// var message = intent.getStringExtra("message_to_echo");
//Titanium.API.info("Hello World!  I am a Service.  I have this to say: " + message);
if(Alloy.Globals.Sound) {
	Alloy.Globals.Sound.stop();
}

service.stop();
