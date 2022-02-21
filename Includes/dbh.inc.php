<?php
$dbServername = "***.***.***.***";
$dbUsername = "**********";
$dbPassword = "***********";
$dbName = "*************";
$conn = mysqli_connect($dbServername, $dbUsername, $dbPassword, $dbName);
if (!$conn) {
    die("Connection Failed: " . mysqli_connect_error());
}
?>