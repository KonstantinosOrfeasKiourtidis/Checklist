$(document).ready(function () {
    var page = 1;

    $(document).on('click', '.game-developer-singlepage', function () {

        var page = 1;
        var type = $('#filter_filter').val();
        var search = $("#searchbar_input").val();



        var genre = '';


        var platform = '';



        var developer = $(this).html();
        var publisher = '';

        url = 'games.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform + '&d=' + developer + '&pb=' + publisher;
        window.location = "../Checklist/" + url;

    });

    $(document).on('click', '.game-publisher-singlepage', function () {

        var page = 1;
        var type = $('#filter_filter').val();
        var search = $("#searchbar_input").val();



        var genre = '';


        var platform = '';



        var developer = '';
        var publisher = $(this).html();

        url = 'games.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform + '&d=' + developer + '&pb=' + publisher;
        window.location = "../Checklist/" + url;

    });

    $(document).on('click', '.game-genre-singlepage', function () {

        var page = 1;
        var type = $('#filter_filter').val();
        var search = $("#searchbar_input").val();



        var genre = $(this).html();


        var platform = '';



        var developer = '';
        var publisher = '';

        url = 'games.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform + '&d=' + developer + '&pb=' + publisher;
        window.location = "../Checklist/" + url;

    });

    $(document).on('click', '.game-platform-singlepage', function () {

        var page = 1;
        var type = $('#filter_filter').val();
        var search = $("#searchbar_input").val();



        var genre = '';


        var platform = $(this).html();

        if (platform.substring(0, platform.length - 1) == ',') {
            platform = platform.substring(0, platform.length - 1);
        }
        var developer = '';
        var publisher = '';

        url = 'games.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform + '&d=' + developer + '&pb=' + publisher;
        window.location = "../Checklist/" + url;

    });

    function AddToGameList() {


        if (!$(this).hasClass("ribbon-icon-active")) {


            $(this).find(".ribbon-icon").removeClass("fa-plus");
            $(this).find(".ribbon-icon").addClass("fa-check");




            $(this).find(".ribbon__bg-ribbon").addClass("ribbon__bg-ribbon-active");

            $(this).addClass("ribbon-icon-active");

            $(this).find(".ribbon-icon").addClass("ribbon-icon-active");

        } else {


            $(this).find(".ribbon-icon").removeClass("fa-check");
            $(this).find(".ribbon-icon").addClass("fa-plus");

            $(this).find(".ribbon__bg-ribbon").removeClass("ribbon__bg-ribbon-active");



            $(this).removeClass("ribbon-icon-active");

            $(this).find(".ribbon-icon").removeClass("ribbon-icon-active");

        }
    }



    $(document).on('click', '.game-ribbon', AddToGameList);




    $(document).on('submit', '.game-form-singlepage', function (event) {
        event.preventDefault();
        var videogame_id = $(this).find("#videogame_id").val();





        $.ajax({
            type: "post",
            dataType: "json",
            url: "../Checklist/Includes/gamelist.inc.php?action=AddRemoveGame",
            data:
                {
                    videogame_id: videogame_id

                },
            success: function (data) {





            },
            error: function (data) {

            },
        });



    })



    var swiperLatestReleases = new Swiper(".swiper-latest-releases-carouzel", {
        slidesPerView: 4,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: ".swiper-pagination-latest-releases-carouzel",
            clickable: true,
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 30,
            },
            500: {
                slidesPerView: 2,
                spaceBetween: 5,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 5,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 30,
            },
        },
    });








    const ratebtnL = document.querySelector("#ratebtnL");

    const rateModal = document.querySelector("#rate-modal");
    const rateModalContent = document.querySelector("#rate-modal-content");
    const rateClosebtn = document.querySelector("#rate-modal-close-btn");
    const rateSendbtn = document.querySelector("#ratebtn");



    function OpenRateModal() {

        rateModal.style.display = "flex";
    }

    function CloseRateModal() {

        rateModal.style.display = "none";
        $('#real-rate-star1').removeClass("star-active-persist");
        $('#real-rate-star2').removeClass("star-active-persist");
        $('#real-rate-star3').removeClass("star-active-persist");
        $('#real-rate-star4').removeClass("star-active-persist");
        $('#real-rate-star5').removeClass("star-active-persist");
        $("#rate-message").val('');
        $("#rate-error-message").children("p:first").remove();
        $("#rate-error-message").removeClass("error-mesage-highlited");
    }

    function OnClick(evt) {

        let targetElement = evt.target; // clicked element

        do {

            if (targetElement == rateModalContent || targetElement == ratebtnL || targetElement == rateClosebtn) {

                return;
            }
            // Go up the DOM
            targetElement = targetElement.parentNode;

        } while (targetElement);

        CloseRateModal();

    }

    document.addEventListener("click", OnClick);
    if (document.contains(ratebtnL)) {
        ratebtnL.addEventListener("click", OpenRateModal);
    }
    rateClosebtn.addEventListener("click", CloseRateModal);


    $(document).on('mouseover', '#real-rate-star1', function () {
        $('#real-rate-star1').addClass("star-active");
    })

    $(document).on('mouseout', '#real-rate-star1', function () {
        $('#real-rate-star1').removeClass("star-active");
    })

    $(document).on('mouseover', '#real-rate-star2', function () {
        $('#real-rate-star1').addClass("star-active");
        $('#real-rate-star2').addClass("star-active");
    })

    $(document).on('mouseout', '#real-rate-star2', function () {
        $('#real-rate-star1').removeClass("star-active");
        $('#real-rate-star2').removeClass("star-active");
    })

    $(document).on('mouseover', '#real-rate-star3', function () {
        $('#real-rate-star1').addClass("star-active");
        $('#real-rate-star2').addClass("star-active");
        $('#real-rate-star3').addClass("star-active");
    })

    $(document).on('mouseout', '#real-rate-star3', function () {
        $('#real-rate-star1').removeClass("star-active");
        $('#real-rate-star2').removeClass("star-active");
        $('#real-rate-star3').removeClass("star-active");
    })

    $(document).on('mouseover', '#real-rate-star4', function () {
        $('#real-rate-star1').addClass("star-active");
        $('#real-rate-star2').addClass("star-active");
        $('#real-rate-star3').addClass("star-active");
        $('#real-rate-star4').addClass("star-active");
    })

    $(document).on('mouseout', '#real-rate-star4', function () {
        $('#real-rate-star1').removeClass("star-active");
        $('#real-rate-star2').removeClass("star-active");
        $('#real-rate-star3').removeClass("star-active");
        $('#real-rate-star4').removeClass("star-active");
    })

    $(document).on('mouseover', '#real-rate-star5', function () {
        $('#real-rate-star1').addClass("star-active");
        $('#real-rate-star2').addClass("star-active");
        $('#real-rate-star3').addClass("star-active");
        $('#real-rate-star4').addClass("star-active");
        $('#real-rate-star5').addClass("star-active");
    })

    $(document).on('mouseout', '#real-rate-star5', function () {
        $('#real-rate-star1').removeClass("star-active");
        $('#real-rate-star2').removeClass("star-active");
        $('#real-rate-star3').removeClass("star-active");
        $('#real-rate-star4').removeClass("star-active");
        $('#real-rate-star5').removeClass("star-active");
    })

    $(document).on('click', '#real-rate-star1', function () {
        $('#real-rate-star1').addClass("star-active-persist");
        $('#real-rate-star2').removeClass("star-active-persist");
        $('#real-rate-star3').removeClass("star-active-persist");
        $('#real-rate-star4').removeClass("star-active-persist");
        $('#real-rate-star5').removeClass("star-active-persist");
    })

    $(document).on('click', '#real-rate-star2', function () {
        $('#real-rate-star1').addClass("star-active-persist");
        $('#real-rate-star2').addClass("star-active-persist");
        $('#real-rate-star3').removeClass("star-active-persist");
        $('#real-rate-star4').removeClass("star-active-persist");
        $('#real-rate-star5').removeClass("star-active-persist");
    })

    $(document).on('click', '#real-rate-star3', function () {
        $('#real-rate-star1').addClass("star-active-persist");
        $('#real-rate-star2').addClass("star-active-persist");
        $('#real-rate-star3').addClass("star-active-persist");
        $('#real-rate-star4').removeClass("star-active-persist");
        $('#real-rate-star5').removeClass("star-active-persist");
    })

    $(document).on('click', '#real-rate-star4', function () {
        $('#real-rate-star1').addClass("star-active-persist");
        $('#real-rate-star2').addClass("star-active-persist");
        $('#real-rate-star3').addClass("star-active-persist");
        $('#real-rate-star4').addClass("star-active-persist");
        $('#real-rate-star5').removeClass("star-active-persist");
    })

    $(document).on('click', '#real-rate-star5', function () {
        $('#real-rate-star1').addClass("star-active-persist");
        $('#real-rate-star2').addClass("star-active-persist");
        $('#real-rate-star3').addClass("star-active-persist");
        $('#real-rate-star4').addClass("star-active-persist");
        $('#real-rate-star5').addClass("star-active-persist");
    })


    var noOfReviews5 = $(".rating-container-middle-five-star-nums").html();
    var noOfReviewsRemoved5 = noOfReviews5.replace(/\D/g, "");
    var noOfReviewsToNumber5 = parseInt(noOfReviewsRemoved5);

    var noOfReviews4 = $(".rating-container-middle-four-star-nums").html();
    var noOfReviewsRemoved4 = noOfReviews4.replace(/\D/g, "");
    var noOfReviewsToNumber4 = parseInt(noOfReviewsRemoved4);

    var noOfReviews3 = $(".rating-container-middle-three-star-nums").html();
    var noOfReviewsRemoved3 = noOfReviews3.replace(/\D/g, "");
    var noOfReviewsToNumber3 = parseInt(noOfReviewsRemoved3);

    var noOfReviews2 = $(".rating-container-middle-two-star-nums").html();
    var noOfReviewsRemoved2 = noOfReviews2.replace(/\D/g, "");
    var noOfReviewsToNumber2 = parseInt(noOfReviewsRemoved2);

    var noOfReviews1 = $(".rating-container-middle-one-star-nums").html();
    var noOfReviewsRemoved1 = noOfReviews1.replace(/\D/g, "");
    var noOfReviewsToNumber1 = parseInt(noOfReviewsRemoved1);

    var numberOfUser = parseInt($("#noOfUsers").val());

    var No5Percentage = noOfReviewsToNumber5 * 100 / numberOfUser;
    var No4Percentage = noOfReviewsToNumber4 * 100 / numberOfUser;
    var No3Percentage = noOfReviewsToNumber3 * 100 / numberOfUser;
    var No2Percentage = noOfReviewsToNumber2 * 100 / numberOfUser;
    var No1Percentage = noOfReviewsToNumber1 * 100 / numberOfUser;

    $(".rating-container-middle-five-star-bar-inner").css("width", No5Percentage + "%");
    $(".rating-container-middle-four-star-bar-inner").css("width", No4Percentage + "%");
    $(".rating-container-middle-three-star-bar-inner").css("width", No3Percentage + "%");
    $(".rating-container-middle-two-star-bar-inner").css("width", No2Percentage + "%");
    $(".rating-container-middle-one-star-bar-inner").css("width", No1Percentage + "%");

    load_data(1, false);

    function load_data(page, append) {

        var videogame_id = $("#videogame_id").val();
        $.ajax({

            url: "../Checklist/Includes/paginationcomments.inc.php",
            method: "POST",
            data: {
                page: page,
                videogame_id: videogame_id,
            },
            success: function (data) {


                if (append == false) {
                    $('#pagination_data').html(data);
                }
                else {
                    $('#pagination_data').append(data);
                }





            }
        })


    }




    $(document).on('click', '#ratebtn', function (event) {
        page = 1;
        event.preventDefault();
        var videogame_id = $("#videogame_id").val();
        var review = $("#rate-message").val();
        var oldRating = parseInt($("#rating").val());
        var oldGlobalRating = parseInt($("#final-rating").val());
        var numberOfUser = parseInt($("#noOfUsers").val());


        if ($('#real-rate-star5').hasClass("star-active-persist")) {
            var rating = 5;
        }
        else if ($('#real-rate-star4').hasClass("star-active-persist")) {
            var rating = 4;
        }
        else if ($('#real-rate-star3').hasClass("star-active-persist")) {
            var rating = 3;
        }
        else if ($('#real-rate-star2').hasClass("star-active-persist")) {
            var rating = 2;
        }
        else if ($('#real-rate-star1').hasClass("star-active-persist")) {
            var rating = 1;
        } else {
            var rating = 0;
        }




        $.ajax({
            type: "post",
            dataType: "json",
            url: "../Checklist/Includes/rating.inc.php?action=Rate",
            data:
                {
                    videogame_id: videogame_id,
                    rating: rating,
                    review: review

                },
            success: function (data) {


                $("#rate-error-message").children("p:first").remove();



                $("#rate-error-message").removeClass("error-mesage-highlited");



                var errorNoRating = data.errorNoRating;
                var errorNewEntry = data.errorNewEntry;

                if (errorNoRating == false) {
                    $("#rating").val(rating);

                    CloseRateModal();
                    load_data(1, false);



                    if (errorNewEntry == true) {


                        var noOfReviews = $(".rating-container-left-bottom").html();
                        var noOfReviewsRemoved = noOfReviews.replace(/\D/g, "");
                        var noOfReviewsToNumber = parseInt(noOfReviewsRemoved);
                        noOfReviewsToNumber = noOfReviewsToNumber + 1;
                        var newNoOfUsers = numberOfUser + 1;

                        var avgOfRatings = Math.round((oldGlobalRating + rating) / newNoOfUsers);


                        var noOfReviews5 = $(".rating-container-middle-five-star-nums").html();
                        var noOfReviewsRemoved5 = noOfReviews5.replace(/\D/g, "");
                        var noOfReviewsToNumber5 = parseInt(noOfReviewsRemoved5);

                        var noOfReviews4 = $(".rating-container-middle-four-star-nums").html();
                        var noOfReviewsRemoved4 = noOfReviews4.replace(/\D/g, "");
                        var noOfReviewsToNumber4 = parseInt(noOfReviewsRemoved4);

                        var noOfReviews3 = $(".rating-container-middle-three-star-nums").html();
                        var noOfReviewsRemoved3 = noOfReviews3.replace(/\D/g, "");
                        var noOfReviewsToNumber3 = parseInt(noOfReviewsRemoved3);

                        var noOfReviews2 = $(".rating-container-middle-two-star-nums").html();
                        var noOfReviewsRemoved2 = noOfReviews2.replace(/\D/g, "");
                        var noOfReviewsToNumber2 = parseInt(noOfReviewsRemoved2);

                        var noOfReviews1 = $(".rating-container-middle-one-star-nums").html();
                        var noOfReviewsRemoved1 = noOfReviews1.replace(/\D/g, "");
                        var noOfReviewsToNumber1 = parseInt(noOfReviewsRemoved1);









                        $(".rating-container-left-top").html(avgOfRatings + "/5");

                        $(".numus").html("(" + newNoOfUsers + ")");

                        $("#final-rating").val(oldGlobalRating + rating);
                        $("#noOfUsers").val(newNoOfUsers);

                        if (avgOfRatings == 5) {
                            $("#rate-star1").addClass("star-active");
                            $("#rate-star2").addClass("star-active");
                            $("#rate-star3").addClass("star-active");
                            $("#rate-star4").addClass("star-active");
                            $("#rate-star5").addClass("star-active");

                            $("#star1").addClass("star-active");
                            $("#star2").addClass("star-active");
                            $("#star3").addClass("star-active");
                            $("#star4").addClass("star-active");
                            $("#star5").addClass("star-active");
                        }
                        else if (avgOfRatings == 4) {
                            $("#rate-star1").addClass("star-active");
                            $("#rate-star2").addClass("star-active");
                            $("#rate-star3").addClass("star-active");
                            $("#rate-star4").addClass("star-active");
                            $("#rate-star5").removeClass("star-active");

                            $("#star1").addClass("star-active");
                            $("#star2").addClass("star-active");
                            $("#star3").addClass("star-active");
                            $("#star4").addClass("star-active");
                            $("#star5").removeClass("star-active");
                        }
                        else if (avgOfRatings == 3) {
                            $("#rate-star1").addClass("star-active");
                            $("#rate-star2").addClass("star-active");
                            $("#rate-star3").addClass("star-active");
                            $("#rate-star4").removeClass("star-active");
                            $("#rate-star5").removeClass("star-active");

                            $("#star1").addClass("star-active");
                            $("#star2").addClass("star-active");
                            $("#star3").addClass("star-active");
                            $("#star4").removeClass("star-active");
                            $("#star5").removeClass("star-active");
                        }
                        else if (avgOfRatings == 2) {
                            $("#rate-star1").addClass("star-active");
                            $("#rate-star2").addClass("star-active");
                            $("#rate-star3").removeClass("star-active");
                            $("#rate-star4").removeClass("star-active");
                            $("#rate-star5").removeClass("star-active");

                            $("#star1").addClass("star-active");
                            $("#star2").addClass("star-active");
                            $("#star3").removeClass("star-active");
                            $("#star4").removeClass("star-active");
                            $("#star5").removeClass("star-active");
                        }
                        else if (avgOfRatings == 1) {
                            $("#rate-star1").addClass("star-active");
                            $("#rate-star2").removeClass("star-active");
                            $("#rate-star3").removeClass("star-active");
                            $("#rate-star4").removeClass("star-active");
                            $("#rate-star5").removeClass("star-active");

                            $("#star1").addClass("star-active");
                            $("#star2").removeClass("star-active");
                            $("#star3").removeClass("star-active");
                            $("#star4").removeClass("star-active");
                            $("#star5").removeClass("star-active");
                        }
                        else {
                            $("#rate-star1").removeClass("star-active");
                            $("#rate-star2").removeClass("star-active");
                            $("#rate-star3").removeClass("star-active");
                            $("#rate-star4").removeClass("star-active");
                            $("#rate-star5").removeClass("star-active");

                            $("#star1").removeClass("star-active");
                            $("#star2").removeClass("star-active");
                            $("#star3").removeClass("star-active");
                            $("#star4").removeClass("star-active");
                            $("#star5").removeClass("star-active");
                        }

                        $(".rating-container-left-bottom").html(noOfReviewsToNumber + " Review/s");
                        if (rating == 5) {
                            var noOfReviews = $(".rating-container-middle-five-star-nums").html();
                            var noOfReviewsRemoved = noOfReviews.replace(/\D/g, "");
                            var noOfReviewsToNumber = parseInt(noOfReviewsRemoved);
                            noOfReviewsToNumber = noOfReviewsToNumber + 1;
                            $(".rating-container-middle-five-star-nums").html("(" + noOfReviewsToNumber + ")");

                            noOfReviewsToNumber5++;
                        }
                        else if (rating == 4) {
                            var noOfReviews = $(".rating-container-middle-four-star-nums").html();
                            var noOfReviewsRemoved = noOfReviews.replace(/\D/g, "");
                            var noOfReviewsToNumber = parseInt(noOfReviewsRemoved);
                            noOfReviewsToNumber = noOfReviewsToNumber + 1;
                            $(".rating-container-middle-four-star-nums").html("(" + noOfReviewsToNumber + ")");

                            noOfReviewsToNumber4++;
                        }
                        else if (rating == 3) {
                            var noOfReviews = $(".rating-container-middle-three-star-nums").html();
                            var noOfReviewsRemoved = noOfReviews.replace(/\D/g, "");
                            var noOfReviewsToNumber = parseInt(noOfReviewsRemoved);
                            noOfReviewsToNumber = noOfReviewsToNumber + 1;
                            $(".rating-container-middle-three-star-nums").html("(" + noOfReviewsToNumber + ")");

                            noOfReviewsToNumber3++;
                        }
                        else if (rating == 2) {
                            var noOfReviews = $(".rating-container-middle-two-star-nums").html();
                            var noOfReviewsRemoved = noOfReviews.replace(/\D/g, "");
                            var noOfReviewsToNumber = parseInt(noOfReviewsRemoved);
                            noOfReviewsToNumber = noOfReviewsToNumber + 1;
                            $(".rating-container-middle-two-star-nums").html("(" + noOfReviewsToNumber + ")");

                            noOfReviewsToNumber2++;
                        }
                        else if (rating == 1) {
                            var noOfReviews = $(".rating-container-middle-one-star-nums").html();
                            var noOfReviewsRemoved = noOfReviews.replace(/\D/g, "");
                            var noOfReviewsToNumber = parseInt(noOfReviewsRemoved);
                            noOfReviewsToNumber = noOfReviewsToNumber + 1;
                            $(".rating-container-middle-one-star-nums").html("(" + noOfReviewsToNumber + ")");

                            noOfReviewsToNumber1++;

                        }

                        if (oldRating == 5) {
                            var noOfReviews = $(".rating-container-middle-five-star-nums").html();
                            var noOfReviewsRemoved = noOfReviews.replace(/\D/g, "");
                            var noOfReviewsToNumber = parseInt(noOfReviewsRemoved);
                            noOfReviewsToNumber = noOfReviewsToNumber - 1;
                            $(".rating-container-middle-five-star-nums").html("(" + noOfReviewsToNumber + ")");

                            noOfReviewsToNumber5--;
                        }
                        else if (oldRating == 4) {
                            var noOfReviews = $(".rating-container-middle-four-star-nums").html();
                            var noOfReviewsRemoved = noOfReviews.replace(/\D/g, "");
                            var noOfReviewsToNumber = parseInt(noOfReviewsRemoved);
                            noOfReviewsToNumber = noOfReviewsToNumber - 1;
                            $(".rating-container-middle-four-star-nums").html("(" + noOfReviewsToNumber + ")");

                            noOfReviewsToNumber4--;
                        }
                        else if (oldRating == 3) {
                            var noOfReviews = $(".rating-container-middle-three-star-nums").html();
                            var noOfReviewsRemoved = noOfReviews.replace(/\D/g, "");
                            var noOfReviewsToNumber = parseInt(noOfReviewsRemoved);
                            noOfReviewsToNumber = noOfReviewsToNumber - 1;
                            $(".rating-container-middle-three-star-nums").html("(" + noOfReviewsToNumber + ")");

                            noOfReviewsToNumber3--;
                        }
                        else if (oldRating == 2) {
                            var noOfReviews = $(".rating-container-middle-two-star-nums").html();
                            var noOfReviewsRemoved = noOfReviews.replace(/\D/g, "");
                            var noOfReviewsToNumber = parseInt(noOfReviewsRemoved);
                            noOfReviewsToNumber = noOfReviewsToNumber - 1;
                            $(".rating-container-middle-two-star-nums").html("(" + noOfReviewsToNumber + ")");

                            noOfReviewsToNumber2--;
                        }
                        else if (oldRating == 1) {
                            var noOfReviews = $(".rating-container-middle-one-star-nums").html();
                            var noOfReviewsRemoved = noOfReviews.replace(/\D/g, "");
                            var noOfReviewsToNumber = parseInt(noOfReviewsRemoved);
                            noOfReviewsToNumber = noOfReviewsToNumber - 1;
                            $(".rating-container-middle-one-star-nums").html("(" + noOfReviewsToNumber + ")");

                            noOfReviewsToNumber1--;
                        }

                        var No5Percentage = noOfReviewsToNumber5 * 100 / newNoOfUsers;
                        var No4Percentage = noOfReviewsToNumber4 * 100 / newNoOfUsers;
                        var No3Percentage = noOfReviewsToNumber3 * 100 / newNoOfUsers;
                        var No2Percentage = noOfReviewsToNumber2 * 100 / newNoOfUsers;
                        var No1Percentage = noOfReviewsToNumber1 * 100 / newNoOfUsers;

                        $(".rating-container-middle-five-star-bar-inner").css("width", No5Percentage + "%");
                        $(".rating-container-middle-four-star-bar-inner").css("width", No4Percentage + "%");
                        $(".rating-container-middle-three-star-bar-inner").css("width", No3Percentage + "%");
                        $(".rating-container-middle-two-star-bar-inner").css("width", No2Percentage + "%");
                        $(".rating-container-middle-one-star-bar-inner").css("width", No1Percentage + "%");
                    } else {

                        var avgOfRatings = Math.round((oldGlobalRating - oldRating + rating) / numberOfUser);


                        var noOfReviews5 = $(".rating-container-middle-five-star-nums").html();
                        var noOfReviewsRemoved5 = noOfReviews5.replace(/\D/g, "");
                        var noOfReviewsToNumber5 = parseInt(noOfReviewsRemoved5);

                        var noOfReviews4 = $(".rating-container-middle-four-star-nums").html();
                        var noOfReviewsRemoved4 = noOfReviews4.replace(/\D/g, "");
                        var noOfReviewsToNumber4 = parseInt(noOfReviewsRemoved4);

                        var noOfReviews3 = $(".rating-container-middle-three-star-nums").html();
                        var noOfReviewsRemoved3 = noOfReviews3.replace(/\D/g, "");
                        var noOfReviewsToNumber3 = parseInt(noOfReviewsRemoved3);

                        var noOfReviews2 = $(".rating-container-middle-two-star-nums").html();
                        var noOfReviewsRemoved2 = noOfReviews2.replace(/\D/g, "");
                        var noOfReviewsToNumber2 = parseInt(noOfReviewsRemoved2);

                        var noOfReviews1 = $(".rating-container-middle-one-star-nums").html();
                        var noOfReviewsRemoved1 = noOfReviews1.replace(/\D/g, "");
                        var noOfReviewsToNumber1 = parseInt(noOfReviewsRemoved1);


                        $(".rating-container-left-top").html(avgOfRatings + "/5");

                        $("#final-rating").val(oldGlobalRating - oldRating + rating);


                        if (avgOfRatings == 5) {
                            $("#rate-star1").addClass("star-active");
                            $("#rate-star2").addClass("star-active");
                            $("#rate-star3").addClass("star-active");
                            $("#rate-star4").addClass("star-active");
                            $("#rate-star5").addClass("star-active");

                            $("#star1").addClass("star-active");
                            $("#star2").addClass("star-active");
                            $("#star3").addClass("star-active");
                            $("#star4").addClass("star-active");
                            $("#star5").addClass("star-active");
                        }
                        else if (avgOfRatings == 4) {
                            $("#rate-star1").addClass("star-active");
                            $("#rate-star2").addClass("star-active");
                            $("#rate-star3").addClass("star-active");
                            $("#rate-star4").addClass("star-active");
                            $("#rate-star5").removeClass("star-active");

                            $("#star1").addClass("star-active");
                            $("#star2").addClass("star-active");
                            $("#star3").addClass("star-active");
                            $("#star4").addClass("star-active");
                            $("#star5").removeClass("star-active");
                        }
                        else if (avgOfRatings == 3) {
                            $("#rate-star1").addClass("star-active");
                            $("#rate-star2").addClass("star-active");
                            $("#rate-star3").addClass("star-active");
                            $("#rate-star4").removeClass("star-active");
                            $("#rate-star5").removeClass("star-active");

                            $("#star1").addClass("star-active");
                            $("#star2").addClass("star-active");
                            $("#star3").addClass("star-active");
                            $("#star4").removeClass("star-active");
                            $("#star5").removeClass("star-active");
                        }
                        else if (avgOfRatings == 2) {
                            $("#rate-star1").addClass("star-active");
                            $("#rate-star2").addClass("star-active");
                            $("#rate-star3").removeClass("star-active");
                            $("#rate-star4").removeClass("star-active");
                            $("#rate-star5").removeClass("star-active");

                            $("#star1").addClass("star-active");
                            $("#star2").addClass("star-active");
                            $("#star3").removeClass("star-active");
                            $("#star4").removeClass("star-active");
                            $("#star5").removeClass("star-active");
                        }
                        else if (avgOfRatings == 1) {
                            $("#rate-star1").addClass("star-active");
                            $("#rate-star2").removeClass("star-active");
                            $("#rate-star3").removeClass("star-active");
                            $("#rate-star4").removeClass("star-active");
                            $("#rate-star5").removeClass("star-active");

                            $("#star1").addClass("star-active");
                            $("#star2").removeClass("star-active");
                            $("#star3").removeClass("star-active");
                            $("#star4").removeClass("star-active");
                            $("#star5").removeClass("star-active");
                        }
                        else {
                            $("#rate-star1").removeClass("star-active");
                            $("#rate-star2").removeClass("star-active");
                            $("#rate-star3").removeClass("star-active");
                            $("#rate-star4").removeClass("star-active");
                            $("#rate-star5").removeClass("star-active");

                            $("#star1").removeClass("star-active");
                            $("#star2").removeClass("star-active");
                            $("#star3").removeClass("star-active");
                            $("#star4").removeClass("star-active");
                            $("#star5").removeClass("star-active");
                        }

                        if (rating == 5) {
                            var noOfReviews = $(".rating-container-middle-five-star-nums").html();
                            var noOfReviewsRemoved = noOfReviews.replace(/\D/g, "");
                            var noOfReviewsToNumber = parseInt(noOfReviewsRemoved);
                            noOfReviewsToNumber = noOfReviewsToNumber + 1;
                            $(".rating-container-middle-five-star-nums").html("(" + noOfReviewsToNumber + ")");

                            noOfReviewsToNumber5++;
                        }
                        else if (rating == 4) {
                            var noOfReviews = $(".rating-container-middle-four-star-nums").html();
                            var noOfReviewsRemoved = noOfReviews.replace(/\D/g, "");
                            var noOfReviewsToNumber = parseInt(noOfReviewsRemoved);
                            noOfReviewsToNumber = noOfReviewsToNumber + 1;
                            $(".rating-container-middle-four-star-nums").html("(" + noOfReviewsToNumber + ")");

                            noOfReviewsToNumber4++;
                        }
                        else if (rating == 3) {
                            var noOfReviews = $(".rating-container-middle-three-star-nums").html();
                            var noOfReviewsRemoved = noOfReviews.replace(/\D/g, "");
                            var noOfReviewsToNumber = parseInt(noOfReviewsRemoved);
                            noOfReviewsToNumber = noOfReviewsToNumber + 1;
                            $(".rating-container-middle-three-star-nums").html("(" + noOfReviewsToNumber + ")");

                            noOfReviewsToNumber3++;
                        }
                        else if (rating == 2) {
                            var noOfReviews = $(".rating-container-middle-two-star-nums").html();
                            var noOfReviewsRemoved = noOfReviews.replace(/\D/g, "");
                            var noOfReviewsToNumber = parseInt(noOfReviewsRemoved);
                            noOfReviewsToNumber = noOfReviewsToNumber + 1;
                            $(".rating-container-middle-two-star-nums").html("(" + noOfReviewsToNumber + ")");

                            noOfReviewsToNumber2++;
                        }
                        else if (rating == 1) {
                            var noOfReviews = $(".rating-container-middle-one-star-nums").html();
                            var noOfReviewsRemoved = noOfReviews.replace(/\D/g, "");
                            var noOfReviewsToNumber = parseInt(noOfReviewsRemoved);
                            noOfReviewsToNumber = noOfReviewsToNumber + 1;
                            $(".rating-container-middle-one-star-nums").html("(" + noOfReviewsToNumber + ")");

                            noOfReviewsToNumber1++;
                        }

                        if (oldRating == 5) {
                            var noOfReviews = $(".rating-container-middle-five-star-nums").html();
                            var noOfReviewsRemoved = noOfReviews.replace(/\D/g, "");
                            var noOfReviewsToNumber = parseInt(noOfReviewsRemoved);
                            noOfReviewsToNumber = noOfReviewsToNumber - 1;
                            $(".rating-container-middle-five-star-nums").html("(" + noOfReviewsToNumber + ")");

                            noOfReviewsToNumber5--;
                        }
                        else if (oldRating == 4) {
                            var noOfReviews = $(".rating-container-middle-four-star-nums").html();
                            var noOfReviewsRemoved = noOfReviews.replace(/\D/g, "");
                            var noOfReviewsToNumber = parseInt(noOfReviewsRemoved);
                            noOfReviewsToNumber = noOfReviewsToNumber - 1;
                            $(".rating-container-middle-four-star-nums").html("(" + noOfReviewsToNumber + ")");

                            noOfReviewsToNumber4--;
                        }
                        else if (oldRating == 3) {
                            var noOfReviews = $(".rating-container-middle-three-star-nums").html();
                            var noOfReviewsRemoved = noOfReviews.replace(/\D/g, "");
                            var noOfReviewsToNumber = parseInt(noOfReviewsRemoved);
                            noOfReviewsToNumber = noOfReviewsToNumber - 1;
                            $(".rating-container-middle-three-star-nums").html("(" + noOfReviewsToNumber + ")");

                            noOfReviewsToNumber3--;
                        }
                        else if (oldRating == 2) {
                            var noOfReviews = $(".rating-container-middle-two-star-nums").html();
                            var noOfReviewsRemoved = noOfReviews.replace(/\D/g, "");
                            var noOfReviewsToNumber = parseInt(noOfReviewsRemoved);
                            noOfReviewsToNumber = noOfReviewsToNumber - 1;
                            $(".rating-container-middle-two-star-nums").html("(" + noOfReviewsToNumber + ")");

                            noOfReviewsToNumber2--;
                        }
                        else if (oldRating == 1) {
                            var noOfReviews = $(".rating-container-middle-one-star-nums").html();
                            var noOfReviewsRemoved = noOfReviews.replace(/\D/g, "");
                            var noOfReviewsToNumber = parseInt(noOfReviewsRemoved);
                            noOfReviewsToNumber = noOfReviewsToNumber - 1;
                            $(".rating-container-middle-one-star-nums").html("(" + noOfReviewsToNumber + ")");

                            noOfReviewsToNumber1--;
                        }


                        var No5Percentage = noOfReviewsToNumber5 * 100 / numberOfUser;
                        var No4Percentage = noOfReviewsToNumber4 * 100 / numberOfUser;
                        var No3Percentage = noOfReviewsToNumber3 * 100 / numberOfUser;
                        var No2Percentage = noOfReviewsToNumber2 * 100 / numberOfUser;
                        var No1Percentage = noOfReviewsToNumber1 * 100 / numberOfUser;

                        $(".rating-container-middle-five-star-bar-inner").css("width", No5Percentage + "%");
                        $(".rating-container-middle-four-star-bar-inner").css("width", No4Percentage + "%");
                        $(".rating-container-middle-three-star-bar-inner").css("width", No3Percentage + "%");
                        $(".rating-container-middle-two-star-bar-inner").css("width", No2Percentage + "%");
                        $(".rating-container-middle-one-star-bar-inner").css("width", No1Percentage + "%");

                    }
                }

                if (errorNoRating == true) {
                    $("#rate-error-message").html('<p><i class="fas fa-exclamation-triangle fa-fw"></i>Submit a rating.</p>');
                    $("#rate-error-message").addClass("error-mesage-highlited");
                }


            },
            error: function (data) {

            },
        });



    })



    $(document).on('click', '.comment-container-top-delete-icon', function (event) {
        page = 1;

        var videogame_id = $(this).closest(".game-page-container").find("#videogame_id").val();
        var oldRating = parseInt($("#rating").val());

        var oldGlobalRating = parseInt($("#final-rating").val());
        var numberOfUser = parseInt($("#noOfUsers").val());
        var newnumberOfUser = numberOfUser - 1;

        if (newnumberOfUser != 0) {
            var avgOfRatings = Math.round((oldGlobalRating - oldRating) / newnumberOfUser);
        }
        else {
            var avgOfRatings = 0;
        }


        var noOfReviews5 = $(".rating-container-middle-five-star-nums").html();
        var noOfReviewsRemoved5 = noOfReviews5.replace(/\D/g, "");
        var noOfReviewsToNumber5 = parseInt(noOfReviewsRemoved5);

        var noOfReviews4 = $(".rating-container-middle-four-star-nums").html();
        var noOfReviewsRemoved4 = noOfReviews4.replace(/\D/g, "");
        var noOfReviewsToNumber4 = parseInt(noOfReviewsRemoved4);

        var noOfReviews3 = $(".rating-container-middle-three-star-nums").html();
        var noOfReviewsRemoved3 = noOfReviews3.replace(/\D/g, "");
        var noOfReviewsToNumber3 = parseInt(noOfReviewsRemoved3);

        var noOfReviews2 = $(".rating-container-middle-two-star-nums").html();
        var noOfReviewsRemoved2 = noOfReviews2.replace(/\D/g, "");
        var noOfReviewsToNumber2 = parseInt(noOfReviewsRemoved2);

        var noOfReviews1 = $(".rating-container-middle-one-star-nums").html();
        var noOfReviewsRemoved1 = noOfReviews1.replace(/\D/g, "");
        var noOfReviewsToNumber1 = parseInt(noOfReviewsRemoved1);


        $(".rating-container-left-top").html(avgOfRatings + "/5");

        $("#final-rating").val(oldGlobalRating - oldRating);
        $("#rating").val(0);
        $(".numus").html("(" + newnumberOfUser + ")");
        $("#noOfUsers").val(newnumberOfUser);
        $(".rating-container-left-bottom").html(newnumberOfUser + " Review/s");

        if (avgOfRatings == 5) {
            $("#rate-star1").addClass("star-active");
            $("#rate-star2").addClass("star-active");
            $("#rate-star3").addClass("star-active");
            $("#rate-star4").addClass("star-active");
            $("#rate-star5").addClass("star-active");

            $("#star1").addClass("star-active");
            $("#star2").addClass("star-active");
            $("#star3").addClass("star-active");
            $("#star4").addClass("star-active");
            $("#star5").addClass("star-active");
        }
        else if (avgOfRatings == 4) {
            $("#rate-star1").addClass("star-active");
            $("#rate-star2").addClass("star-active");
            $("#rate-star3").addClass("star-active");
            $("#rate-star4").addClass("star-active");
            $("#rate-star5").removeClass("star-active");

            $("#star1").addClass("star-active");
            $("#star2").addClass("star-active");
            $("#star3").addClass("star-active");
            $("#star4").addClass("star-active");
            $("#star5").removeClass("star-active");
        }
        else if (avgOfRatings == 3) {
            $("#rate-star1").addClass("star-active");
            $("#rate-star2").addClass("star-active");
            $("#rate-star3").addClass("star-active");
            $("#rate-star4").removeClass("star-active");
            $("#rate-star5").removeClass("star-active");

            $("#star1").addClass("star-active");
            $("#star2").addClass("star-active");
            $("#star3").addClass("star-active");
            $("#star4").removeClass("star-active");
            $("#star5").removeClass("star-active");
        }
        else if (avgOfRatings == 2) {
            $("#rate-star1").addClass("star-active");
            $("#rate-star2").addClass("star-active");
            $("#rate-star3").removeClass("star-active");
            $("#rate-star4").removeClass("star-active");
            $("#rate-star5").removeClass("star-active");

            $("#star1").addClass("star-active");
            $("#star2").addClass("star-active");
            $("#star3").removeClass("star-active");
            $("#star4").removeClass("star-active");
            $("#star5").removeClass("star-active");
        }
        else if (avgOfRatings == 1) {
            $("#rate-star1").addClass("star-active");
            $("#rate-star2").removeClass("star-active");
            $("#rate-star3").removeClass("star-active");
            $("#rate-star4").removeClass("star-active");
            $("#rate-star5").removeClass("star-active");

            $("#star1").addClass("star-active");
            $("#star2").removeClass("star-active");
            $("#star3").removeClass("star-active");
            $("#star4").removeClass("star-active");
            $("#star5").removeClass("star-active");
        }
        else {
            $("#rate-star1").removeClass("star-active");
            $("#rate-star2").removeClass("star-active");
            $("#rate-star3").removeClass("star-active");
            $("#rate-star4").removeClass("star-active");
            $("#rate-star5").removeClass("star-active");

            $("#star1").removeClass("star-active");
            $("#star2").removeClass("star-active");
            $("#star3").removeClass("star-active");
            $("#star4").removeClass("star-active");
            $("#star5").removeClass("star-active");
        }


        if (oldRating == 5) {
            var noOfReviews = $(".rating-container-middle-five-star-nums").html();
            var noOfReviewsRemoved = noOfReviews.replace(/\D/g, "");
            var noOfReviewsToNumber = parseInt(noOfReviewsRemoved);
            noOfReviewsToNumber = noOfReviewsToNumber - 1;
            $(".rating-container-middle-five-star-nums").html("(" + noOfReviewsToNumber + ")");

            noOfReviewsToNumber5--;
        }
        else if (oldRating == 4) {
            var noOfReviews = $(".rating-container-middle-four-star-nums").html();
            var noOfReviewsRemoved = noOfReviews.replace(/\D/g, "");
            var noOfReviewsToNumber = parseInt(noOfReviewsRemoved);
            noOfReviewsToNumber = noOfReviewsToNumber - 1;
            $(".rating-container-middle-four-star-nums").html("(" + noOfReviewsToNumber + ")");

            noOfReviewsToNumber4--;
        }
        else if (oldRating == 3) {
            var noOfReviews = $(".rating-container-middle-three-star-nums").html();
            var noOfReviewsRemoved = noOfReviews.replace(/\D/g, "");
            var noOfReviewsToNumber = parseInt(noOfReviewsRemoved);
            noOfReviewsToNumber = noOfReviewsToNumber - 1;
            $(".rating-container-middle-three-star-nums").html("(" + noOfReviewsToNumber + ")");

            noOfReviewsToNumber3--;
        }
        else if (oldRating == 2) {
            var noOfReviews = $(".rating-container-middle-two-star-nums").html();
            var noOfReviewsRemoved = noOfReviews.replace(/\D/g, "");
            var noOfReviewsToNumber = parseInt(noOfReviewsRemoved);
            noOfReviewsToNumber = noOfReviewsToNumber - 1;
            $(".rating-container-middle-two-star-nums").html("(" + noOfReviewsToNumber + ")");

            noOfReviewsToNumber2--;
        }
        else if (oldRating == 1) {
            var noOfReviews = $(".rating-container-middle-one-star-nums").html();
            var noOfReviewsRemoved = noOfReviews.replace(/\D/g, "");
            var noOfReviewsToNumber = parseInt(noOfReviewsRemoved);
            noOfReviewsToNumber = noOfReviewsToNumber - 1;
            $(".rating-container-middle-one-star-nums").html("(" + noOfReviewsToNumber + ")");

            noOfReviewsToNumber1--;
        }


        var No5Percentage = noOfReviewsToNumber5 * 100 / numberOfUser - 1;
        var No4Percentage = noOfReviewsToNumber4 * 100 / numberOfUser - 1;
        var No3Percentage = noOfReviewsToNumber3 * 100 / numberOfUser - 1;
        var No2Percentage = noOfReviewsToNumber2 * 100 / numberOfUser - 1;
        var No1Percentage = noOfReviewsToNumber1 * 100 / numberOfUser - 1;

        $(".rating-container-middle-five-star-bar-inner").css("width", No5Percentage + "%");
        $(".rating-container-middle-four-star-bar-inner").css("width", No4Percentage + "%");
        $(".rating-container-middle-three-star-bar-inner").css("width", No3Percentage + "%");
        $(".rating-container-middle-two-star-bar-inner").css("width", No2Percentage + "%");
        $(".rating-container-middle-one-star-bar-inner").css("width", No1Percentage + "%");

        $(this).closest(".comment-container-individual").remove();



        $.ajax({
            type: "post",
            dataType: "json",
            url: "../Includes/removerating.inc.php?action=RemoveRate",
            data:
                {
                    videogame_id: videogame_id

                },
            success: function (data) {



            },
            error: function (data) {

            },
        });
    })


    $(document).on('click', '.morebtn', function (event) {
        event.preventDefault();
        page++;
        load_data(page, true)
        $(this).closest(".comment-button-container").remove();

    })
});