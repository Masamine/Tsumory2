package me.doqoo;

import js.Lib;
import js.Browser;
import jQuery.*;
import haxe.Http;
import haxe.JSon;
import src.db.LoadData;


class Ajax {

  //new JQueryを置き換え
  static inline function JQ( str:String ):JQuery { return untyped $( str ); }
  static var _JSON = haxe.Json;

  public static function loadData(sql:String, target:String):Void {
    var http = new Http("files/php/load.php");
    var array :String = "target=" + target;
    var d = "";

    http.setPostData(array);
    http.setHeader( "Content-Type", "application/x-www-form-urlencoded" );
    http.request( true ); //true:POST, false:GET 

    http.onData  = function( data ) {
      //SetData.init(data);
      d = _JSON.parse(data);
      LoadData.showClient(d);
      //trace(d);
    }
  }

  // public static function postData(d:String) {

  //   d = (d.length < 1) ? "ERROR!" : d;

  //   var http = new Http("files/php/post.php");
  //   var array :String = "msg=" + d;

  //   http.onData  = function( data:String ) {
  //     loadData(data);
  //   }
  //   // http.onError = function( msg:String ) {
  //   //   showError(msg);
  //   // }

  //   http.setPostData(array);

  //   http.setHeader( "Content-Type", "application/x-www-form-urlencoded" );
  //   http.request( true );

  // }

  //Show ERROR
  static function showError() {
    trace("ERROR");
  }

}