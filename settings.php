<?php include_once('Includes/navbar.php'); ?>
    <div class="page-wrap page-container page-container-settings">
    <h1>Settings</h1>
        <div class="settings-page-container">
            
            <div class="profile-container">
                <form class="settings-profile-form" action="Includes/settings.inc.php" method="POST" enctype="multipart/form-data">
                   
                    <div class="settings-top-container">
                        <div  class="settings-icon"><i id="toggle-icon" class="fas fa-edit fa-fw"></i></div>
                    </div>

                    <div class="settings-middle-container">
                        <h2>Profile</h2>        
                    </div>

                    <div class="settings-bottom-container">
                        <div class="settings-bottom-left-container">
                            <div class="settings-img-container">
                                <label for="settings-profile-img-file-input">
                                  
                                        <?php 
                                        if (isset($_SESSION['loggedIn']) && $_SESSION['loggedIn'] == true) {
                                            if ($_SESSION['user_img'] == 1) {
                                                echo '<img  class="settings-profile-img" src="Uploads/' . $_SESSION['user_id'] . '-' . $_SESSION['user_date'] . '.jpg">';
                                            } else {
                                                echo '<img class="settings-profile-img" src="Uploads/defaultprofileimg.png">';
                                            }
                                        } else {
                                            echo '<img class="settings-profile-img" src="Uploads/defaultprofileimg.png">';
                                        }
                                        ?>
                                        <div class ="settings-profile-upload-icon"><i class="fas fa-plus-circle fa-fw fa-3x"></i></div>
                                        <input id="settings-profile-img-file-input" name="image" type="file"/>
                                       
                                        
                                </label>
                            
                            </div>
                        </div>

                        <div class="settings-vertical-rule"></div>

                        <div class="settings-bottom-right-container">
                            <h3>Username</h3>
                            <?php 
                            if (isset($_SESSION['loggedIn']) && $_SESSION['loggedIn'] == true) {
                                echo ' <div id="username-text" class="settings-profile-text">' . $_SESSION['user_username'] . '</div>';
                            } else {
                                echo ' <div id="username-text" class="settings-profile-text">Username</div>';
                            }
                            ?>

                            <div id="username-error-message" class="username-error error-mesage"></div>
                            <div id="settings-username-input-container" class = "settings-input-container settings-invisible">
                                <i class="fas fa-user fa-fw" id = "userIcon"></i>
                                <input  type="text" placeholder="Username" name="username" id="username" require>
                            </div>


                            <h3>Email</h3>
                            <?php 
                            if (isset($_SESSION['loggedIn']) && $_SESSION['loggedIn'] == true) {
                                echo ' <div id="email-text" class="settings-profile-text">' . $_SESSION['user_email'] . '</div>';
                            } else {
                                echo ' <div id="email-text" class="settings-profile-text">Username</div>';
                            }
                            ?>

                            <div id="email-error-message" class="email-error error-mesage"></div>
                            <div id="settings-email-input-container" class = "settings-input-container settings-invisible">
                                <i class="fas fa-envelope fa-fw" id = "userIcon"></i>
                                <input  type="text" placeholder="Email" name="email" id="email" require>
                            </div>

                            <button type="submit" name = "updatebtn" id="updateSettings" class="settings-formbtn settings-invisible">Update</button>

                        </div>
                    </div>

                </form>
            <div>

            
            
            
        </div>

        
    </div>
   
       </div>
      

 <div class="settings-page-container">
      <div class="profile-container profile-container-bottom">
                <form class="password-settings-profile-form" action="Includes/settings.inc.php" method="POST" enctype="multipart/form-data">
                   
                    <div class="settings-top-container">
                        <div  class="password-settings-icon"><i id="password-toggle-icon" class="fas fa-edit fa-fw"></i></div>
                    </div>

                    <div class="settings-middle-container">
                        <h2>Password</h2>        
                    </div>

                    <div class="settings-bottom-container">
                      

                        

                        <div class="settings-bottom-inner-container">
                        <div id="password-text" class="settings-profile-text">***********</div>
                        
                           <h3 class="password-title-text settings-invisible">Current Password</h3>
                            <div id="password-error-message" class="password-error error-mesage"></div>
                            <div id="settings-password-input-container" class = "settings-input-container settings-invisible">
                                <i class="fas fa-lock fa-fw" id = "userIcon"></i>
                                <input  type="password" placeholder="Current Password" name="password" id="password" require>
                            </div>

                             <h3 class="newpassword-title-text settings-invisible">Password</h3>
                            <div id="newpassword-error-message" class="newpassword-error error-mesage"></div>
                            <div id="settings-newpassword-input-container" class = "settings-input-container settings-invisible">
                                <i class="fas fa-lock fa-fw" id = "userIcon"></i>
                                <input  type="password" placeholder="Password" name="newpassword" id="newpassword" require>
                            </div>

                            <h3 class="newpasswordrepeat-title-text settings-invisible">Confirm Password</h3>
                            <div id="newpasswordrepeat-error-message" class="newpasswordrepeat-error error-mesage"></div>
                            <div id="settings-newpasswordrepeat-input-container" class = "settings-input-container settings-invisible">
                                <i class="fas fa-lock fa-fw" id = "userIcon"></i>
                                <input  type="password" placeholder="Repeat Password" name="newpasswordrepeat" id="newpasswordrepeat" require>
                            </div>
                            
                           
                            <button type="submit" name = "updatepasswordbtn" id="updatepasswordSettings" class="settings-formbtn settings-invisible">Update</button>

                        </div>
                    </div>

                </form>
            <div>
    </div>
                        </div>

    </div>
    </div>
    <?php include_once('Includes/contact.php'); ?>
    <?php include_once('Includes/footer.php'); ?>
    <script src="Javascript/main.js"></script>
    <script src="Javascript/settings.js"></script>
    <script src="Javascript/search.js"></script>
    <script src="Javascript/contact.js"></script>