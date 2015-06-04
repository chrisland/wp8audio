/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        
        alert('done '+getPhoneGapPath());
        
       // alert(cordova.file.applicationDirectory);
        
        window.resolveLocalFileSystemURL("www/index.html", gotFile, fail);
        	
        	
        //alert(cordova.file.applicationDirectory);
        
        document.getElementById('play1').addEventListener ('click', play1, false);
        document.getElementById('play2').addEventListener ('click', play2, false);
        document.getElementById('play3').addEventListener ('click', play3, false);
        
/*
        
       var a = $.get('sounds/audio1.mp3');
        
        console.log(a);
        
        
*/
        
/*
        
	    // if initializeDefaultPlugins returns false, we cannot play sound in this browser
	    if (!createjs.Sound.initializeDefaultPlugins()) {return;}
	 
	    var audioPath = "sounds/";
	    var sounds = [
	        {id:"Music", src:"audio1.ogg"}
	    ];
	 
	    createjs.Sound.alternateExtensions = ["mp3"];
	    createjs.Sound.addEventListener("fileload", handleLoad);
	    createjs.Sound.registerSounds(sounds, audioPath);
*/


		//console.log(window.appRootDir.fullPath);
		
/*
		
		

		var mypath = location.pathname;
		
		var idx = mypath.lastIndexOf('/');
		
		var backgroundMusicFilePath = mypath.substring(0, idx + 1) + "sounds/audio1.mp3";
		
		
		alert(backgroundMusicFilePath);
*/
/*
		var html = '...';
		
		
		html = location.pathname+'<hr>'+window.location.pathname+'<hr>';
		
		
		alert(cordova.file.applicationDirectory);
		
*/
	
		//document.getElementById('info').innerHTML = JSON.stringify(window, null, 2);
		
       // playAudio('ms-appdata://www/sounds/audio1.mp3');
    }
};


function play1 () {
	playAudio('ms-appdata://sounds/audio1.mp3');
}

function play2 () {
	playAudio('file:///sounds/audio1.mp3');
}

function play3 () {
	playAudio('file:///www/sounds/audio1.mp3');
}


function playAudio(url) {
    // Play the audio file at url
    
    alert(url);
    
    var my_media = new Media(url,
        // success callback
        function () { alert("playAudio():Audio Success"); },
        // error callback
        function (err) { alert("playAudio():Audio Error: " + JSON.stringify(err) ); }
    );

    // Play audio
    my_media.play();


}


function handleLoad(event) {
	alert('play');
    createjs.Sound.play(event.src);
}

function getPhoneGapPath() {

    var path = window.location.pathname;
    path = path.substr( path, path.length - 10 );
    return 'file://' + path;

};









function fail(e) {
	alert("FileSystem Error");
	alert( JSON.stringify(e) );
}

function gotFile(fileEntry) {

	fileEntry.file(function(file) {
		var reader = new FileReader();

		reader.onloadend = function(e) {
			alert("Text is: "+this.result);
			document.querySelector("#info").innerHTML = this.result;
		}

		reader.readAsText(file);
	});

}