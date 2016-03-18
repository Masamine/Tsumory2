(function (console) { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
};
var Lambda = function() { };
Lambda.exists = function(it,f) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
};
Lambda.filter = function(it,f) {
	var l = new List();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) l.add(x);
	}
	return l;
};
var List = function() {
	this.length = 0;
};
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,iterator: function() {
		return new _$List_ListIterator(this.h);
	}
};
var _$List_ListIterator = function(head) {
	this.head = head;
	this.val = null;
};
_$List_ListIterator.prototype = {
	hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		this.val = this.head[0];
		this.head = this.head[1];
		return this.val;
	}
};
var haxe_Http = function(url) {
	this.url = url;
	this.headers = new List();
	this.params = new List();
	this.async = true;
};
haxe_Http.prototype = {
	setHeader: function(header,value) {
		this.headers = Lambda.filter(this.headers,function(h) {
			return h.header != header;
		});
		this.headers.push({ header : header, value : value});
		return this;
	}
	,setPostData: function(data) {
		this.postData = data;
		return this;
	}
	,request: function(post) {
		var me = this;
		me.responseData = null;
		var r = this.req = js_Browser.createXMLHttpRequest();
		var onreadystatechange = function(_) {
			if(r.readyState != 4) return;
			var s;
			try {
				s = r.status;
			} catch( e ) {
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				s = null;
			}
			if(s != null) {
				var protocol = window.location.protocol.toLowerCase();
				var rlocalProtocol = new EReg("^(?:about|app|app-storage|.+-extension|file|res|widget):$","");
				var isLocal = rlocalProtocol.match(protocol);
				if(isLocal) if(r.responseText != null) s = 200; else s = 404;
			}
			if(s == undefined) s = null;
			if(s != null) me.onStatus(s);
			if(s != null && s >= 200 && s < 400) {
				me.req = null;
				me.onData(me.responseData = r.responseText);
			} else if(s == null) {
				me.req = null;
				me.onError("Failed to connect or resolve host");
			} else switch(s) {
			case 12029:
				me.req = null;
				me.onError("Failed to connect to host");
				break;
			case 12007:
				me.req = null;
				me.onError("Unknown host");
				break;
			default:
				me.req = null;
				me.responseData = r.responseText;
				me.onError("Http Error #" + r.status);
			}
		};
		if(this.async) r.onreadystatechange = onreadystatechange;
		var uri = this.postData;
		if(uri != null) post = true; else {
			var _g_head = this.params.h;
			var _g_val = null;
			while(_g_head != null) {
				var p;
				p = (function($this) {
					var $r;
					_g_val = _g_head[0];
					_g_head = _g_head[1];
					$r = _g_val;
					return $r;
				}(this));
				if(uri == null) uri = ""; else uri += "&";
				uri += encodeURIComponent(p.param) + "=" + encodeURIComponent(p.value);
			}
		}
		try {
			if(post) r.open("POST",this.url,this.async); else if(uri != null) {
				var question = this.url.split("?").length <= 1;
				r.open("GET",this.url + (question?"?":"&") + uri,this.async);
				uri = null;
			} else r.open("GET",this.url,this.async);
		} catch( e1 ) {
			if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
			me.req = null;
			this.onError(e1.toString());
			return;
		}
		if(!Lambda.exists(this.headers,function(h) {
			return h.header == "Content-Type";
		}) && post && this.postData == null) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		var _g_head1 = this.headers.h;
		var _g_val1 = null;
		while(_g_head1 != null) {
			var h1;
			h1 = (function($this) {
				var $r;
				_g_val1 = _g_head1[0];
				_g_head1 = _g_head1[1];
				$r = _g_val1;
				return $r;
			}(this));
			r.setRequestHeader(h1.header,h1.value);
		}
		r.send(uri);
		if(!this.async) onreadystatechange(null);
	}
	,onData: function(data) {
	}
	,onError: function(msg) {
	}
	,onStatus: function(status) {
	}
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
});
var js_Browser = function() { };
js_Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") return new XMLHttpRequest();
	if(typeof ActiveXObject != "undefined") return new ActiveXObject("Microsoft.XMLHTTP");
	throw new js__$Boot_HaxeError("Unable to create XMLHttpRequest object.");
};
var me_doqoo_Ajax = function() { };
me_doqoo_Ajax.loadData = function(target) {
	var http = new haxe_Http("files/php/load.php");
	var array = "target=" + target;
	var d = "";
	http.setPostData(array);
	http.setHeader("Content-Type","application/x-www-form-urlencoded");
	http.request(true);
	http.onData = function(data) {
		d = JSON.parse(data);
		switch(target) {
		case "client":
			src_view_SetData.showClient(d);
			break;
		case "works":
			src_view_SetData.showWorks(d);
			break;
		case "user":
			src_view_SetData.showUser(d);
			break;
		}
	};
};
var src_Main = function() { };
src_Main.JQ = function(str) {
	return $(str);
};
src_Main.main = function() {
	src_view_Html.init();
	me_doqoo_Ajax.loadData("client");
	me_doqoo_Ajax.loadData("works");
	src_Main.getURL();
};
src_Main.getURL = function() {
	$("#all").on("click",null,function(e) {
		src_Main.changeURL("index");
	});
};
src_Main.changeURL = function(a) {
	window.location.hash = a;
};
var src_view_Html = function() { };
src_view_Html.init = function() {
	src_view_Html.getHeader();
	src_view_Html.getSide();
	src_view_Html.getIndex();
};
src_view_Html.getHeader = function() {
	var html = "\n      <div class=\"inner\">\n        <p><a href=\"/home.php\"><img src=\"/files/img/common/img_logo.png\" alt=\"見積りライブラリー Tsumory\" /></a></p>\n        <ul id=\"info\">\n          <li id=\"btnsearch\"><a href=\"#\"><img src=\"/files/img/common/icon_search.png\" alt=\"\" /></a></li>\n          <li class=\"user\">\n            <a href=\"#\" id=\"avatar\"><img src=\"/files/uploads/20160119191854ika.jpg\" alt=\"\" /></a>\n            <ul id=\"menu\">\n              <li><a href=\"user.php\">ユーザー情報更新</a></li>\n              <li><a href=\"/logout.php\">ログアウト</a></li>  \n            </ul>\n          </li>\n        </ul>\n      </div>\n    ";
	src_view_Html.showHtml($("header"),html);
};
src_view_Html.getIndex = function() {
	var html = "\n      <div class=\"box\">\n        <div class=\"title\">\n          <h1>案件一覧</h1>\n          <div class=\"radbtn trigger\" id=\"reg\"><a href=\"#\">新規登録</a></div>\n        </div>\n        <div class=\"formBox regWorks\">\n          <form action=\"\" method=\"post\" class=\"accBox\" id=\"regist\" onsubmit=\"return false;\">\n            <div class=\"form\">\n              <div class=\"select\">\n                <input type=\"text\" name=\"client\" id=\"client\" placeholder=\"クライアント名\" value=\"\" class=\"input chkrequired\">\n                <span class=\"input\">▼</span>\n                <ul>\n                  <!-- List -->\n                </ul>\n              </div>\n            </div>\n            <div class=\"form\"><input type=\"text\" value=\"\" name=\"staff\" id=\"client_staff\" placeholder=\"先方担当者\"></div>\n            <div class=\"form\"><input type=\"text\" value=\"\" name=\"works\" id=\"works\" class=\"chkrequired\" placeholder=\"案件名\"></div>\n            <div class=\"radbtn\"><input type=\"submit\" class=\"submit\" id=\"submit\" value=\"登録\"></div>\n            <input type=\"hidden\" name=\"key\" value=\"KEY\">\n          </form>\n        </div>\n\n        <div id=\"names\">\n          <ul>\n            <li class=\"client\">クライアント</li>\n            <li class=\"works\">案件名</li>\n            <li class=\"update\">更新日時</li>\n          </ul>\n        </div>\n        <div id=\"data\">\n        </div>\n      </div>\n    ";
	src_view_Html.showHtml($("#showArea"),html);
};
src_view_Html.getSide = function() {
	var html = "\n      <div class=\"inner\">\n        <ul>\n          <li><a href=\"/#index\" class=\"home\">案件一覧</a></li>\n          <li><a href=\"/#cost\" class=\"cost\">単価設定</a></li>\n          <li><a href=\"/#client\" class=\"client\">クライアント一覧</a></li>\n        </ul>\n      </div>\n    ";
	src_view_Html.showHtml($("#side"),html);
};
src_view_Html.showHtml = function(target,data) {
	target.append(data);
};
var src_view_SetData = function() { };
src_view_SetData.init = function(d) {
};
src_view_SetData.showUser = function(d) {
	var length = d.length;
	console.log(d);
};
src_view_SetData.showClient = function(d) {
	var length = d.length;
};
src_view_SetData.showWorks = function(data) {
	var length = data.length;
	console.log(data);
	var i;
	var html = "";
	var _g = 0;
	while(_g < length) {
		var i1 = _g++;
		var id = data[i1].id;
		var client = data[i1].client;
		var title = data[i1].title;
		var updates = data[i1].updates;
		html += "<div class=\"list\">\n        <div class=\"names\">\n          <h2>" + client + "</h2>\n          <p class=\"works\">" + title + "</p>\n          <p class=\"update\">" + updates + "</p>\n        </div>\n        <div class=\"contents\">\n          <div class=\"inner\">\n            <div class=\"reg radbtn\"><a href=\"estimate.php?mode=regist&pid=" + id + "\">見積り登録</a></div>\n            <table class=\"listnames\">\n              <colgroup>\n                <col style=\"width:12%;\">\n                <col style=\"width:40%;\">\n                <col style=\"width:13%;\">\n                <col style=\"width:10%;\">\n                <col style=\"width:15%;\">\n                <col style=\"width:10%;\">\n              </colgroup>\n              <tr>\n                <td class=\"icon\">関連チーム</td>\n                <td class=\"detail\">要件</td>\n                <td class=\"price\">売価金額</td>\n                <td class=\"name\">更新者</td>\n                <td class=\"update\">更新日時</td>\n                <td class=\"btns\">各種機能</td>\n              </tr>\n            </table>\n            <div class=\"data\">\n              <table>\n                <colgroup>\n                  <col style=\"width:12%;\">\n                  <col style=\"width:40%;\">\n                  <col style=\"width:13%;\">\n                  <col style=\"width:10%;\">\n                  <col style=\"width:15%;\">\n                  <col style=\"width:10%;\">\n                </colgroup>\n                <tr>\n                  <td class=\"icon\">\n                    <ul>\n                      <li class=\"Web\">Web</li>\n                    </ul>\n                  </td>\n                  <td class=\"detail\"><a href=\"estimate.php?mode=edit&pid=PID&post=POSTID\">postTitle</a></td>\n                  <td class=\"price\">postTotal</td>\n                  <td class=\"name\">modUser</td>\n                  <td class=\"update\">update</td>\n                  <td class=\"btns\">\n                    <ul>\n                      <li class=\"radbtn pdf\"><a href=\"#\">PDF</a></li>\n                      <li class=\"radbtn delete\"><a href=\"#postID\">削除</a></li>\n                    </ul>\n                  </td>\n                </tr>\n              </table>\n            </div>\n          </div>\n        </div>\n      </div>";
	}
	$("#data").append(html);
};
src_Main._Browser = js_Browser;
src_Main.main();
})(typeof console != "undefined" ? console : {log:function(){}});
