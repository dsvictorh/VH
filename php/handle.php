<?php

require_once("services/work.php");
require_once("services/mail.php");

header("Content-Type: application/json");


//Controller handlers - Using REQUEST in order to have the services available both by post and get
if(isset($_REQUEST["controller"]) && !empty($_REQUEST["controller"])) {
  switch($_REQUEST["controller"]){
    case "mail":
        handle_mail($_REQUEST["action"]);
      break;
    case "work":
        handle_work($_REQUEST["action"]);
      break;
    default:
      http_response_code(501);
      echo json_encode("Controller " . $_REQUEST["controller"] . " does not exist");
      break;
  }
}else{
  http_response_code(500);
  echo json_encode("No controller called");
}


//Action handlers
function handle_work($action){
  if(isset($action) && !empty($action)) {
    switch($action){
      case "list":
        try{
          echo json_encode(WorkService::list_work());
        }catch(Exception $ex){
          http_response_code(500);
          echo json_encode($ex->getMessage());
        }
        break;
      default:
        http_response_code(501);
        echo json_encode("Action " . $action . " does not exist");
        break;
    }
  }else{
    http_response_code(501);
    echo json_encode("No action defined");
  }
}

function handle_mail($action){
  if(isset($action) && !empty($action)) {
    switch($action){
      case "send":
        try{
          echo json_encode(MailService::send());
        }catch(Exception $ex){
          http_response_code(500);
          echo json_encode($ex->getMessage());
        }
        break;
      default:
        http_response_code(501);
        echo json_encode("Action " . $action . " does not exist");
        break;
    }
  }else{
    http_response_code(501);
    echo json_encode("No action defined");
  }
}

?>