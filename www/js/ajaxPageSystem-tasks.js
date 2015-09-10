/*
	
	ajaxPageSystem - task
	
	
	Christian Marienfeld
	www.chrisland.de
	
	Version 1.3.2
	https://github.com/chrisland/ajaxPageSystem
	
	
	Licence MIT

*/




var log = function (str) {
	jQuery('body').append(str+'<hr>');
};

APS.task = (function(){
	var tasks = {
		
		initialize: function (page, content, e, dom) {
			
			log('init');
			var fail = function (e,f) {
				log( JSON.stringify(e) + ' ### ' + JSON.stringify(f) );	
			};
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, 
			    function onFileSystemSuccess(fileSystem) {
			        fileSystem.root.getFile(
			        "dummy.html", {create: true, exclusive: false}, 
			        function gotFileEntry(fileEntry) {
				        
				        log('file');
				        
			            var sPath = fileEntry.fullPath.replace("dummy.html","");
			            var fileTransfer = new FileTransfer();
			            fileEntry.remove();
			
			            fileTransfer.download(
			                "http://www.h-sechs.de/test/bild.jpg",
			                sPath + "theFile.jpg",
			                function(theFile) {
			                    log("download complete: " + theFile.toURI());
			                    showLink(theFile.toURI());
			                },
			                function(error) {
			                    log("download error source " + error.source);
			                    log("download error target " + error.target);
			                    log("upload error code: " + error.code);
			                }
			            );
			        }, fail);
			    }, fail);
		
			
			
			return true;
		}
				
	};
	return tasks;
}());


