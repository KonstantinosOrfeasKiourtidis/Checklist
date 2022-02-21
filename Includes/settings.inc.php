<?php 

if ($_GET['action'] == 'settingsUsernameEmailForm') {

    require('dbh.inc.php');

    if (!isset($_SESSION)) {
        session_start();
    }

    $id = $_SESSION['user_id'];



    $oldDate = $_SESSION['user_date'];


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
    $sqlUsers = "SELECT * FROM users WHERE user_username = '$username' AND user_id <> '$id'";
    $resultUsers = mysqli_query($conn, $sqlUsers);
    $resultCheckUsers = mysqli_num_rows($resultUsers);

    //Email Exist Variables
    $sqlEmail = "SELECT * FROM users WHERE user_email = '$email' AND user_id <> '$id'";
    $resultEmail = mysqli_query($conn, $sqlEmail);
    $resultCheckEmail = mysqli_num_rows($resultEmail);
    

    //Id Exist Variables
    $sqlId = "SELECT * FROM users WHERE user_id = '$id'";
    $resultId = mysqli_query($conn, $sqlId);
    $row = mysqli_fetch_assoc($resultId);


    $errorFound = false;

    $errors = [
        'errorUsernameEmpty' => false,
        'errorEmailEmpty' => false,
        'errorEmail' => false,
        'errorUsernameCharacters' => false,
        'errorUsernameTaken' => false,
        'errorEmailTaken' => false,
        'errorImageType' => false,
        'errorImageSize' => false,
        'email' => '',
        'username' => '',
        'date' => '',
        'id' => '',
    ];

    if (empty($username)) {

        $errors['errorUsernameEmpty'] = true;
    } else if (empty($email)) {

        $errors['errorEmailEmpty'] = true;
    } else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {

        $errors['errorEmail'] = true;

    } else if (strlen($username) < 2 || strlen($username) > 16) {

        $errors['errorUsernameCharacters'] = true;

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
        if ($fileName !== '' && $row['user_img'] == 0) {

            $tmpID = $id;

            $fileNameNew = $tmpID . '-' . $date . '.jpg';
            $fileDestination = '../Uploads/' . $fileNameNew;
            move_uploaded_file($fileTmpName, $fileDestination);
            unlink("../Uploads/" . $tmpID . '-' . $oldDate . '.jpg');

            $sqlImg = "UPDATE users SET user_username = '$username', user_email = '$email', user_img = 1 , user_date = '$date' WHERE user_id='$id';";
            $result = mysqli_query($conn, $sqlImg);

            $sql = "SELECT * FROM users WHERE user_id='$id';";
            $result = mysqli_query($conn, $sql);
            $row = mysqli_fetch_assoc($result);





            $_SESSION['user_id'] = $row['user_id'];
            $_SESSION['user_username'] = $row['user_username'];
            $_SESSION['user_email'] = $row['user_email'];
            $_SESSION['user_level'] = $row['user_level'];
            $_SESSION['user_img'] = $row['user_img'];
            $_SESSION['user_date'] = $row['user_date'];
            $_SESSION['loggedIn'] = true;


            $errors['username'] = $row['user_username'];
            $errors['email'] = $row['user_email'];
            $errors['date'] = $row['user_date'];
            $errors['id'] = $row['user_id'];

        } else if ($fileName === '' && $row['user_img'] == 1) {
            $sqlImg = "UPDATE users SET user_username = '$username', user_email = '$email', user_img = 1 WHERE user_id='$id';";

            mysqli_query($conn, $sqlImg);
            $sql = "SELECT * FROM users WHERE user_id='$id';";
            $result = mysqli_query($conn, $sql);
            $row = mysqli_fetch_assoc($result);


            $_SESSION['user_id'] = $row['user_id'];
            $_SESSION['user_username'] = $row['user_username'];
            $_SESSION['user_email'] = $row['user_email'];
            $_SESSION['user_level'] = $row['user_level'];
            $_SESSION['user_img'] = $row['user_img'];
            $_SESSION['user_date'] = $row['user_date'];
            $_SESSION['loggedIn'] = true;

            $errors['username'] = $row['user_username'];
            $errors['email'] = $row['user_email'];
            $errors['date'] = $row['user_date'];
            $errors['id'] = $row['user_id'];

        } else if ($fileName !== '' && $row['user_img'] == 1) {
            $tmpID = $id;

            $fileNameNew = $tmpID . '-' . $date . '.jpg';
            $fileDestination = '../Uploads/' . $fileNameNew;
            move_uploaded_file($fileTmpName, $fileDestination);
            unlink("../Uploads/" . $tmpID . '-' . $oldDate . '.jpg');
            $sqlImg = "UPDATE users SET user_username = '$username', user_email = '$email', user_img = 1, user_date='$date' WHERE user_id='$id';";
            $result = mysqli_query($conn, $sqlImg);

            $sql = "SELECT * FROM users WHERE user_id='$id';";
            $result = mysqli_query($conn, $sql);
            $row = mysqli_fetch_assoc($result);





            $_SESSION['user_id'] = $row['user_id'];
            $_SESSION['user_username'] = $row['user_username'];
            $_SESSION['user_email'] = $row['user_email'];
            $_SESSION['user_level'] = $row['user_level'];
            $_SESSION['user_img'] = $row['user_img'];
            $_SESSION['user_date'] = $row['user_date'];
            $_SESSION['loggedIn'] = true;


            $errors['username'] = $row['user_username'];
            $errors['email'] = $row['user_email'];
            $errors['date'] = $row['user_date'];
            $errors['id'] = $row['user_id'];

        } else if ($fileName === '' && $row['user_img'] == 1) {
            $sqlImg = "UPDATE users SET user_username = '$username', user_email = '$email', user_img = 1 WHERE user_id='$id';";

            mysqli_query($conn, $sqlImg);
            $sql = "SELECT * FROM users WHERE user_id='$id';";
            $result = mysqli_query($conn, $sql);
            $row = mysqli_fetch_assoc($result);


            $_SESSION['user_id'] = $row['user_id'];
            $_SESSION['user_username'] = $row['user_username'];
            $_SESSION['user_email'] = $row['user_email'];
            $_SESSION['user_level'] = $row['user_level'];
            $_SESSION['user_img'] = $row['user_img'];
            $_SESSION['user_date'] = $row['user_date'];
            $_SESSION['loggedIn'] = true;

            $errors['username'] = $row['user_username'];
            $errors['email'] = $row['user_email'];
            $errors['date'] = $row['user_date'];
            $errors['id'] = $row['user_id'];



        } else {
            $sqlImg = "UPDATE users SET user_username = '$username', user_email = '$email', user_img = 0 WHERE user_id='$id'";

            mysqli_query($conn, $sqlImg);
            $sql = "SELECT * FROM users WHERE user_id='$id';";
            $result = mysqli_query($conn, $sql);
            $row = mysqli_fetch_assoc($result);


            $_SESSION['user_id'] = $row['user_id'];
            $_SESSION['user_username'] = $row['user_username'];
            $_SESSION['user_email'] = $row['user_email'];
            $_SESSION['user_level'] = $row['user_level'];
            $_SESSION['user_img'] = $row['user_img'];
            $_SESSION['user_date'] = $row['user_date'];
            $_SESSION['loggedIn'] = true;

            $errors['username'] = $row['user_username'];
            $errors['email'] = $row['user_email'];
            $errors['date'] = $row['user_date'];
            $errors['id'] = $row['user_id'];
        }

        echo json_encode($errors);

        mysqli_close($conn);





    } else {
        echo json_encode($errors);

        mysqli_close($conn);
    }

} else if ($_GET['action'] == 'settingsPasswordForm') {

    require('dbh.inc.php');
    if (!isset($_SESSION)) {
        session_start();
    }

    $id = $_SESSION['user_id'];


    if (isset($_POST['password'])) {
        $password = $_POST['password'];
    } else {
        $password = '';
    }

    if (isset($_POST['newpassword'])) {
        $newpassword = $_POST['newpassword'];
    } else {
        $newpassword = '';
    }

    if (isset($_POST['newpasswordrepeat'])) {
        $newpasswordrepeat = $_POST['newpasswordrepeat'];
    } else {
        $newpasswordrepeat = '';
    }


   

    

    //Id Exist Variables
    $sqlId = "SELECT * FROM users WHERE user_id = '$id'";
    $resultId = mysqli_query($conn, $sqlId);
    $row = mysqli_fetch_assoc($resultId);
    $hashedPwdCheck = password_verify($password, $row['user_password']);

    //Hash Password
    $hashedPsw = password_hash($newpassword, PASSWORD_DEFAULT);

    $errorFound = false;

    $errors = [
        'errorCurrentPasswordEmpty' => false,
        'errorNewPasswordEmpty' => false,
        'errorNewPasswordRepeatEmpty' => false,
        'errorPassnoMatch' => false,
        'errorCurrentPass' => false,
    ];

    if (empty($password)) {

        $errors['errorCurrentPasswordEmpty'] = true;
    } else if (empty($newpassword)) {

        $errors['errorNewPasswordEmpty'] = true;
    } else if (empty($newpasswordrepeat)) {

        $errors['errorNewPasswordRepeatEmpty'] = true;
    } else if ($newpassword !== $newpasswordrepeat) {

        $errors['errorPassnoMatch'] = true;
    } else if ($hashedPwdCheck == false) {
        $errors['errorCurrentPass'] = true;
    }


    foreach ($errors as $error) {
        if ($error == true) {
            $errorFound = true;
            break;
        }
    }
    if ($errorFound == false) {




        $sqlImg = "UPDATE users SET user_password = '$hashedPsw' WHERE user_id='$id';";
        $result = mysqli_query($conn, $sqlImg);

        $sql = "SELECT * FROM users WHERE user_id='$id';";
        $result = mysqli_query($conn, $sql);
        $row = mysqli_fetch_assoc($result);

        $_SESSION['user_id'] = $row['user_id'];
        $_SESSION['user_username'] = $row['user_username'];
        $_SESSION['user_email'] = $row['user_email'];
        $_SESSION['user_level'] = $row['user_level'];
        $_SESSION['user_img'] = $row['user_img'];
        $_SESSION['user_date'] = $row['user_date'];
        $_SESSION['loggedIn'] = true;



        echo json_encode($errors);





        mysqli_close($conn);
    } else {
        echo json_encode($errors);
    }

} else {

}
?>
