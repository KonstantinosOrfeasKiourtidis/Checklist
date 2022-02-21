<?php 
if ($_GET['action'] == 'Rate') {

    require('dbh.inc.php');

    if (!isset($_SESSION)) {
        session_start();
    }
    $user_id = $_SESSION['user_id'];

    if (isset($_POST['videogame_id'])) {
        $videogame_id = $_POST['videogame_id'];
    } else {
        $videogame_id = 0;
    }

    if (isset($_POST['review'])) {
        $review = $_POST['review'];
    } else {
        $review = '';
    }

    if (isset($_POST['rating'])) {
        $rating = $_POST['rating'];
    } else {
        $rating = 0;
    }

    $date = date("l d F Y G:i:s A");

    $errors = [
        'errorNoRating' => false,
        'errorNewEntry' => false,
    ];

    if (($rating <= 10) && ($rating >= 1)) {
        $userrated = "SELECT * FROM videogames_ratings WHERE videogamerating_userid = '" . $user_id . "' AND videogamerating_videogameid='" . $videogame_id . "' ";
        $sql = mysqli_query($conn, $userrated);


        $sqlResult = mysqli_num_rows($sql);
        if ($sqlResult > 0) {

            $exists = "SELECT * FROM video_games WHERE videogame_id='" . $videogame_id . "' ";

            $query = mysqli_query($conn, $exists);
            $queryResult = mysqli_num_rows($query);
            if ($queryResult > 0) {
                $sql = "UPDATE videogames_ratings SET videogamerating_videogameid='$videogame_id', videogamerating_userid='$user_id', videogamerating_score='$rating', videogamerating_review='$review', videogamerating_date='$date'
                 WHERE videogamerating_userid =$user_id AND videogamerating_videogameid='$videogame_id'";

                mysqli_query($conn, $sql);

            }

        } else {

            $exists = "SELECT * FROM video_games WHERE videogame_id='" . $videogame_id . "' ";

            $query = mysqli_query($conn, $exists);
            $queryResult = mysqli_num_rows($query);
            if ($queryResult > 0) {
                $sql = "INSERT INTO videogames_ratings (videogamerating_videogameid, videogamerating_userid, videogamerating_score, videogamerating_review, videogamerating_date) VALUES ('$videogame_id', '$user_id', '$rating', '$review', '$date');";

                mysqli_query($conn, $sql);
                $errors['errorNewEntry'] = true;
            }

        }


    } else {
        $errors['errorNoRating'] = true;
    }
    echo json_encode($errors);
    mysqli_close($conn);
}

?>