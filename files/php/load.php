<?php

require('config.php');
require('connectDB.php');

$target = $_POST['target'];

if($target == 'client') {
  getClient();
}

switch ($target) {
  case 'client':
    getClient();
    break;
  case 'works':
    getWorks();
    break;
  case 'client':
    break;
  case 'client':
    break;
}

/* ----------------------------------
クライアント一覧
---------------------------------- */
function getClient() {

  global $pdo;

  $query = "SELECT * FROM client";
  $stmt = $pdo->prepare($query);

  $stmt->execute();
  $array = array();

  while($row = $stmt -> fetch(PDO::FETCH_ASSOC)) {
    $array[] = array(
      "id"   => $row['id'],
      "name" => $row['name']
    );
  }

  header('Content-Type: application/json; charset=utf-8');
  print(json_encode($array));

  $pdo = null;

  return false;
}

/* ----------------------------------
案件一覧
---------------------------------- */
function getWorks() {

  global $pdo;

  $query = "SELECT * FROM works";
  $stmt = $pdo->prepare($query);

  $stmt->execute();
  $array = array();

  while($row = $stmt -> fetch(PDO::FETCH_ASSOC)) {
    $array[] = array(
      "id"     => $row['id'],
      "client" => $row['client'],
      "title"  => $row['title'],
      "staff"  => $row['staff'],
      "regist" => $row['regist'],
      "updates"   => $row['updates']
    );
  }

  header('Content-Type: application/json; charset=utf-8');
  print(json_encode($array));

  $pdo = null;

  return false;
}

?>