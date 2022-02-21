<?php 
if ($_GET['action'] == 'RemoveRate') {

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

    $userrated = "SELECT * FROM videogames_ratings WHERE videogamerating_userid = '" . $user_id . "' AND videogamerating_videogameid='" . $videogame_id . "' ";
    $sql = mysqli_query($conn, $userrated);

    $sqlResult = mysqli_num_rows($sql);
    if ($sqlResult > 0) {

        $sql = "DELETE FROM videogames_ratings WHERE videogamerating_userid = '" . $user_id . "' AND videogamerating_videogameid='" . $videogame_id . "' ";
        mysqli_query($conn, $sql);

    }

    mysqli_close($conn);
}

?>