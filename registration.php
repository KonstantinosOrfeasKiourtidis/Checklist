

   
   <?php 
    include_once('Includes/navbar.php');
    ?>
  
 
        
        <div class="page-wrap page-container">
            <form class="acc-form" action = "Includes/register.inc.php" method="POST" enctype="multipart/form-data">
                <div class="card-container">

                    <h1>Register</h1>
                    
                    <div class = "userinfo-container">

                        <div class = "image-container"> 
                            <label for="image-file-input">
                                <img class="registration-img" src="Uploads/defaultprofileimg.png">
                                <div class ="image-icon"><i class="fas fa-plus-circle fa-fw fa-3x"></i></div>
                            </label>
                            <input id="image-file-input" name="image" type="file"/>
                           
                        </div>
                       
                        <div id="username-error-message" class="username-error error-mesage"></div>
                        <div id="username-input-container" class = "input-container">
                            <i class="fas fa-user fa-fw" id = "userIcon"></i>
                            <input  type="text" placeholder="Username" name="username" id="username" require>
                        </div>

                      
                        <div id="email-error-message" class="email-error error-mesage"></div>
                       
                        <div id="email-input-container" class = "input-container">
                            <i class="fas fa-envelope fa-fw"></i>
                            <input  type="text" placeholder="Email" name="email" id="email" require>
                        </div>

                        <div id="password-error-message" class="password-error error-mesage"></div>
                        <div id="password-input-container" class = "input-container">
                            <i class="fas fa-lock fa-fw"></i>
                            <input  type="password" placeholder="Password" name="psw" id="psw" require>
                        </div>

                        <div id="passwordrepeat-error-message" class="repeat-password-error error-mesage"></div>
                        <div id="passwordrepeat-input-container" class = "input-container">
                            <i class="fas fa-lock fa-fw"></i>
                            <input  type="password" placeholder="Password" name="psw_repeat" id="psw-repeat" require>
                        </div>
                    
                    </div>
                    <div id="tc-error-message" class="tc-error error-mesage"></div>
                    <div class="tc-container"> 
                        <input type="checkbox" name = "tc" class ="tc" id = "tc" require>
                        <p>I agree to the <a href="#">Terms &amp; Privacy</a>.</p>
                    </div>
                        
                    <button type="submit" name = "registerbtn" id="createAccbtn" class="formbtn">Create Account</button>

                    <div class="different-options-container">
                        <div class= "or-container"><hr><p>OR</p><hr></div>

                        <div class="different-options-links">
                        
                        
                                <a class="g-signin2" data-onsuccess="onSignIn">
                                   
                                </a>

                                <a id = "fb-signin" onclick="fb_login();">
                                <i class="fab fa-facebook fa-fw"></i>
                             </a>

                        

                        </div>
                    </div>

                    <div class="container-alternative">
                        <p>Already have an account? <a href=login.php>Log in</a>.</p>
                    </div>

                </div>
            </form>
        </div>
    
        <?php include_once('Includes/contact.php'); ?>
 
    <?php include_once('Includes/footer.php'); ?>
    <script src="Javascript/main.js"></script>
    <script src="Javascript/registration.js"></script>
    <script src="Javascript/search.js"></script>
    <script src="Javascript/contact.js"></script>
