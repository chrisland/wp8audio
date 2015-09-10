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



var _app = {

    initialize: function() {

        this.bindEvents();

    },
    bindEvents: function() {
	    
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
	
		
		$('meta[name=viewport]').attr('content','user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height='+window.innerHeight+'px,  target-densitydpi=medium-dpi');
        
        
        
		//jQuery('body').append(navigator.userAgent);
		
		//screen.lockOrientation('portrait');

/*
        if (device.platform == 'Android') {
	    	

			document.addEventListener('backbutton', function () {

				var back = APS.page.changePageById(undefined, 'back');
				
				if (!back) {
					navigator.app.exitApp();
				}
				
			}, false);
		
	    }
	    
*/
	    
	    APS.page.initialize({
			start: 'home',
			handler: 'pageBtn',
			container: 'page',
			task: 'initialize'
		});
		
	    

	    
		
		window.addEventListener('orientationchange', app.doOnOrientationChange);
		
    },
    doOnOrientationChange: function (){
	    

		switch(window.orientation) {  
			case -90:
			case 90:
				setTimeout(function(){
					var ScreenHeight = screen.height;
					document.body.style.height = '100%';
					window.innerHeight = ScreenHeight;
				},1);
				
				break; 
			default:
				var ScreenHeight = screen.height;
				document.body.style.height = "100%";
				window.innerHeight = ScreenHeight;
				
				break; 
		}
	}
 	
};
