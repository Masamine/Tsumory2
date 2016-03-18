package src.view;

import jQuery.*;
import me.doqoo.Ajax;
import com.greensock.*;
import com.greensock.easing.*;

class Html {

  public static function init():Void {
    getHeader();
    getSide();
    getIndex();
  }

  /* =================================================================
  Get Header
  ================================================================= */
  public static function getHeader():Void {

    var html:String = '
      <div class="inner">
        <p><a href="/home.php"><img src="/files/img/common/img_logo.png" alt="見積りライブラリー Tsumory" /></a></p>
        <ul id="info">
          <li id="btnsearch"><a href="#"><img src="/files/img/common/icon_search.png" alt="" /></a></li>
          <li class="user">
            <a href="#" id="avatar"><img src="/files/uploads/20160119191854ika.jpg" alt="" /></a>
            <ul id="menu">
              <li><a href="user.php">ユーザー情報更新</a></li>
              <li><a href="/logout.php">ログアウト</a></li>  
            </ul>
          </li>
        </ul>
      </div>
    ';
    showHtml(new JQuery('header'), html);
  }

  /* =================================================================
  Get Home
  ================================================================= */
  public static function getIndex():Void {
    var html:String = '
      <div class="box">
        <div class="title">
          <h1>案件一覧</h1>
          <div class="radbtn trigger" id="reg"><a href="#">新規登録</a></div>
        </div>
        <div class="formBox regWorks">
          <form action="" method="post" class="accBox" id="regist" onsubmit="return false;">
            <div class="form">
              <div class="select">
                <input type="text" name="client" id="client" placeholder="クライアント名" value="" class="input chkrequired">
                <span class="input">▼</span>
                <ul>
                  <!-- List -->
                </ul>
              </div>
            </div>
            <div class="form"><input type="text" value="" name="staff" id="client_staff" placeholder="先方担当者"></div>
            <div class="form"><input type="text" value="" name="works" id="works" class="chkrequired" placeholder="案件名"></div>
            <div class="radbtn"><input type="submit" class="submit" id="submit" value="登録"></div>
            <input type="hidden" name="key" value="KEY">
          </form>
        </div>

        <div id="names">
          <ul>
            <li class="client">クライアント</li>
            <li class="works">案件名</li>
            <li class="update">更新日時</li>
          </ul>
        </div>
        <div id="data">
        </div>
      </div>
    ';
    showHtml(new JQuery('#showArea'), html);
  }

  /* =================================================================
  Get Sidebar
  ================================================================= */
  public static function getSide():Void {
    var html:String = '
      <div class="inner">
        <ul>
          <li><a href="/#index" class="home">案件一覧</a></li>
          <li><a href="/#cost" class="cost">単価設定</a></li>
          <li><a href="/#client" class="client">クライアント一覧</a></li>
        </ul>
      </div>
    ';

    showHtml(new JQuery('#side'), html);
  }

  /* =================================================================
  Show HTML
  ================================================================= */
  public static function showHtml(target:JQuery, data:String):Void {
    target.append(data);
  }

}