<div class="contact-modal" id="contact-modal">
    <div class="contact-modal-content" id="contact-modal-content">
        <form class="contact-form" action = "" method="post">
            <div class="modal-top">
                <div id="modal-close-btn" class="button-container"><span class="modal-close">&times;</span></div>
            </div>
        <div class="modal-bottom">
        <h1>Get in Touch</h1>

            <div id="contact-name-error-message" class="error-mesage"></div>
            <input type="text" placeholder="Name" name="contact-name" id="contact-name" autocomplete="off" require>
       

       
            <div id="contact-email-error-message" class="error-mesage"></div>
            <input type="text" placeholder="Email" name="contact-email" id="contact-email" autocomplete="off" require>
       

           
            <input type="text" placeholder="Subject" name="contact-subject" id="contact-subject" autocomplete="off">

            <div id="contact-message-error-message" class="error-mesage"></div>
            <textarea type="text" placeholder="Message" name="contact-message" id="contact-message" require></textarea>
      
        <button type="submit" name="sendbtn" id="sendbtn" class="sendbtn">Send</button>
        </div>
    </div>
</div>