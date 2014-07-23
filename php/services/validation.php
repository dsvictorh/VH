<?php
class Validation{
    //RegEx
    const SPECIAL_CHARS_REGEX = '';
    const ALPHANUM_REGEX = '';
    const EMAIL_REGEX = '';
    const NUMBER_REGEX = '';

    //Errors
    const REQUIRED = "r";
    const SPECIAL_CHARS = "sc";
    const ALPHANUM = "a";
    const EMAIL = "e";
    const NUMBER = "n";


    //Validate a field according to the validations list sent
    public static function validate($field, $validations, &$message){
        if(isset($validations[self::REQUIRED]) && empty($field["value"])){
            $message = $field["name"] . " is required";
            return self::REQUIRED;
        }
        
        if(isset($validations[self::SPECIAL_CHARS]) && preg_match(self::SPECIAL_CHARS_REGEX, $field["value"])){
            $message = $field["name"] . " contains non-valid characters";
            return self::SPECIAL_CHARS;
        }

        if(isset($validations[self::ALPHANUM]) && preg_match(self::ALPHANUM_REGEX, $field["value"])){
            $message = $field["name"] . " contains non-alphanumeric characters";
            return self::ALPHANUM;
        }

        if(isset($validations[self::EMAIL]) && preg_match(self::EMAIL_REGEX, $field["value"])){
            $message = $field["name"] . " is not a valid e-mail address";
            return self::EMAIL;
        }

        if(isset($validations[self::NUMBER]) && preg_match(self::NUMBER_REGEX, $field["value"])){
            $message = $field["name"] . " contains non-numeric characters";
            return self::NUMBER;
        }

        return "";
    }
}

?>
