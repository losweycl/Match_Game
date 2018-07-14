$(function () {
    var num = 0;

    colorGreen();
    //llenarTablero();
    CambiarNombreBtn();
    Drop();

    function colorGreen() {

        $(".main-titulo").animate({
            color: "red"
        }, 700, function () {
            colorYellow();
        })

    }


    function colorYellow() {
        $(".main-titulo").animate({
            color: "yellow"
        }, 700, function () {
            colorGreen();
        })
    }



    function llenarTablero() {
        var num1, num2, num3, num4, s;
        var d = $('.panel-tablero').children('div');
        var cont = 0;
        $.each(d, function (key, value) {
            num1 = 1 + Math.floor(Math.random() * 4);
            num2 = 1 + Math.floor(Math.random() * 4);
            num3 = 1 + Math.floor(Math.random() * 4);
            num4 = 1 + Math.floor(Math.random() * 4);


            if (key < d.length - 1) {
                $('.col-1').append('<img src="image/' + num1 + '.png" alt="" >').fadeToggle('fast')
                $('.col-2').append('<img src="image/' + num2 + '.png" alt="">').fadeToggle('fast')
                $('.col-3').append('<img src="image/' + num3 + '.png" alt="">').fadeToggle('fast')
                $('.col-4').append('<img src="image/' + num4 + '.png" alt="">').fadeToggle('fast')
                $('.col-5').append('<img src="image/' + num1 + '.png" alt="">').fadeToggle('fast')
                $('.col-6').append('<img src="image/' + num2 + '.png" alt="">').fadeToggle('fast')
                $('.col-7').append('<img src="image/' + num3 + '.png" alt="">').fadeToggle('fast')
                $('img').css('height', '7em')

            }
            cont++;
            $('.col-' + cont + '').sortable()
            $('.col-' + cont + '').draggable();

        })

    }


    function Drop() {
        
        $('.panel-tablero').children().droppable({
            acept: 'img',
            drop: function (event, ui) {

                num++;
                $('#movimientos-text').html(num);


            }


        })

    }



    function CambiarNombreBtn() {

        $('.btn-reinicio').click(function () {
            var textoBtn = $('.btn-reinicio').html();
            

            if (textoBtn == 'Iniciar') {
                $('.btn-reinicio').html('Reiniciar');
                llenarTablero();
                Drop();
                Timer();
            } else {
                window.location.reload()
                $('.btn-reinicio').html('Iniciar');
            }
        })
    }


    function Timer() {
        $('#timer').timer({
            countdown: true,
            duration: '2m',
            format: '%M:%S',
            callback: function () {
                alert('Time up!');
            }
        });
    }

});
