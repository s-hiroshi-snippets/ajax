<?php
$createdOrder = $_POST['created_order'];

if ($_POST['form_type'] === 'textarea') {
    $value = 'Response Text: ' . $_POST['form' . $createdOrder . '_textarea'];
    header("Content-Type: text/html; charset=UTF-8");
    $response = array(
        'form' . $createdOrder . '_textarea' =>  $value,
    );
    echo json_encode($response);
}

if ($_POST['form_type'] === 'image') {
    // 画像アップロードと移動
    $image_dir = dirname(__FILE__) . '/images/';
    $fileKey = 'form' . $createdOrder . '_image';
    $file = $_FILES[$fileKey];
    if (is_uploaded_file($file['tmp_name'])) {
        move_uploaded_file($file['tmp_name'], $image_dir . $file['name']);
    }

    $value = $file['name'];
    $response = array(
        'form' . $createdOrder . '_image' =>  $value,
    );
    header("Content-Type: text/html; charset=UTF-8");
    echo json_encode($response);
}

?>
