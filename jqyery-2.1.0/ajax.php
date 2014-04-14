<?php
$value = 'Response Text: ' . $_POST[ 'mytextarea' ];
header( "Content-Type: text/html; charset=UTF-8" );
$response = array(
    'mytextarea' => $value,
);
echo json_encode( $response );
