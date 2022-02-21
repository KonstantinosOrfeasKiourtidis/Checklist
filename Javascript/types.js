$(document).ready(function () {
    $(document).on('click', '.all-search', function () {


        var type = "";


        $('#filter_filter').val(type);
        $('#all_filter').prop('checked', true);
        $('#movie_filter').prop('checked', false);
        $('#tvshow_filter').prop('checked', false);
        $('#game_filter').prop('checked', false);




    });


    $(document).on('click', '#all_filter', function () {

        var type = "";


        $('.search-dropbtn').html('All<i class="fas fa-sort-down fa-fw searchArrow"></i>');



    });



    $(document).on('click', '.movies-search', function () {

        var type = "Movie";



        $('#filter_filter').val(type);
        $('#all_filter').prop('checked', false);
        $('#movie_filter').prop('checked', true);
        $('#tvshow_filter').prop('checked', false);
        $('#game_filter').prop('checked', false);


    });

    $(document).on('click', '.tvshows-search', function () {

        var type = "TV Show";



        $('#filter_filter').val(type);
        $('#all_filter').prop('checked', false);
        $('#movie_filter').prop('checked', false);
        $('#tvshow_filter').prop('checked', true);
        $('#game_filter').prop('checked', false);

        var genre = '';



    });

    $(document).on('click', '.games-search', function () {

        var type = "Game";


        $('#filter_filter').val(type);
        $('#all_filter').prop('checked', false);
        $('#movie_filter').prop('checked', false);
        $('#tvshow_filter').prop('checked', false);
        $('#game_filter').prop('checked', true);




    });


    $(document).on('click', '#movie_filter', function () {

        var type = "Movie";


        $('.search-dropbtn').html('Movies<i class="fas fa-sort-down fa-fw searchArrow"></i>');


    });

    $(document).on('click', '#tvshow_filter', function () {

        var type = "TV Show";


        $('.search-dropbtn').html('TV Shows<i class="fas fa-sort-down fa-fw searchArrow"></i>');



    });

    $(document).on('click', '#game_filter', function () {

        var type = "Game";


        $('.search-dropbtn').html('Games<i class="fas fa-sort-down fa-fw searchArrow"></i>');


    });
});