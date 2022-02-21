<?php 

if ($_GET['action'] == 'LoginUser') {

    require('dbh.inc.php');


    if (isset($_POST['email'])) {
        $email = $_POST['email'];
    } else {
        $email = '';
    }

    if (isset($_POST['username'])) {
        $username = $_POST['username'];
    } else {
        $username = '';
    }

    //Email Exist Variables
    $sqlEmail = "SELECT * FROM users WHERE user_emailALT = '$email' AND user_usernameALT = '$username'";
    $resultEmail = mysqli_query($conn, $sqlEmail);
    $resultCheckEmail = mysqli_num_rows($resultEmail);

    $row = mysqli_fetch_assoc($resultEmail);


    $errorFound = false;

    $errors = [
        'errorWrongCreds' => false,
    ];

    if ($resultCheckEmail == 0) {
        $errors['errorWrongCreds'] = true;
    }

    foreach ($errors as $error) {
        if ($error == true) {
            $errorFound = true;
            break;
        }
    }

    if ($errorFound == false) {

        //Log in the user here
        session_start();
        $_SESSION['user_id'] = $row['user_id'];
        $_SESSION['user_username'] = $row['user_username'];
        $_SESSION['user_email'] = $row['user_email'];
        $_SESSION['user_level'] = $row['user_level'];
        $_SESSION['user_img'] = $row['user_img'];
        $_SESSION['user_date'] = $row['user_date'];
        $_SESSION['loggedIn'] = true;

    }
    echo json_encode($errors);
    mysqli_close($conn);

} else {

}

?>
