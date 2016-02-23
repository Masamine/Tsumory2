package src.db;

import jQuery.*;
import me.doqoo.Ajax;

class LoadData {

  //new JQueryを置き換え
  static inline function JQ( str:String ):JQuery { return untyped $( str ); }
  public static var QUERY:String = "SELECT * FROM ";

  public static function init():Void {

  }

  /* =================================================================
  Get Client
  ================================================================= */
  public static function getClient():Void {
    var sql:String = QUERY + "client";
    Ajax.loadData(sql, 'client');
  }

  /* =================================================================
  Show Client
  ================================================================= */
  public static function showClient(d):Void {
    var length = d.length;
    trace(d, length);
  }
  
}