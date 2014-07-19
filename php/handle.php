require_once("recaptchalib.php");

if(isset($_POST["action"]) && !empty($_POST["action"])) {
	switch($_POST["action"]){
		case "mail":
			break;
		default:
			http_response_code(501);
			echo json_encode("Action does not exist");
			break;
	}
}

/* FOR LATER USE

  require_once('recaptchalib.php');
  $privatekey = "your_private_key";
  $resp = recaptcha_check_answer ($privatekey,
                                $_SERVER["REMOTE_ADDR"],
                                $_POST["recaptcha_challenge_field"],
                                $_POST["recaptcha_response_field"]);

  if (!$resp->is_valid) {
    // What happens when the CAPTCHA was entered incorrectly
    die ("The reCAPTCHA wasn't entered correctly. Go back and try it again." .
         "(reCAPTCHA said: " . $resp->error . ")");
  } else {
    // Your code here to handle a successful verification
  }

*/