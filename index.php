<?php 
include_once('Includes/navbar.php');
require('Includes/dbh.inc.php');
?>
    <div class="page-wrap">
    <div class=" game-page-container">
        <?php 

        $sqlVideoGames = "SELECT * FROM video_games ORDER BY rand() LIMIT 10";
        $queryVideoGames = mysqli_query($conn, $sqlVideoGames);
        $numberOfVideoGames = mysqli_num_rows($queryVideoGames);
        ?>
        <div class="swiper mySwiper">
        <div class="swiper-wrapper">
            <?php while ($rowVideoGames = mysqli_fetch_array($queryVideoGames)) {
                $sqlGenres = "SELECT * FROM videogames_genres WHERE videogamegenre_videogameid = " . $rowVideoGames["videogame_id"] . "";
                $queryGenres = mysqli_query($conn, $sqlGenres);

                $sqlPlatforms = "SELECT * FROM videogames_platforms WHERE videogamesplatform_videogameid = " . $rowVideoGames['videogame_id'] . "";
                $queryPlatforms = mysqli_query($conn, $sqlPlatforms);
                $resultCheckPlatforms = mysqli_num_rows($queryPlatforms);

                if (isset($_SESSION['loggedIn']) && $_SESSION['loggedIn'] == true) {
                    $sqlGamelist = "SELECT * FROM gamelist WHERE gamelist_userid = " . $_SESSION['user_id'] . " AND gamelist_videogameid = " . $rowVideoGames["videogame_id"];
                    $queryGamelist = mysqli_query($conn, $sqlGamelist);
                    $resultCheckGamelist = mysqli_num_rows($queryGamelist);
                }



                ?>
                <div class="swiper-slide">
                    <?php 
                    echo '
                               <div class="game-container-carouzel">
                                               <form class="game-form-carouzel" action="Includes/gamelist.inc.php" method="POST">
                                                   <div class= "game-left-container-carouzel">
                               ';

                    if (isset($_SESSION['loggedIn']) && $_SESSION['loggedIn'] == true) {
                        if ($resultCheckGamelist > 0) {
                            echo '<button class="game-ribbon ribbon-icon-active">
                                       <svg  viewBox="0 0 24 34" xmlns="http://www.w3.org/2000/svg" role="presentation"><polygon class="ribbon__bg-ribbon ribbon__bg-ribbon-active" fill="#000000" points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343"></polygon>
                                       </svg>
                                       <i class="ribbon-icon fas fa-check fa-fw ribbon-icon-active"></i>
                                       
                                       </button>';
                        } else {
                            echo '<button class="game-ribbon">
                                       <svg  viewBox="0 0 24 34" xmlns="http://www.w3.org/2000/svg" role="presentation"><polygon class="ribbon__bg-ribbon" fill="#000000" points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343"></polygon>
                                       </svg>
                                       <i class="ribbon-icon fas fa-plus fa-fw"></i>
                                       
                                       </button>';
                        }
                    }

                    echo '<div class="game-image-container-carouzel">
                    
                    <a href="singlepage.php?id=' . $rowVideoGames["videogame_id"] . '">
                               <img class="game-image-carouzel" src="' . $rowVideoGames["videogame_img"] . '"></a>
                                   </div>
                                   </div>
                                   <div class="game-right-container-carouzel">
                                   <div class="game-title-container-carouzel"><h2>';
                    $year = substr($rowVideoGames["videogame_releasedate"], -4);
                    echo
                        $rowVideoGames["videogame_name"] . ' (' . $year . ')</h2></div>
                               <hr class="game-horizontal-rule-carouzel">
                               <div class="game-description-container-carouzel">
                                   <p>' . $rowVideoGames["videogame_desc"] . '</p>
                               </div>';

                    if ($rowVideoGames["videogame_type"] == "Game") {
                        echo '<div class="game-developer-container-carouzel">Developer:<div class="game-developer-carouzel">' . $rowVideoGames["videogame_developer"] . '</div></div>';
                    } else if ($rowVideoGames["videogame_type"] == "Movie") {
                        echo '<div class="game-developer-container-carouzel">Director:<div class="game-developer-carouzel">' . $rowVideoGames["videogame_developer"] . '</div></div>';
                    } else if ($rowVideoGames["videogame_type"] == "TV Show") {
                        echo '<div class="game-developer-container-carouzel">Director:<div class="game-developer-carouzel">' . $rowVideoGames["videogame_developer"] . '</div></div>';
                    } else {
                        echo '<div class="game-developer-container-carouzel">Developer:<div class="game-developer-carouzel">' . $rowVideoGames["videogame_developer"] . '</div></div>';
                    }

                    if ($rowVideoGames["videogame_type"] == "Game") {
                        echo '<div class="game-publisher-container-carouzel">Publisher:<div class="game-publisher-carouzel">' . $rowVideoGames["videogame_publisher"] . '</div></div>';
                    } else if ($rowVideoGames["videogame_type"] == "Movie") {
                        echo '<div class="game-publisher-container-carouzel">Publisher:<div class="game-publisher-carouzel">' . $rowVideoGames["videogame_publisher"] . '</div></div>';
                    } else if ($rowVideoGames["videogame_type"] == "TV Show") {
                        echo '<div class="game-publisher-container-carouzel">Publisher:<div class="game-publisher-carouzel">' . $rowVideoGames["videogame_publisher"] . '</div></div>';
                    } else {
                        echo '<div class="game-publisher-container-carouzel">Publisher:<div class="game-publisher-carouzel">' . $rowVideoGames["videogame_publisher"] . '</div></div>';
                    }


                    if ($rowVideoGames["videogame_type"] == "Game") {
                        echo '<div class="game-platform-container-carouzel">Available For:';
                    } else if ($rowVideoGames["videogame_type"] == "Movie") {
                        echo '<div class="game-platform-container-carouzel">Top Cast:';
                    } else if ($rowVideoGames["videogame_type"] == "TV Show") {
                        echo '<div class="game-platform-container-carouzel">Top Cast:';
                    } else {
                        echo '<div class="game-platform-container-carouzel">Available For:';
                    }

                    $i = 0;
                    while ($rowPlatforms = mysqli_fetch_array($queryPlatforms)) {
                        $i++;
                        if ($resultCheckPlatforms <= $i) {
                            echo '<div class="game-platform-carouzel">' . $rowPlatforms["videogamesplatform_name"] . '</div>';
                        } else {
                            echo ' <div class="game-platform-carouzel">' . $rowPlatforms["videogamesplatform_name"] . ',</div>';
                        }
                    }

                    echo '  </div>
                               <div class="game-genre-container-carouzel">';

                    while ($rowGenres = mysqli_fetch_array($queryGenres)) {
                        echo ' <div class="game-genre-carouzel">' . $rowGenres["videogamegenre_name"] . '</div>';
                    }

                    echo ' </div>';


                    if ($rowVideoGames["videogame_type"] == 'Game') {
                        echo '<div class= "game-icon-container-carouzel"><i class="fas fa-gamepad fa-fw"></i></div>';
                    } else if ($rowVideoGames["videogame_type"] == 'Movie') {
                        echo '<div class= "game-icon-container-carouzel"><i class="fas fa-film fa-fw"></i></div>';
                    } else if ($rowVideoGames["videogame_type"] == 'TV Show') {
                        echo '<div class= "game-icon-container-carouzel"><i class="fas fa-tv fa-fw"></i></div>';
                    }

                    echo '<input  style="display:none;" type="text" id="videogame_id"  name="id" value="' . $rowVideoGames["videogame_id"] . '" readonly>';

                    echo '    
                                   </div>
                                   </form>
                                   </div>';




                    ?>
                      
                </div>
              
            <?php 
        } ?>
               
        </div>
      
        <div class="swiper-pagination"></div>
        </div>
<div class="welcome-message">
    <h1>Welcome to Checklist!</h1>
    <hr>
   
   
</div>
<div class="latest-releases-container">
    <h1>Latest Releases <img class="latest-releases-icon" src="Images/Icons/clock.png"></h1>
    <?php 

    $sqlVideoGames = "SELECT * FROM video_games WHERE SUBSTRING(videogame_releasedate, -4) = 2020 OR SUBSTRING(videogame_releasedate, -4) = 2021
    ORDER BY rand() LIMIT 9";
    $queryVideoGames = mysqli_query($conn, $sqlVideoGames);
    $numberOfVideoGames = mysqli_num_rows($queryVideoGames);
    ?>

    <div class="swiper swiper-latest-releases-carouzel">
      <div class="swiper-wrapper swiper-wrapper-latest-releases-carouzel">
      <?php while ($rowVideoGames = mysqli_fetch_array($queryVideoGames)) {
            if (isset($_SESSION['loggedIn']) && $_SESSION['loggedIn'] == true) {
                $sqlGamelist = "SELECT * FROM gamelist WHERE gamelist_userid = " . $_SESSION['user_id'] . " AND gamelist_videogameid = " . $rowVideoGames["videogame_id"];
                $queryGamelist = mysqli_query($conn, $sqlGamelist);
                $resultCheckGamelist = mysqli_num_rows($queryGamelist);
            }
            echo '<div class="swiper-slide swiper-slide-latest-releases-carouzel">';

            echo '
            <div class="game-container-latest-releases-carouzel">
                            <form class="game-form-carouzel game-form-latest-releases-carouzel" action="Includes/gamelist.inc.php" method="POST">
                                <div class= "game-left-container-latest-releases-carouzel">
            ';

            if (isset($_SESSION['loggedIn']) && $_SESSION['loggedIn'] == true) {
                if ($resultCheckGamelist > 0) {
                    echo '<button class="game-ribbon ribbon-icon-active">
                    <svg  viewBox="0 0 24 34" xmlns="http://www.w3.org/2000/svg" role="presentation"><polygon class="ribbon__bg-ribbon ribbon__bg-ribbon-active" fill="#000000" points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343"></polygon>
                    </svg>
                    <i class="ribbon-icon fas fa-check fa-fw ribbon-icon-active"></i>
                    
                    </button>';
                } else {
                    echo '<button class="game-ribbon">
                    <svg  viewBox="0 0 24 34" xmlns="http://www.w3.org/2000/svg" role="presentation"><polygon class="ribbon__bg-ribbon" fill="#000000" points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343"></polygon>
                    </svg>
                    <i class="ribbon-icon fas fa-plus fa-fw"></i>
                    
                    </button>';
                }
            }

            echo '<div class="game-image-container-latest-releases-carouzel">
                
                <a href="singlepage.php?id=' . $rowVideoGames["videogame_id"] . '">
                <img class="game-image-latest-releases-carouzel" src="' . $rowVideoGames["videogame_img"] . '"></a>
                </div>
                </div>
                <div class="game-right-container-latest-releases-carouzel">
                <div class="game-title-container-latest-releases-carouzel"><h2>';
            $year = substr($rowVideoGames["videogame_releasedate"], -4);
            echo $rowVideoGames["videogame_name"] . ' (' . $year . ')</h2></div>';
            if ($rowVideoGames["videogame_type"] == 'Game') {
                echo '<div class= "game-icon-container-latest-releases-carouzel"><i class="fas fa-gamepad fa-fw"></i></div>';
            } else if ($rowVideoGames["videogame_type"] == 'Movie') {
                echo '<div class= "game-icon-container-latest-releases-carouzel"><i class="fas fa-film fa-fw"></i></div>';
            } else if ($rowVideoGames["videogame_type"] == 'TV Show') {
                echo '<div class= "game-icon-container-latest-releases-carouzel"><i class="fas fa-tv fa-fw"></i></div>';
            }
            echo '<input  style="display:none;" type="text" id="videogame_id"  name="id" value="' . $rowVideoGames["videogame_id"] . '" readonly>';

            echo '    
                           </div>
                           </form>
                           </div>';
            echo '</div>';
        } ?>
       
       
      </div>
      <div class="swiper-pagination swiper-pagination-latest-releases-carouzel"></div>
     
    </div>
</div>
<div class="most-popular-container">
    <h1>Most Popular <img class="most-popular-icon" src="Images/Icons/fire.png"></h1>
    <?php 

    $sqlVideoGames = "SELECT * FROM video_games 
    ORDER BY rand() LIMIT 9";
    $queryVideoGames = mysqli_query($conn, $sqlVideoGames);
    $numberOfVideoGames = mysqli_num_rows($queryVideoGames);
    ?>

    <div class="swiper swiper-latest-releases-carouzel  swiper-most-popular-carouzel">
      <div class="swiper-wrapper swiper-wrapper-latest-releases-carouzel">
      <?php while ($rowVideoGames = mysqli_fetch_array($queryVideoGames)) {
            if (isset($_SESSION['loggedIn']) && $_SESSION['loggedIn'] == true) {
                $sqlGamelist = "SELECT * FROM gamelist WHERE gamelist_userid = " . $_SESSION['user_id'] . " AND gamelist_videogameid = " . $rowVideoGames["videogame_id"];
                $queryGamelist = mysqli_query($conn, $sqlGamelist);
                $resultCheckGamelist = mysqli_num_rows($queryGamelist);
            }
            echo '<div class="swiper-slide swiper-slide-latest-releases-carouzel">';

            echo '
            <div class="game-container-latest-releases-carouzel">
                            <form class="game-form-carouzel game-form-latest-releases-carouzel" action="Includes/gamelist.inc.php" method="POST">
                                <div class= "game-left-container-latest-releases-carouzel">
            ';

            if (isset($_SESSION['loggedIn']) && $_SESSION['loggedIn'] == true) {
                if ($resultCheckGamelist > 0) {
                    echo '<button class="game-ribbon ribbon-icon-active">
                    <svg  viewBox="0 0 24 34" xmlns="http://www.w3.org/2000/svg" role="presentation"><polygon class="ribbon__bg-ribbon ribbon__bg-ribbon-active" fill="#000000" points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343"></polygon>
                    </svg>
                    <i class="ribbon-icon fas fa-check fa-fw ribbon-icon-active"></i>
                    
                    </button>';
                } else {
                    echo '<button class="game-ribbon">
                    <svg  viewBox="0 0 24 34" xmlns="http://www.w3.org/2000/svg" role="presentation"><polygon class="ribbon__bg-ribbon" fill="#000000" points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343"></polygon>
                    </svg>
                    <i class="ribbon-icon fas fa-plus fa-fw"></i>
                    
                    </button>';
                }
            }

            echo '<div class="game-image-container-latest-releases-carouzel">
                
                <a href="singlepage.php?id=' . $rowVideoGames["videogame_id"] . '">
                <img class="game-image-latest-releases-carouzel" src="' . $rowVideoGames["videogame_img"] . '"></a>
                </div>
                </div>
                <div class="game-right-container-latest-releases-carouzel">
                <div class="game-title-container-latest-releases-carouzel"><h2>';
            $year = substr($rowVideoGames["videogame_releasedate"], -4);
            echo $rowVideoGames["videogame_name"] . ' (' . $year . ')</h2></div>';
            if ($rowVideoGames["videogame_type"] == 'Game') {
                echo '<div class= "game-icon-container-latest-releases-carouzel"><i class="fas fa-gamepad fa-fw"></i></div>';
            } else if ($rowVideoGames["videogame_type"] == 'Movie') {
                echo '<div class= "game-icon-container-latest-releases-carouzel"><i class="fas fa-film fa-fw"></i></div>';
            } else if ($rowVideoGames["videogame_type"] == 'TV Show') {
                echo '<div class= "game-icon-container-latest-releases-carouzel"><i class="fas fa-tv fa-fw"></i></div>';
            }
            echo '<input  style="display:none;" type="text" id="videogame_id"  name="id" value="' . $rowVideoGames["videogame_id"] . '" readonly>';

            echo '    
                           </div>
                           </form>
                           </div>';
            echo '</div>';
        } ?>
       
       
      </div>
      <div class="swiper-pagination swiper-pagination-latest-releases-carouzel"></div>
     
    </div>
</div>

<div class="our-picks-container">
    <h1>Our Picks <img class="most-popular-icon" src="Images/Icons/badge.png"></h1>
    <?php 

    $sqlVideoGames = "SELECT * FROM video_games 
    ORDER BY rand() LIMIT 9";
    $queryVideoGames = mysqli_query($conn, $sqlVideoGames);
    $numberOfVideoGames = mysqli_num_rows($queryVideoGames);
    ?>

    <div class="swiper swiper-latest-releases-carouzel  swiper-our-picks-carouzel">
      <div class="swiper-wrapper swiper-wrapper-latest-releases-carouzel">
      <?php while ($rowVideoGames = mysqli_fetch_array($queryVideoGames)) {
            if (isset($_SESSION['loggedIn']) && $_SESSION['loggedIn'] == true) {
                $sqlGamelist = "SELECT * FROM gamelist WHERE gamelist_userid = " . $_SESSION['user_id'] . " AND gamelist_videogameid = " . $rowVideoGames["videogame_id"];
                $queryGamelist = mysqli_query($conn, $sqlGamelist);
                $resultCheckGamelist = mysqli_num_rows($queryGamelist);
            }
            echo '<div class="swiper-slide swiper-slide-latest-releases-carouzel">';

            echo '
            <div class="game-container-latest-releases-carouzel">
                            <form class="game-form-carouzel game-form-latest-releases-carouzel" action="Includes/gamelist.inc.php" method="POST">
                                <div class= "game-left-container-latest-releases-carouzel">
            ';

            if (isset($_SESSION['loggedIn']) && $_SESSION['loggedIn'] == true) {
                if ($resultCheckGamelist > 0) {
                    echo '<button class="game-ribbon ribbon-icon-active">
                    <svg  viewBox="0 0 24 34" xmlns="http://www.w3.org/2000/svg" role="presentation"><polygon class="ribbon__bg-ribbon ribbon__bg-ribbon-active" fill="#000000" points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343"></polygon>
                    </svg>
                    <i class="ribbon-icon fas fa-check fa-fw ribbon-icon-active"></i>
                    
                    </button>';
                } else {
                    echo '<button class="game-ribbon">
                    <svg  viewBox="0 0 24 34" xmlns="http://www.w3.org/2000/svg" role="presentation"><polygon class="ribbon__bg-ribbon" fill="#000000" points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343"></polygon>
                    </svg>
                    <i class="ribbon-icon fas fa-plus fa-fw"></i>
                    
                    </button>';
                }
            }

            echo '<div class="game-image-container-latest-releases-carouzel">
                
                <a href="singlepage.php?id=' . $rowVideoGames["videogame_id"] . '">
                <img class="game-image-latest-releases-carouzel" src="' . $rowVideoGames["videogame_img"] . '"></a>
                </div>
                </div>
                <div class="game-right-container-latest-releases-carouzel">
                <div class="game-title-container-latest-releases-carouzel"><h2>';
            $year = substr($rowVideoGames["videogame_releasedate"], -4);
            echo $rowVideoGames["videogame_name"] . ' (' . $year . ')</h2></div>';
            if ($rowVideoGames["videogame_type"] == 'Game') {
                echo '<div class= "game-icon-container-latest-releases-carouzel"><i class="fas fa-gamepad fa-fw"></i></div>';
            } else if ($rowVideoGames["videogame_type"] == 'Movie') {
                echo '<div class= "game-icon-container-latest-releases-carouzel"><i class="fas fa-film fa-fw"></i></div>';
            } else if ($rowVideoGames["videogame_type"] == 'TV Show') {
                echo '<div class= "game-icon-container-latest-releases-carouzel"><i class="fas fa-tv fa-fw"></i></div>';
            }
            echo '<input  style="display:none;" type="text" id="videogame_id"  name="id" value="' . $rowVideoGames["videogame_id"] . '" readonly>';

            echo '    
                           </div>
                           </form>
                           </div>';
            echo '</div>';
        } ?>
       
       
      </div>
      <div class="swiper-pagination swiper-pagination-latest-releases-carouzel"></div>
     
    </div>
</div>
</div>
    </div>
    <?php include_once('Includes/contact.php'); ?>
    <?php include_once('Includes/footer.php'); ?>
    <script src="Javascript/main.js"></script>
    <script src="/swiper@7.4.1/swiper-bundle.min.js"/></script>
    <script src="Javascript/index.js"></script>
    <script src="Javascript/types.js"></script>
    <script src="Javascript/developer.js"></script>
    <script src="Javascript/publisher.js"></script>
    <script src="Javascript/platform.js"></script>
    <script src="Javascript/genre.js"></script>
    <script src="Javascript/search.js"></script>
    <script src="Javascript/contact.js"></script>


