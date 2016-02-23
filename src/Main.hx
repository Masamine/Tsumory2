package src;

import jQuery.*;
import js.Lib;
import js.Browser;
import me.doqoo.Ajax;
import com.greensock.*;
import com.greensock.easing.*;
import src.view.*;
import src.db.*;

class Main {

  //new JQueryを置き換え
  static inline function JQ( str:String ):JQuery { return untyped $( str ); }
  static var _Browser = js.Browser;

  public function new() {
    Html.init();
    LoadData.getClient();
  }

  public static function main():Void {
    //Ajax.PostData("1000");
    new Main();
    getURL();
  }

  public static function getURL():Void {
    JQ('#all').on('click', function(e):Void {
      _Browser.location.hash = 'index';
      // TweenMax.to(JQ('#contents'), 0.5, {
      //   'opacity' : 0,
      //   ease      : Quad.easeOut
      // });
    });
  }

  public static function setData(data:String):Void {
    trace(data);
  }

  public static function changeURL():Void {
  }

}