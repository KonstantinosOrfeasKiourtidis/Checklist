<?php 

if ($_GET['action'] == 'registerForm') {

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

    if (isset($_POST['tc'])) {
        if ($_POST['tc'] == 'on') {
            $tc = true;
        } else {
            $tc = false;
        }
    } else {
        $tc = false;
    }



    if (isset($_FILES['image'])) {
        $image = $_FILES['image'];

        $fileName = $_FILES['image']['name'];

        $fileTmpName = $_FILES['image']['tmp_name'];
        $fileSize = $_FILES['image']['size'];
        $fileError = $_FILES['image']['error'];
        $fileType = $_FILES['image']['type'];




    } else {
        $image = '';
        $fileName = '';
        $fileType = '';
        $fileSize = 0;


    }
    $fileExt = explode('.', $fileName);

    $fileActualExt = strtolower(end($fileExt));

    $allowed = array('jpg', 'jpeg', 'png', 'pdf');

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
        'errorUsernameEmpty' => false,
        'errorEmailEmpty' => false,
        'errorPasswordEmpty' => false,
        'errorPasswordRepeatEmpty' => false,
        'errorTc' => false,
        'errorEmail' => false,
        'errorUsernameCharacters' => false,
        'errorUsernameTaken' => false,
        'errorEmailTaken' => false,
        'errorPassnoMatch' => false,
        'errorImageType' => false,
        'errorImageSize' => false,
    ];

    if (empty($username)) {

        $errors['errorUsernameEmpty'] = true;
    } else if (empty($email)) {

        $errors['errorEmailEmpty'] = true;
    } else if (empty($psw)) {

        $errors['errorPasswordEmpty'] = true;
    } else if (empty($psw_repeat)) {

        $errors['errorPasswordRepeatEmpty'] = true;
    } else if ($tc == false) {

        $errors['errorTc'] = true;

    } else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {

        $errors['errorEmail'] = true;

    } else if (strlen($username) < 2 || strlen($username) > 30) {

        $errors['errorUsernameCharacters'] = true;

    } else if ($psw !== $psw_repeat) {
        $errors['errorPassnoMatch'] = true;

    } else if ($resultCheckUsers > 0) {
        $errors['errorUsernameTaken'] = true;
    } else if ($resultCheckEmail > 0) {
        $errors['errorEmailTaken'] = true;
    } else if ($fileName !== '' && !in_array($fileActualExt, $allowed)) {
        $errors['errorImageType'] = true;
    } else if ($fileName !== '' && !($fileSize / pow(1024, 2) <= 25)) {
        $errors['errorImageSize'] = true;
    }


    foreach ($errors as $error) {
        if ($error == true) {
            $errorFound = true;
            break;
        }
    }
    if ($errorFound == false) {
        if ($fileName !== '') {


            $sql = "INSERT INTO users (user_username, user_email, user_password) VALUES ('$username','$email', '$hashedPsw');";
            mysqli_query($conn, $sql);

            $sql = "SELECT * FROM users WHERE user_username='$username' AND user_email = '$email';";
            $result = mysqli_query($conn, $sql);
            $row = mysqli_fetch_assoc($result);

            $tmpID = $row['user_id'];
            $fileNameNew = $tmpID . '-' . $date . '.jpg';

            $fileDestination = '../Uploads/' . $fileNameNew;
            move_uploaded_file($fileTmpName, $fileDestination);

            $sqlImg = "UPDATE users SET user_img = 1, user_date = '$date' WHERE user_username='$username' AND user_email = '$email';";
            $result = mysqli_query($conn, $sqlImg);

            $sql = "SELECT * FROM users WHERE user_username='$username' AND user_email = '$email';";
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

        } else {
            $sql = "INSERT INTO users (user_username, user_email, user_password) VALUES ('$username','$email', '$hashedPsw');";

            mysqli_query($conn, $sql);
            $sql = "SELECT * FROM users WHERE user_username='$username' AND user_email = '$email';";
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
    } else {
        echo json_encode($errors);
    }

} else {

}
?>
