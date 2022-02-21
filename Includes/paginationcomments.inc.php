<?php 
session_start();
require('dbh.inc.php');

$limit = 5;
$output = '';
if (!isset($_POST['page'])) {
    $page = 1;
} else {
    $page = $_POST['page'];
}

if (!isset($_POST['videogame_id'])) {
    $id = 0;
} else {
    $id = $_POST['videogame_id'];
}
$pageFirstResult = ($page - 1) * $limit;



$usernum = "SELECT * FROM videogames_ratings INNER JOIN users ON videogames_ratings.videogamerating_userid = users.user_id 
WHERE videogamerating_videogameid ='$id' LIMIT $pageFirstResult, $limit";

$sql = mysqli_query($conn, $usernum);


$sqlResult = mysqli_num_rows($sql);
while ($row2 = mysqli_fetch_array($sql)) {


    $output .= '<div class="comment-container-individual" data-aos="fade-left">
<div class="comment-container-avatar">
    <div class="user-avatar-container">';

    if ($row2['user_img'] == 1) {
        $output .= ' <img class="user-avatar-container-img" src="Uploads/' . $row2['user_id'] . '-' . $row2['user_date'] . '.jpg">';

    } else {
        $output .= ' <img class="user-avatar-container-img" src="Uploads/defaultprofileimg.png">';
    }


    $output .= ' </div>
</div>
<div class="comment-container-comment">
<div class="comment-container-top">
    <div class="user-avatar-container user-avatar-container-mini">';
    if ($row2['user_img'] == 1) {
        $output .= ' <img class="user-avatar-container-img user-avatar-container-img-mini" src="Uploads/' . $row2['user_id'] . '-' . $row2['user_date'] . '.jpg">';

    } else {
        $output .= ' <img class="user-avatar-container-img user-avatar-container-img-mini" src="Uploads/defaultprofileimg.png">';
    }
    $output .= '</div>
    <div class="comment-container-top-username">' . $row2["user_username"] . '</div>
    <div class="comment-container-top-icons">';
    if (isset($_SESSION['loggedIn']) && $_SESSION['loggedIn'] == true) {
        if ($row2["user_id"] == $_SESSION['user_id']) {
            $output .= '<div class="comment-container-top-delete-icon"><i class="fas fa-trash-alt fa-fw"></i></div>';
        }
    }
    $output .= '
    </div>
    
</div>
<div class="comment-container-middle">
    <div class="comment-container-middle-rating">';

    if ($row2["videogamerating_score"] == 1) {
        $output .= ' <div class="user-star star star-active"><i class="fa fa-star fa-fw"></i></div>
            <div class="user-star star"><i class="fa fa-star fa-fw"></i></div>
            <div class="user-star star"><i class="fa fa-star fa-fw"></i></div>
            <div class="user-star star"><i class="fa fa-star fa-fw"></i></div>
            <div class="user-star star"><i class="fa fa-star fa-fw"></i></div> ';
    } else if ($row2["videogamerating_score"] == 2) {
        $output .= ' <div class="user-star star star-active"><i class="fa fa-star fa-fw"></i></div>
            <div class="user-star star star-active"><i class="fa fa-star fa-fw"></i></div>
            <div class="user-star star"><i class="fa fa-star fa-fw"></i></div>
            <div class="user-star star"><i class="fa fa-star fa-fw"></i></div>
            <div class="user-star star"><i class="fa fa-star fa-fw"></i></div> ';
    } else if ($row2["videogamerating_score"] == 3) {
        $output .= ' <div class="user-star star star-active"><i class="fa fa-star fa-fw"></i></div>
            <div class="user-star star star-active"><i class="fa fa-star fa-fw"></i></div>
            <div class="user-star star star-active"><i class="fa fa-star fa-fw"></i></div>
            <div class="user-star star"><i class="fa fa-star fa-fw"></i></div>
            <div class="user-star star"><i class="fa fa-star fa-fw"></i></div> ';
    } else if ($row2["videogamerating_score"] == 4) {
        $output .= ' <div class="user-star star star-active"><i class="fa fa-star fa-fw"></i></div>
            <div class="user-star star star-active"><i class="fa fa-star fa-fw"></i></div>
            <div class="user-star star star-active"><i class="fa fa-star fa-fw"></i></div>
            <div class="user-star star star-active"><i class="fa fa-star fa-fw"></i></div>
            <div class="user-star star"><i class="fa fa-star fa-fw"></i></div> ';
    } else if ($row2["videogamerating_score"] == 5) {
        $output .= ' <div class="user-star star star-active"><i class="fa fa-star fa-fw"></i></div>
            <div class="user-star star star-active"><i class="fa fa-star fa-fw"></i></div>
            <div class="user-star star star-active"><i class="fa fa-star fa-fw"></i></div>
            <div class="user-star star star-active"><i class="fa fa-star fa-fw"></i></div>
            <div class="user-star star star-active"><i class="fa fa-star fa-fw"></i></div> ';
    } else {
        $output .= ' <div class="user-star star"><i class="fa fa-star fa-fw"></i></div>
            <div class="user-star star"><i class="fa fa-star fa-fw"></i></div>
            <div class="user-star star"><i class="fa fa-star fa-fw"></i></div>
            <div class="user-star star"><i class="fa fa-star fa-fw"></i></div>
            <div class="user-star star"><i class="fa fa-star fa-fw"></i></div> ';
    }

    $output .= '                                                                                                                                 
    </div>
  
    <div class="comment-container-middle-comment">' . $row2["videogamerating_review"] . '</div>
</div>';

    $date = $row2["videogamerating_date"];

    $day = date('l', strtotime($date));
    $dayNumber = date('d', strtotime($date));
    $month = date('F', strtotime($date));
    $year = date('Y', strtotime($date));
    $hour = date('G', strtotime($date));
    $minute = date('i', strtotime($date));
    $second = date('s', strtotime($date));
    $timeofday = date('A', strtotime($date));







    $output .= '<div class="comment-container-bottom">On ' . $day . ' ' . $dayNumber . 'th, ' . $month . ' ' . $year . ' ' . $hour . ':' . $minute . ':' . $second . ' ' . $timeofday .
        '</div>
</div>
</div>';
}

$sqlVideoGames = "SELECT * FROM videogames_ratings INNER JOIN users ON videogames_ratings.videogamerating_userid = users.user_id 
WHERE videogamerating_videogameid ='$id'";
$queryVideoGames = mysqli_query($conn, $sqlVideoGames);
$numberOfVideoGames = mysqli_num_rows($queryVideoGames);

$numberOfPages = ceil($numberOfVideoGames / $limit);
if ($numberOfPages != $page && $numberOfPages != 0) {
    $output .= '<div class="comment-button-container"><button class="morebtn">More...</button></div>';
}

echo $output;
?>