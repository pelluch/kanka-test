
var _device = arguments[0].device;
var _graphic =  null;

App.log('Row with device ', _device);

$.uid.setText(_device.deviceName);
updateValues();


function updateValues() {

	App.log('Updating with values: ', {
		temperature: _device.temperature,
		lowThreshold: _device.lowThreshold,
		highThreshold: _device.highThreshold,
		preAlarmDelta: _device.preAlarmDelta
	});
	
	$.temperatureLabel.setText(_device.temperature);
	$.lowThresholdLabel.setText(_device.lowThreshold);
	$.highThresholdLabel.setText(_device.highThreshold);
	$.preAlarmDeltaLabel.setText(_device.preAlarmDelta);
}

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
}

var thresholded = false;
function connect(e) {
	params = {
		onConnect: function(e) {
			App.log('onConnect');
			$.button.setTitle('Desconectar');
			$.status.setText("Conectado");
			$.status.setColor('green');
			_device = e;
			updateValues();
		},
		onDisconnect: function(e) {
			App.log('onDisconnect');
			$.button.setTitle('Conectar');
			$.status.setText("Desconectado");
			_device = e;
			updateValues();
		},
		onTemperatureChange: function(e) {
			App.log('onTemperatureChange');
				// App.log('Temperature changed');
				// App.log(e);
				var temp = e.temperature;

				// $.temperature.setText(temp + 'ºC');
				if(_graphic) {
					_graphic.onTemperatureChange(temp);
				}
				_device = e;
				updateValues();
			},
			onThreshold: function(e) {
				App.log('onThreshold');
				if(thresholded) {
					return;
				}

				thresholded = true;

				_device = e;
				updateValues();

			},
			onAlarmAcknowledge: function(e) {
				App.log('onAlarmAcknowledge');

				_device = e;
				updateValues();
			},
			onPrealarmStateChange: function(e) {
				App.log('onPrealarmStateChange');

				if(e.state === "ACKNOWLEDGED_OR_REDUNDANT") {
					if(OS_ANDROID) {
						var notification = Titanium.Android.createNotification({
							contentTitle: 'Cocción casi lista',
							contentText : 'La cocción está casi lista',
					    // Blank intent that will remove the notification when the user taps it
					    // Do not override the default value of the 'flags' property
					    contentIntent: Ti.Android.createPendingIntent({intent: Ti.Android.createIntent({})}),
	    				// Image file located at /platform/android/res/drawable/warn.png
	    				icon: Ti.Android.R.drawable.ic_dialog_alert,
	    				number: 1,
	    				when: new Date()
	    			});
						Titanium.Android.NotificationManager.notify(1, notification);
					}
				}
				_device = e;
				updateValues();
			}
		};

		var lowThreshold = parseInt($.lowThreshold.getValue());
		var highThreshold = parseInt($.highThreshold.getValue());
		var alarmDelta = parseInt($.alarmDelta.getValue());



		if(!_.isNaN(lowThreshold)) {
			params.lowThreshold = lowThreshold;
		}
		if(!_.isNaN(highThreshold)) {
			params.highThreshold = highThreshold;
		}
		if(!_.isNaN(alarmDelta)) {
			params.preAlarmDelta = alarmDelta;
		}
		if(!_device.connected) {
			App.Bluetooth.connectDevice(_device.uniqueId, params);
		} else {
			App.Bluetooth.disconnectDevice(_device.uniqueId, params);
		}

	}

	function viewGraphic(e) {
		if(OS_ANDROID) {
			_graphic.getView().open();
		} else {
			Alloy.Globals.NavigationWindow.openWindow($.getView());
		}

	}

	function resetDevice(e) {
		App.Bluetooth.resetDevice(_device.uniqueId);
	}

	function acknowledgeAlarm(e) {
		App.Bluetooth.acknowledgeAlarm(_device.uniqueId);
	}


	function highThresholdChanged(e) {
		App.log('Changed');
		if(!_.isNaN($.highThreshold.getValue()) && $.highThreshold.getValue() !== "") {
			App.Bluetooth.setRecipe(_device.uniqueId, {
				highThreshold: parseInt($.highThreshold.getValue())
			});
		}
	}

	function lowThresholdChanged(e) {
		if(!_.isNaN($.lowThreshold.getValue()) && $.lowThreshold.getValue() !== "") {
			App.Bluetooth.setRecipe(_device.uniqueId, {
				lowThreshold: parseInt($.lowThreshold.getValue())
			});
		}
	}

	function preAlarmDeltaChanged(e) {
		if(!_.isNaN($.alarmDelta.getValue()) && $.alarmDelta.getValue() !== "") {
			App.Bluetooth.setRecipe(_device.uniqueId, {
				preAlarmDelta: parseInt($.alarmDelta.getValue())
			});
		}
	}

