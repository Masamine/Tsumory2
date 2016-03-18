package src;

import jQuery.*;
import js.Lib;
import js.Browser;
import me.doqoo.Ajax;
import src.view.*;
import src.db.*;

class Main {

  //new JQueryを置き換え
  static inline function JQ( str:String ):JQuery { return untyped $( str ); }
  static var _Browser = js.Browser;

  public static function main():Void {
    //Ajax.PostData("1000");
    Html.init();
    Ajax.loadData('client');
    Ajax.loadData('works');
    getURL();
  }

  public static function getURL():Void {
    JQ('#all').on('click', function(e):Void {
      changeURL('index');
    });
  }

  public static function changeURL(a:String):Void {
    _Browser.location.hash = a;
  }

}