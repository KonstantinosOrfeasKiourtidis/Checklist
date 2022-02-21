$(document).ready(function () {
    const contactbtnL = document.querySelector(".contactbtnL");
    const contactbtnS = document.querySelector(".contactbtnS");
    const contactModal = document.querySelector("#contact-modal");
    const contactModalContent = document.querySelector("#contact-modal-content");
    const contactClosebtn = document.querySelector("#modal-close-btn");
    const contactSendbtn = document.querySelector("#sendbtn");



    function OpenContactModal() {

        contactModal.style.display = "flex";
    }

    function CloseContactModal() {

        contactModal.style.display = "none";
    }

    function OnClick(evt) {

        let targetElement = evt.target; // clicked element

        do {

            if (targetElement == contactModalContent || targetElement == contactbtnS || targetElement == contactbtnL || targetElement == contactClosebtn) {

                return;
            }
            // Go up the DOM
            targetElement = targetElement.parentNode;

        } while (targetElement);

        CloseContactModal();

    }

    document.addEventListener("click", OnClick);
    contactbtnS.addEventListener("click", OpenContactModal);
    contactbtnL.addEventListener("click", OpenContactModal);
    contactClosebtn.addEventListener("click", CloseContactModal);



    $(".contact-form").submit(function (event) {
        event.preventDefault();
        var formData = new FormData($('.contact-form')[0]);

        $.ajax({
            type: "post",
            dataType: "json",
            url: "../Checklist/Includes/contact.inc.php?action=contactForm",
            contentType: false,
            processData: false,
            data: formData,
            success: function (data) {


                $("#contact-name-error-message, #contact-email-error-message,  #contact-message-error-message").children("p:first").remove();

                $("#contact-name, #contact-email, #contact-message").removeClass("highlited-error-input");

                $("#contact-name-error-message, #contact-email-error-message,  #contact-message-error-message").removeClass("error-mesage-highlited");

                $("#contact-name-error-message, #contact-email-error-message,  #contact-message-error-message").removeClass("error-invisible");


                var errorNameEmpty = data.errorNameEmpty;
                var errorEmailEmpty = data.errorEmailEmpty;
                var errorMessageEmpty = data.errorMessageEmpty;
                var errorEmail = data.errorEmail;


                if (errorNameEmpty == true) {
                    $("#contact-name-error-message").html('<p><i class="fas fa-exclamation-triangle fa-fw"></i>Fill in the name.</p>');

                    $("#contact-name").addClass("highlited-error-input");

                    $("#contact-name-error-message").addClass("error-mesage-highlited");

                    $("#contact-email-error-message, #contact-message-error-message").addClass("error-invisible");
                }

                if (errorEmailEmpty == true) {
                    $("#contact-email-error-message").html('<p><i class="fas fa-exclamation-triangle fa-fw"></i>Fill in the e-mail address.</p>');

                    $("#contact-email").addClass("highlited-error-input");

                    $("#contact-email-error-message").addClass("error-mesage-highlited");

                    $("#contact-name-error-message, #contact-message-error-message").addClass("error-invisible");

                }

                if (errorMessageEmpty == true) {
                    $("#contact-message-error-message").html('<p><i class="fas fa-exclamation-triangle fa-fw"></i>Fill in the text area.</p>');

                    $("#contact-message").addClass("highlited-error-input");

                    $("#contact-message-error-message").addClass("error-mesage-highlited");

                    $("#contact-email-error-message, #contact-name-error-message").addClass("error-invisible");
                }

                if (errorEmail == true) {
                    $("#contact-email-error-message").html('<p><i class="fas fa-exclamation-triangle fa-fw"></i>Invalid e-mail address.</p>');

                    $("#contact-email").addClass("highlited-error-input");

                    $("#contact-email-error-message").addClass("error-mesage-highlited");

                    $("#contact-name-error-message, #contact-message-error-message").addClass("error-invisible");
                }






                if (errorEmailEmpty == false && errorMessageEmpty == false && errorNameEmpty == false && errorEmail == false) {

                    CloseContactModal();

                    $("#contact-message").val("");
                    $("#contact-subject").val("");
                    $("#contact-email").val("");
                    $("#contact-name").val("");
                }

            },
            error: function (data) {

            },
        });

    })
});

