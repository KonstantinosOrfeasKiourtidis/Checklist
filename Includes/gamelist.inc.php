<?php 
if ($_GET['action'] == 'AddRemoveGame') {

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

    $date = date('Y/m/d H:i:s');

    $sqlVideogames = "SELECT * FROM video_games WHERE videogame_id = '$videogame_id'";
    $resultVideogames = mysqli_query($conn, $sqlVideogames);
    $resultCheckVideogames = mysqli_num_rows($resultVideogames);


    if ($resultCheckVideogames > 0) {
        $sqlGamelist = "SELECT * FROM gamelist WHERE gamelist_videogameid = '$videogame_id' AND gamelist_userid = '$user_id'";
        $resultGamelist = mysqli_query($conn, $sqlGamelist);
        $resultCheckGamelist = mysqli_num_rows($resultGamelist);
        if ($resultCheckGamelist > 0) {
            $sql = "DELETE FROM gamelist WHERE gamelist_videogameid = '$videogame_id' AND gamelist_userid = '$user_id';";
            mysqli_query($conn, $sql);
            echo json_encode("Removed To Gamelist");
        } else {
            $sql = "INSERT INTO gamelist (gamelist_videogameid, gamelist_userid, gamelist_date) VALUES ('$videogame_id', '$user_id', '$date');";
            mysqli_query($conn, $sql);
            echo json_encode("Added To Gamelist");
        }


    }


    mysqli_close($conn);
}
?>