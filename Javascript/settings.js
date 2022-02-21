$(document).ready(function () {
    const avatarAddbtn = document.querySelector(".settings-img-container");
    const settingsProfileImage = document.querySelector(".settings-profile-img");
    const imgFileInput = document.querySelector("#settings-profile-img-file-input");
    const addIcon = document.querySelector(".settings-profile-upload-icon");

    const userUsernameDrawer = document.querySelector("#user-username-drawer");
    const userUsernameDropdown = document.querySelector("#user-username-dropdown");
    const userImageDropdown = document.querySelector("#user-image-dropdown");



    var IsEditing = false;
    settingsProfileImage.style['pointerEvents'] = "none";
    function OnEnterSwapImage() {

        if (IsEditing == true) {
            addIcon.style.display = "block";
            addIcon.style.opacity = ".8";

        } else {

        }
    }
    function OnExitSwapImage() {
        addIcon.style.display = "none";


    }

    function OnClickSwapImage() {
        if (IsEditing == true) {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                const size = parseFloat(file.size / Math.pow(1024, 2)).toFixed(2);

                if (size <= 100025) {
                    reader.addEventListener("load", function () {

                        settingsProfileImage.src = this.result;
                    });

                    reader.readAsDataURL(file);
                }
                else {
                    alert(`This file is too large (${size} MB). The maximum size allowed is 25 MB.`);
                }


            }
        }
    }

    avatarAddbtn.addEventListener("mouseover", OnEnterSwapImage);
    avatarAddbtn.addEventListener("mouseout", OnExitSwapImage);

    imgFileInput.addEventListener("change", OnClickSwapImage);


    const settingsbtn = document.querySelector(".settings-icon");

    const usernameInput = document.querySelector("#username");
    const emailInput = document.querySelector("#email");

    const usernameText = document.querySelector("#username-text");
    const emailText = document.querySelector("#email-text");


    usernameInput.value = usernameText.innerHTML;
    emailInput.value = emailText.innerHTML;

    document.querySelector("#settings-profile-img-file-input").disabled = true;

    function OnEdit(event) {
        event.preventDefault();
        if (IsEditing == false) {
            IsEditing = true;
            usernameInput.value = usernameText.innerHTML;
            emailInput.value = emailText.innerHTML;

            settingsProfileImage.style['pointerEvents'] = "auto";

            document.querySelector("#toggle-icon").classList.remove("fa-edit");
            document.querySelector("#toggle-icon").classList.add("fa-times");

            //Hide
            document.querySelector("#username-text").classList.add("settings-invisible");
            document.querySelector("#email-text").classList.add("settings-invisible");

            //Show
            document.querySelector("#settings-username-input-container").classList.remove("settings-invisible");
            document.querySelector("#settings-email-input-container").classList.remove("settings-invisible");
            document.querySelector("#updateSettings").classList.remove("settings-invisible");
            document.querySelector("#settings-profile-img-file-input").disabled = false;
        }
        else {
            IsEditing = false;
            settingsProfileImage.style['pointerEvents'] = "none";
            $("#settings-username-input-container, #settings-email-input-container").removeClass("highlited-error-input");
            $("#username-error-message, #email-error-message").children("p:first").remove();
            document.querySelector("#toggle-icon").classList.remove("fa-times");
            document.querySelector("#toggle-icon").classList.add("fa-edit");

            //Hide
            document.querySelector("#settings-username-input-container").classList.add("settings-invisible");
            document.querySelector("#settings-email-input-container").classList.add("settings-invisible");
            document.querySelector("#updateSettings").classList.add("settings-invisible");
            document.querySelector("#settings-profile-img-file-input").disabled = true;
            //Show
            document.querySelector("#username-text").classList.remove("settings-invisible");
            document.querySelector("#email-text").classList.remove("settings-invisible");
        }

    }

    settingsbtn.addEventListener("click", OnEdit);

    $(".settings-profile-form").submit(function (event) {
        event.preventDefault();
        var formData = new FormData($('.settings-profile-form')[0]);

        $.ajax({
            type: "post",
            dataType: "json",
            url: "../Checklist/Includes/settings.inc.php?action=settingsUsernameEmailForm",
            contentType: false,
            processData: false,
            data: formData,
            success: function (data) {


                $("#username-error-message, #email-error-message").children("p:first").remove();

                $("#settings-username-input-container, #settings-email-input-container").removeClass("highlited-error-input");

                $("#username-error-message, #email-error-message").removeClass("error-mesage-highlited");

                $("#username-error-message, #email-error-message").removeClass("error-invisible");


                var errorUsernameEmpty = data.errorUsernameEmpty;
                var errorEmailEmpty = data.errorEmailEmpty;
                var errorEmail = data.errorEmail;
                var errorUsernameCharacters = data.errorUsernameCharacters;
                var errorUsernameTaken = data.errorUsernameTaken;
                var errorEmailTaken = data.errorEmailTaken;
                var errorImageType = data.errorImageType;
                var errorImageSize = data.errorImageSize;
                var email = data.email;
                var username = data.username;
                var date = data.date;
                var id = data.id;




                if (errorUsernameEmpty == true) {

                    $("#username-error-message").html('<p><i class="fas fa-exclamation-triangle fa-fw"></i>Fill in the username.</p>');

                    $("#settings-username-input-container").addClass("highlited-error-input");

                    $("#username-error-message").addClass("error-mesage-highlited");

                    $("#email-error-message").addClass("error-invisible");
                }

                if (errorUsernameCharacters == true) {
                    $("#username-error-message").html('<p><i class="fas fa-exclamation-triangle fa-fw"></i>Username exceeds allowed characters.</p>');

                    $("#settings-username-input-container").addClass("highlited-error-input");

                    $("#username-error-message").addClass("error-mesage-highlited");

                    $("#email-error-message").addClass("error-invisible");
                }

                if (errorUsernameTaken == true) {
                    $("#username-error-message").html('<p><i class="fas fa-exclamation-triangle fa-fw"></i>This username is taken.</p>');

                    $("#settings-username-input-container").addClass("highlited-error-input");

                    $("#username-error-message").addClass("error-mesage-highlited");

                    $("#email-error-message").addClass("error-invisible");
                }

                if (errorImageType == true) {
                    $("#username-error-message").html('<p><i class="fas fa-exclamation-triangle fa-fw"></i>The image type is not supported.</p>');



                    $("#username-error-message").addClass("error-mesage-highlited");

                    $("#email-error-message").addClass("error-invisible");
                }

                if (errorImageSize == true) {
                    $("#username-error-message").html('<p><i class="fas fa-exclamation-triangle fa-fw"></i>The image you provides exceeds 25MB.</p>');



                    $("#username-error-message").addClass("error-mesage-highlited");

                    $("#email-error-message").addClass("error-invisible");
                }


                if (errorEmailEmpty == true) {
                    $("#email-error-message").html('<p><i class="fas fa-exclamation-triangle fa-fw"></i>Fill in the e-mail address.</p>');

                    $("#settings-email-input-container").addClass("highlited-error-input");

                    $("#email-error-message").addClass("error-mesage-highlited");

                    $("#username-error-message").addClass("error-invisible");

                }

                if (errorEmailTaken == true) {

                    $("#email-error-message").html('<p><i class="fas fa-exclamation-triangle fa-fw"></i>This e-mail address is already associated with the website.</p>');

                    $("#settings-email-input-container").addClass("highlited-error-input");

                    $("#email-error-message").addClass("error-mesage-highlited");

                    $("#username-error-message").addClass("error-invisible");

                }

                if (errorEmail == true) {
                    $("#email-error-message").html('<p><i class="fas fa-exclamation-triangle fa-fw"></i>Invalid e-mail address.</p>');

                    $("#settings-email-input-container").addClass("highlited-error-input");

                    $("#email-error-message").addClass("error-mesage-highlited");

                    $("#username-error-message").addClass("error-invisible");
                }



                if (errorUsernameEmpty == false && errorEmailEmpty == false && errorEmail == false && errorUsernameCharacters == false && errorUsernameTaken == false &&
                    errorEmailTaken == false && errorImageType == false && errorImageSize == false) {


                    $("#user-image-dropdown").attr('src', 'Uploads/' + id + "-" + date + ".jpg");
                    $("#user-image-drawer").attr('src', 'Uploads/' + id + "-" + date + ".jpg");




                    IsEditing = false;
                    settingsProfileImage.style['pointerEvents'] = "none";
                    $("#settings-username-input-container, #settings-email-input-container").removeClass("highlited-error-input");
                    $("#username-error-message, #email-error-message").children("p:first").remove();
                    document.querySelector("#toggle-icon").classList.remove("fa-times");
                    document.querySelector("#toggle-icon").classList.add("fa-edit");

                    //Hide
                    document.querySelector("#settings-username-input-container").classList.add("settings-invisible");
                    document.querySelector("#settings-email-input-container").classList.add("settings-invisible");
                    document.querySelector("#updateSettings").classList.add("settings-invisible");
                    document.querySelector("#settings-profile-img-file-input").disabled = true;
                    //Show
                    document.querySelector("#username-text").classList.remove("settings-invisible");
                    document.querySelector("#email-text").classList.remove("settings-invisible");

                    usernameText.innerHTML = username;
                    emailText.innerHTML = email;
                    userUsernameDrawer.innerHTML = username;
                    userUsernameDropdown.innerText = username;


                }

            },
            error: function (data) {

            },
        });

    })


    // ------------------------------------------------------------------

    const passwordSettingsbtn = document.querySelector(".password-settings-icon");

    const passwordInput = document.querySelector("#password");
    const newpasswordInput = document.querySelector("#newpassword");
    const newpasswordrepeatInput = document.querySelector("#newpasswordrepeat");

    var IsPasswordEditing = false;

    function OnPasswordEdit(event) {
        event.preventDefault();
        if (IsPasswordEditing == false) {
            IsPasswordEditing = true;
            document.querySelector("#password-toggle-icon").classList.remove("fa-edit");
            document.querySelector("#password-toggle-icon").classList.add("fa-times");

            //Hide
            document.querySelector("#password-text").classList.add("settings-invisible");

            //Show

            document.querySelector(".password-title-text").classList.remove("settings-invisible");
            document.querySelector(".newpassword-title-text").classList.remove("settings-invisible");
            document.querySelector(".newpasswordrepeat-title-text").classList.remove("settings-invisible");


            document.querySelector("#settings-password-input-container").classList.remove("settings-invisible");
            document.querySelector("#settings-newpassword-input-container").classList.remove("settings-invisible");
            document.querySelector("#settings-newpasswordrepeat-input-container").classList.remove("settings-invisible");

            document.querySelector("#updatepasswordSettings").classList.remove("settings-invisible");

        }
        else {
            IsPasswordEditing = false;


            $("#settings-password-input-container, #settings-newpassword-input-container, #settings-newpasswordrepeat-input-container").removeClass("highlited-error-input");
            $("#password-error-message, #newpassword-error-message, #newpasswordrepeat-error-message").children("p:first").remove();

            document.querySelector("#password-toggle-icon").classList.remove("fa-times");
            document.querySelector("#password-toggle-icon").classList.add("fa-edit");


            //Hide
            document.querySelector("#password-text").classList.remove("settings-invisible");

            //Show

            document.querySelector(".password-title-text").classList.add("settings-invisible");
            document.querySelector(".newpassword-title-text").classList.add("settings-invisible");
            document.querySelector(".newpasswordrepeat-title-text").classList.add("settings-invisible");


            document.querySelector("#settings-password-input-container").classList.add("settings-invisible");
            document.querySelector("#settings-newpassword-input-container").classList.add("settings-invisible");
            document.querySelector("#settings-newpasswordrepeat-input-container").classList.add("settings-invisible");

            document.querySelector("#updatepasswordSettings").classList.add("settings-invisible");

            passwordInput.value = '';
            newpasswordInput.value = '';
            newpasswordrepeatInput.value = '';
        }

    }

    passwordSettingsbtn.addEventListener("click", OnPasswordEdit);



    $(".password-settings-profile-form").submit(function (event) {
        event.preventDefault();
        var formData = new FormData($('.password-settings-profile-form')[0]);

        $.ajax({
            type: "post",
            dataType: "json",
            url: "../Checklist/Includes/settings.inc.php?action=settingsPasswordForm",
            contentType: false,
            processData: false,
            data: formData,
            success: function (data) {


                $("#password-error-message, #newpassword-error-message, #newpasswordrepeat-error-message").children("p:first").remove();

                $("#settings-password-input-container, #settings-newpassword-input-container, #settings-newpasswordrepeat-input-container").removeClass("highlited-error-input");

                $("#password-error-message, #newpassword-error-message, #newpasswordrepeat-error-message").removeClass("error-mesage-highlited");

                $("#password-error-message, #newpassword-error-message, #newpasswordrepeat-error-message").removeClass("error-invisible");


                var errorCurrentPasswordEmpty = data.errorCurrentPasswordEmpty;
                var errorNewPasswordEmpty = data.errorNewPasswordEmpty;
                var errorNewPasswordRepeatEmpty = data.errorNewPasswordRepeatEmpty;
                var errorPassnoMatch = data.errorPassnoMatch;
                var errorCurrentPass = data.errorCurrentPass;

                if (errorCurrentPass == true) {

                    $("#password-error-message").html('<p><i class="fas fa-exclamation-triangle fa-fw"></i>Incorrect password.</p>');

                    $("#settings-password-input-container").addClass("highlited-error-input");

                    $("#password-error-message").addClass("error-mesage-highlited");

                    $("#newpassword-error-message, #newpasswordrepeat-error-message").addClass("error-invisible");
                }


                if (errorCurrentPasswordEmpty == true) {

                    $("#password-error-message").html('<p><i class="fas fa-exclamation-triangle fa-fw"></i>Fill in the current password.</p>');

                    $("#settings-password-input-container").addClass("highlited-error-input");

                    $("#password-error-message").addClass("error-mesage-highlited");

                    $("#newpassword-error-message, #newpasswordrepeat-error-message").addClass("error-invisible");
                }


                if (errorNewPasswordEmpty == true) {

                    $("#newpassword-error-message").html('<p><i class="fas fa-exclamation-triangle fa-fw"></i>Fill in the new password.</p>');

                    $("#settings-newpassword-input-container").addClass("highlited-error-input");

                    $("#newpassword-error-message").addClass("error-mesage-highlited");

                    $("#password-error-message, #newpasswordrepeat-error-message").addClass("error-invisible");
                }

                if (errorNewPasswordRepeatEmpty == true) {

                    $("#newpasswordrepeat-error-message").html('<p><i class="fas fa-exclamation-triangle fa-fw"></i>Confirm your new password.</p>');

                    $("#settings-newpasswordrepeat-input-container").addClass("highlited-error-input");

                    $("#newpasswordrepeat-error-message").addClass("error-mesage-highlited");

                    $("#password-error-message, #newpassword-error-message").addClass("error-invisible");
                }


                if (errorPassnoMatch == true) {

                    $("#newpasswordrepeat-error-message").html('<p><i class="fas fa-exclamation-triangle fa-fw"></i>The two passwords do not match.</p>');

                    $("#settings-newpasswordrepeat-input-container").addClass("highlited-error-input");

                    $("#newpasswordrepeat-error-message").addClass("error-mesage-highlited");

                    $("#password-error-message, #newpassword-error-message").addClass("error-invisible");
                }











                if (errorCurrentPasswordEmpty == false && errorNewPasswordEmpty == false && errorNewPasswordRepeatEmpty == false &&
                    errorPassnoMatch == false && errorCurrentPass == false) {


                    IsPasswordEditing = false;


                    $("#settings-password-input-container, #settings-newpassword-input-container, #settings-newpasswordrepeat-input-container").removeClass("highlited-error-input");
                    $("#password-error-message, #newpassword-error-message, #newpasswordrepeat-error-message").children("p:first").remove();

                    document.querySelector("#password-toggle-icon").classList.remove("fa-times");
                    document.querySelector("#password-toggle-icon").classList.add("fa-edit");


                    //Hide
                    document.querySelector("#password-text").classList.remove("settings-invisible");

                    //Show

                    document.querySelector(".password-title-text").classList.add("settings-invisible");
                    document.querySelector(".newpassword-title-text").classList.add("settings-invisible");
                    document.querySelector(".newpasswordrepeat-title-text").classList.add("settings-invisible");


                    document.querySelector("#settings-password-input-container").classList.add("settings-invisible");
                    document.querySelector("#settings-newpassword-input-container").classList.add("settings-invisible");
                    document.querySelector("#settings-newpasswordrepeat-input-container").classList.add("settings-invisible");

                    document.querySelector("#updatepasswordSettings").classList.add("settings-invisible");

                    passwordInput.value = '';
                    newpasswordInput.value = '';
                    newpasswordrepeatInput.value = '';

                }

            },
            error: function (data) {

            },
        });

    })
});