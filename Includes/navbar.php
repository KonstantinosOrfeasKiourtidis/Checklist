<?php 
session_start();
if (isset($_SESSION['loggedIn']) && $_SESSION['loggedIn'] == true) {
    if (basename($_SERVER['PHP_SELF']) == "registration.php"
        || basename($_SERVER['PHP_SELF']) == "login.php") {
        header('Location: index.php');
        exit;
    }
} else {
    if (basename($_SERVER['PHP_SELF']) == "settings.php"
        || basename($_SERVER['PHP_SELF']) == "checklist.php") {
        header('Location: index.php');
        exit;
    }
}

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name = "google-signin-client_id" content="**************************.apps.googleusercontent.com">
    <script src="https://apis.google.com/js/platform.js?onload=onLoad" async defer></script>
    <title>Checklist</title>
    <link rel="icon" type="image/x-icon" href="../Checklist/Images/Icons/favicon.ico">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="CSSReset.css">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="/aos-master/dist/aos.css" />
    <link rel="stylesheet" href="/swiper@7.4.1/swiper-bundle.min.css"/>
    <link href="/fontawsome/css/all.css" rel="stylesheet">
    <script src="/jquery/jquery-3.6.0.min.js"></script>
    
  
</head>

<body>
<nav class="navbar">
        <div class="Nav-Search">

            <div class="button-container">
                <button class="backbtn" type="submit">
                    <i class="fas fa-arrow-left fa-fw"></i>
                </button>

            </div>
            <input id="nav-search-searchbar_input" type="text" placeholder="Search.." name="search" autocomplete="off">
            <div class="button-container">
                <button class="clearbtn" type="submit">
                    <i class="fas fa-times fa-fw"></i>
                </button>

            </div>
        </div>
        <div class="Drawer-Left">
            <div class="button-container">
                <button class="toggle-button">
                    <i class="fas fa-bars fa-fw"></i>
                </button>
            </div>
            <div class="collapse-brand-title">
                <a href="index.php">Checklist</a>
            </div>

        </div>
        <div class="Drawer-Right">
            <div class="drawer-search-container">
                

                    <button id="drawer-searchbar_submit">
                        <i class="fa fa-search fa-fw"></i> </button>
                       
                   


               
            </div>
            
               
                <div class="filter-dropdown">
                    <button id="drawer-filter_submit" class="filter-dropbtn" ><i class="fa fa-filter fa-fw"></i></button>
                    <div id="FilterDropdown" class="filter-dropdown-content">
                        <input type="text" id="filter_filter" value=""style="display:none;">

                        <label class="filter_container">
                            <input type="radio" id="all_filter"  name="drawer-filter" value="" checked="checked">
                            <label class="filter-all-search" for="all_filter"><i class="fas fa-search fa-fw"></i>All</label><br>
                        </label>

                        <label class="filter_container">
                            <input type="radio" id="movie_filter" name="drawer-filter" value="Movie">
                            <label class="filter-movies-search" for="movie_filter"><i class="fas fa-film fa-fw"></i>Movies</label><br>
                         </label>

                        <label class="filter_container"> 
                            <input type="radio" id="tvshow_filter" name="drawer-filter" value="TV Show">
                            <label class="filter-tvshows-search" for="tvshow_filter"><i class="fas fa-tv fa-fw"></i>TV Shows</label><br>
                        </label>

                        <label class="filter_container" for="game_filter"> 
                            <input type="radio" id="game_filter" name="drawer-filter" value="Game">
                            <label class="filter-games-search" for="game_filter"><i class="fas fa-gamepad fa-fw"></i>Games</label>
                        </label>
                        

                    </div>

                </div>
            
        </div>
        <div class="navbarLeft">


            <div class="brand-title">
                <a href="index.php">Checklist</a>
            </div>




            <div class="navbar-linksLeft">
                <ul>




                    <li class="movies navleft">

                        <a href="games.php?pn=1&t=Movie&s=&g=&p=&d=&pb=">
                            <i class="fas fa-film fa-fw"></i>
                            Movies</a>


                    </li>
                    <li class="tvshows navleft">
                        <a href="games.php?pn=1&t=TV Show&s=&g=&p=&d=&pb=">
                            <i class="fas fa-tv fa-fw"></i>
                            TV Shows</a>
                    </li>

                    <li class="games navleft">
                        <a href="games.php?pn=1&t=Game&s=&g=&p=&d=&pb=">
                            <i class="fas fa-gamepad fa-fw"></i>
                            Games</a>
                    </li>

                    <li>
                        <div class="search-container">
                           
                            <div class="search-dropdown">
                            <button  class="search-dropbtn filter_link">All<i class="fas fa-sort-down fa-fw searchArrow"></i></button>
                                <div id="SearchDropdown" class="search-dropdown-content">
                                    <a class="all-search"><i class="fas fa-search fa-fw"></i>All</a>
                                    <a class="movies-search"> <i class="fas fa-film fa-fw"></i>Movies</a>
                                    <a class="tvshows-search"> <i class="fas fa-tv fa-fw"></i>TV Shows</a>
                                    <a class="games-search"> <i class="fas fa-gamepad fa-fw"></i>Games</a>
                                </div>
                            </div>
                           
                                <input id="searchbar_input" type="text" placeholder="Search.." name="search" autocomplete="off">
                                <button id="searchbar_submit" type="submit">
                                    <i class="fa fa-search"></i>
                                </button>

                            
                        </div>
                    </li>

                </ul>
            </div>


        </div>
        <div class="navbarRight">
            <div class="navbar-linksRight">
                <ul>
                <?php 

                if (isset($_SESSION['loggedIn']) && $_SESSION['loggedIn'] == true) {
                    echo '<li>
                        <div class="dropdown">
                        <button class="accdropbtn"><div class ="nav-img-container">';
                    if ($_SESSION['user_img'] == 1) {

                        echo '<img id="user-image-dropdown" class="nav-avatar-img" src="Uploads/' . $_SESSION['user_id'] . '-' . $_SESSION['user_date'] . '.jpg">';
                    } else {
                        echo '<img id="user-image-dropdown" class="nav-avatar-img" src="Uploads/defaultprofileimg.png">';
                    }
                    echo '</div>
                        <div id = "user-username-dropdown" class="dropdownArrow">' . $_SESSION['user_username'] . '
                      
                        </div>
                        <i class="fas fa-sort-down fa-fw accArrow"></i>
                        </button>
                        <div id="Dropdown" class="dropdown-content">
                        <a href="checklist.php?pn=1&t=&s=&g=&p="><i class="fas fa-clipboard-list fa-fw"></i>Checklist</a>
                        <a href="settings.php"><i class="fas fa-cog fa-fw"></i>Settings</a>
                        <form class="logoutbtn-form">
                        <button onclick="signOut();" class="logoutbtndropdown" type="submit" name="logoutbtn">
                        <i class="fas fa-sign-out-alt fa-fw"></i>Log Out
                        </button>
                        </form>
                        </div>
                        </div>
                        </li>';
                } else {
                    echo '<li><a href="login.php">Log In</a></li>
                        <li class="vl"></li>
                        <li><a class ="register" href="registration.php">Register</a></li>';
                }
                ?>
                </ul>
            </div>


        </div>

        <div id="Sidenav" class="sidenav">

            <ul>
                <li>
                    <div class="acc-container">
                        <div class="img-btn-container">
                            <div class="img-container">
                                <?php 
                                if (isset($_SESSION['loggedIn']) && $_SESSION['loggedIn'] == true) {
                                    if ($_SESSION['user_img'] == 1) {
                                        echo '<img id="user-image-drawer" class="avatar-img" src="Uploads/' . $_SESSION['user_id'] . '-' . $_SESSION['user_date'] . '.jpg">';
                                    } else {
                                        echo '<img id="user-image-drawer" class="avatar-img" src="Uploads/defaultprofileimg.png">';
                                    }
                                } else {
                                    echo '<img class="avatar-img" src="Uploads/defaultprofileimg.png">';
                                }
                                ?>
                                

                            </div>
                            <a class="closebtn">&times;</a>
                        </div>

                        <div class="usr-container">
                            <?php
                            if (isset($_SESSION['loggedIn']) && $_SESSION['loggedIn'] == true) {
                                echo '<span id ="user-username-drawer">' . $_SESSION['user_username'] . '</span>';

                            } else {
                                echo '<span>Guest</span>';
                            }
                            ?>
                            
                        </div>

                    </div>


                </li>

                <li>
                    <a href="games.php?pn=1&t=Movie&s=&g=&p=&d=&pb=">
                        <i class="fas fa-film fa-fw"></i>Movies</a>
                </li>
                <li>
                    <a href="games.php?pn=1&t=TV Show&s=&g=&p=&d=&pb=">
                        <i class="fas fa-tv fa-fw"></i>Tv Shows</a>
                </li>
                <li>
                    <a href="games.php?pn=1&t=Game&s=&g=&p=&d=&pb=">
                        <i class="fas fa-gamepad fa-fw"></i>Games</a>
                </li>
            </ul>
            <ul>

                <hr class="hl">
                <?php

                if (isset($_SESSION['loggedIn']) && $_SESSION['loggedIn'] == true) {
                    echo '<li><a href ="checklist.php?pn=1&t=&s=&g=&p="><i class= "fas fa-clipboard-list fa-fw"></i>Checklist</a></li>
                        <li><a href ="settings.php"><i class="fas fa-cog fa-fw"></i>Settings</a></li>
                        <hr class="hl">
                        <li>
                        <form>
                        <button onclick="signOut();" class="logoutbtn" type="submit" name="logoutbtn">
                        <i class="fas fa-sign-out-alt fa-fw"></i>Log Out</button>
                        </form>
                        </li>';
                } else {
                    echo '<li><a href="login.php"><i class="fas fa-sign-in-alt fa-fw"></i>Log In</a></li>
                        <li><a href= "registration.php"><i class="fas fa-edit fa-fw"></i>Register</a></li>';
                }
                ?>
                

                
            </ul>



        </div>
        <div class="rest-sidenav"></div>
    </nav>
    </body>
    </html>