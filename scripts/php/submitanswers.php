<?php 

$emails = 'avroshkumar@gmail.com';
/* $emails = 'avroshkumar@gmail.com , raccio@gmail.com'; */

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$name = $request->fullname;
$email_address = $request->emailaddress;
$message = $request->message;
$answers = $request->answers;


	$to = $emails;
	$email_subject = "Listening Test completed by: $name";
	$email_body = "Listening Test completed".
	" Here are the details:\n Name: $name \n Email: $email_address \n Message: $message \n Data: $answers";

	$headers = "From: noreply@listeningtest.edu\n";
	$headers .= "Reply-To: $emails";

	mail($to,$email_subject,$email_body,$headers);

?>