<?php 

$accessRequestEmails = 'lea.ikkache@gatech.edu, jason.freeman@gatech.edu, magerko@gatech.edu';
$normalRequestEmails = 'lea.ikkache@gatech.edu, jason.freeman@gatech.edu, magerko@gatech.edu'; 

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$name = $request->username;
$email_address = $request->useremail;
$url = $request->userbiolink;
$message = $request->message;
$accessRequest = $request->accessRequest;

if ($accessRequest) {
	$to = $accessRequestEmails;
	$email_subject = "EarSketch contact form: $name";
	$email_body = "A Teacher has requested a password to access EarSketch resources. ".
	" Here are the details:\n Name: $name \n Email: $email_address \n URL: $url \n Message: $message \n";

	$headers = "From: noreply@earsketch.gatech.edu\n";
	$headers .= "Reply-To: $email_address";

	mail($to,$email_subject,$email_body,$headers);
} else {
	$to = $normalRequestEmails;
	$email_subject = "EarSketch contact form: $name";
	$email_body = "New message from EarSketch contact form. ".
	" Here are the details:\n Name: $name \n Email: $email_address \n Message: $message \n";

	$headers = "From: noreply@earsketch.gatech.edu\n";
	$headers .= "Reply-To: $email_address";

	mail($to,$email_subject,$email_body,$headers);
}

?>