$(document).ready(function () {
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
        load_data(urlArray[0], urlArray[1], urlArray[2], urlArray[3], urlArray[4], urlArray[5], urlArray[6]);
    } else {
        load_data(1, '', '', '', '', '', '');
    }

    window.onpopstate = function () {

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

            load_data(urlArray[0], urlArray[1], urlArray[2], urlArray[3], urlArray[4], urlArray[5], urlArray[6]);
        }
        else {
            load_data(1, '', '', '', '', '', '');
        }
    }


    function load_data(page, type, search, genre, platform, developer, publisher) {


        $.ajax({

            url: "Includes/pagination.inc.php",
            method: "POST",
            data: {
                page: page,
                type: type,
                search: search,
                genre: genre,
                platform: platform,
                developer: developer,
                publisher: publisher,
            },
            beforeSend: function () {
                $body.addClass("loadingAnimation");
            },
            success: function (data) {
                var body = $("html, body");
                $body.removeClass("loadingAnimation");


                if (window.scrollY === 0) {
                    $('#pagination_data').html(data);
                } else {

                    body.stop().animate({ scrollTop: 0 }, 800, 'swing', function () {
                        $('#pagination_data').html(data);

                    });
                }


            },
            error: function (data) {

            }
        })


    }



    var desktop_media_query = 'screen and (min-width: 1025px)';





    $(document).on('click', '.pagination_link', function () {
        if (window.matchMedia(desktop_media_query).matches) {

            var page = $(this).attr("id");
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


            var developer = '';
            var publisher = '';
            $('.developer-filter').each(function () {
                developer = $('.developer-filter').html();
            });
            $('.publisher-filter').each(function () {
                publisher = $('.publisher-filter').html();
            });


            url = 'games.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform + '&d=' + developer + '&pb=' + publisher;
            history.pushState(null, null, url);

            load_data(page, type, search, genre, platform, developer, publisher);

        } else {

            var page = $(this).attr("id");
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

            var developer = '';
            var publisher = '';
            $('.developer-filter').each(function () {
                developer = $('.developer-filter').html();
            });
            $('.publisher-filter').each(function () {
                publisher = $('.publisher-filter').html();
            });


            url = 'games.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform + '&d=' + developer + '&pb=' + publisher;
            history.pushState(null, null, url);

            load_data(page, type, search, genre, platform, developer, publisher);



        }

    });




    $(document).on('click', '.all-search', function () {

        var page = 1;
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
        var developer = '';
        var publisher = '';
        $('.developer-filter').each(function () {
            developer = $('.developer-filter').html();
        });
        $('.publisher-filter').each(function () {
            publisher = $('.publisher-filter').html();
        });

        url = 'games.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform + '&d=' + developer + '&pb=' + publisher;
        history.pushState(null, null, url);

        load_data(page, type, search, genre, platform, developer, publisher);

    });


    $(document).on('click', '#all_filter', function () {
        var page = 1;
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

        var developer = '';
        var publisher = '';
        $('.developer-filter').each(function () {
            developer = $('.developer-filter').html();
        });
        $('.publisher-filter').each(function () {
            publisher = $('.publisher-filter').html();
        });

        url = 'games.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform + '&d=' + developer + '&pb=' + publisher;
        history.pushState(null, null, url);

        load_data(page, type, search, genre, platform, developer, publisher);
    });



    $(document).on('click', '.movies-search', function () {
        var page = 1;
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

        var developer = '';
        var publisher = '';
        $('.developer-filter').each(function () {
            developer = $('.developer-filter').html();
        });
        $('.publisher-filter').each(function () {
            publisher = $('.publisher-filter').html();
        });


        url = 'games.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform + '&d=' + developer + '&pb=' + publisher;
        history.pushState(null, null, url);

        load_data(page, type, search, genre, platform, developer, publisher);
    });

    $(document).on('click', '.tvshows-search', function () {
        var page = 1;
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

        var developer = '';
        var publisher = '';
        $('.developer-filter').each(function () {
            developer = $('.developer-filter').html();
        });
        $('.publisher-filter').each(function () {
            publisher = $('.publisher-filter').html();
        });


        url = 'games.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform + '&d=' + developer + '&pb=' + publisher;
        history.pushState(null, null, url);

        load_data(page, type, search, genre, platform, developer, publisher);
    });

    $(document).on('click', '.games-search', function () {
        var page = 1;
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

        var developer = '';
        var publisher = '';
        $('.developer-filter').each(function () {
            developer = $('.developer-filter').html();
        });
        $('.publisher-filter').each(function () {
            publisher = $('.publisher-filter').html();
        });


        url = 'games.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform + '&d=' + developer + '&pb=' + publisher;
        history.pushState(null, null, url);

        load_data(page, type, search, genre, platform, developer, publisher);
    });



    $(document).on('keyup', '#searchbar_input', function () {
        var page = 1;

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

        var developer = '';
        var publisher = '';
        $('.developer-filter').each(function () {
            developer = $('.developer-filter').html();
        });
        $('.publisher-filter').each(function () {
            publisher = $('.publisher-filter').html();
        });


        url = 'games.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform + '&d=' + developer + '&pb=' + publisher;
        history.pushState(null, null, url);

        load_data(page, type, search, genre, platform, developer, publisher);
    });

    $(document).on('submit', '#searchbar_submit', function (event) {
        event.preventDefault();
        var page = 1;
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

        var developer = '';
        var publisher = '';
        $('.developer-filter').each(function () {
            developer = $('.developer-filter').html();
        });
        $('.publisher-filter').each(function () {
            publisher = $('.publisher-filter').html();
        });


        url = 'games.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform + '&d=' + developer + '&pb=' + publisher;
        history.pushState(null, null, url);

        load_data(page, type, search, genre, platform, developer, publisher);
    });








    $(document).on('click', '#movie_filter', function () {
        var page = 1;
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

        var developer = '';
        var publisher = '';
        $('.developer-filter').each(function () {
            developer = $('.developer-filter').html();
        });
        $('.publisher-filter').each(function () {
            publisher = $('.publisher-filter').html();
        });

        url = 'games.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform + '&d=' + developer + '&pb=' + publisher;
        history.pushState(null, null, url);

        load_data(page, type, search, genre, platform, developer, publisher);
    });

    $(document).on('click', '#tvshow_filter', function () {
        var page = 1;
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

        var developer = '';
        var publisher = '';
        $('.developer-filter').each(function () {
            developer = $('.developer-filter').html();
        });
        $('.publisher-filter').each(function () {
            publisher = $('.publisher-filter').html();
        });


        url = 'games.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform + '&d=' + developer + '&pb=' + publisher;
        history.pushState(null, null, url);

        load_data(page, type, search, genre, platform, developer, publisher);
    });

    $(document).on('click', '#game_filter', function () {
        var page = 1;
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

        var developer = '';
        var publisher = '';
        $('.developer-filter').each(function () {
            developer = $('.developer-filter').html();
        });
        $('.publisher-filter').each(function () {
            publisher = $('.publisher-filter').html();
        });


        url = 'games.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform + '&d=' + developer + '&pb=' + publisher;
        history.pushState(null, null, url);

        load_data(page, type, search, genre, platform, developer, publisher);
    });



    $(document).on('keyup', '#nav-search-searchbar_input', function () {
        var page = 1;

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

        var developer = '';
        var publisher = '';
        $('.developer-filter').each(function () {
            developer = $('.developer-filter').html();
        });
        $('.publisher-filter').each(function () {
            publisher = $('.publisher-filter').html();
        });


        url = 'games.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform + '&d=' + developer + '&pb=' + publisher;
        history.pushState(null, null, url);

        load_data(page, type, search, genre, platform, developer, publisher);
    });

    $(document).on('click', '.clearbtn', function () {
        var page = 1;

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

        var developer = '';
        var publisher = '';
        $('.developer-filter').each(function () {
            developer = $('.developer-filter').html();
        });
        $('.publisher-filter').each(function () {
            publisher = $('.publisher-filter').html();
        });


        url = 'games.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform + '&d=' + developer + '&pb=' + publisher;
        history.pushState(null, null, url);

        load_data(page, type, search, genre, platform, developer, publisher);
    });



    $(document).on('click', '.game-genre', function () {

        var page = 1;
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

        var developer = '';
        var publisher = '';
        $('.developer-filter').each(function () {
            developer = $('.developer-filter').html();
        });
        $('.publisher-filter').each(function () {
            publisher = $('.publisher-filter').html();
        });


        url = 'games.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform + '&d=' + developer + '&pb=' + publisher;
        history.pushState(null, null, url);

        load_data(page, type, search, genre, platform, developer, publisher);

    });

    $(document).on('click', '.genre-filter-button', function () {

        var page = 1;
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

        var developer = '';
        var publisher = '';
        $('.developer-filter').each(function () {
            developer = $('.developer-filter').html();
        });
        $('.publisher-filter').each(function () {
            publisher = $('.publisher-filter').html();
        });


        url = 'games.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform + '&d=' + developer + '&pb=' + publisher;
        history.pushState(null, null, url);

        load_data(page, type, search, genre, platform, developer, publisher);

    });


    $(document).on('click', '.game-platform', function () {

        var page = 1;
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

        var developer = '';
        var publisher = '';
        $('.developer-filter').each(function () {
            developer = $('.developer-filter').html();
        });
        $('.publisher-filter').each(function () {
            publisher = $('.publisher-filter').html();
        });


        url = 'games.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform + '&d=' + developer + '&pb=' + publisher;
        history.pushState(null, null, url);

        load_data(page, type, search, genre, platform, developer, publisher);

    });

    $(document).on('click', '.platform-filter-button', function () {

        var page = 1;
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

        var developer = '';
        var publisher = '';
        $('.developer-filter').each(function () {
            developer = $('.developer-filter').html();
        });
        $('.publisher-filter').each(function () {
            publisher = $('.publisher-filter').html();
        });




        url = 'games.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform + '&d=' + developer + '&pb=' + publisher;
        history.pushState(null, null, url);

        load_data(page, type, search, genre, platform, developer, publisher);

    });



    $(document).on('click', '.developer-filter-button', function () {

        var page = 1;
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

        $('.platform-filter').each(function () {
            platform += ',' + $(this).html();
        });
        if (platform[0] == ',') {
            platform = platform.substring(1);
        }


        var developer = '';
        var publisher = '';
        $('.publisher-filter').each(function () {
            publisher = $('.publisher-filter').html();
        });



        url = 'games.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform + '&d=' + developer + '&pb=' + publisher;
        history.pushState(null, null, url);

        load_data(page, type, search, genre, platform, developer, publisher);

    });


    $(document).on('click', '.publisher-filter-button', function () {

        var page = 1;
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

        $('.platform-filter').each(function () {
            platform += ',' + $(this).html();
        });
        if (platform[0] == ',') {
            platform = platform.substring(1);
        }

        var developer = '';
        var publisher = '';
        $('.developer-filter').each(function () {
            developer = $('.developer-filter').html();
        });



        url = 'games.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform + '&d=' + developer + '&pb=' + publisher;
        history.pushState(null, null, url);

        load_data(page, type, search, genre, platform, developer, publisher);

    });

});
