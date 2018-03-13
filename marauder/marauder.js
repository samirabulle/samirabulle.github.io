var map;
var subscribeKey;
var publishKey;
var pubnub;
var marker;

function initMap() {
	var uwaterloo = {lat: 43.4723, lng: -80.5449};
	map = new google.maps.Map(document.getElementById('map'), {
		center: uwaterloo,
		zoom: 17
	});
	marker = new google.maps.Marker({
		map: map
	});
	console.log("Map is drawn.");
}

var main = function() {
	subscribeKey = "sub-c-0cd4fdb4-2652-11e8-8f89-fe0057f68997";
	publishKey = "pub-c-53ee49d7-c3d9-4787-b8f7-81d98202b5ff";

	pubnub = new PubNub({
	    subscribeKey: subscribeKey,
	    publishKey: publishKey,
	    ssl: true
	});

	pubnub.addListener({
		status: function(statusEvent) {
	        console.log(statusEvent.category);
	    },
	    message: function(message) {
	    	latitude = parseFloat(message.message["lat"]);
	    	longitude = parseFloat(message.message["lng"]);
	    	marker = new google.maps.Marker({
	    		position: {lat: latitude, lng: longitude},
				map: map
			});
	    	console.log("Message:", message);
	    },
	    error : function (error) {
	        // Handle error here
	        console.log(JSON.stringify(error));
	    }
	});

	pubnub.subscribe({
	    channels: ['LOCATION']
	});
}

$(document).ready(main);