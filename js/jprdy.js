var q1 = {
	"ITIL":[
		{'answer':'Dieser Prozess übernimmt die schnellstmögliche Fehlerbeseitigung bei Störungen.', 'question':'Was ist der Incident Management Prozess?', 'answered':''},
		{'answer':'Die Schnittstelle zu unseren Kunden.', 'question':'Was ist der Service Desk?', 'answered':''},
		{'answer':'Er beschreibt die aktuellen und anstehenden Leistungen, die dem Kunden angeboten werden können.', 'question':'Was macht der Service Katalog?', 'answered':''},
		{'answer':'Dieser Prozess verantwortet die Freigabe neuer Hard- und Software.', 'question':'Was ist der Release Management Prozess?', 'answered':''},
		{'answer':'TODO...', 'question':'Was ist der "7-Step Improvement Process" aus dem Continual Service Improvementint?', 'answered':''}
	],
	"TP Nummern":[
		{'answer':'TP118', 'question':'Welche Nummer hat das Teilprojekt zum Thema "Systemmanagement"?', 'answered':''},
		{'answer':'TP001', 'question':'Welche Nummer hat das Teilprojekt zur Planung und Koordination zur Sicherstellung des laufenden Betriebes?', 'answered':''},
		{'answer':'TP311', 'question':'Welche Nummer hat das Teilprojekt für die strategische IT Security?', 'answered':''},
		{'answer':'TP213', 'question':'Welche Nummer hat das Teilprojekt das sich mit der IT-Kostentransparenz beschäftigt?', 'answered':''},
		{'answer':'TP313', 'question':'Welches Teilprojekt beschäftigt sich mit dem ganzheitlichen Vorhabensmanagement?', 'answered':''}
	],
	"Rollen":[
		{'answer':'Die Person ist verantwortlich für einen Prozess oder für einen Teil-Prozess. Sie wird von der verantwortlichen Leitung bestimmt und erhält von ihr die für ihre Aufgabe erforderlichen Befugnisse ', 'question':'Was macht eine Prozessverantwortliche oder ein Prozessverantwortlicher?', 'answered':''},
		{'answer':'Die Person stellt unter anderem sicher, dass Services in der vereinbarten Qualität geliefert werden.', 'question':'Welche Aufgaben hat eine Service Level Managerin bzw. ein Service Level Manager?', 'answered':''},
		{'answer':'Eine von einem Unternehmen bestellte Person, die den Unternehmer, die Führungskräfte, die Fachkraft für Arbeitssicherheit, den Betriebsarzt und die Kolleginnen und Kollegen darin unterstützt, Unfälle, berufsbedingte Krankheiten und Gesundheitsgefahren zu vermeiden.', 'question':'Was ist ein eine Sicherheitsbeauftragte bzw. ein Sicherheitsbeauftragter?', 'answered':''},
		{'answer':'Die Rolle autorisiert und dokumentiert sämtliche Änderungen an der IT-Infrastruktur und ihrer Komponenten (Configuration Items), um störende Auswirkungen auf den laufenden Betrieb so gering wie möglich zu halten. ', 'question':'Was ist der Change Manager?', 'answered':''},
		{'answer':'Die Rolle definiert, analysiert, plant, misst und verbessert alle Faktoren, die für die Verfügbarkeit von IT-Services wesentlich sind. ', 'question':'Was ist die Aufgabe einer Availability Managerin oder eines Availability Managers ?', 'answered':''}
	],
	"§§§ und Verwaltung":[
		{'answer':'', 'question':'foo?', 'answered':''},
		{'answer':'Foo', 'question':'foo?', 'answered':''},
		{'answer':'Foo', 'question':'foo?', 'answered':''},
		{'answer':'Foo', 'question':'foo?', 'answered':''},
		{'answer':'Art. 23 Abs. 1 BayVwVfG', 'question':'Wo im BayVwVfG wird deutsch als Amtssprache festgelegt?', 'answered':''}
	],
	"Abkürzungen":[
		{'answer':'MBUC', 'question':'foo?', 'answered':''},
		{'answer':'Foo', 'question':'foo?', 'answered':''},
		{'answer':'Foo', 'question':'foo?', 'answered':''},
		{'answer':'Foo', 'question':'foo?', 'answered':''},
		{'answer':'Foo', 'question':'foo?', 'answered':''}
	]
};

(function ($){
	$.fn.jprdy = function(settings) {
		var defaults = {
			keyMap: {
				players:{
					65:'p1',
					66:'p2',
					67:'p3',
					68:'p4',
				},
				start:'j',
				rightAnswer:'T',
				wrongAnswer:'F'
			}, 
			doubles: 2,
			players: 4,
			song: 'song.ogg'
		};
		settings = $.extend(defaults, settings);
		
		var baseElement = $(this);
		var song = null;
		var newGame = true;
		var questionset = q1;
		var players = {
			'p1':{'name':'Spieler 1', 'score':0}, 
			'p2':{'name':'Spieler 2', 'score':0}, 
			'p3':{'name':'Spieler 3', 'score':0}, 
			'p4':{'name':'Spieler 4', 'score':0}
		};
		
		var buzzer = function(event) {
			if (event.keyCode in settings.keyMap.players) {
				song.pause();
				$('#fastest').addClass(settings.keyMap.players[event.keyCode])
				$('#fastest').text($("#"+settings.keyMap.players[event.keyCode]+"-name").text());
				var timer = $('<div id="timer"></div>');
				$('#fastest').append(timer);
				
				var countUp = Raphael("timer", 200, 100)
				countUp.customAttributes.arc = function (xloc, yloc, value, total, R) {
					var alpha = 360 / total * value,
						a = (90 - alpha) * Math.PI / 180,
						x = xloc + R * Math.cos(a),
						y = yloc - R * Math.sin(a),
						path;
					if (total == value) {
						path = [["M", xloc, yloc - R], ["A", R, R, 0, 1, 1, xloc - .01, yloc - R]];
					} else {
						path = [["M", xloc, yloc - R], ["A", R, R, 0, +(alpha > 180), 1, x, y]];
					}
					var stroke;
					f = (value * 2);
					fr = 0;
					stroke = Raphael.rgb(f, fr, fr);
					return {path: path, stroke: stroke, opacity: (value/100)};
				};
				//make an arc at 50,50 with a radius of 30 that grows from 0 to 40 of 100 with a bounce
				var counter = countUp.path().attr({"stroke": "#666", "stroke-width": 20, arc: [20, 20, 0, 100, 10]});
				var timeout = 1000 * 20;
				counter.animate({arc: [20, 20, 100, 100, 10]}, timeout, "linear");
				setTimeout(function() { counter.animate({opacity: 0}, 2000, "linear"); }, timeout+2000);
				
				setActivePlayer(settings.keyMap.players[event.keyCode]);
				disableBuzzer();
				enableEval();
			} else if (String.fromCharCode(event.keyCode) == settings.keyMap.rightAnswer 
						|| String.fromCharCode(event.keyCode) == settings.keyMap.wrongAnswer) {
				song.pause();
				song.currentTime = 0;
				if ($('#answer').length > 0) {
					$('.questionwrapper').remove();
					hideBox();
					randomNext();
					persist();
					disableBuzzer();
					disableEval();
    			} else {
					$('.questionwrapper').remove();
					$('td.activequestion').data('qset')['answered'] = 'noone';
					persist();
					showAnswer($('td.activequestion'));
					setActivePlayer(null);
				}
			}

		};
		var eval = function(event) {
			if (String.fromCharCode(event.keyCode) == settings.keyMap.wrongAnswer) {
				// WRONG
				wrongAnswer(event.data);

				// With double..
				if ($(document).data('stake')) {
					$(document).data('stake', '');
					disableEval();
					rearmBuzzer();
                    song.play();
				} else {
					disableEval();
					song.play();
					rearmBuzzer();
				}
				$('#timer').remove();
			} else if (String.fromCharCode(event.keyCode) == settings.keyMap.rightAnswer) {
				// RIGHT
				rightAnswer();
				disableEval();
			}
		};
		
		var start = function(event) {
			if (String.fromCharCode(event.keyCode) == settings.keyMap.start) {
				randomNext();
				$(document).unbind('keydown', start);
			} 
		}
		
		function setActivePlayer(player) {
			// Remove the old active one...
			if (player != getActivePlayer()) {
				$('.players').removeClass("border-"+getActivePlayer());
			}
			
			$(document).data('activeplayer', player);
			$('tr.players').addClass("border-"+getActivePlayer());
		}
		
		function getActivePlayer() {
			return $(document).data('activeplayer');
		}
		
		function getName(player) {
			return $('#'+player).text();
		}
		
		function randomNext() {
			var player = "p"+(Math.floor(Math.random()*settings.players)+1);
			setActivePlayer(player);
			if (newGame == true) {
				newGame = false;
				var next = $('<div class="'+player+'" id="next">'+getName(player)+' fängt an!</div>');
			} else {
				var next = $('<div class="'+player+'" id="next">'+getName(player)+' macht weiter!</div>');
			}
			$('#wrapper').append(next);
			next.slideDown(300);
			next.delay(4000).slideUp(300);
		}
		
		function changeScore(offset) {
			var playerPoints = $("#"+getActivePlayer()+"-points");
    		var newPoints = parseInt(playerPoints.text()) + offset;

			if (newPoints < 0) {
				playerPoints.addClass('negative');
			} else {
				playerPoints.removeClass('negative');
			}
			playerPoints.text(newPoints);
			
			// Set Information
			players[getActivePlayer()]['score'] = newPoints;
			persist();
		}
		
		function hideBox() {
			var lastQuestion = $('td.activequestion');
			lastQuestion.addClass('donequestion');
			lastQuestion.addClass('opacity');
			lastQuestion.removeClass('activequestion');
			$('.questionwrapper').remove();
			disableBuzzer();
			disableEval();
			song.pause();
			song.currentTime = 0;
		}
		
		function wrongAnswer() {
			if ($(document).data('stake')) {
				changeScore(-$(document).data('stake'));
			} else {
				changeScore(-$('td.activequestion').data('value'));	
			}
		}
		
		function rightAnswer() {
			if ($(document).data('stake')) {
				changeScore($(document).data('stake'));	
			} else {
				changeScore($('td.activequestion').data('value'));	
			}
			
			var lastQuestion = $('td.activequestion');
			lastQuestion.addClass(getActivePlayer());
			
			// Set data
			lastQuestion.data('qset')['answered'] = getActivePlayer();
			persist();
			hideBox();
		}
		
		function showAnswer(box) {
			var answerBox = $('<div id="answer" class="questionwrapper"><div class="question">'+box.data('qset')['question']+'</div></div>');
			$('#wrapper').append(answerBox);
		}
		
		function disableBuzzer() {
			$(document).unbind('keydown', buzzer);
		}
		
		function enableBuzzer() {
			$(document).keydown({}, buzzer);
		}
		
		function rearmBuzzer() {
			$('#fastest').attr('class', '');
			$('#fastest').text("");
			$(document).keydown(buzzer);
		}
		
		function disableEval() {
			$(document).unbind('keydown', eval);
		}
		
		function enableEval() {
			$(document).keydown(eval);
		}
		
		function setStake() {
			var stakeInput = $("<input id='"+$(this).id+"'/>");
			$(this).after(stakeInput);
			stakeInput.focus();
			stakeInput.autoResize({'extraSpace':10});
			
			// TODO: CLEANUP
			var playerPoints = parseInt($("#"+getActivePlayer()+"-points").text());
			
			stakeInput.bind('blur keyup', {placeholder: $(this)}, function(event) {
				if ((event.type == "keyup" && event.keyCode == 13) || event.type != "keyup") {
					if ((parseInt($(this).val()) > playerPoints && 
						parseInt($(this).val()) != 100) || parseInt($(this).val()) < 100) {
						alert("Minimal 100 Punkte, maximal alle Punkte!");
					} else if ($(this).val() != "" && !isNaN(parseInt($(this).val()))) {
						event.data.placeholder.text($(this).val());
						event.data.placeholder.show();
						$(this).remove();
					} else {
						alert("Ne Zahl sollt's scho sein!");
					}
				}
			})
			$(this).hide();
		}
		
		function showDouble(box) {
			var doubleBox = $('<div class="questionwrapper"><div class="question">Extra Punkte! <br />Einsatz: <span id="stake">'+$('td.activequestion').data('value')+'</span><br /><a id="dgo" href="#">Los gehts!</a></div><div id="fastest" class="'+getActivePlayer()+'">'+getName(getActivePlayer())+'</div></div>');
			$('#wrapper').append(doubleBox);
			$('#stake').click(setStake);
			$('#dgo').click(function(event) {
				$(document).data('stake', parseInt($('#stake').text()));
				showDoubleQuestion(box);
			});
		}
		
		function showDoubleQuestion(box) {
			$('.questionwrapper').remove();
			var questionBox = $('<div class="questionwrapper"><div class="question" id="q">'+box.data('qset')['answer']+'</div><div id="fastest">&nbsp;</div></div>');
			$('#wrapper').append(questionBox);
			enableEval();
		}
		
		function showSimple(box) {
			var questionBox = $('<div class="questionwrapper"><div class="question" id="q">'+box.data('qset')['answer']+'</div><div id="fastest">&nbsp;</div></div>');
			$('#wrapper').append(questionBox);
			song.play();
			enableBuzzer();
		}
		
		function questionSelected() {
			if (newGame == false) {
				if (!$(this).hasClass('donequestion')) {
					$(this).addClass("activequestion");
					if ($(this).data('double')) {
						showDouble($(this));
					} else {
						showSimple($(this));
					}
				}
			}
		}
		
		function setPlayerName() {
			var nameInput = $("<input style='width: 100px;' id='"+$(this).id+"'/>");
			$(this).after(nameInput);
			if ($(this).text() != "" && $(this).text().substring(0, 7) != "Spieler") {
				nameInput.focus().val($(this).text());
			} else {
				nameInput.focus();
			}
			nameInput.autoResize({'extraSpace':10});
			nameInput.bind('blur keyup', {placeholder: $(this)}, function(event) {
				if ((event.type == "keyup" && event.keyCode == 13) || event.type != "keyup") {
					event.data.placeholder.text($(this).val());
					event.data.placeholder.show();
					
					players[event.data.placeholder.attr('id')]['name'] = $(this).val();
					persist();
					$(this).remove();
				}
			})
			$(this).hide();
		}
		
		function setPlayerScore() {
			var scoreInput = $("<input id='"+$(this).id+"'/>");
			$(this).after(scoreInput);
			scoreInput.focus();
			scoreInput.autoResize({'extraSpace':10});
			scoreInput.bind('blur keyup', {placeholder: $(this)}, function(event) {
				if ((event.type == "keyup" && event.keyCode == 13) || event.type != "keyup") {
					if ($(this).val() != "" && !isNaN(parseInt($(this).val()))) {
						event.data.placeholder.text($(this).val());
						event.data.placeholder.show();
						players[event.data.placeholder.attr('id').substr(0, 2)]['score'] = $(this).val();
						persist();
						$(this).remove();
					} else {
						alert("Ne Zahl sollt's scho sein!");
					}
				}
			})
			$(this).hide();
		}
		
		function initializeBoard(set) {
			// Headlines
			var headers = $('#board th')
			var headCount = 0;
			$.each(set, function(title, questions) {
				$(headers[headCount]).text(title);
				// Question Fields
				$('#board td.c'+(headCount + 1)).each(function(index, element) {
					var questionElement = $(element);
					var value = parseInt(questionElement.text().trim());
					questionElement.data('value', value);
					questionElement.data('qset', questions[index]);
					if (questions[index]['answered'] != "") {
						questionElement.addClass(questions[index]['answered']);
						questionElement.addClass('opacity donequestion');
					}
				});
				headCount++;
			});
			
			// Double...
			var double500 = Math.ceil(settings.doubles / 2);
			var double400 = Math.floor(settings.doubles / 2);
			while (double400 > 0) {
				$('.r4').each(function(index, element) {
					if (Math.floor(Math.random()*20) == 1) {
						$(element).data('double', true);
						double400--;
					}
				});
			}
			while (double500 > 0) {
				$('.r5').each(function(index, element) {
					if (Math.floor(Math.random()*20) == 1) {
						$(element).data('double', true);
						double500--;
					}
				});
			}
			
			// Remove players?
			if (settings.players < 4) {
				$('.playerinfo').each(function(index, element) {
					if (index+1 > settings.players) {
						$(element).hide();
					}
				});
			}
			// Restore Player information
			if (localStorage.getItem('players') == null) {
				localStorage.setItem('players', $.toJSON(players));
			} else {
				players = $.parseJSON(localStorage.getItem('players'));
				$.each(players, function(index, playerData) {
					$("#"+index).text(playerData['name']);
					$("#"+index+'-points').text(playerData['score']);
				});
			}
		}
		
		function persist() {
			// Persist Information to LocalStorage
			localStorage.setItem('players', $.toJSON(players));
			localStorage.setItem('questionset', $.toJSON(questionset));
		}
				
		function init() {
			$('body').append('<audio id="song" src="'+settings.song+'"></audio>');
			song = $('#song').get(0);
			if (localStorage.getItem('players') == null) {
				localStorage.setItem('questionset', $.toJSON(questionset));
			} else {				
				questionset = $.parseJSON(localStorage.getItem('questionset'));
			}
			initializeBoard(questionset);
			
			// Start listener...
			$(document).bind('keydown', start);
			
			// Set up handlers for namechange
			$('.playername').click(setPlayerName);
			$('.playerscore').click(setPlayerScore);
			$('tr.points td').click(questionSelected);
			
			// Menu Buttons
			$('#newgame').click(function() {
				localStorage.removeItem('players');
				localStorage.removeItem('questionset');
				$(window).unbind('beforeunload');
				location.reload();
			});
			
			$('#keyboard').click(function() {
				var keyboardBox = $('<div id="keyboardhelp" class="questionwrapper"><div class="question"> \
				<table id="keyboardhelp"> \
					<tr> \
						<th colspan="2">Spieler</th> \
						<th colspan="2">Gamemaster</th> \
					</tr> \
					<tr> \
						<th class="sub">Taste</th> \
						<th class="sub">Beschreibung</th> \
						<th class="sub">Taste</th> \
						<th class="sub">Beschreibung</th> \
					</tr> \
					<tr> \
						<td>A</td> \
						<td>Spieler 1</td> \
						<td>*</td> \
						<td>Spielstart</td> \
					</tr> \
					<tr> \
						<td>B</td> \
						<td>Spieler 2</td> \
						<td>t</td> \
						<td>Frage richtig</td> \
					</tr> \
					<tr> \
						<td>C</td> \
						<td>Spieler 3</td> \
						<td>f</td> \
						<td>Frage falsch</td> \
					</tr> \
					<tr> \
						<td>D</td> \
						<td>Spieler 4</td> \
						<td>*</td> \
						<td>Frage falsch</td> \
					</tr> \
					<tr> \
						<td></td> \
						<td></td> \
						<td>,</td> \
						<td>Abbruch</td> \
					</tr> \
				</table> \
				</div></div>');
				$('#wrapper').append(keyboardBox);
			});
			
			// PREVENT ACCIDENTAL REFRESH
			$(window).bind('beforeunload', function(event) {
				return "Are you sure?";
			});
		}
		init();
	};
}(jQuery));
