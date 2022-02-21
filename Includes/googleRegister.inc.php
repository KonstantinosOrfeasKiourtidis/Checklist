<?php
if ($_GET['action'] == 'AddUser') {
    require('dbh.inc.php');


    if (isset($_POST['username'])) {
        $username = $_POST['username'];
    } else {
        $username = '';
    }

    if (isset($_POST['email'])) {
        $email = $_POST['email'];
    } else {
        $email = '';
    }
    if (isset($_POST['psw'])) {
        $psw = $_POST['psw'];
    } else {
        $psw = '';
    }
    if (isset($_POST['psw_repeat'])) {
        $psw_repeat = $_POST['psw_repeat'];
    } else {
        $psw_repeat = '';
    }

    if (isset($_POST['image'])) {
        $image = $_POST['image'];
    } else {
        $image = '';
    }


    $date = date("d-m-Y") . "-" . time();

    //Username Exist Variables
    $sqlUsers = "SELECT * FROM users WHERE user_username = '$username'";
    $resultUsers = mysqli_query($conn, $sqlUsers);
    $resultCheckUsers = mysqli_num_rows($resultUsers);

    //Email Exist Variables
    $sqlEmail = "SELECT * FROM users WHERE user_email = '$email'";
    $resultEmail = mysqli_query($conn, $sqlEmail);
    $resultCheckEmail = mysqli_num_rows($resultEmail);

     //Hash Password
    $hashedPsw = password_hash($psw, PASSWORD_DEFAULT);

    $errorFound = false;

    $errors = [
        'errorUsernameTaken' => false,
        'errorEmailTaken' => false,
    ];

    if ($resultCheckUsers > 0) {
        $errors['errorUsernameTaken'] = true;
    } else if ($resultCheckEmail > 0) {
        $errors['errorEmailTaken'] = true;
    }

    foreach ($errors as $error) {
        if ($error == true) {
            $errorFound = true;
            break;
        }
    }

    if ($errorFound == false) {
        $sql = "INSERT INTO users (user_username, user_email, user_password, user_usernameALT, user_emailALT) VALUES ('$username','$email', '$hashedPsw', '$username', '$email');";
        mysqli_query($conn, $sql);

        $sql = "SELECT * FROM users WHERE user_usernameALT='$username' AND user_emailALT = '$email';";
        $result = mysqli_query($conn, $sql);
        $row = mysqli_fetch_assoc($result);

        $tmpID = $row['user_id'];
        $fileNameNew = $tmpID . '-' . $date . '.jpg';

        $fileDestination = '../Uploads/' . $fileNameNew;

        file_put_contents($fileDestination, file_get_contents($image));


        $sqlImg = "UPDATE users SET user_img = 1, user_date = '$date' WHERE user_usernameALT='$username' AND user_emailALT = '$email';";
        $result = mysqli_query($conn, $sqlImg);

        $sql = "SELECT * FROM users WHERE user_usernameALT='$username' AND user_emailALT = '$email';";
        $result = mysqli_query($conn, $sql);
        $row = mysqli_fetch_assoc($result);
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
}
?>