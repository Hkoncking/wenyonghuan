<?php
    $link = mysqli_connect('localhost', 'root', 'root', 'users');
    $sql = "SELECT `cat_one_id` FROM `goods` GROUP BY `cat_one_id`";
    $res = mysqli_query($link, $sql);
    $data = mysqli_fetch_all($res, MYSQLI_ASSOC);
    echo json_encode(array(
        "message" => "获取一级分类列表",
        "code" => 1,
        "list" => $data 
    ));
?>