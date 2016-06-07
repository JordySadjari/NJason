$(document).ready(function() {
    var zoekTerm;
    $('#gaHalen').click(function() {
        zoekTerm = $('#zoekterm').val();
        haalFotos();
    });
    $('#zoekterm').keydown(function(e) {
        if(e.keyCode == 13) {
            zoekTerm = $(this).val();
            haalFotos();
        }
    });
    
    function haalFotos() {
        var flickrURL = "http://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=" + zoekTerm + "&jsoncallback=?"
        $.ajax (
            {
                dataType: 'json',
                method: 'GET',
                url: flickrURL,
                success: verwerkFotos
            }
        )
    }
    
    function verwerkFotos(Gegevens) {
        console.log(Gegevens);
        $('#fotos').html("");
        for(var i=0; i<Gegevens.items.length; i++) {
            var Pic = Gegevens.items[i];
            var htmlCode = "<div class='Houder'><div class='afbeelding'><a href='" + Pic.link +"' target='_blanks'><img src ='" + Pic.media.m + " alt='" + Pic.title + "' ></a></div><h4>" + Pic.title + "</h4></div>";
            $('#fotos').append(htmlCode);
        }
        $('#bron a').attr("href", Gegevens.link).text(Gegevens.title + " by Flickr.com");
    }
})