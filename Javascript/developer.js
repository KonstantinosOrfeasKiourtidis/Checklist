$(document).ready(function () {
    $(document).on('click', '.game-developer-carouzel', function () {

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
});