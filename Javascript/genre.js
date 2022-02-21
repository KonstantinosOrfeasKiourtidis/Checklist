$(document).ready(function () {
    $(document).on('click', '.game-genre-carouzel', function () {

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
});