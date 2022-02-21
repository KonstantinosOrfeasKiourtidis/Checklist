
const avatarAddbtn = document.querySelector(".image-container");
const registrationImage = document.querySelector(".registration-img");
const imgFileInput = document.querySelector("#image-file-input");
const addIcon = document.querySelector(".image-icon");

function OnEnterSwapImage() {

    addIcon.style.display = "block";
    addIcon.style.opacity = ".8";

}
function OnExitSwapImage() {
    addIcon.style.display = "none";


}

function OnClickSwapImage() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        const size = parseFloat(file.size / Math.pow(1024, 2)).toFixed(2);

        if (size <= 100025) {
            reader.addEventListener("load", function () {

                registrationImage.src = this.result;
            });

            reader.readAsDataURL(file);
        }
        else {
            alert(`This file is too large (${size} MB). The maximum size allowed is 25 MB.`);
        }


    }
}

avatarAddbtn.addEventListener("mouseover", OnEnterSwapImage);
avatarAddbtn.addEventListener("mouseout", OnExitSwapImage);

imgFileInput.addEventListener("change", OnClickSwapImage);

function generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}




function onSignIn(googleUser) {
    const pass = generatePassword();






    var image = googleUser.getBasicProfile().getImageUrl();

    var username = googleUser.getBasicProfile().getGivenName();
    var email = googleUser.getBasicProfile().getEmail();
    var psw = pass;
    var psw_repeat = pass;


    $.ajax({
        type: "post",
        dataType: "json",
        url: "../Checklist/Includes/googleRegister.inc.php?action=AddUser",
        data:
            {
                username: username,
                email: email,
                psw: psw,
                psw_repeat: psw_repeat,
                image: image
            },
        success: function (data) {


            var errorUsernameTaken = data.errorUsernameTaken;
            var errorEmailTaken = data.errorEmailTaken;



            if (errorEmailTaken == true) {
                var auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(function () {
                    alert("This e-mail address is already associated with the website.");



                });
            } else if (errorUsernameTaken == true) {
                var auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(function () {

                    alert("This username is taken.");


                });
            }


            if (errorUsernameTaken == false && errorEmailTaken == false) {

                window.location = "../Checklist/index.php";

            }

        },
        error: function (data) {

        },
    });

}

$(".acc-form").submit(function (event) {
    event.preventDefault();
    var formData = new FormData($('.acc-form')[0]);

    $.ajax({
        type: "post",
        dataType: "json",
        url: "../Checklist/Includes/register.inc.php?action=registerForm",
        contentType: false,
        processData: false,
        data: formData,
        success: function (data) {


            $("#username-error-message, #email-error-message, #password-error-message, #passwordrepeat-error-message, #tc-error-message").children("p:first").remove();

            $("#username-input-container, #email-input-container, #password-input-container, #passwordrepeat-input-container").removeClass("highlited-error-input");

            $("#username-error-message, #email-error-message, #password-error-message, #passwordrepeat-error-message, #tc-error-message").removeClass("error-mesage-highlited");

            $("#username-error-message, #email-error-message, #password-error-message, #passwordrepeat-error-message, #tc-error-message").removeClass("error-invisible");


            var errorUsernameEmpty = data.errorUsernameEmpty;
            var errorEmailEmpty = data.errorEmailEmpty;
            var errorPasswordEmpty = data.errorPasswordEmpty;
            var errorPasswordRepeatEmpty = data.errorPasswordRepeatEmpty;
            var errorTc = data.errorTc;
            var errorEmail = data.errorEmail;
            var errorUsernameCharacters = data.errorUsernameCharacters;
            var errorUsernameTaken = data.errorUsernameTaken;
            var errorEmailTaken = data.errorEmailTaken;
            var errorPassnoMatch = data.errorPassnoMatch;
            var errorImageType = data.errorImageType;
            var errorImageSize = data.errorImageSize;

            if (errorUsernameEmpty == true) {

                $("#username-error-message").html('<p><i class="fas fa-exclamation-triangle fa-fw"></i>Fill in the username.</p>');

                $("#username-input-container").addClass("highlited-error-input");

                $("#username-error-message").addClass("error-mesage-highlited");

                $("#email-error-message, #password-error-message, #passwordrepeat-error-message, #tc-error-message").addClass("error-invisible");
            }

            if (errorUsernameCharacters == true) {
                $("#username-error-message").html('<p><i class="fas fa-exclamation-triangle fa-fw"></i>Username exceeds allowed characters.</p>');

                $("#username-input-container").addClass("highlited-error-input");

                $("#username-error-message").addClass("error-mesage-highlited");

                $("#email-error-message, #password-error-message, #passwordrepeat-error-message, #tc-error-message").addClass("error-invisible");
            }

            if (errorUsernameTaken == true) {
                $("#username-error-message").html('<p><i class="fas fa-exclamation-triangle fa-fw"></i>This username is taken.</p>');

                $("#username-input-container").addClass("highlited-error-input");

                $("#username-error-message").addClass("error-mesage-highlited");

                $("#email-error-message, #password-error-message, #passwordrepeat-error-message, #tc-error-message").addClass("error-invisible");
            }

            if (errorImageType == true) {
                $("#username-error-message").html('<p><i class="fas fa-exclamation-triangle fa-fw"></i>The image type is not supported.</p>');



                $("#username-error-message").addClass("error-mesage-highlited");

                $("#email-error-message, #password-error-message, #passwordrepeat-error-message, #tc-error-message").addClass("error-invisible");
            }

            if (errorImageSize == true) {
                $("#username-error-message").html('<p><i class="fas fa-exclamation-triangle fa-fw"></i>The image you provides exceeds 25MB.</p>');



                $("#username-error-message").addClass("error-mesage-highlited");

                $("#email-error-message, #password-error-message, #passwordrepeat-error-message, #tc-error-message").addClass("error-invisible");
            }


            if (errorEmailEmpty == true) {
                $("#email-error-message").html('<p><i class="fas fa-exclamation-triangle fa-fw"></i>Fill in the e-mail address.</p>');

                $("#email-input-container").addClass("highlited-error-input");

                $("#email-error-message").addClass("error-mesage-highlited");

                $("#username-error-message, #password-error-message, #passwordrepeat-error-message, #tc-error-message").addClass("error-invisible");

            }

            if (errorEmailTaken == true) {

                $("#email-error-message").html('<p><i class="fas fa-exclamation-triangle fa-fw"></i>This e-mail address is already associated with the website.</p>');

                $("#email-input-container").addClass("highlited-error-input");

                $("#email-error-message").addClass("error-mesage-highlited");

                $("#username-error-message, #password-error-message, #passwordrepeat-error-message, #tc-error-message").addClass("error-invisible");

            }

            if (errorEmail == true) {
                $("#email-error-message").html('<p><i class="fas fa-exclamation-triangle fa-fw"></i>Invalid e-mail address.</p>');

                $("#email-input-container").addClass("highlited-error-input");

                $("#email-error-message").addClass("error-mesage-highlited");

                $("#username-error-message, #password-error-message, #passwordrepeat-error-message, #tc-error-message").addClass("error-invisible");
            }

            if (errorPasswordEmpty == true) {
                $("#password-error-message").html('<p><i class="fas fa-exclamation-triangle fa-fw"></i>Fill in the password.</p>');

                $("#password-input-container").addClass("highlited-error-input");

                $("#password-error-message").addClass("error-mesage-highlited");

                $("#username-error-message, #email-error-message, #passwordrepeat-error-message, #tc-error-message").addClass("error-invisible");

            }

            if (errorPasswordRepeatEmpty == true) {
                $("#passwordrepeat-error-message").html('<p><i class="fas fa-exclamation-triangle fa-fw"></i>Repeat the password.</p>');

                $("#passwordrepeat-input-container").addClass("highlited-error-input");

                $("#passwordrepeat-error-message").addClass("error-mesage-highlited");

                $("#username-error-message, #email-error-message, #password-error-message, #tc-error-message").addClass("error-invisible");

            }

            if (errorTc == true) {
                $("#tc-error-message").html('<p><i class="fas fa-exclamation-triangle fa-fw"></i>Agree to the terms &amp; privacy.</p>');

                $("#tc-error-message").addClass("error-mesage-highlited");

                $("#username-error-message, #email-error-message, #password-error-message, #passwordrepeat-error-message").addClass("error-invisible");
            }


            if (errorPassnoMatch == true) {
                $("#passwordrepeat-error-message").html('<p><i class="fas fa-exclamation-triangle fa-fw"></i>The two passwords do not match.</p>');


                $("#passwordrepeat-input-container").addClass("highlited-error-input");

                $("#passwordrepeat-error-message").addClass("error-mesage-highlited");

                $("#email-error-message, #username-error-message, #tc-error-message, #password-error-message").addClass("error-invisible");
            }


            if (errorUsernameEmpty == false && errorEmailEmpty == false && errorPasswordEmpty == false && errorPasswordRepeatEmpty == false && errorTc == false && errorEmail == false && errorUsernameCharacters == false && errorUsernameTaken == false &&
                errorEmailTaken == false && errorPassnoMatch == false && errorImageType == false && errorImageSize == false) {

                window.location = "../Checklist/index.php";

            }

        },
        error: function (data) {

        },
    });

})



window.fbAsyncInit = function () {
    FB.init({
        appId: '****************',
        oauth: true,
        status: true, // check login status
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true, // parse XFBML
        version: 'v2.8'
    });

};

function fb_login() {
    FB.login(function (response) {

        if (response.authResponse) {

            access_token = response.authResponse.accessToken; //get access token
            user_id = response.authResponse.userID; //get FB UID

            FB.api('/me?fields=name, email, picture.type(large)', function (response) {
                buildProfile(response);
                // you can store this data into your database             
            });

        } else {
            //user hit cancel button


        }
    }, {
            scope: 'public_profile,email'
        });
}
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}



function buildProfile(user) {
    const pass = generatePassword();






    var image = user.picture.data.url;

    var username = user.name;
    var email = user.email;
    var psw = pass;
    var psw_repeat = pass;


    $.ajax({
        type: "post",
        dataType: "json",
        url: "../Checklist/Includes/googleRegister.inc.php?action=AddUser",
        data:
            {
                username: username,
                email: email,
                psw: psw,
                psw_repeat: psw_repeat,
                image: image
            },
        success: function (data) {




            var errorUsernameTaken = data.errorUsernameTaken;
            var errorEmailTaken = data.errorEmailTaken;



            if (errorEmailTaken == true) {
                alert("This e-mail address is already associated with the website.");
            } else if (errorUsernameTaken == true) {

                alert("This username is taken.");
            }


            if (errorUsernameTaken == false && errorEmailTaken == false) {

                window.location = "../Checklist/index.php";

            }

        },
        error: function (data) {

        },
    });
}

