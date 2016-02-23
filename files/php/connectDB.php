<?php
	$pdo = new PDO('mysql:host='.DB_HOST.';dbname='.DB_NAME.';charset=utf8',DB_USER,DB_PASS,array(PDO::ATTR_EMULATE_PREPARES => false));
?>