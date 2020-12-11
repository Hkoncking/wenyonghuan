<?php

    $username = $_POST['username'];
    $password = $_POST['password'];
    $link = mysqli_connect('127.0.0.1', 'root', 'root', 'users');
    $sql = "SELECT * FROM `forusers` WHERE `username`='$username' AND `password`='$password'";
    $res = mysqli_query($link, $sql);
    $data = mysqli_fetch_all($res, MYSQLI_ASSOC);
    mysqli_close($link);
    if (count($data)) {
        echo json_encode(array(
            "message" => "用户登录成功",
            "code" => 1,
            "nikename" => $data[0]['nikename']
        ));
    }else{
        echo json_encode(array(
            "message" => "用户名或密码错误",
            "code" => 0
        ));
    };


?>