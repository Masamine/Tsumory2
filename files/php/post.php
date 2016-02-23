<?php

require('config.php');
require('connectDB.php');

$msg    = $_POST['msg'];
$result = $msg;

DB();

function DB() {

  global $pdo;

  $query = "SELECT * FROM team";
  $stmt = $pdo->prepare($query);

  $stmt->execute();
  $array = array();

  while($row = $stmt -> fetch(PDO::FETCH_ASSOC)) {
    $array[] = array(
      "id"   => $row['id'],
      "name" => $row['name']
    );
  }
  $pdo = null;

  print(json_encode($array));
}

function test() {

  global $result, $msg;

  header('Content-Type: application/json; charset=utf-8');

  if(isset($msg)) {
    print(json_encode($result));
  } else {
    print(json_encode('ERROR'));
  }
}

?>