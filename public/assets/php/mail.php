<?php

$to 		= 'demo@demo.com';
$headers	= 'FROM: "'.$email.'"';

//All form values
$name 		= 	$_POST['name'];
$subject 	= 	$_POST['subject'];
$email 		= 	$_POST['email'];
$phone 		= 	$_POST['phone'];
$msg 			= 	$_POST['msg'];
$output 	= 	"Name: ".$name.
							"\nSubject: ".$subject.
							"\nEmail: ".$email.
							"\nPhone: ".$phone.
							"\n\nMessage: ".$msg;

$send		= mail($to, $name, $output, $headers);