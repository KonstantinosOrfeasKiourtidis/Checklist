<?php 
session_start();
require('dbh.inc.php');

$limit = 10;
$output = '';
if (!isset($_POST['page'])) {
    $page = 1;
} else {
    $page = $_POST['page'];
}

if (!isset($_POST['type'])) {
    $type = "";
} else {
    $type = $_POST['type'];
}

if (!isset($_POST['search'])) {
    $search = "";
} else {

    $search = mysqli_real_escape_string($conn, $_POST['search']);

}

if (!isset($_POST['genre'])) {
    $genre = "";
} else {

    $genre = $_POST['genre'];
}

if (!isset($_POST['platform'])) {
    $platform = "";
} else {

    $platform = $_POST['platform'];
}

if (!isset($_POST['developer'])) {
    $developer = "";
} else {

    $developer = $_POST['developer'];
}

if (!isset($_POST['publisher'])) {
    $publisher = "";
} else {

    $publisher = $_POST['publisher'];
}



$pageFirstResult = ($page - 1) * $limit;

if ($genre !== '' && $platform === '') {
    if (strpos($genre, ',')) {
        $noComma = substr_count($genre, ',');
        $output .= '<div class="filter-container">';
        $delim = ',';
        $genreArray = explode($delim, $genre);

        $query = "CREATE TEMPORARY TABLE videogamesgenres as SELECT video_games.videogame_id, video_games.videogame_name, video_games.videogame_img,
        video_games.videogame_desc, video_games.videogame_releasedate, video_games.videogame_type, video_games.videogame_developer, video_games.videogame_publisher,
        GROUP_CONCAT(videogames_genres.videogamegenre_name) as videogame_genre
        FROM video_games 
        INNER JOIN videogames_genres ON video_games.videogame_id = videogames_genres.videogamegenre_videogameid
        GROUP BY video_games.videogame_id";
        mysqli_query($conn, $query);

        $query2 = "SELECT * FROM videogamesgenres
         WHERE videogame_type LIKE '$type%' AND videogame_name LIKE '%$search%' 
         AND videogame_developer LIKE '$developer%' AND videogame_publisher LIKE '$publisher%'";

        for ($i = 0; $i <= count($genreArray) - 1; $i++) {

            $query2 .= " AND  videogame_genre LIKE '%$genreArray[$i]%'";

            $output .= '<div class="genre-filter-container">
            <div class="genre-filter-button"> 
                <div class="genre-filter">' . $genreArray[$i] . '</div>
                    <i class="fas fa-times fa-fw"></i>
                </div>
            </div>';

        }

        if ($developer !== '') {
            $output .= '<div class="developer-filter-container">
            <div class="developer-filter-button"> 
                <div class="developer-filter">' . $developer . '</div>
                    <i class="fas fa-times fa-fw"></i>
                </div>
            </div>';
        }

        if ($publisher !== '') {
            $output .= '<div class="publisher-filter-container">
            <div class="publisher-filter-button"> 
                <div class="publisher-filter">' . $publisher . '</div>
                    <i class="fas fa-times fa-fw"></i>
                </div>
            </div>';
        }

        $query2 .= " LIMIT  $pageFirstResult, $limit";

        $sqlVideoGames = $query2;

        $output .= '</div>';
    } else {
        $sqlVideoGames = "SELECT * FROM video_games 
        INNER JOIN videogames_genres ON video_games.videogame_id = videogames_genres.videogamegenre_videogameid
        WHERE videogame_type LIKE '$type%' AND videogame_name LIKE '%$search%' AND  videogamegenre_name LIKE '$genre%' 
        AND videogame_developer LIKE '$developer%' AND videogame_publisher LIKE '$publisher%'
        LIMIT " . $pageFirstResult . ',' . $limit;

        $output .= '
        <div class="filter-container">
            <div class="genre-filter-container">
                <div class="genre-filter-button"> 
                    <div class="genre-filter">' . $genre . '</div>
                    <i class="fas fa-times fa-fw"></i>
                </div>
            </div>
        ';

        if ($developer !== '') {
            $output .= '<div class="developer-filter-container">
            <div class="developer-filter-button"> 
        <div class="developer-filter">' . $developer . '</div>
            <i class="fas fa-times fa-fw"></i>
        </div>
    </div>';
        }

        if ($publisher !== '') {
            $output .= '<div class="publisher-filter-container">
            <div class="publisher-filter-button"> 
                <div class="publisher-filter">' . $publisher . '</div>
                    <i class="fas fa-times fa-fw"></i>
                </div>
            </div>';
        }



        $output .= '</div>';
    }


} else if ($genre === '' && $platform !== '') {
    if (strpos($platform, ',')) {
        $noComma = substr_count($platform, ',');
        $output .= '<div class="filter-container">';
        $delim = ',';
        $platformArray = explode($delim, $platform);

        $query = "CREATE TEMPORARY TABLE videogamesplatforms as SELECT video_games.videogame_id, video_games.videogame_name, video_games.videogame_img,
        video_games.videogame_desc, video_games.videogame_releasedate, video_games.videogame_type, video_games.videogame_developer, video_games.videogame_publisher,
        GROUP_CONCAT(videogames_platforms.videogamesplatform_name) as videogame_platform
        FROM video_games 
        INNER JOIN videogames_platforms ON video_games.videogame_id = videogames_platforms.videogamesplatform_videogameid
        GROUP BY video_games.videogame_id";
        mysqli_query($conn, $query);

        $query2 = "SELECT * FROM videogamesplatforms
         WHERE videogame_type LIKE '$type%' AND videogame_name LIKE '%$search%'
         AND videogame_developer LIKE '$developer%' AND videogame_publisher LIKE '$publisher%'";

        for ($i = 0; $i <= count($platformArray) - 1; $i++) {

            $query2 .= " AND  videogame_platform LIKE '%$platformArray[$i]%'";

            $output .= '<div class="platform-filter-container">
            <div class="platform-filter-button"> 
                <div class="platform-filter">' . $platformArray[$i] . '</div>
                    <i class="fas fa-times fa-fw"></i>
                </div>
            </div>';

        }


        if ($developer !== '') {
            $output .= '<div class="developer-filter-container">
            <div class="developer-filter-button"> 
                <div class="developer-filter">' . $developer . '</div>
                    <i class="fas fa-times fa-fw"></i>
                </div>
            </div>';
        }

        if ($publisher !== '') {
            $output .= '<div class="publisher-filter-container">
            <div class="publisher-filter-button"> 
                <div class="publisher-filter">' . $publisher . '</div>
                    <i class="fas fa-times fa-fw"></i>
                </div>
            </div>';
        }

        $query2 .= " LIMIT  $pageFirstResult, $limit";

        $sqlVideoGames = $query2;

        $output .= '</div>';

    } else {
        $sqlVideoGames = "SELECT * FROM video_games 
    INNER JOIN videogames_platforms ON video_games.videogame_id = videogames_platforms.videogamesplatform_videogameid
    WHERE videogame_type LIKE '$type%' AND videogame_name LIKE '%$search%' 
    AND  videogamesplatform_name LIKE '$platform%' AND videogame_developer LIKE '$developer%' AND videogame_publisher LIKE '$publisher%'
    LIMIT " . $pageFirstResult . ',' . $limit;



        $output .= '
    <div class="filter-container">
    ';

        if ($developer !== '') {
            $output .= '<div class="developer-filter-container">';
        }

        if ($publisher !== '') {
            $output .= '<div class="publisher-filter-container">
        <div class="publisher-filter-button"> 
            <div class="publisher-filter">' . $publisher . '</div>
                <i class="fas fa-times fa-fw"></i>
            </div>
        </div>';
        }

        $output .= ' <div class="platform-filter-container">
    <div class="platform-filter-button"> 
        <div class="platform-filter">' . $platform . '</div>
        <i class="fas fa-times fa-fw"></i>
    </div>
</div>';

        $output .= '</div>';
    }

} else if ($genre !== '' && $platform !== '') {
    if (!strpos($genre, ',') && strpos($platform, ',')) {
        $noComma = substr_count($platform, ',');
        $output .= '<div class="filter-container">
            <div class="genre-filter-container">
                <div class="genre-filter-button"> 
                    <div class="genre-filter">' . $genre . '</div>
                    <i class="fas fa-times fa-fw"></i>
                </div>
            </div>
        ';
        $delim = ',';
        $platformArray = explode($delim, $platform);

        $query = "CREATE TEMPORARY TABLE videogamesgenresplatforms as SELECT video_games.videogame_id, video_games.videogame_name, video_games.videogame_img,
        video_games.videogame_desc, video_games.videogame_releasedate, video_games.videogame_type, video_games.videogame_developer, video_games.videogame_publisher,
        GROUP_CONCAT(videogames_platforms.videogamesplatform_name) as videogame_platform,  GROUP_CONCAT(videogames_genres.videogamegenre_name) as videogame_genre
        FROM video_games 
        INNER JOIN  videogames_genres ON videogames_genres.videogamegenre_videogameid =video_games.videogame_id
        LEFT JOIN  videogames_platforms ON videogames_platforms.videogamesplatform_videogameid = videogames_genres.videogamegenre_videogameid
        GROUP BY video_games.videogame_id";
        mysqli_query($conn, $query);

        $query2 = "SELECT * FROM videogamesgenresplatforms
         WHERE videogame_type LIKE '$type%' AND videogame_name LIKE '%$search%' AND videogame_genre LIKE '%$genre%'
          AND videogame_developer LIKE '$developer%' AND videogame_publisher LIKE '$publisher%'";

        for ($i = 0; $i <= count($platformArray) - 1; $i++) {

            $query2 .= " AND  videogame_platform LIKE '%$platformArray[$i]%'";

            $output .= '<div class="platform-filter-container">
            <div class="platform-filter-button"> 
                <div class="platform-filter">' . $platformArray[$i] . '</div>
                    <i class="fas fa-times fa-fw"></i>
                </div>
            </div>';

        }

        if ($developer !== '') {
            $output .= '<div class="developer-filter-container">
            <div class="developer-filter-button"> 
                <div class="developer-filter">' . $developer . '</div>
                    <i class="fas fa-times fa-fw"></i>
                </div>
            </div>';
        }

        if ($publisher !== '') {
            $output .= '<div class="publisher-filter-container">
            <div class="publisher-filter-button"> 
                <div class="publisher-filter">' . $publisher . '</div>
                    <i class="fas fa-times fa-fw"></i>
                </div>
            </div>';
        }

        $query2 .= " LIMIT  $pageFirstResult, $limit";

        $sqlVideoGames = $query2;



        $output .= '</div>';

    } else if (strpos($genre, ',') && !strpos($platform, ',')) {
        $noComma = substr_count($genre, ',');
        $output .= '<div class="filter-container">
            <div class="platform-filter-container">
                <div class="platform-filter-button"> 
                    <div class="platform-filter">' . $platform . '</div>
                    <i class="fas fa-times fa-fw"></i>
                </div>
            </div>
        ';
        $delim = ',';
        $genreArray = explode($delim, $genre);

        $query = "CREATE TEMPORARY TABLE videogamesgenresplatforms as SELECT video_games.videogame_id, video_games.videogame_name, video_games.videogame_img,
        video_games.videogame_desc, video_games.videogame_releasedate, video_games.videogame_type, video_games.videogame_developer, video_games.videogame_publisher,
        GROUP_CONCAT(videogames_platforms.videogamesplatform_name) as videogame_platform,  
        GROUP_CONCAT(videogames_genres.videogamegenre_name) as videogame_genre
        FROM video_games 
        INNER JOIN  videogames_genres ON videogames_genres.videogamegenre_videogameid =video_games.videogame_id
        LEFT JOIN  videogames_platforms ON videogames_platforms.videogamesplatform_videogameid = videogames_genres.videogamegenre_videogameid
        GROUP BY video_games.videogame_id";
        mysqli_query($conn, $query);

        $query2 = "SELECT * FROM videogamesgenresplatforms
         WHERE videogame_type LIKE '$type%' AND videogame_name LIKE '%$search%' AND videogame_platform LIKE '%$platform%'
         AND videogame_developer LIKE '$developer%' AND videogame_publisher LIKE '$publisher%'";

        for ($i = 0; $i <= count($genreArray) - 1; $i++) {

            $query2 .= " AND  videogame_genre LIKE '%$genreArray[$i]%'";

            $output .= '<div class="genre-filter-container">
            <div class="genre-filter-button"> 
                <div class="genre-filter">' . $genreArray[$i] . '</div>
                    <i class="fas fa-times fa-fw"></i>
                </div>
            </div>';

        }

        if ($developer !== '') {
            $output .= '<div class="developer-filter-container">
            <div class="developer-filter-button"> 
                <div class="developer-filter">' . $developer . '</div>
                    <i class="fas fa-times fa-fw"></i>
                </div>
            </div>';
        }

        if ($publisher !== '') {
            $output .= '<div class="publisher-filter-container">
            <div class="publisher-filter-button"> 
                <div class="publisher-filter">' . $publisher . '</div>
                    <i class="fas fa-times fa-fw"></i>
                </div>
            </div>';
        }

        $query2 .= " LIMIT  $pageFirstResult, $limit";

        $sqlVideoGames = $query2;



        $output .= '</div>';

    } else if (strpos($genre, ',') && strpos($platform, ',')) {
        $noCommaGenre = substr_count($genre, ',');
        $noCommaPlatform = substr_count($platform, ',');
        $output .= '<div class="filter-container">';
        $delim = ',';
        $genreArray = explode($delim, $genre);
        $platformArray = explode($delim, $platform);

        $query = "CREATE TEMPORARY TABLE videogamesgenresplatforms as SELECT video_games.videogame_id, video_games.videogame_name, video_games.videogame_img,
        video_games.videogame_desc, video_games.videogame_releasedate, video_games.videogame_type, video_games.videogame_developer, video_games.videogame_publisher,
        GROUP_CONCAT(videogames_platforms.videogamesplatform_name) as videogame_platform,  
        GROUP_CONCAT(videogames_genres.videogamegenre_name) as videogame_genre
        FROM video_games 
        INNER JOIN  videogames_genres ON videogames_genres.videogamegenre_videogameid =video_games.videogame_id
        LEFT JOIN  videogames_platforms ON videogames_platforms.videogamesplatform_videogameid = videogames_genres.videogamegenre_videogameid
        GROUP BY video_games.videogame_id";
        mysqli_query($conn, $query);

        $query2 = "SELECT * FROM videogamesgenresplatforms
         WHERE videogame_type LIKE '$type%' AND videogame_name LIKE '%$search%'
         AND videogame_developer LIKE '$developer%' AND videogame_publisher LIKE '$publisher%'";

        for ($i = 0; $i <= count($genreArray) - 1; $i++) {

            $query2 .= " AND  videogame_genre LIKE '%$genreArray[$i]%'";

            $output .= '<div class="genre-filter-container">
            <div class="genre-filter-button"> 
                <div class="genre-filter">' . $genreArray[$i] . '</div>
                    <i class="fas fa-times fa-fw"></i>
                </div>
            </div>';

        }

        for ($i = 0; $i <= count($platformArray) - 1; $i++) {

            $query2 .= " AND  videogame_platform LIKE '%$platformArray[$i]%'";

            $output .= '<div class="platform-filter-container">
            <div class="platform-filter-button"> 
                <div class="platform-filter">' . $platformArray[$i] . '</div>
                    <i class="fas fa-times fa-fw"></i>
                </div>
            </div>';

        }

        if ($developer !== '') {
            $output .= '<div class="developer-filter-container">
            <div class="developer-filter-button"> 
                <div class="developer-filter">' . $developer . '</div>
                    <i class="fas fa-times fa-fw"></i>
                </div>
            </div>';
        }

        if ($publisher !== '') {
            $output .= '<div class="publisher-filter-container">
            <div class="publisher-filter-button"> 
                <div class="publisher-filter">' . $publisher . '</div>
                    <i class="fas fa-times fa-fw"></i>
                </div>
            </div>';
        }

        $query2 .= " LIMIT  $pageFirstResult, $limit";

        $sqlVideoGames = $query2;



        $output .= '</div>';
    } else {

        $sqlVideoGames = "SELECT * FROM video_games 
    INNER JOIN  videogames_genres ON videogames_genres.videogamegenre_videogameid =video_games.videogame_id
    LEFT JOIN  videogames_platforms ON videogames_platforms.videogamesplatform_videogameid = videogames_genres.videogamegenre_videogameid
    WHERE videogame_type LIKE '$type%' AND videogame_name LIKE '%$search%' AND  videogamesplatform_name LIKE '$platform%' 
    AND  videogamegenre_name LIKE '$genre%'
    AND videogame_developer LIKE '$developer%' AND videogame_publisher LIKE '$publisher%'
     LIMIT " . $pageFirstResult . ',' . $limit;

        $output .= '
    <div class="filter-container">
        <div class="genre-filter-container">
            <div class="genre-filter-button"> 
                <div class="genre-filter">' . $genre . '</div>
                <i class="fas fa-times fa-fw"></i>
            </div>
        </div>

        <div class="platform-filter-container">
            <div class="platform-filter-button"> 
                <div class="platform-filter">' . $platform . '</div>
                <i class="fas fa-times fa-fw"></i>
            </div>
        </div>
    ';


        if ($developer !== '') {
            $output .= '<div class="developer-filter-container">
        <div class="developer-filter-button"> 
            <div class="developer-filter">' . $developer . '</div>
                <i class="fas fa-times fa-fw"></i>
            </div>
        </div>';
        }

        if ($publisher !== '') {
            $output .= '<div class="publisher-filter-container">
        <div class="publisher-filter-button"> 
            <div class="publisher-filter">' . $publisher . '</div>
                <i class="fas fa-times fa-fw"></i>
            </div>
        </div>';
        }

        $output .= '</div>';
    }
} else {

    $sqlVideoGames = "SELECT * FROM video_games 
WHERE videogame_type LIKE '$type%' AND videogame_name LIKE '%$search%' AND videogame_developer LIKE '$developer%' AND videogame_publisher LIKE '$publisher%' LIMIT " . $pageFirstResult . ',' . $limit;

    if ($developer !== '') {
        $output .= '<div class="filter-container"><div class="developer-filter-container">
    <div class="developer-filter-button"> 
        <div class="developer-filter">' . $developer . '</div>
            <i class="fas fa-times fa-fw"></i>
        </div>
    </div></div>';
    }

    if ($publisher !== '') {
        $output .= '<div class="filter-container"><div class="publisher-filter-container">
    <div class="publisher-filter-button"> 
        <div class="publisher-filter">' . $publisher . '</div>
            <i class="fas fa-times fa-fw"></i>
        </div>
    </div></div>';
    }

}

$queryVideoGames = mysqli_query($conn, $sqlVideoGames);
$numberOfVideoGames = mysqli_num_rows($queryVideoGames);

if ($numberOfVideoGames == 0) {
    $output .= ' <div class="noresults-container"><h2>There are no results matching your search.</h2></div>';
}


while ($rowVideoGames = mysqli_fetch_array($queryVideoGames)) {


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

    $output .= '
    <div class="game-container" data-aos="fade-up"
     data-aos-duration="500">
                    <form class="game-form" action="Includes/gamelist.inc.php" method="POST">
                        <div class= "game-left-container">
    ';

    if (isset($_SESSION['loggedIn']) && $_SESSION['loggedIn'] == true) {
        if ($resultCheckGamelist > 0) {
            $output .= '<button class="game-ribbon ribbon-icon-active">
            <svg  viewBox="0 0 24 34" xmlns="http://www.w3.org/2000/svg" role="presentation"><polygon class="ribbon__bg-ribbon ribbon__bg-ribbon-active" fill="#000000" points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343"></polygon>
            </svg>
            <i class="ribbon-icon fas fa-check fa-fw ribbon-icon-active"></i>
          
            </button>';
        } else {
            $output .= '<button class="game-ribbon">
            <svg  viewBox="0 0 24 34" xmlns="http://www.w3.org/2000/svg" role="presentation"><polygon class="ribbon__bg-ribbon" fill="#000000" points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343"></polygon>
            </svg>
            <i class="ribbon-icon fas fa-plus fa-fw"></i>
           
            </button>';
        }
    }

    $output .= '<div class="game-image-container"><a href="singlepage.php?id=' . $rowVideoGames["videogame_id"] . '">
    <img class="game-image" src="' . $rowVideoGames["videogame_img"] . '"></a>
        </div>
        </div>
        <div class="game-right-container">
        <div class="game-title-container"><h2>';
    $year = substr($rowVideoGames["videogame_releasedate"], -4);
    $output .=
        $rowVideoGames["videogame_name"] . ' (' . $year . ')</h2></div>
    <hr class="game-horizontal-rule">
    <div class="game-description-container">
        <p>' . $rowVideoGames["videogame_desc"] . '</p>
    </div>';


    if ($rowVideoGames["videogame_type"] == "Game") {
        $output .= '<div class="game-platform-container">Available For:';
    } else if ($rowVideoGames["videogame_type"] == "Movie") {
        $output .= '<div class="game-platform-container">Top Cast:';
    } else if ($rowVideoGames["videogame_type"] == "TV Show") {
        $output .= '<div class="game-platform-container">Top Cast:';
    } else {
        $output .= '<div class="game-platform-container">Available For:';
    }

    $i = 0;
    while ($rowPlatforms = mysqli_fetch_array($queryPlatforms)) {
        $i++;
        if ($resultCheckPlatforms <= $i) {
            $output .= '<div class="game-platform">' . $rowPlatforms["videogamesplatform_name"] . '</div>';
        } else {
            $output .= ' <div class="game-platform">' . $rowPlatforms["videogamesplatform_name"] . ',</div>';
        }
    }

    $output .= '  </div>
    <div class="game-genre-container">';

    while ($rowGenres = mysqli_fetch_array($queryGenres)) {
        $output .= ' <div class="game-genre">' . $rowGenres["videogamegenre_name"] . '</div>';
    }

    $output .= ' </div>';

    if ($rowVideoGames["videogame_type"] == 'Game') {
        $output .= '<div class= "game-icon-container"><i class="fas fa-gamepad fa-fw"></i></div>';
    } else if ($rowVideoGames["videogame_type"] == 'Movie') {
        $output .= '<div class= "game-icon-container"><i class="fas fa-film fa-fw"></i></div>';
    } else if ($rowVideoGames["videogame_type"] == 'TV Show') {
        $output .= '<div class= "game-icon-container"><i class="fas fa-tv fa-fw"></i></div>';
    }

    $output .= '<input  style="display:none;" type="text" id="videogame_id"  name="id" value="' . $rowVideoGames["videogame_id"] . '" readonly>';

    $output .= '    
        </div>
        </form>
        </div>';
}
if ($genre !== '' && $platform === '') {
    if (strpos($genre, ',')) {

        $noComma = substr_count($genre, ',');
        $output .= '<div class="filter-container">';
        $delim = ',';
        $genreArray = explode($delim, $genre);

        $query2 = "SELECT * FROM videogamesgenres
        WHERE videogame_type LIKE '$type%' AND videogame_name LIKE '%$search%' AND videogame_developer LIKE '$developer%' AND videogame_publisher LIKE '$publisher%'";

        for ($i = 0; $i <= count($genreArray) - 1; $i++) {

            $query2 .= " AND  videogame_genre LIKE '%$genreArray[$i]%'";


        }



        $sqlVideoGames = $query2;


    } else {
        $sqlVideoGames = "SELECT * FROM video_games 
        INNER JOIN videogames_genres ON video_games.videogame_id = videogames_genres.videogamegenre_videogameid
        WHERE videogame_type LIKE '$type%' AND videogame_name LIKE '$search%' AND  videogamegenre_name LIKE '%$genre%' AND videogame_developer LIKE '$developer%' AND videogame_publisher LIKE '$publisher%'";
    }


} else if ($genre === '' && $platform !== '') {

    if (strpos($platform, ',')) {

        $noComma = substr_count($platform, ',');
        $output .= '<div class="filter-container">';
        $delim = ',';
        $platformArray = explode($delim, $platform);

        $query2 = "SELECT * FROM videogamesplatforms
         WHERE videogame_type LIKE '$type%' AND videogame_name LIKE '%$search%' AND videogame_developer LIKE '$developer%' AND videogame_publisher LIKE '$publisher%'";

        for ($i = 0; $i <= count($platformArray) - 1; $i++) {

            $query2 .= " AND  videogame_platform LIKE '%$platformArray[$i]%'";


        }



        $sqlVideoGames = $query2;




    } else {

        $sqlVideoGames = "SELECT * FROM video_games 
    INNER JOIN videogames_platforms ON video_games.videogame_id = videogames_platforms.videogamesplatform_videogameid
    WHERE videogame_type LIKE '$type%' AND videogame_name LIKE '$search%' AND  videogamesplatform_name LIKE '%$platform%' AND videogame_developer LIKE '$developer%' AND videogame_publisher LIKE '$publisher%'";
    }

} else if ($genre !== '' && $platform !== '') {
    if (!strpos($genre, ',') && strpos($platform, ',')) {
        $noComma = substr_count($platform, ',');
        $delim = ',';
        $platformArray = explode($delim, $platform);

        $query2 = "SELECT * FROM videogamesgenresplatforms
         WHERE videogame_type LIKE '$type%' AND videogame_name LIKE '%$search%' AND videogame_genre LIKE '%$genre%' AND videogame_developer LIKE '$developer%' AND videogame_publisher LIKE '$publisher%'";

        for ($i = 0; $i <= count($platformArray) - 1; $i++) {

            $query2 .= " AND  videogame_platform LIKE '%$platformArray[$i]%'";


        }



        $sqlVideoGames = $query2;





    } else if (strpos($genre, ',') && !strpos($platform, ',')) {
        $noComma = substr_count($genre, ',');

        $delim = ',';
        $genreArray = explode($delim, $genre);



        $query2 = "SELECT * FROM videogamesgenresplatforms
         WHERE videogame_type LIKE '$type%' AND videogame_name LIKE '%$search%' AND videogame_platform LIKE '%$platform%' AND videogame_developer LIKE '$developer%' AND videogame_publisher LIKE '$publisher%'";

        for ($i = 0; $i <= count($genreArray) - 1; $i++) {

            $query2 .= " AND  videogame_genre LIKE '%$genreArray[$i]%'";



        }



        $sqlVideoGames = $query2;




    } else if (strpos($genre, ',') && strpos($platform, ',')) {
        $noCommaGenre = substr_count($genre, ',');
        $noCommaPlatform = substr_count($platform, ',');
        $output .= '<div class="filter-container">';
        $delim = ',';
        $genreArray = explode($delim, $genre);
        $platformArray = explode($delim, $platform);


        $query2 = "SELECT * FROM videogamesgenresplatforms
         WHERE videogame_type LIKE '$type%' AND videogame_name LIKE '%$search%' AND videogame_developer LIKE '$developer%' AND videogame_publisher LIKE '$publisher%'";

        for ($i = 0; $i <= count($genreArray) - 1; $i++) {

            $query2 .= " AND  videogame_genre LIKE '%$genreArray[$i]%'";



        }

        for ($i = 0; $i <= count($platformArray) - 1; $i++) {

            $query2 .= " AND  videogame_platform LIKE '%$platformArray[$i]%'";



        }



        $sqlVideoGames = $query2;




    } else {
        $sqlVideoGames = "SELECT * FROM video_games 
    INNER JOIN  videogames_genres ON videogames_genres.videogamegenre_videogameid =video_games.videogame_id
    LEFT JOIN  videogames_platforms ON videogames_platforms.videogamesplatform_videogameid = videogames_genres.videogamegenre_videogameid
    WHERE videogame_type LIKE '$type%' AND videogame_name LIKE '$search%' AND  videogamesplatform_name LIKE '%$platform%' AND videogamegenre_name LIKE '%$genre%'
    AND videogame_developer LIKE '$developer%' AND videogame_publisher LIKE '$publisher%'";
    }

} else {
    $sqlVideoGames = "SELECT * FROM video_games
    WHERE videogame_type LIKE '$type%' AND videogame_name LIKE '%$search%' AND videogame_developer LIKE '$developer%' AND videogame_publisher LIKE '$publisher%'";
}


$queryVideoGames = mysqli_query($conn, $sqlVideoGames);
$numberOfVideoGames = mysqli_num_rows($queryVideoGames);

$numberOfPages = ceil($numberOfVideoGames / $limit);



$output .= ' <div class="pagination">';
if ($page - 1 >= 1) {
    $newpage = $page - 1;
    $output .= '<a class="pagination_link" id=' . $newpage . '>&lt;</a>';
} else {

}


if ($page - 1 >= 1) {
    for ($i = $page - 1; $i <= $numberOfPages; $i++) {


        if ($page == $i) {
            $output .= '<a class="active pagination_link" id="' . $i . '">' . $i . '</a>';
        } elseif ($i > $page + 1) {


        } else {
            $output .= '<a class="pagination_link" id="' . $i . '">' . $i . '</a>';
        }

    }
} else {
    for ($i = 1; $i <= $numberOfPages; $i++) {


        if ($page == $i) {
            $output .= '<a class="active pagination_link" id="' . $i . '">' . $i . '</a>';
        } elseif ($i > $page + 1) {

        } else {
            $output .= '<a class="pagination_link" id="' . $i . '">' . $i . '</a>';
        }

    }
}
if ($page + 1 >= $numberOfPages) {

} else {
    $output .= '  
<a class="not-active" >...</a>
<a class="pagination_link" id="' . $numberOfPages . '">' . $numberOfPages . '</a>';

}
if ($page + 1 <= $numberOfPages) {
    $newpage = $page + 1;
    $output .= '<a class="pagination_link" id=' . $newpage . '>&gt;</a>';
}

$output .= '</div>';






$output .= ' <div class="pagination-collapsed">';
if ($page - 1 >= 1) {
    $newpage = $page - 1;
    $output .= '<a class="pagination_link" id=' . $newpage . '>&lt;</a>';
}

$output .= '  
<a class="not-active" >' . $page . ' of ' . $numberOfPages . '</a>';

if ($page + 1 <= $numberOfPages) {
    $newpage = $page + 1;
    $output .= '<a class="pagination_link" id=' . $newpage . '>&gt;</a>';
}
$output .= '</div>';

echo $output;
?>