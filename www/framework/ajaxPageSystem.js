
/*
	
	ajaxPageSystem
	
	
	Christian Marienfeld
	www.chrisland.de
	
	Version 1.3.3
	https://github.com/chrisland/ajaxPageSystem
	
	
	Licence MIT

*/


var APS = APS || {};
APS.page = (function(){
	var options = {
		handler: 'pageBtn',
		displayStyle: 'block',
		offButton: 'pageBtnOffline',
		mockupDebug: false,
		mockup: {},
		container: 'page'
	},
	open = 0,
	lastopen = 0,
	timerOverlay = 0,
	pageHistory = [],
	overlayDom = 'overlay',
	overlayPath = function (str) {
		return	'url(img/overlay/'+str+'.svg)';
	},
	$_page = undefined,
	$_pages = {},
	initialize = function (opt) {
		
		
		for (var i in opt) {
			if(opt.hasOwnProperty(i)){
				options[i] = opt[i];
			}
		}

		$_page = document.getElementById(options.container);
		
		if ( lastopen ) {
			APS.page.changePageById(lastopen);
		} else {
			if (options.start) {
				APS.page.changePageById(options.start, options.task);
			}
		}
		return open;
	},
	makeMockupBtn = function (dom, i) {
		var wrap = document.createElement('div');
	    wrap.style.position = 'absolute';
	    wrap.style.width = 0;
	    wrap.style.height = 0;
	    wrap.style.top = 0;
	    wrap.style.left = 0;
	    for(var a = 0; a < dom.length; a++) {
		    var note = dom[a];
		    var btn = document.createElement('button');
		    btn.style.position = 'absolute';
		    btn.style.zindex = 9999999+i+a;
		    btn.style.left = note.x+'vw';
		    btn.style.top = note.y+'vh';
		    btn.style.width = note.width+'vw';
		    btn.style.height = note.height+'vh';
		    btn.style.border = 0;
		    btn.style.outline = 0;
		    btn.style.curser = 'pointer';
		    btn.style.backgroundColor = 'rgba(0,0,0,0)';
		    if (options.mockupDebug == true) {
			    btn.style.backgroundColor = 'rgba(255,200,0,0.5)';
			    btn.style.border = '1px solid #ffc800';
			    if (note.title) {
				    btn.innerHTML = note.title;
			    }
		    }
		    btn.setAttribute('class', options.handler);
		    btn.setAttribute('data-page', note.page);
		    btn.setAttribute('data-task', note.task);
		    btn.setAttribute('data-content', note.content);
		    wrap.appendChild(btn);
	    }
	    return wrap;
	},
	changePageById = function(pageId,pageTask,pageContent) {

		var task = changeContent( null, pageTask, pageContent, pageId);
		if (task) {
			fadePageDom(pageId, function () {
				if (typeof(task) === "function") {
					task();
				}
				addBtnEventListener();
				addPageHistory(pageId,pageTask,pageContent);
			});
			return true;
		}
		//addBtnEventListener();
		
		return false;
	},
	changePage = function (e) {
		if (e.classList.contains(options.offButton)) {
			return false;
		}
		var pageId = e.getAttribute('data-page'),
			pageTask = e.getAttribute('data-task'),
			pageContent = e.getAttribute('data-content');
		var task = changeContent( e, pageTask, pageContent, pageId );
		if (task) {
			fadePageDom(pageId, function () {
				if (typeof(task) === "function") {
					task();
				}
				addBtnEventListener();
				addPageHistory(pageId,pageTask,pageContent);
			});
		}
		
		//addBtnEventListener();
		return false;
	},
	changeContent = function (e, task, content, pageId) {
		if (task == 'back') {
			var history = getPageHistory();
			var last = history[history.length-2];
			if (!last) {
				return false;
			}
			if (last.pageId) {
				APS.page.changePageById(last.pageId,last.pageTask,last.pageContent);				
				kickLastPageHistory(2);
			}
			return true;	
		} else if (APS.task && APS.task[task]) {
			return APS.task[task](pageId,content,e,$_page);
		}
		return true;
	}
	fadePageDom = function (pageId, callback) {
				if (pageId) {
			jQuery.ajax({
		      url: 'tmpl/'+pageId+'.tpl',
		      dataType: 'html',
		      cache: false,
		      success: function(data, status, response) {
		        
		        
		        $_page.innerHTML = data;
		        
				if (options.mockup[pageId]) {
				    var wrap = makeMockupBtn(options.mockup[pageId], pageId);
				    $_page.appendChild(wrap);
			    }
				lastopen = open;
				open = pageId;
				
				if (callback) {
					callback();
				}
		      }
		    });
		    			
		}
		return false;
	},
	addBtnEventListener = function () {
		var clickHandler = function (e) {
			var ref = this.getAttribute('data-page'),
				task = this.getAttribute('data-task');
			if ( ref || task ) {
				if (open == ref) {
					return false;	
				}
				changePage(this);
			}
		};
		var $_pageBtn = document.getElementsByClassName(options.handler);
		for(var i = 0; i < $_pageBtn.length; i++) {
			$_pageBtn[i].style.curser = 'pointer';  // IOS BUG
			$_pageBtn[i].addEventListener('click',clickHandler);
		}
	},
	addPageHistory = function (pageId,pageTask,pageContent) {
		if (pageId) {
			var obj = {
				pageId: pageId,
				pageTask: pageTask,
				pageContent: pageContent
			};
			pageHistory.push(obj);	
		}
	},
	getPageHistory = function () {
		if (pageHistory) {
			return pageHistory;
		}
		return false;
	},
	kickLastPageHistory = function (anz) {
		pageHistory = pageHistory.slice(0, pageHistory.length - anz);
	},
	openOverlay = function (type,time) {
		var $_overlay = document.getElementById(overlayDom);
		$_overlay.style.backgroundImage = overlayPath(type);
		$_overlay.style.display = options.displayStyle;
		if (time) {
			clearTimeout(timerOverlay);
			timerOverlay = setTimeout(function (){
				closeOverlay();
			},time);
		}
	},
	closeOverlay = function () {
		document.getElementById(overlayDom).style.display = 'none';
	};
	
	return {
		initialize: initialize
		,changePageById: changePageById
		,clickEvents: addBtnEventListener
		,openOverlay: openOverlay
		,closeOverlay: closeOverlay
	}
}());