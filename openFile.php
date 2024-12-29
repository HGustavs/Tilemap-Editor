<?php
    $lines = file('php://input');
    $str="";

    foreach($lines as $key=>$value){
        if(($key>3)&&($key<(count($lines)-1))) $str.=$value;
    }
    echo $str;
?>