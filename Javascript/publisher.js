$(document).ready(function () {
    $(document).on('click', '.game-publisher-carouzel', function () {

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
});