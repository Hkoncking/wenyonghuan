<?php

$one = $_GET['cat_one'];
$two = $_GET['cat_two'];
$three = $_GET['cat_three'];
$method = $_GET['sort_method'];
$type = $_GET['sort_type'];
$current = $_GET['current'];
$pagesize = $_GET['pagesize'];

$link = mysqli_connect('localhost', 'root', 'root', 'users');
$sql = "SELECT * FROM `goods`";
if($one != 'all') $sql .= " WHERE `cat_one_id`='$one'";
if($two != 'all') $sql .= " AND `cat_two_id`='$two'";
if($three != 'all') $sql .= " AND `cat_three_id`='$three'";

$res = mysqli_query($link, $sql);
$data = mysqli_fetch_all($res, MYSQLI_ASSOC);
$total = ceil(count($data) / $pagesize);

echo json_encode(array(
    "message" => "获取总数成功",
    "code" => 1,
    "total" => $total,
    "sql" => $sql
));
?>