$(document).ready(function () {

    var page = 1;
    var reachedMax = false;
    var wait = false;

    $body = $("body");






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




    $(document).on('submit', '.game-form', function (event) {
        event.preventDefault();
        var videogame_id = $(this).find("#videogame_id").val();

        $(this).closest(".game-container").remove();



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


    window.onbeforeunload = function () {

        window.scrollTo(0, 0);
        page = 1;

    };


    var url = window.location.href;
    if (url.indexOf('?') > -1) {




        var urlVariables = url.split('?')[1];

        urlArray = urlVariables.split("&");

        for (let i = 0; i <= urlArray.length - 1; i++) {
            urlArray[i] = urlArray[i].split('=')[1];
            if (urlArray[i].indexOf('%20') > -1) {
                urlArray[i] = urlArray[i].replace(/%20/g, " ");
            }

        }

        $("#searchbar_input").val(urlArray[2]);
        $("#nav-search-searchbar_input").val(urlArray[2]);

        if (urlArray[1] == '') {
            $('#all_filter').prop('checked', true);
            $('#movie_filter').prop('checked', false);
            $('#tvshow_filter').prop('checked', false);
            $('#game_filter').prop('checked', false);
            $('.search-dropbtn').html('All<i class="fas fa-sort-down fa-fw searchArrow"></i>');

        }
        else if (urlArray[1] == 'Movie') {
            $('#all_filter').prop('checked', false);
            $('#movie_filter').prop('checked', true);
            $('#tvshow_filter').prop('checked', false);
            $('#game_filter').prop('checked', false);
            $('.search-dropbtn').html('Movies<i class="fas fa-sort-down fa-fw searchArrow"></i>');
        }
        else if (urlArray[1] == 'TV Show') {
            $('#all_filter').prop('checked', false);
            $('#movie_filter').prop('checked', false);
            $('#tvshow_filter').prop('checked', true);
            $('#game_filter').prop('checked', false);
            $('.search-dropbtn').html('TV Shows<i class="fas fa-sort-down fa-fw searchArrow"></i>');
        }
        else if (urlArray[1] == 'Game') {
            $('#all_filter').prop('checked', false);
            $('#movie_filter').prop('checked', false);
            $('#tvshow_filter').prop('checked', false);
            $('#game_filter').prop('checked', true);
            $('.search-dropbtn').html('Games<i class="fas fa-sort-down fa-fw searchArrow"></i>');
        }
        $('#filter_filter').val(urlArray[1]);
        url = 'checklist.php?pn=' + 1 + '&t=' + urlArray[1] + '&s=' + urlArray[2] + '&g=' + urlArray[3] + '&p=' + urlArray[4];
        history.pushState(null, null, url);
        load_data(1, urlArray[1], urlArray[2], urlArray[3], urlArray[4], false);
    } else {
        url = 'checklist.php?pn=' + 1 + '&t=' + '' + '&s=' + '' + '&g=' + '' + '&p=' + '';
        history.pushState(null, null, url);
        load_data(1, '', '', '', '', false);
    }

    window.onpopstate = function () {
        wait = false;
        page = 1;

        var url = window.location.href;

        if (url.indexOf('?') > -1) {
            var urlVariables = url.split('?')[1];

            urlArray = urlVariables.split("&");

            for (let i = 0; i <= urlArray.length - 1; i++) {
                urlArray[i] = urlArray[i].split('=')[1];
                if (urlArray[i].indexOf('%20') > -1) {
                    urlArray[i] = urlArray[i].replace(/%20/g, " ");
                }

            }

            $("#searchbar_input").val(urlArray[2]);
            $("#nav-search-searchbar_input").val(urlArray[2]);

            if (urlArray[1] == '') {
                $('#all_filter').prop('checked', true);
                $('#movie_filter').prop('checked', false);
                $('#tvshow_filter').prop('checked', false);
                $('#game_filter').prop('checked', false);
                $('.search-dropbtn').html('All<i class="fas fa-sort-down fa-fw searchArrow"></i>');

            }
            else if (urlArray[1] == 'Movie') {
                $('#all_filter').prop('checked', false);
                $('#movie_filter').prop('checked', true);
                $('#tvshow_filter').prop('checked', false);
                $('#game_filter').prop('checked', false);
                $('.search-dropbtn').html('Movies<i class="fas fa-sort-down fa-fw searchArrow"></i>');
            }
            else if (urlArray[1] == 'TV Show') {
                $('#all_filter').prop('checked', false);
                $('#movie_filter').prop('checked', false);
                $('#tvshow_filter').prop('checked', true);
                $('#game_filter').prop('checked', false);
                $('.search-dropbtn').html('TV Shows<i class="fas fa-sort-down fa-fw searchArrow"></i>');
            }
            else if (urlArray[1] == 'Game') {
                $('#all_filter').prop('checked', false);
                $('#movie_filter').prop('checked', false);
                $('#tvshow_filter').prop('checked', false);
                $('#game_filter').prop('checked', true);
                $('.search-dropbtn').html('Games<i class="fas fa-sort-down fa-fw searchArrow"></i>');
            }

            load_data(1, urlArray[1], urlArray[2], urlArray[3], urlArray[4], false);
        }
        else {
            load_data(1, '', '', '', '', false);
        }

        if (wait == false) {
            wait = true;
            setTimeout(
                function () {
                    wait = false;
                }, 1000);
        }
    }


    function load_data(page, type, search, genre, platform, appending) {

        var numberOfPages = $(".never-active").html();

        $.ajax({

            url: "../Checklist/Includes/paginationchecklist.inc.php",
            method: "POST",

            data: {
                page: page,
                type: type,
                search: search,
                genre: genre,
                platform: platform,
            },
            beforeSend: function () {


                if (reachedMax == false && page - 1 < numberOfPages || numberOfPages == null) {
                    $body.addClass("loadingAnimation");
                }
                else {

                }
            },
            success: function (data) {




                var body = $("html, body");
                $body.removeClass("loadingAnimation");
                if (data == 'reachedMax') {
                    reachedMax = true;
                }
                else {

                    reachedMax = false;


                    if (appending == false) {

                        if (window.scrollY === 0) {
                            $('#pagination_data').html(data);
                        } else {

                            body.stop().animate({ scrollTop: 0 }, 800, 'swing', function () {


                                $('#pagination_data').html(data);

                            });
                        }
                    }
                    else {
                        var temp = $('#pagination_data').append(data);

                    }
                }






            }
        })


    }



    var desktop_media_query = 'screen and (min-width: 1025px)';





    $(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
            if (wait == false) {
                wait = true;
                setTimeout(
                    function () {
                        wait = false;
                    }, 1000);
                if (reachedMax == false) {

                    if (window.matchMedia(desktop_media_query).matches) {

                        page++;
                        if ($('.filter_link').html().match("Game")) {

                            var type = "Game";
                        } else if ($('.filter_link').html().match("Movie")) {

                            var type = "Movie";
                        }
                        else if ($('.filter_link').html().match("TV Show")) {

                            var type = "TV Show";
                        } else {

                            var type = "";
                        }
                        var search = $("#searchbar_input").val();

                        var genre = '';

                        $('.genre-filter').each(function () {
                            genre += ',' + $(this).html();
                        });
                        if (genre[0] == ',') {
                            genre = genre.substring(1);
                        }



                        var platform = '';

                        $('.platform-filter').each(function () {
                            platform += ',' + $(this).html();
                        });
                        if (platform[0] == ',') {
                            platform = platform.substring(1);
                        }





                        url = 'checklist.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform;
                        history.pushState(null, null, url);

                        load_data(page, type, search, genre, platform, true);
                        $(this).closest(".comment-button-container").remove();
                    } else {

                        page++;
                        var type = $('#filter_filter').val();
                        var search = $("#nav-search-searchbar_input").val();

                        var genre = '';

                        $('.genre-filter').each(function () {
                            genre += ',' + $(this).html();
                        });
                        if (genre[0] == ',') {
                            genre = genre.substring(1);
                        }

                        var platform = '';

                        $('.platform-filter').each(function () {
                            platform += ',' + $(this).html();
                        });
                        if (platform[0] == ',') {
                            platform = platform.substring(1);
                        }




                        url = 'checklist.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform;
                        history.pushState(null, null, url);

                        load_data(page, type, search, genre, platform, true);

                        $(this).closest(".comment-button-container").remove();

                    }
                }
            }
        }
    });




    $(document).on('click', '.all-search', function () {

        reachedMax = false;
        page = 1;
        var type = "";
        var search = $("#searchbar_input").val();

        $('#filter_filter').val(type);
        $('#all_filter').prop('checked', true);
        $('#movie_filter').prop('checked', false);
        $('#tvshow_filter').prop('checked', false);
        $('#game_filter').prop('checked', false);

        var genre = '';

        $('.genre-filter').each(function () {
            genre += ',' + $(this).html();
        });
        if (genre[0] == ',') {
            genre = genre.substring(1);
        }

        var platform = '';

        $('.platform-filter').each(function () {
            platform += ',' + $(this).html();
        });
        if (platform[0] == ',') {
            platform = platform.substring(1);
        }


        url = 'checklist.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform;
        history.pushState(null, null, url);

        load_data(page, type, search, genre, platform, false);

    });


    $(document).on('click', '#all_filter', function () {
        reachedMax = false;
        page = 1;
        var type = "";
        var search = $("#nav-search-searchbar_input").val();

        $('.search-dropbtn').html('All<i class="fas fa-sort-down fa-fw searchArrow"></i>');


        var genre = '';

        $('.genre-filter').each(function () {
            genre += ',' + $(this).html();
        });
        if (genre[0] == ',') {
            genre = genre.substring(1);
        }

        var platform = '';

        $('.platform-filter').each(function () {
            platform += ',' + $(this).html();
        });
        if (platform[0] == ',') {
            platform = platform.substring(1);
        }



        url = 'checklist.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform;
        history.pushState(null, null, url);

        load_data(page, type, search, genre, platform, false);
    });



    $(document).on('click', '.movies-search', function () {
        reachedMax = false;
        page = 1;
        var type = "Movie";
        var search = $("#searchbar_input").val();


        $('#filter_filter').val(type);
        $('#all_filter').prop('checked', false);
        $('#movie_filter').prop('checked', true);
        $('#tvshow_filter').prop('checked', false);
        $('#game_filter').prop('checked', false);

        var genre = '';

        $('.genre-filter').each(function () {
            genre += ',' + $(this).html();
        });
        if (genre[0] == ',') {
            genre = genre.substring(1);
        }

        var platform = '';

        $('.platform-filter').each(function () {
            platform += ',' + $(this).html();
        });
        if (platform[0] == ',') {
            platform = platform.substring(1);
        }




        url = 'checklist.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform;
        history.pushState(null, null, url);

        load_data(page, type, search, genre, platform, false);
    });

    $(document).on('click', '.tvshows-search', function () {
        reachedMax = false;
        page = 1;
        var type = "TV Show";
        var search = $("#searchbar_input").val();


        $('#filter_filter').val(type);
        $('#all_filter').prop('checked', false);
        $('#movie_filter').prop('checked', false);
        $('#tvshow_filter').prop('checked', true);
        $('#game_filter').prop('checked', false);

        var genre = '';

        $('.genre-filter').each(function () {
            genre += ',' + $(this).html();
        });
        if (genre[0] == ',') {
            genre = genre.substring(1);
        }

        var platform = '';

        $('.platform-filter').each(function () {
            platform += ',' + $(this).html();
        });
        if (platform[0] == ',') {
            platform = platform.substring(1);
        }




        url = 'checklist.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform;
        history.pushState(null, null, url);

        load_data(page, type, search, genre, platform, false);
    });

    $(document).on('click', '.games-search', function () {
        reachedMax = false;
        page = 1;
        var type = "Game";
        var search = $("#searchbar_input").val();

        $('#filter_filter').val(type);
        $('#all_filter').prop('checked', false);
        $('#movie_filter').prop('checked', false);
        $('#tvshow_filter').prop('checked', false);
        $('#game_filter').prop('checked', true);

        var genre = '';

        $('.genre-filter').each(function () {
            genre += ',' + $(this).html();
        });
        if (genre[0] == ',') {
            genre = genre.substring(1);
        }


        var platform = '';

        $('.platform-filter').each(function () {
            platform += ',' + $(this).html();
        });
        if (platform[0] == ',') {
            platform = platform.substring(1);
        }




        url = 'checklist.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform;
        history.pushState(null, null, url);

        load_data(page, type, search, genre, platform, false);
    });



    $(document).on('keyup', '#searchbar_input', function () {
        reachedMax = false;
        page = 1;

        if ($('.filter_link').html().match("Game")) {

            var type = "Game";
        } else if ($('.filter_link').html().match("Movie")) {

            var type = "Movie";
        }
        else if ($('.filter_link').html().match("TV Show")) {

            var type = "TV Show";
        } else {

            var type = "";
        }

        var search = $("#searchbar_input").val();
        $('#nav-search-searchbar_input').val($("#searchbar_input").val());

        var genre = '';

        $('.genre-filter').each(function () {
            genre += ',' + $(this).html();
        });
        if (genre[0] == ',') {
            genre = genre.substring(1);
        }

        var platform = '';

        $('.platform-filter').each(function () {
            platform += ',' + $(this).html();
        });
        if (platform[0] == ',') {
            platform = platform.substring(1);
        }




        url = 'checklist.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform;
        history.pushState(null, null, url);

        load_data(page, type, search, genre, platform, false);
    });

    $(document).on('submit', '#searchbar_submit', function (event) {
        reachedMax = false;
        event.preventDefault();
        page = 1;
        if ($('.filter_link').html().match("Game")) {

            var type = "Game";
        } else if ($('.filter_link').html().match("Movie")) {

            var type = "Movie";
        }
        else if ($('.filter_link').html().match("TV Show")) {

            var type = "TV Show";
        } else {

            var type = "";
        }
        var search = $("#searchbar_input").val();

        var genre = '';

        $('.genre-filter').each(function () {
            genre += ',' + $(this).html();
        });
        if (genre[0] == ',') {
            genre = genre.substring(1);
        }

        var platform = '';

        $('.platform-filter').each(function () {
            platform += ',' + $(this).html();
        });
        if (platform[0] == ',') {
            platform = platform.substring(1);
        }




        url = 'checklist.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform;
        history.pushState(null, null, url);

        load_data(page, type, search, genre, platform, false);
    });








    $(document).on('click', '#movie_filter', function () {
        reachedMax = false;
        page = 1;
        var type = "Movie";
        var search = $("#nav-search-searchbar_input").val();

        $('.search-dropbtn').html('Movies<i class="fas fa-sort-down fa-fw searchArrow"></i>');

        var genre = '';

        $('.genre-filter').each(function () {
            genre += ',' + $(this).html();
        });
        if (genre[0] == ',') {
            genre = genre.substring(1);
        }

        var platform = '';

        $('.platform-filter').each(function () {
            platform += ',' + $(this).html();
        });
        if (platform[0] == ',') {
            platform = platform.substring(1);
        }



        url = 'checklist.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform;
        history.pushState(null, null, url);

        load_data(page, type, search, genre, platform, false);
    });

    $(document).on('click', '#tvshow_filter', function () {
        reachedMax = false;
        page = 1;
        var type = "TV Show";
        var search = $("#nav-search-searchbar_input").val();

        $('.search-dropbtn').html('TV Shows<i class="fas fa-sort-down fa-fw searchArrow"></i>');


        var genre = '';

        $('.genre-filter').each(function () {
            genre += ',' + $(this).html();
        });
        if (genre[0] == ',') {
            genre = genre.substring(1);
        }

        var platform = '';

        $('.platform-filter').each(function () {
            platform += ',' + $(this).html();
        });
        if (platform[0] == ',') {
            platform = platform.substring(1);
        }




        url = 'checklist.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform;
        history.pushState(null, null, url);

        load_data(page, type, search, genre, platform, false);
    });

    $(document).on('click', '#game_filter', function () {
        reachedMax = false;
        page = 1;
        var type = "Game";
        var search = $("#nav-search-searchbar_input").val();

        $('.search-dropbtn').html('Games<i class="fas fa-sort-down fa-fw searchArrow"></i>');

        var genre = '';

        $('.genre-filter').each(function () {
            genre += ',' + $(this).html();
        });
        if (genre[0] == ',') {
            genre = genre.substring(1);
        }

        var platform = '';

        $('.platform-filter').each(function () {
            platform += ',' + $(this).html();
        });
        if (platform[0] == ',') {
            platform = platform.substring(1);
        }




        url = 'checklist.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform;
        history.pushState(null, null, url);

        load_data(page, type, search, genre, platform, false);
    });



    $(document).on('keyup', '#nav-search-searchbar_input', function () {
        reachedMax = false;
        page = 1;

        var type = $('#filter_filter').val();

        var search = $("#nav-search-searchbar_input").val();

        $('#searchbar_input').val($("#nav-search-searchbar_input").val());


        var genre = '';

        $('.genre-filter').each(function () {
            genre += ',' + $(this).html();
        });
        if (genre[0] == ',') {
            genre = genre.substring(1);
        }

        var platform = '';

        $('.platform-filter').each(function () {
            platform += ',' + $(this).html();
        });
        if (platform[0] == ',') {
            platform = platform.substring(1);
        }




        url = 'checklist.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform;
        history.pushState(null, null, url);

        load_data(page, type, search, genre, platform, false);
    });

    $(document).on('click', '.clearbtn', function () {
        reachedMax = false;
        page = 1;

        var type = $('#filter_filter').val();

        var search = $("#nav-search-searchbar_input").val();

        var genre = '';

        $('.genre-filter').each(function () {
            genre += ',' + $(this).html();
        });
        if (genre[0] == ',') {
            genre = genre.substring(1);
        }


        var platform = '';

        $('.platform-filter').each(function () {
            platform += ',' + $(this).html();
        });
        if (platform[0] == ',') {
            platform = platform.substring(1);
        }




        url = 'checklist.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform;
        history.pushState(null, null, url);

        load_data(page, type, search, genre, platform, false);
    });



    $(document).on('click', '.game-genre', function () {


        wait = true;
        setTimeout(
            function () {
                wait = false;
            }, 1000);

        reachedMax = false;
        page = 1;
        var type = $('#filter_filter').val();
        var search = $("#searchbar_input").val();

        if ($('.genre-filter').html() == null) {
            var genre = $(this).html();
        }
        else {
            var genreSelected = $(this).html();
            var genre = '';

            $('.genre-filter').each(function () {
                genre += ',' + $(this).html();
            });

            if (genre.indexOf("," + genreSelected) > -1) {

            } else {
                genre += ',' + $(this).html();
            }

            if (genre[0] == ',') {
                genre = genre.substring(1);
            }
        }




        var platform = '';

        $('.platform-filter').each(function () {
            platform += ',' + $(this).html();
        });
        if (platform[0] == ',') {
            platform = platform.substring(1);
        }




        url = 'checklist.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform;
        history.pushState(null, null, url);

        load_data(page, type, search, genre, platform, false);

    });

    $(document).on('click', '.genre-filter-button', function () {

        reachedMax = false;
        page = 1;
        var type = $('#filter_filter').val();
        var search = $("#searchbar_input").val();

        var genre = '';

        var genreToRemove = $(this).find($('.genre-filter')).html();




        $('.genre-filter').each(function () {
            genre += ',' + $(this).html();
        });
        genre = genre.substring(1);


        genre = genre.replace("," + genreToRemove, "");
        genre = genre.replace(genreToRemove, "");
        if (genre[0] == ',') {
            genre = genre.substring(1);
        }



        var platform = '';

        $('.platform-filter').each(function () {
            platform += ',' + $(this).html();
        });
        if (platform[0] == ',') {
            platform = platform.substring(1);
        }




        url = 'checklist.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform;
        history.pushState(null, null, url);

        load_data(page, type, search, genre, platform, false);

    });


    $(document).on('click', '.game-platform', function () {
        wait = true;
        setTimeout(
            function () {
                wait = false;
            }, 1000);
        reachedMax = false;
        page = 1;
        var type = $('#filter_filter').val();
        var search = $("#searchbar_input").val();



        var genre = '';

        $('.genre-filter').each(function () {
            genre += ',' + $(this).html();
        });
        if (genre[0] == ',') {
            genre = genre.substring(1);
        }




        if ($('.platform-filter').html() == null) {

            var platform = $(this).html();
            if (platform.substring(platform.length - 1) == ',') {

                platform = platform.substring(0, platform.length - 1);
            }
        }
        else {

            var platformSelected = $(this).html();
            var platform = '';

            $('.platform-filter').each(function () {
                platform += ',' + $(this).html();
            });

            if (platform.indexOf("," + platformSelected) > -1) {

            } else {
                platform += ',' + $(this).html();
            }

            if (platform[0] == ',') {
                platform = platform.substring(1);
            }

            if (platform.substring(platform.length - 1) == ',') {

                platform = platform.substring(0, platform.length - 1);
            }
        }




        url = 'checklist.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform;
        history.pushState(null, null, url);

        load_data(page, type, search, genre, platform, false);

    });

    $(document).on('click', '.platform-filter-button', function () {
        reachedMax = false;
        page = 1;
        var type = $('#filter_filter').val();
        var search = $("#searchbar_input").val();



        var genre = '';

        $('.genre-filter').each(function () {
            genre += ',' + $(this).html();
        });
        if (genre[0] == ',') {
            genre = genre.substring(1);
        }





        var platform = '';

        var platformToRemove = $(this).find($('.platform-filter')).html();




        $('.platform-filter').each(function () {
            platform += ',' + $(this).html();
        });
        platform = platform.substring(1);


        platform = platform.replace("," + platformToRemove, "");
        platform = platform.replace(platformToRemove, "");
        if (platform[0] == ',') {
            platform = platform.substring(1);
        }





        url = 'checklist.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform;
        history.pushState(null, null, url);

        load_data(page, type, search, genre, platform, false);

    });


});



