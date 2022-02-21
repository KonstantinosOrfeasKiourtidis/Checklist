<?php 

if ($_GET['action'] == 'contactForm') {
    require('dbh.inc.php');


    if (isset($_POST['contact-email'])) {
        $email = $_POST['contact-email'];
    } else {
        $email = '';
    }

    if (isset($_POST['contact-message'])) {
        $message = $_POST['contact-message'];
    } else {
        $message = '';
    }

    if (isset($_POST['contact-name'])) {
        $name = $_POST['contact-name'];
    } else {
        $name = '';
    }

    if (isset($_POST['contact-subject'])) {
        $subject = $_POST['contact-subject'];
    } else {
        $subject = '';
    }

    $mailTo = "orfeaskiourtidis@kiourtidis.com";
    $headers = "From: " . $email;
    $txt = "You have received an e-mail from " . $name . ".\n\n" . $message;


    $errorFound = false;

    $errors = [
        'errorNameEmpty' => false,
        'errorEmailEmpty' => false,
        'errorMessageEmpty' => false,
        'errorEmail' => false,
    ];

    if (empty($name)) {
        $errors['errorNameEmpty'] = true;

    } else if (empty($email)) {
        $errors['errorEmailEmpty'] = true;
    } else if (empty($message)) {
        $errors['errorMessageEmpty'] = true;
    } else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['errorEmail'] = true;


    }

    foreach ($errors as $error) {
        if ($error == true) {
            $errorFound = true;
            break;
        }
    }

    if ($errorFound == false) {

        mail($mailTo, $subject, $txt, $headers);

    }
    echo json_encode($errors);
    mysqli_close($conn);

} else {

}

?>
