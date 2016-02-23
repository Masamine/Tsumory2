package src.db;

import jQuery.*;
import me.doqoo.Ajax;

class SetData {

  //new JQueryを置き換え
  static inline function JQ( str:String ):JQuery { return untyped $( str ); }

  /* =================================================================
  Set Client
  ================================================================= */
  public static function init(d:String):Void {
    trace(d);
  }
}