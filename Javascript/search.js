$(document).ready(function () {

    $(document).on('keyup', '#nav-search-searchbar_input', function (event) {

        event.preventDefault();
        var page = 1;
        var type = $('#filter_filter').val();
        var search = $("#nav-search-searchbar_input").val();

        var genre = '';

        var developer = '';
        var publisher = '';



        $("#searchbar_input").val(search);
        var platform = '';

        if (event.keyCode === 13) {
            url = 'games.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform + '&d=' + developer + '&pb=' + publisher;
            window.location = "../Checklist/" + url;
        }
    });

    $(document).on('keyup', '#searchbar_input', function (event) {

        event.preventDefault();
        var page = 1;
        if ($('.filter_link').html().match("Game")) {

            var type = "Game";
        } else if ($('.filter_link').html().match("Movie")) {

            var type = "Movie";
        }
        else if ($('.filter_link').html().match("TV Showtime")) {

            var type = "TV Show";
        } else {

            var type = "";
        }
        var search = $("#searchbar_input").val();

        var genre = '';

        var developer = '';
        var publisher = '';
        $("#nav-search-searchbar_input").val(search);

        var platform = '';

        if (event.keyCode === 13) {
            url = 'games.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform + '&d=' + developer + '&pb=' + publisher;
            window.location = "../Checklist/" + url;
        }
    });




    $(document).on('click', '#searchbar_submit', function (event) {
        event.preventDefault();
        var page = 1;
        if ($('.filter_link').html().match("Game")) {

            var type = "Game";
        } else if ($('.filter_link').html().match("Movie")) {

            var type = "Movie";
        }
        else if ($('.filter_link').html().match("TV Showtime")) {

            var type = "TV Show";
        } else {

            var type = "";
        }
        var search = $("#searchbar_input").val();

        var genre = '';



        var platform = '';
        var developer = '';
        var publisher = '';

        url = 'games.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform + '&d=' + developer + '&pb=' + publisher;
        window.location = "../Checklist/" + url;

    });
});