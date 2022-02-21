<?php 
include_once('Includes/navbar.php');
require('Includes/dbh.inc.php');

if (!isset($_GET['id'])) {
    $id = 1;
} else {
    $id = $_GET['id'];

}

?>
    
     
    <div class="page-wrap">
    <div class="game-page-container game-page-container-singlepage">

    <?php 

    $sqlVideoGames = "SELECT * FROM video_games WHERE videogame_id = '$id'";
    $queryVideoGames = mysqli_query($conn, $sqlVideoGames);
    $numberOfVideoGames = mysqli_num_rows($queryVideoGames);

    $rowVideoGames = mysqli_fetch_array($queryVideoGames);

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

    echo '<div class="game-container-singlepage">
    <form class="game-form-singlepage" action="Includes/gamelist.inc.php" method="POST">
        <div class= "game-left-container-singlepage">';

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


    echo '<div class="game-image-container-singlepage">
                    
                    <a>
                    
                               <img class="game-image-carouzel" src="' . $rowVideoGames["videogame_img"] . '"></a>
                                   </div>
                                   </div>
                                   <div class="game-right-container-singlepage">
                                   <div class="game-title-container-singlepage"><h2>';
    $year = substr($rowVideoGames["videogame_releasedate"], -4);
    echo
        $rowVideoGames["videogame_name"] . ' (' . $year . ')</h2></div>
                               <hr class="game-horizontal-rule-singlepage">
                               <div class="game-description-container-singlepage">
                                   <p>' . $rowVideoGames["videogame_desc"] . '</p>
                               </div>';

    if ($rowVideoGames["videogame_type"] == "Game") {
        echo '<div class="game-developer-container-singlepage">Developer:<div class="game-developer-singlepage">' . $rowVideoGames["videogame_developer"] . '</div></div>';
    } else if ($rowVideoGames["videogame_type"] == "Movie") {
        echo '<div class="game-developer-container-singlepage">Director:<div class="game-developer-singlepage">' . $rowVideoGames["videogame_developer"] . '</div></div>';
    } else if ($rowVideoGames["videogame_type"] == "TV Show") {
        echo '<div class="game-developer-container-singlepage">Director:<div class="game-developer-singlepage">' . $rowVideoGames["videogame_developer"] . '</div></div>';
    } else {
        echo '<div class="game-developer-container-singlepage">Developer:<div class="game-developer-singlepage">' . $rowVideoGames["videogame_developer"] . '</div></div>';
    }

    if ($rowVideoGames["videogame_type"] == "Game") {
        echo '<div class="game-publisher-container-singlepage">Publisher:<div class="game-publisher-singlepage">' . $rowVideoGames["videogame_publisher"] . '</div></div>';
    } else if ($rowVideoGames["videogame_type"] == "Movie") {
        echo '<div class="game-publisher-container-singlepage">Publisher:<div class="game-publisher-singlepage">' . $rowVideoGames["videogame_publisher"] . '</div></div>';
    } else if ($rowVideoGames["videogame_type"] == "TV Show") {
        echo '<div class="game-publisher-container-singlepage">Publisher:<div class="game-publisher-singlepage">' . $rowVideoGames["videogame_publisher"] . '</div></div>';
    } else {
        echo '<div class="game-publisher-container-singlepage">Publisher:<div class="game-publisher-singlepage">' . $rowVideoGames["videogame_publisher"] . '</div></div>';
    }
    $sql = ("SELECT AVG(videogames_ratings.videogamerating_score) as rating
    FROM videogames_ratings
    
   
    WHERE videogamerating_videogameid='" . $id . "' ");

    $result = mysqli_query($conn, $sql);
    while ($row2 = mysqli_fetch_array($result)) {
        $round = $row2['rating'];
        $final_rating = round($round);

        if ($final_rating == 1) {
            echo '<div class="game-rating-container-singlepage">Rating:<div class="game-rating-singlepage">
        <div class="star star-active" id="star1"><i class="fa fa-star fa-fw"></i></div>
        <div class="star" id="star2"><i class="fa fa-star fa-fw"></i></div>
        <div class="star" id="star3"><i class="fa fa-star fa-fw"></i></div>
        <div class="star" id="star4"><i class="fa fa-star fa-fw"></i></div>
        <div class="star" id="star5"><i class="fa fa-star fa-fw"></i></div>
        </div>';
        } else if ($final_rating == 2) {
            echo '<div class="game-rating-container-singlepage">Rating:<div class="game-rating-singlepage">
            <div class="star star-active" id="star1"><i class="fa fa-star fa-fw"></i></div>
            <div class="star star-active" id="star2"><i class="fa fa-star fa-fw"></i></div>
            <div class="star" id="star3"><i class="fa fa-star fa-fw"></i></div>
            <div class="star" id="star4"><i class="fa fa-star fa-fw"></i></div>
            <div class="star" id="star5"><i class="fa fa-star fa-fw"></i></div>
            </div>';
        } else if ($final_rating == 3) {
            echo '<div class="game-rating-container-singlepage">Rating:<div class="game-rating-singlepage">
            <div class="star star-active" id="star1"><i class="fa fa-star fa-fw"></i></div>
            <div class="star star-active" id="star2"><i class="fa fa-star fa-fw"></i></div>
            <div class="star star-active" id="star3"><i class="fa fa-star fa-fw"></i></div>
            <div class="star" id="star4"><i class="fa fa-star fa-fw"></i></div>
            <div class="star" id="star5"><i class="fa fa-star fa-fw"></i></div>
            </div>';
        } else if ($final_rating == 4) {
            echo '<div class="game-rating-container-singlepage">Rating:<div class="game-rating-singlepage">
            <div class="star star-active" id="star1"><i class="fa fa-star fa-fw"></i></div>
            <div class="star star-active" id="star2"><i class="fa fa-star fa-fw"></i></div>
            <div class="star star-active" id="star3"><i class="fa fa-star fa-fw"></i></div>
            <div class="star star-active" id="star4"><i class="fa fa-star fa-fw"></i></div>
            <div class="star" id="star5"><i class="fa fa-star fa-fw"></i></div>
            </div>';
        } else if ($final_rating == 5) {
            echo '<div class="game-rating-container-singlepage">Rating:<div class="game-rating-singlepage">
            <div class="star star-active" id="star1"><i class="fa fa-star fa-fw"></i></div>
            <div class="star star-active" id="star2"><i class="fa fa-star fa-fw"></i></div>
            <div class="star star-active" id="star3"><i class="fa fa-star fa-fw"></i></div>
            <div class="star star-active" id="star4"><i class="fa fa-star fa-fw"></i></div>
            <div class="star star-active" id="star5"><i class="fa fa-star fa-fw"></i></div>
            </div>';
        } else {
            echo '<div class="game-rating-container-singlepage">Rating:<div class="game-rating-singlepage">
            <div class="star" id="star1"><i class="fa fa-star fa-fw"></i></div>
            <div class="star" id="star2"><i class="fa fa-star fa-fw"></i></div>
            <div class="star" id="star3"><i class="fa fa-star fa-fw"></i></div>
            <div class="star" id="star4"><i class="fa fa-star fa-fw"></i></div>
            <div class="star" id="star5"><i class="fa fa-star fa-fw"></i></div>
            </div>';
        }
    }


    $usernum = "SELECT DISTINCT(videogamerating_userid) FROM videogames_ratings WHERE videogamerating_videogameid ='" . $id . "' ";

    $sql = mysqli_query($conn, $usernum);


    $sqlResult = mysqli_num_rows($sql);


    echo '<div class="numus">(' . $sqlResult . ')</div>';
    echo '</div>';


    if ($rowVideoGames["videogame_type"] == "Game") {
        echo '<div class="game-platform-container-singlepage">Available For:';
    } else if ($rowVideoGames["videogame_type"] == "Movie") {
        echo '<div class="game-platform-container-singlepage">Top Cast:';
    } else if ($rowVideoGames["videogame_type"] == "TV Show") {
        echo '<div class="game-platform-container-singlepage">Top Cast:';
    } else {
        echo '<div class="game-platform-container-singlepage">Available For:';
    }

    $i = 0;
    while ($rowPlatforms = mysqli_fetch_array($queryPlatforms)) {
        $i++;
        if ($resultCheckPlatforms <= $i) {
            echo '<div class="game-platform-singlepage">' . $rowPlatforms["videogamesplatform_name"] . '</div>';
        } else {
            echo ' <div class="game-platform-singlepage">' . $rowPlatforms["videogamesplatform_name"] . ',</div>';
        }
    }

    echo '  </div>
                               <div class="game-genre-container-singlepage">';

    $i = 0;
    while ($rowGenres = mysqli_fetch_array($queryGenres)) {

        $genre[$i] = $rowGenres["videogamegenre_name"];
        $i++;
        echo ' <div class="game-genre-singlepage">' . $rowGenres["videogamegenre_name"] . '</div>';
    }

    echo ' </div>';


    if ($rowVideoGames["videogame_type"] == 'Game') {
        echo '<div class= "game-icon-container-singlepage"><i class="fas fa-gamepad fa-fw"></i></div>';
    } else if ($rowVideoGames["videogame_type"] == 'Movie') {
        echo '<div class= "game-icon-container-singlepage"><i class="fas fa-film fa-fw"></i></div>';
    } else if ($rowVideoGames["videogame_type"] == 'TV Show') {
        echo '<div class= "game-icon-container-singlepage"><i class="fas fa-tv fa-fw"></i></div>';
    }

    echo '<input  style="display:none;" type="text" id="videogame_id"  name="id" value="' . $rowVideoGames["videogame_id"] . '" readonly>';
    if (isset($_SESSION['loggedIn']) && $_SESSION['loggedIn'] == true) {
        $user_id = $_SESSION['user_id'];
        $sql1 = ("SELECT * FROM videogames_ratings  WHERE videogamerating_userid = '$user_id' AND videogamerating_videogameid='$id'");

        $result = mysqli_query($conn, $sql1);
        $sqlResult = mysqli_num_rows($result);
        if ($sqlResult == 0) {
            echo '<input  style="display:none;" type="text" id="rating"  name="rating" value="' . 0 . '">';
        } else {

            while ($row2 = mysqli_fetch_array($result)) {
                echo '<input  style="display:none;" type="text" id="rating"  name="rating" value="' . $row2["videogamerating_score"] . '">';

            }
        }

    }
    $usernum = "SELECT DISTINCT(videogamerating_userid) FROM videogames_ratings WHERE videogamerating_videogameid ='" . $id . "' ";

    $sql = mysqli_query($conn, $usernum);


    $sqlResult = mysqli_num_rows($sql);

    echo '<input  style="display:none;" type="text" id="noOfUsers"  name="noOfUsers" value="' . $sqlResult . '">';

    $usernum = "SELECT COALESCE(SUM(videogamerating_score), 0) as score FROM videogames_ratings WHERE videogamerating_videogameid ='" . $id . "' ";

    $sql = mysqli_query($conn, $usernum);


    $sqlResult = mysqli_num_rows($sql);
    if ($sqlResult == 0) {
        echo '<input  style="display:none;" type="text" id="final-rating"  name="final-rating"  value="0">';
    } else {
        while ($row2 = mysqli_fetch_array($sql)) {
            echo '<input  style="display:none;" type="text" id="final-rating"  name="final-rating" value="' . $row2["score"] . '" >';
        }
    }






    echo '    
                                   </div>
                                   </form>
                                   </div>';
    ?>


    <div class="rating-container">
        <div class="rating-container-top">Rating
        
        </div>
        <div class="rating-container-bottom">
            <div class="rating-container-left">
            <?php 

            $usernum = "SELECT DISTINCT(videogamerating_userid) FROM videogames_ratings WHERE videogamerating_videogameid ='" . $id . "'";

            $sql = mysqli_query($conn, $usernum);


            $sqlResult = mysqli_num_rows($sql);

            $sql1 = ("SELECT AVG(videogames_ratings.videogamerating_score) as rating
            FROM videogames_ratings
            
           
            WHERE videogamerating_videogameid='" . $id . "' ");

            $result = mysqli_query($conn, $sql1);

            ?>
             <?php while ($row2 = mysqli_fetch_array($result)) {
                $round = $row2['rating'];
                $final_rating = round($round);
            } ?>
                <div class="rating-container-left-top"><?php echo $final_rating; ?>/5</div>
                <div class="rating-container-left-middle">
                   
        
                <?php if ($final_rating == 1) {
                    ?>
                <div class="star star-active" id="rate-star1"><i class="fa fa-star fa-fw"></i></div>
                    <div class="star" id="rate-star2"><i class="fa fa-star fa-fw"></i></div>
                    <div class="star" id="rate-star3"><i class="fa fa-star fa-fw"></i></div>
                    <div class="star" id="rate-star4"><i class="fa fa-star fa-fw"></i></div>
                    <div class="star" id="rate-star5"><i class="fa fa-star fa-fw"></i></div>
                <?php 
            } ?>

                 <?php if ($final_rating == 2) {
                    ?>
                <div class="star star-active" id="rate-star1"><i class="fa fa-star fa-fw"></i></div>
                    <div class="star star-active" id="rate-star2"><i class="fa fa-star fa-fw"></i></div>
                    <div class="star" id="rate-star3"><i class="fa fa-star fa-fw"></i></div>
                    <div class="star" id="rate-star4"><i class="fa fa-star fa-fw"></i></div>
                    <div class="star" id="rate-star5"><i class="fa fa-star fa-fw"></i></div>
                <?php 
            } ?>

            <?php if ($final_rating == 3) {
                ?>
                <div class="star star-active" id="rate-star1"><i class="fa fa-star fa-fw"></i></div>
                    <div class="star star-active" id="rate-star2"><i class="fa fa-star fa-fw"></i></div>
                    <div class="star star-active" id="rate-star3"><i class="fa fa-star fa-fw"></i></div>
                    <div class="star" id="rate-star4"><i class="fa fa-star fa-fw"></i></div>
                    <div class="star" id="rate-star5"><i class="fa fa-star fa-fw"></i></div>
                <?php 
            } ?>

             <?php if ($final_rating == 4) {
                ?>
                <div class="star star-active" id="rate-star1"><i class="fa fa-star fa-fw"></i></div>
                    <div class="star star-active" id="rate-star2"><i class="fa fa-star fa-fw"></i></div>
                    <div class="star star-active" id="rate-star3"><i class="fa fa-star fa-fw"></i></div>
                    <div class="star star-active" id="rate-star4"><i class="fa fa-star fa-fw"></i></div>
                    <div class="star" id="rate-star5"><i class="fa fa-star fa-fw"></i></div>
                <?php 
            } ?>

             <?php if ($final_rating == 5) { ?>
                <div class="star star-active" id="rate-star1"><i class="fa fa-star fa-fw"></i></div>
                    <div class="star star-active" id="rate-star2"><i class="fa fa-star fa-fw"></i></div>
                    <div class="star star-active" id="rate-star3"><i class="fa fa-star fa-fw"></i></div>
                    <div class="star star-active" id="rate-star4"><i class="fa fa-star fa-fw"></i></div>
                    <div class="star star-active" id="rate-star5"><i class="fa fa-star fa-fw"></i></div>
                <?php 
            } ?>

              <?php if ($final_rating == 0) { ?>
                <div class="star" id="rate-star1"><i class="fa fa-star fa-fw"></i></div>
                    <div class="star" id="rate-star2"><i class="fa fa-star fa-fw"></i></div>
                    <div class="star" id="rate-star3"><i class="fa fa-star fa-fw"></i></div>
                    <div class="star" id="rate-star4"><i class="fa fa-star fa-fw"></i></div>
                    <div class="star" id="rate-star5"><i class="fa fa-star fa-fw"></i></div>
                <?php 
            } ?>


                   

                    
                </div>
                <div class="rating-container-left-bottom"><?php echo $sqlResult; ?> Review/s</div>
            </div>
            <div class="rating-container-middle">
               
                <div class="rating-container-middle-star">
                <?php 

                $usernum = "SELECT DISTINCT(videogamerating_userid) FROM videogames_ratings WHERE videogamerating_score = 5
                AND videogamerating_videogameid ='" . $id . "'";

                $sql = mysqli_query($conn, $usernum);


                $sqlResult = mysqli_num_rows($sql);

                ?>
                    <div class="rating-container-middle-star-number rating-container-middle-five-star-number">5</div>
                    <div class="rating-container-middle-star-icon rating-container-middle-five-star-icon"> <div class="star star-active" id="statistic-star5"><i class="fa fa-star fa-fw"></i></div></div>
                    <div class="rating-container-middle-star-bar rating-container-middle-five-star-bar"><div class="rating-container-middle-star-bar-inner rating-container-middle-five-star-bar-inner"></div></div>
                    <div class="rating-container-middle-five-star-nums">(<?php echo $sqlResult; ?>)</div>
                </div>
                <div class="rating-container-middle-star">
                <?php 

                $usernum = "SELECT DISTINCT(videogamerating_userid) FROM videogames_ratings WHERE videogamerating_score = 4
                AND videogamerating_videogameid ='" . $id . "'";

                $sql = mysqli_query($conn, $usernum);


                $sqlResult = mysqli_num_rows($sql);

                ?>
                    <div class="rating-container-middle-star-number rating-container-middle-four-star-number">4</div>
                    <div class="rating-container-middle-star-icon rating-container-middle-four-star-icon"> <div class="star star-active" id="statistic-star4"><i class="fa fa-star fa-fw"></i></div></div>
                    <div class="rating-container-middle-star-bar rating-container-middle-four-star-bar"><div class="rating-container-middle-star-bar-inner rating-container-middle-four-star-bar-inner"></div></div>
                    <div class="rating-container-middle-four-star-nums">(<?php echo $sqlResult; ?>)</div>
                </div>
                <div class="rating-container-middle-star">
                <?php 

                $usernum = "SELECT DISTINCT(videogamerating_userid) FROM videogames_ratings WHERE videogamerating_score = 3
                AND videogamerating_videogameid ='" . $id . "'";

                $sql = mysqli_query($conn, $usernum);


                $sqlResult = mysqli_num_rows($sql);

                ?>
                    <div class="rating-container-middle-star-number rating-container-middle-three-star-number">3</div>
                    <div class="rating-container-middle-star-icon rating-container-middle-three-star-icon"> <div class="star star-active" id="statistic-star3"><i class="fa fa-star fa-fw"></i></div></div>
                    <div class="rating-container-middle-star-bar rating-container-middle-three-star-bar"><div class="rating-container-middle-star-bar-inner rating-container-middle-three-star-bar-inner"></div></div>
                    <div class="rating-container-middle-three-star-nums">(<?php echo $sqlResult; ?>)</div>
                </div>
                <div class="rating-container-middle-star">
                <?php 

                $usernum = "SELECT DISTINCT(videogamerating_userid) FROM videogames_ratings WHERE videogamerating_score = 2
                AND videogamerating_videogameid ='" . $id . "'";

                $sql = mysqli_query($conn, $usernum);


                $sqlResult = mysqli_num_rows($sql);

                ?>
                    <div class="rating-container-middle-star-number rating-container-middle-two-star-number">2</div>
                    <div class="rating-container-middle-star-icon rating-container-middle-two-star-icon"> <div class="star star-active" id="statistic-star2"><i class="fa fa-star fa-fw"></i></div></div>
                    <div class="rating-container-middle-star-bar rating-container-middle-two-star-bar"><div class="rating-container-middle-star-bar-inner rating-container-middle-two-star-bar-inner"></div></div>
                    <div class="rating-container-middle-two-star-nums">(<?php echo $sqlResult; ?>)</div>
                </div>
                <div class="rating-container-middle-star">
                <?php 

                $usernum = "SELECT DISTINCT(videogamerating_userid) FROM videogames_ratings WHERE videogamerating_score = 1
                AND videogamerating_videogameid ='" . $id . "'";

                $sql = mysqli_query($conn, $usernum);


                $sqlResult = mysqli_num_rows($sql);

                ?>
                    <div class="rating-container-middle-star-number rating-container-middle-one-star-number">1</div>
                    <div class="rating-container-middle-star-icon rating-container-middle-one-star-icon"> <div class="star star-active" id="statistic-star1"><i class="fa fa-star fa-fw"></i></div></div>
                    <div class="rating-container-middle-star-bar rating-container-middle-one-star-bar"><div class="rating-container-middle-star-bar-inner rating-container-middle-one-star-bar-inner"></div></div>
                    <div class="rating-container-middle-one-star-nums">(<?php echo $sqlResult; ?>)</div>
                </div>
            </div>
            <div class="rating-container-right">
               
                <?php 
                if (isset($_SESSION['loggedIn']) && $_SESSION['loggedIn'] == true) {
                    echo '<h3>Write a Review</h3><button id="ratebtnL" class="reviewbtn">Review</button>';
                } else {
                    echo '<h3>Write a Review</h3><form action="registration.php"><button class="reviewbtn registeralt">Register</button></form>';
                }
                ?>
            </div>
            </div>
        
            </div>
        
    <div class="comment-container" id="pagination_data">
       
    </div>
   
    
    <div class="latest-releases-container">
    <h1>Recommended <img class="latest-releases-icon" src="Images/Icons/badge.png"></h1>
    <?php 

    $query = "CREATE TEMPORARY TABLE videogamesgenres as SELECT video_games.videogame_id, video_games.videogame_name, video_games.videogame_img,
video_games.videogame_desc, video_games.videogame_releasedate, video_games.videogame_type, video_games.videogame_developer, video_games.videogame_publisher,
GROUP_CONCAT(videogames_genres.videogamegenre_name) as videogame_genre
FROM video_games 
INNER JOIN videogames_genres ON video_games.videogame_id = videogames_genres.videogamegenre_videogameid
GROUP BY video_games.videogame_id";
    mysqli_query($conn, $query);

    $sqlVideoGames = "SELECT * FROM videogamesgenres WHERE";


    for ($i = 0; $i <= count($genre) - 1; $i++) {
        if ($i > 0) {
            $sqlVideoGames .= " OR";
        }
        $sqlVideoGames .= " videogame_genre LIKE '%$genre[$i]%'";
    }
    $sqlVideoGames .= " AND videogame_id != '$id' ORDER BY rand() LIMIT 8";
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
            <div class="game-container-latest-releases-carouzel game-container-latest-releases-recommended-carouzel">
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

            echo '<div class="game-image-container-latest-releases-carouzel game-image-container-latest-releases-recommended-carouzel">
                
                <a href="singlepage.php?id=' . $rowVideoGames["videogame_id"] . '">
                <img class="game-image-latest-releases-carouzel game-image-latest-releases-recommended-carouzel" src="' . $rowVideoGames["videogame_img"] . '"></a>
                </div>
                </div>
                <div class="game-right-container-latest-releases-carouzel game-right-container-recommended-carouzel">
                <div class="game-title-container-latest-releases-carouzel game-title-container-latest-releases-recommended-carouzel"><h2>';
            $year = substr($rowVideoGames["videogame_releasedate"], -4);
            echo $rowVideoGames["videogame_name"] . ' (' . $year . ')</h2></div>';
            if ($rowVideoGames["videogame_type"] == 'Game') {
                echo '<div class= "game-icon-container-latest-releases-carouzel game-icon-container-latest-releases-recommended-carouzel"><i class="fas fa-gamepad fa-fw"></i></div>';
            } else if ($rowVideoGames["videogame_type"] == 'Movie') {
                echo '<div class= "game-icon-container-latest-releases-carouzel game-icon-container-latest-releases-recommended-carouzel"><i class="fas fa-film fa-fw"></i></div>';
            } else if ($rowVideoGames["videogame_type"] == 'TV Show') {
                echo '<div class= "game-icon-container-latest-releases-carouzel game-icon-container-latest-releases-recommended-carouzel"><i class="fas fa-tv fa-fw"></i></div>';
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
    <?php include_once('Includes/rating.php'); ?>
    <?php include_once('Includes/contact.php'); ?>
    <?php include_once('Includes/footer.php'); ?>
    <script src="Javascript/main.js"></script>
    <script src="/swiper@7.4.1/swiper-bundle.min.js"/></script>
   
    <script src="Javascript/singlepage.js"></script>
    <script src="Javascript/types.js"></script>
    <script src="/aos-master/dist/aos.js"></script>
    <script>AOS.init();</script>
    <script src="Javascript/search.js"></script>
    <script src="Javascript/contact.js"></script>