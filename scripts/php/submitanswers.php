<?php 

header("Access-Control-Allow-Origin: *");   
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT");         
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, X-Codingpedia");

// // Allow from any origin
// if (isset($_SERVER['HTTP_ORIGIN'])) {
//     header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
//     header('Access-Control-Allow-Credentials: true');
//     header('Access-Control-Max-Age: 86400');    // cache for 1 day
// }

// // Access-Control headers are received during OPTIONS requests
// if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

//     if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
//         header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

//     if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
//         header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

//     exit(0);
// }

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