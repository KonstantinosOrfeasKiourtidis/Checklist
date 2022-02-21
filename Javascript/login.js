
$(".acc-form").submit(function (event) {
    event.preventDefault();
    var formData = new FormData($('.acc-form')[0]);

    $.ajax({
        type: "post",
        dataType: "json",
        url: "../Checklist/Includes/login.inc.php?action=loginForm",
        contentType: false,
        processData: false,
        data: formData,
        success: function (data) {


            $("#email-error-message, #password-error-message").children("p:first").remove();

            $("#email-input-container, #password-input-container").removeClass("highlited-error-input");

            $("#email-error-message, #password-error-message").removeClass("error-mesage-highlited");

            $("#email-error-message, #password-error-message").removeClass("error-invisible");



            var errorEmailEmpty = data.errorEmailEmpty;
            var errorPasswordEmpty = data.errorPasswordEmpty;
            var errorWrongCreds = data.errorWrongCreds;
            var errorEmail = data.errorEmail;

            if (errorEmailEmpty == true) {
                $("#email-error-message").html('<p><i class="fas fa-exclamation-triangle fa-fw"></i>Fill in the e-mail address.</p>');

                $("#email-input-container").addClass("highlited-error-input");

                $("#email-error-message").addClass("error-mesage-highlited");

                $("#password-error-message").addClass("error-invisible");

            }


            if (errorPasswordEmpty == true) {
                $("#password-error-message").html('<p><i class="fas fa-exclamation-triangle fa-fw"></i>Fill in the password.</p>');

                $("#password-input-container").addClass("highlited-error-input");

                $("#password-error-message").addClass("error-mesage-highlited");

                $("#username-error-message").addClass("error-invisible");

            }

            if (errorEmail == true) {
                $("#email-error-message").html('<p><i class="fas fa-exclamation-triangle fa-fw"></i>Invalid e-mail address.</p>');

                $("#email-input-container").addClass("highlited-error-input");

                $("#email-error-message").addClass("error-mesage-highlited");

                $("#password-error-message").addClass("error-invisible");
            }

            if (errorWrongCreds == true) {
                $("#email-error-message").html('<p><i class="fas fa-exclamation-triangle fa-fw"></i>Incorrect e-mail or password.</p>');
                $("#password-error-message").html('<p><i class="fas fa-exclamation-triangle fa-fw"></i>Incorrect e-mail or password.</p>');

                $("#email-input-container, #password-input-container").addClass("highlited-error-input");

                $("#email-error-message, #password-error-message").addClass("error-mesage-highlited");



            }




            if (errorEmailEmpty == false && errorPasswordEmpty == false && errorWrongCreds == false && errorEmail == false) {

                window.location = "../Checklist/index.php";

            }

        },
        error: function (data) {

        },
    });

})

function onSignIn(googleUser) {


    var username = googleUser.getBasicProfile().getGivenName();
    var email = googleUser.getBasicProfile().getEmail();


    $.ajax({
        type: "post",
        dataType: "json",
        url: "../Checklist/Includes/googleLogin.inc.php?action=LoginUser",
        data:
            {
                username: username,
                email: email
            },
        success: function (data) {


            var errorWrongCreds = data.errorWrongCreds;

            if (errorWrongCreds == true) {
                var auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(function () {
                    alert("This e-mail address or username does not exist");



                });
            }


            if (errorWrongCreds == false) {

                window.location = "../Checklist/index.php";

            }

        },
        error: function (data) {

        },
    });

}




window.fbAsyncInit = function () {
    FB.init({
        appId: '**************',
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

            FB.api('/me?fields=name, email', function (response) {
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










function buildProfile(user) {

    var username = user.name;
    var email = user.email;


    $.ajax({
        type: "post",
        dataType: "json",
        url: "../Checklist/Includes/googleLogin.inc.php?action=LoginUser",
        data:
            {
                username: username,
                email: email
            },
        success: function (data) {


            var errorWrongCreds = data.errorWrongCreds;

            if (errorWrongCreds == true) {

                alert("This e-mail address or username does not exist");


            }


            if (errorWrongCreds == false) {

                window.location = "../Checklist/index.php";

            }

        },
        error: function (data) {

        },
    });
}
