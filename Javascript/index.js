$(document).ready(function () {


    var swiper = new Swiper(".mySwiper", {
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },

        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },

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




    $(document).on('submit', '.game-form-carouzel', function (event) {
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
        slidesPerView: 3,
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
            768: {
                slidesPerView: 2,
                spaceBetween: 5,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        },
    });
});