package src.view;

import jQuery.*;
import haxe.JSon;

class SetData {

  /* =================================================================
  Init
  ================================================================= */
  public static function init(d:String):Void {
  }

  /* =================================================================
  Show User
  ================================================================= */
  public static function showUser(d):Void {
    var length = d.length;
    trace(d);
  }

  /* =================================================================
  Show Client
  ================================================================= */
  public static function showClient(d):Void {
    var length = d.length;
    //trace(d);
  }

  /* =================================================================
  Show Workss
  ================================================================= */
  public static function showWorks(data:String):Void {
    var length : Int = data.length;

    trace(data);
    
    var i;
    var html = "";

    for( i in 0...length ) {

      var id :Int         = untyped ${data[i].id};
      var client :Int     = untyped ${data[i].client};
      var title :String   = untyped ${data[i].title};
      var updates :String = untyped ${data[i].updates};

      html +='<div class="list">
        <div class="names">
          <h2>$client</h2>
          <p class="works">$title</p>
          <p class="update">$updates</p>
        </div>
        <div class="contents">
          <div class="inner">
            <div class="reg radbtn"><a href="estimate.php?mode=regist&pid=$id">見積り登録</a></div>
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
      </div>';

    }
    new JQuery("#data").append(html);
  }
}