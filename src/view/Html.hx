package src.view;

import jQuery.*;
import me.doqoo.Ajax;
import com.greensock.*;
import com.greensock.easing.*;

class Html {

  //new JQueryを置き換え
  static inline function JQ( str:String ):JQuery { return untyped $( str ); }

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
    showHtml(JQ('header'), html);
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
          <div class="list">
            <div class="names">
              <h2>NAME</h2>
              <p class="works">TITLE</p>
              <p class="update">UPDATE</p>
            </div>
            <div class="contents">
              <div class="inner">
                <div class="reg radbtn"><a href="estimate.php?mode=regist&pid=WORKSID">見積り登録</a></div>
                <table class="listnames">
                  <colgroup>
                    <col style="width:12%;">
                    <col style="width:40%;">
                    <col style="width:13%;">
                    <col style="width:10%;">
                    <col style="width:15%;">
                    <col style="width:10%;">
                  </colgroup>
                  <tr>
                    <td class="icon">関連チーム</td>
                    <td class="detail">要件</td>
                    <td class="price">売価金額</td>
                    <td class="name">更新者</td>
                    <td class="update">更新日時</td>
                    <td class="btns">各種機能</td>
                  </tr>
                </table>
                <div class="data">
                  <table>
                    <colgroup>
                      <col style="width:12%;">
                      <col style="width:40%;">
                      <col style="width:13%;">
                      <col style="width:10%;">
                      <col style="width:15%;">
                      <col style="width:10%;">
                    </colgroup>
                    <tr>
                      <td class="icon">
                        <ul>
                          <li class="Web">Web</li>
                        </ul>
                      </td>
                      <td class="detail"><a href="estimate.php?mode=edit&pid=PID&post=POSTID">postTitle</a></td>
                      <td class="price">postTotal</td>
                      <td class="name">modUser</td>
                      <td class="update">update</td>
                      <td class="btns">
                        <ul>
                          <li class="radbtn pdf"><a href="#">PDF</a></li>
                          <li class="radbtn delete"><a href="#postID">削除</a></li>
                        </ul>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ';
    showHtml(JQ('#showArea'), html);
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

    showHtml(JQ('#side'), html);
  }

  /* =================================================================
  Show HTML
  ================================================================= */
  public static function showHtml(target:JQuery, data:String):Void {
    target.append(data);
  }

}