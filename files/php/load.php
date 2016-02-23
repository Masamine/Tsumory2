<?php

require('config.php');
require('connectDB.php');

$target = $_POST['target'];

if($target == 'client') {
  getClient();
}

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

?>