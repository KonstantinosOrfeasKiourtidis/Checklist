

   
   <?php include_once('Includes/navbar.php'); ?>
  
   <div class="page-wrap page-container">
        
        
            <form class="acc-form" action = "Includes/login.inc.php" method="POST">
                <div class="card-container">

                    <h1>Login</h1>
                    
                    <div class = "userinfo-container">

                      

                        <div id="email-error-message" class="error-mesage"></div>
                        <div id="email-input-container" class = "input-container">
                            <i class="fas fa-envelope fa-fw"></i>
                            <input type="text" placeholder="Email" name="email" id="email" require>
                        </div>
                        
                        <div  id="password-error-message" class="error-mesage"></div>
                        <div  id="password-input-container" class = "input-container ">
                            <i class="fas fa-lock fa-fw"></i>
                            <input type="password" placeholder="Password" name="psw" id="psw" require>
                        </div>

                    
                    </div>
                        
                   
                        
                   <button type="submit" name="loginbtn" id="loginbtn" class="formbtn">Log In</button>

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
                        <p>Don't have an account? <a href=registration.php>Register</a>.</p>
                    </div>

                </div>
            </form>
        </div>
    
    <?php include_once('Includes/contact.php'); ?>
    <?php include_once('Includes/footer.php'); ?>
    <script src="Javascript/main.js"></script>
    <script src="Javascript/login.js"></script>
    <script src="Javascript/search.js"></script>
    <script src="Javascript/contact.js"></script>


