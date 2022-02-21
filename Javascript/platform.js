$(document).ready(function () {
    $(document).on('click', '.game-platform-carouzel', function () {

        var page = 1;
        var type = $('#filter_filter').val();
        var search = $("#searchbar_input").val();



        var genre = '';


        var platform = $(this).html();

        if (platform.charAt(platform.length - 1) == ',') {
            platform = platform.substring(0, platform.length - 1);


        }

        var developer = '';
        var publisher = '';

        url = 'games.php?pn=' + page + '&t=' + type + '&s=' + search + '&g=' + genre + '&p=' + platform + '&d=' + developer + '&pb=' + publisher;
        window.location = "../Checklist/" + url;

    });
});