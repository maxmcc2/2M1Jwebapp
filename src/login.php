<?php 

    #starts a new session
    session_start();

    #includes a database connection
    $serverName = "."; //serverName\instanceName
    $connectionInfo = array( "Database"=>"Proiect_Colectiv", "UID"=>"", "PWD"=>"");
    $conn = sqlsrv_connect( $serverName, $connectionInfo);

    if( $conn ) {
        echo "Connection established.<br />";
    }
    else
    {
        echo "Connection could not be established.<br />";
        die( print_r( sqlsrv_errors(), true));
    }
    
    #catches user/password submitted by html form
    $email = $_POST['email'];
    $password = $_POST['password'];

    #checks if the html form is filled
    if(empty($_POST['email']) || empty($_POST['password'])){
        echo "Fill all the fields!";
    }else{
        
    #searches for email and password in the database
    $query = "SELECT * FROM [dbo].[Users] WHERE Email(SQL Table 
    column)='{$email}' AND Parola(SQL table column)='{$password}'";
    $result = sqlsrv_query($conn, $query);  

    #checks if the search was made
    if($result === false){
        die( print_r( sqlsrv_errors(), true));
    }


    if(sqlsrv_has_rows($result) != 1){
        echo "Email/password not found";
    }else
    {

    #creates sessions
    while($row = sqlsrv_fetch_array($result)){
        $_SESSION['id'] = $row['id'];
        $_SESSION['name'] = $row['name'];
        $_SESSION['user'] = $row['user'];
        $_SESSION['level'] = $row['level'];
    }
    #redirects user
    header("Location: homepage.html");
}
}

?>