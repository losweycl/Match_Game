
$(function() {iniciarJuego();});



function iniciarJuego() {
    
    colorRed();

 function colorRed() {

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
            colorRed();
        })
    }

	$('.btn-reinicio').click(function () {
		if ($(this).text() === 'Reiniciar') {
			location.reload(true);
		}
		tablero();
		$(this).text('Reiniciar');
        Timer();
		/*$('#timer').startTimer({
			onComplete: finJuego
		})*/
	});
    
     function Timer() {
        $('#timer').timer({
            countdown: true,
            duration: '2m',
            format: '%M:%S',
            callback: function () {
                //alert('Time up!');
                finJuego();
            }
        });
    }
    
    
    
}


function tablero() {
	mostrarDulces();
}

function mostrarDulces() {
	var top = 6;
	var column = $('[class^="col-"]');


	column.each(function () {
		var dulces = $(this).children().length;
		var agrega = top - dulces;
		for (var i = 0; i < agrega; i++) {
			var tipoDulce = getRandomInt(1, 5);
		
			if (i === 0 && dulces < 1) {
				$(this).append('<img src="image/' + tipoDulce + '.png" class="element"></img>');
			} else {
				$(this).find('img:eq(0)').before('<img src="image/' + tipoDulce + '.png" class="element"></img>');
			}
            
       
            
           
		}
	});
    $('img').css('height', '7em')
	addDulcesEvents();
	validar();
}



function finJuego() {
	$('div.panel-tablero, div.time').effect('fold',1000);
	$('h1.main-titulo').addClass('title-over').text('Match Game');
	$('div.score, div.moves, div.panel-score').width('100%');

}


function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}


function giveCandyArrays(arrayType, index) {

	var Col1 = $('.col-1').children();
	var Col2 = $('.col-2').children();
	var Col3 = $('.col-3').children();
	var Col4 = $('.col-4').children();
	var Col5 = $('.col-5').children();
	var Col6 = $('.col-6').children();
	var Col7 = $('.col-7').children();

	var Columns = $([Col1, Col2, Col3, Col4,
		Col5, Col6, Col7
	]);

	if (typeof index === 'number') {
		var Row = $([Col1.eq(index), Col2.eq(index), Col3.eq(index),
			Col4.eq(index), Col5.eq(index), Col6.eq(index),
			Col7.eq(index)
		]);
	} else {
		index = '';
	}

	if (arrayType === 'columns') {
		return Columns;
	} else if (arrayType === 'rows' && index !== '') {
		return Row;
	}
}


function candyRows(index) {
	var candyRow = giveCandyArrays('rows', index);
	return candyRow;
}


function candyColumns(index) {
	var candyColumn = giveCandyArrays('columns');
	return candyColumn[index];
}


function columnValidation() {
	
	for (var j = 0; j < 7; j++) {
		var counter = 0;
		var candyPosition = [];

		var extraCandyPosition = [];

		var candyColumn = candyColumns(j);

		var comparisonValue = candyColumn.eq(0);
	
		var gap = false;
	
		for (var i = 1; i < candyColumn.length; i++) {
		
			var srcComparison = comparisonValue.attr('src');
		
			var srcCandy = candyColumn.eq(i).attr('src');

			if (srcComparison != srcCandy) {
				if (candyPosition.length >= 3) {
					gap = true;
				} else {
					candyPosition = [];
				}
				counter = 0;
			} else {
				if (counter == 0) {
					if (!gap) {
						candyPosition.push(i - 1);
					} else {
						extraCandyPosition.push(i - 1);
					}
				}
				if (!gap) {
					candyPosition.push(i);
				} else {
					extraCandyPosition.push(i);
				}
				counter += 1;
			}
	
			comparisonValue = candyColumn.eq(i);
		}
		
		if (extraCandyPosition.length > 2) {
			candyPosition = $.merge(candyPosition, extraCandyPosition);
		}
		
		if (candyPosition.length <= 2) {
			candyPosition = [];
		}
		
		candyCount = candyPosition.length;
		
		if (candyCount >= 3) {
			deleteColumnCandy(candyPosition, candyColumn);
			setScore(candyCount);
		}
	}
}


function deleteColumnCandy(candyPosition, candyColumn) {
	for (var i = 0; i < candyPosition.length; i++) {
		candyColumn.eq(candyPosition[i]).addClass('delete');
	}
}


function rowValidation() {

	for (var j = 0; j < 6; j++) {
		var counter = 0;
		var candyPosition = [];
		var extraCandyPosition = [];
		var candyRow = candyRows(j);
		var comparisonValue = candyRow[0];
		var gap = false;
		for (var i = 1; i < candyRow.length; i++) {

			var srcComparison = comparisonValue.attr('src');

			var srcCandy = candyRow[i].attr('src');

			if (srcComparison != srcCandy) {
				if (candyPosition.length >= 3) {
					gap = true;
				} else {
					candyPosition = [];
				}
				counter = 0;
			} else {
				if (counter == 0) {
					if (!gap) {
						candyPosition.push(i - 1);
					} else {
						extraCandyPosition.push(i - 1);
					}
				}
				if (!gap) {
					candyPosition.push(i);
				} else {
					extraCandyPosition.push(i);
				}
				counter += 1;
			}
			
			comparisonValue = candyRow[i];
		}
		
		if (extraCandyPosition.length > 2) {
			candyPosition = $.merge(candyPosition, extraCandyPosition);
		}
		
		if (candyPosition.length <= 2) {
			candyPosition = [];
		}
	
		candyCount = candyPosition.length;
		
		if (candyCount >= 3) {
			deleteHorizontal(candyPosition, candyRow);
			setScore(candyCount);
		}
	}
}


function deleteHorizontal(candyPosition, candyRow) {
	for (var i = 0; i < candyPosition.length; i++) {
		candyRow[candyPosition[i]].addClass('delete');
	}
}


function setScore(count) {
	var score = Number($('#score-text').text());
	switch (count) {
		case 3:
			score += 10;
			break;
		case 4:
			score += 20;
			break;
		case 5:
			score += 30;
			break;
		case 6:
			score += 50;
			break;
		case 7:
			score += 100;
			break;
		case 8:
			score += 500;
			
	}
	$('#score-text').text(score);
}




function validar() {
	columnValidation();
	rowValidation();

	if ($('img.delete').length !== 0) {
		deletesCandyAnimation();
	}
}


function addDulcesEvents() {
	$('img').draggable({
		containment: '.panel-tablero',
		droppable: 'img',
		revert: true,
		revertDuration: 500,

	});
	$('img').droppable({
		drop: moverDulce
	});
	enableCandyEvents();
}

function disableCandyEvents() {
	$('img').draggable('disable');
	$('img').droppable('disable');
}

function enableCandyEvents() {
	$('img').draggable('enable');
	$('img').droppable('enable');
}




function moverDulce(event, dulceDrag) {

	var dulceDrag = $(dulceDrag.draggable);
	var dragSrc = dulceDrag.attr('src');
	var dulceDrop = $(this);
	var dropSrc = dulceDrop.attr('src');

	dulceDrag.attr('src', dropSrc);
	dulceDrop.attr('src', dragSrc);

	setTimeout(function () {
		tablero();
		
		if ($('img.delete').length === 0) {
			
			dulceDrag.attr('src', dragSrc);
			dulceDrop.attr('src', dropSrc);
		} else {
			updateMoves();
		}
	}, 500);

}

function checkTablero(result) {
	if (result) {
		tablero();
	}
}


function updateMoves() {
	var actualValue = Number($('#movimientos-text').text());
	var result = actualValue += 1;
	$('#movimientos-text').text(result);
}

function deletesCandyAnimation() {
	disableCandyEvents();
	$('img.delete').effect('pulsate', 700);
	$('img.delete').animate({
			opacity: '0'
		}, {
			duration: 500
		})
		.animate({
			opacity: '0'
		}, {
			duration: 400,
			complete: function () {
				deletesDulces()
					.then(checkTablero)
					
			},
			queue: true
		});
}

function deletesDulces() {
	return new Promise(function (resolve, reject) {
		if ($('img.delete').remove()) {
			resolve(true);
		} else {
			reject('No se pudo eliminar');
		}
	})
}


