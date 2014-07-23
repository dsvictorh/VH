<?php

require_once("connection.php");

class WorkService{
    public static function list_work(){
        try{
            $con = $GLOBALS["db"]->open();
            $result = $con->query("CALL vh_get_work_list");
            
           if(!$result){
                throw new Exception("WorkService - vh_get_work_list: Could not execute stored procedure vh_get_work_list. MySQL Error: " . $con->errno);
           }
            
           while($row = $result->fetch_assoc()){
                $output[] = $row;
           }

           return $output;
            
        }catch(Exception $ex){             
            throw $ex;        
        }finally{
            $GLOBALS["db"]->close();
        }
    }
}

?>
