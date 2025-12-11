<?php 
// App/Models/LoginModel.php
class LoginModel {
    private $username = "admin";
    private $password = "123";

    public function validateLogin($strusername, $strPassword) {
        if ($this->username === $strusername && $this->password === $strPassword) {
            return true;
        }

        return false;
    }
}
?>