
var _device = arguments[0].device;
var _graphic =  Alloy.createController('graphic');;
var connected = false;

App.log('Row with device ', _device);

$.uid.setText(_device.uniqueId);

exports.update = function(device) {
	_device = device;
	var visible = device.discovered;
	if(visible) {
		$.button.show();
		$.status.setText("Visible");
	} else {
		$.button.hide();
		$.status.setText("No visible");
	}
	if(device.temperature) {
		$.temperature.setText(device.temperature);
	}
}


function connect(e) {
	if(!connected) {
		App.Bluetooth.connectDevice(_device.uniqueId, {
			onConnect: function(e) {
				connected = true;
				$.button.setTitle('Desconectar');
				App.log('Connected');
				$.status.setText("Conectado");
			},
			onDisconnect: function(e) {
				$.button.setTitle('Conectar');
				$.temperature.setText("N/A");
				connected = false;
				App.log('Disconnected');
				$.status.setText("Desconectado");
			},
			onTemperatureChange: function(e) {
				App.log('Temperature changed');
				App.log(e);
				var temp = e.temperature;

				$.temperature.setText(temp + 'ºC');
				if(_graphic) {
					_graphic.onTemperatureChange(temp);
				}
			},
			onThreshold: function(e) {
				App.log('Threshold reached');
			},
			onArlarmAkcknowledge: function(e) {
				App.log('Alarm acknowledge');
			},
			onPrealarmStateChange: function(e) {
				App.log('onPrealarmStateChange');
			}
		});
	} else {
		App.Bluetooth.disconnectDevice(_device.uniqueId);

	}
}

function viewGraphic(e) {
	
		_graphic.getView().open();

}