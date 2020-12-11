<?php

    $username = $_POST['username'];
    $password = $_POST['password'];
    $nikename = $_POST['nikename'];
    $link = mysqli_connect('127.0.0.1', 'root', 'root', 'users');
    $sql = "SELECT * FROM `forusers` WHERE `username`='$username'";
    $res = mysqli_query($link, $sql);
    $data = mysqli_fetch_all($res, MYSQLI_ASSOC);
    if (count($data)) {
        echo json_encode(array(
            "message" => "该用户已经存在",
            "code" => 0,
        ));
    }else{
        $sql = "INSERT INTO `forusers` (`username`,`password`,`nikename`) VALUES ('$username','$password','$nikename')";
        $res = mysqli_query($link, $sql);
        mysqli_close($link);
        echo json_encode(array(
            "message" => "用户注册成功",
            "code" => 1,
        ));
    };

?>