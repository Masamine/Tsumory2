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
EReg.__name__ = true;
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
};
var Lambda = function() { };
Lambda.__name__ = true;
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
List.__name__ = true;
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
_$List_ListIterator.__name__ = true;
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
Math.__name__ = true;
var haxe_Http = function(url) {
	this.url = url;
	this.headers = new List();
	this.params = new List();
	this.async = true;
};
haxe_Http.__name__ = true;
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
var haxe_Log = function() { };
haxe_Log.__name__ = true;
haxe_Log.trace = function(v,infos) {
	js_Boot.__trace(v,infos);
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js_Boot.__trace = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ": "; else msg = "";
	msg += js_Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js_Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js_Boot.__unhtml(msg) + "<br/>"; else if(typeof console != "undefined" && console.log != null) console.log(msg);
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
var js_Browser = function() { };
js_Browser.__name__ = true;
js_Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") return new XMLHttpRequest();
	if(typeof ActiveXObject != "undefined") return new ActiveXObject("Microsoft.XMLHTTP");
	throw new js__$Boot_HaxeError("Unable to create XMLHttpRequest object.");
};
var me_doqoo_Ajax = function() { };
me_doqoo_Ajax.__name__ = true;
me_doqoo_Ajax.JQ = function(str) {
	return $(str);
};
me_doqoo_Ajax.loadData = function(sql,target) {
	var http = new haxe_Http("files/php/load.php");
	var array = "target=" + target;
	var d = "";
	http.setPostData(array);
	http.setHeader("Content-Type","application/x-www-form-urlencoded");
	http.request(true);
	http.onData = function(data) {
		d = me_doqoo_Ajax._JSON.parse(data);
		src_db_LoadData.showClient(d);
	};
};
me_doqoo_Ajax.showError = function() {
	haxe_Log.trace("ERROR",{ fileName : "Ajax.hx", lineNumber : 57, className : "me.doqoo.Ajax", methodName : "showError"});
};
var src_Main = function() {
	src_view_Html.init();
	src_db_LoadData.getClient();
};
src_Main.__name__ = true;
src_Main.JQ = function(str) {
	return $(str);
};
src_Main.main = function() {
	new src_Main();
	src_Main.getURL();
};
src_Main.getURL = function() {
	$("#all").on("click",null,function(e) {
		window.location.hash = "index";
	});
};
src_Main.setData = function(data) {
	haxe_Log.trace(data,{ fileName : "Main.hx", lineNumber : 40, className : "src.Main", methodName : "setData"});
};
src_Main.changeURL = function() {
};
var src_db_LoadData = function() { };
src_db_LoadData.__name__ = true;
src_db_LoadData.JQ = function(str) {
	return $(str);
};
src_db_LoadData.init = function() {
};
src_db_LoadData.getClient = function() {
	var sql = src_db_LoadData.QUERY + "client";
	me_doqoo_Ajax.loadData(sql,"client");
};
src_db_LoadData.showClient = function(d) {
	var length = d.length;
	haxe_Log.trace(d,{ fileName : "LoadData.hx", lineNumber : 29, className : "src.db.LoadData", methodName : "showClient", customParams : [length]});
};
var src_view_Html = function() { };
src_view_Html.__name__ = true;
src_view_Html.JQ = function(str) {
	return $(str);
};
src_view_Html.init = function() {
	src_view_Html.getHeader();
	src_view_Html.getSide();
	src_view_Html.getIndex();
};
src_view_Html.getHeader = function() {
	var html = "\n      <div class=\"inner\">\n        <p><a href=\"/home.php\"><img src=\"/files/img/common/img_logo.png\" alt=\"見積りライブラリー Tsumory\" /></a></p>\n        <ul id=\"info\">\n          <li id=\"btnsearch\"><a href=\"#\"><img src=\"/files/img/common/icon_search.png\" alt=\"\" /></a></li>\n          <li class=\"user\">\n            <a href=\"#\" id=\"avatar\"><img src=\"/files/uploads/20160119191854ika.jpg\" alt=\"\" /></a>\n            <ul id=\"menu\">\n              <li><a href=\"user.php\">ユーザー情報更新</a></li>\n              <li><a href=\"/logout.php\">ログアウト</a></li>\n            </ul>\n          </li>\n        </ul>\n      </div>\n    ";
	src_view_Html.showHtml($("header"),html);
};
src_view_Html.getIndex = function() {
	var html = "\n      <div class=\"box\">\n        <div class=\"title\">\n          <h1>案件一覧</h1>\n          <div class=\"radbtn trigger\" id=\"reg\"><a href=\"#\">新規登録</a></div>\n        </div>\n        <div class=\"formBox regWorks\">\n          <form action=\"\" method=\"post\" class=\"accBox\" id=\"regist\" onsubmit=\"return false;\">\n            <div class=\"form\">\n              <div class=\"select\">\n                <input type=\"text\" name=\"client\" id=\"client\" placeholder=\"クライアント名\" value=\"\" class=\"input chkrequired\">\n                <span class=\"input\">▼</span>\n                <ul>\n                  <!-- List -->\n                </ul>\n              </div>\n            </div>\n            <div class=\"form\"><input type=\"text\" value=\"\" name=\"staff\" id=\"client_staff\" placeholder=\"先方担当者\"></div>\n            <div class=\"form\"><input type=\"text\" value=\"\" name=\"works\" id=\"works\" class=\"chkrequired\" placeholder=\"案件名\"></div>\n            <div class=\"radbtn\"><input type=\"submit\" class=\"submit\" id=\"submit\" value=\"登録\"></div>\n            <input type=\"hidden\" name=\"key\" value=\"KEY\">\n          </form>\n        </div>\n\n        <div id=\"names\">\n          <ul>\n            <li class=\"client\">クライアント</li>\n            <li class=\"works\">案件名</li>\n            <li class=\"update\">更新日時</li>\n          </ul>\n        </div>\n        <div id=\"data\">\n          <div class=\"list\">\n            <div class=\"names\">\n              <h2>NAME</h2>\n              <p class=\"works\">TITLE</p>\n              <p class=\"update\">UPDATE</p>\n            </div>\n            <div class=\"contents\">\n              <div class=\"inner\">\n                <div class=\"reg radbtn\"><a href=\"estimate.php?mode=regist&pid=WORKSID\">見積り登録</a></div>\n                <table class=\"listnames\">\n                  <colgroup>\n                    <col style=\"width:12%;\">\n                    <col style=\"width:40%;\">\n                    <col style=\"width:13%;\">\n                    <col style=\"width:10%;\">\n                    <col style=\"width:15%;\">\n                    <col style=\"width:10%;\">\n                  </colgroup>\n                  <tr>\n                    <td class=\"icon\">関連チーム</td>\n                    <td class=\"detail\">要件</td>\n                    <td class=\"price\">売価金額</td>\n                    <td class=\"name\">更新者</td>\n                    <td class=\"update\">更新日時</td>\n                    <td class=\"btns\">各種機能</td>\n                  </tr>\n                </table>\n                <div class=\"data\">\n                  <table>\n                    <colgroup>\n                      <col style=\"width:12%;\">\n                      <col style=\"width:40%;\">\n                      <col style=\"width:13%;\">\n                      <col style=\"width:10%;\">\n                      <col style=\"width:15%;\">\n                      <col style=\"width:10%;\">\n                    </colgroup>\n                    <tr>\n                      <td class=\"icon\">\n                        <ul>\n                          <li class=\"Web\">Web</li>\n                        </ul>\n                      </td>\n                      <td class=\"detail\"><a href=\"estimate.php?mode=edit&pid=PID&post=POSTID\">postTitle</a></td>\n                      <td class=\"price\">postTotal</td>\n                      <td class=\"name\">modUser</td>\n                      <td class=\"update\">update</td>\n                      <td class=\"btns\">\n                        <ul>\n                          <li class=\"radbtn pdf\"><a href=\"#\">PDF</a></li>\n                          <li class=\"radbtn delete\"><a href=\"#postID\">削除</a></li>\n                        </ul>\n                      </td>\n                    </tr>\n                  </table>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    ";
	src_view_Html.showHtml($("#showArea"),html);
};
src_view_Html.getSide = function() {
	var html = "\n      <div class=\"inner\">\n        <ul>\n          <li><a href=\"/#index\" class=\"home\">案件一覧</a></li>\n          <li><a href=\"/#cost\" class=\"cost\">単価設定</a></li>\n          <li><a href=\"/#client\" class=\"client\">クライアント一覧</a></li>\n        </ul>\n      </div>\n    ";
	src_view_Html.showHtml($("#side"),html);
};
src_view_Html.showHtml = function(target,data) {
	target.append(data);
};
String.__name__ = true;
Array.__name__ = true;
me_doqoo_Ajax._JSON = JSON;
src_Main._Browser = js_Browser;
src_db_LoadData.QUERY = "SELECT * FROM ";
src_Main.main();
})(typeof console != "undefined" ? console : {log:function(){}});
