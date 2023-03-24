

var API = 'c4672ea6b91af024edb4419cd157396a'; // My API

API = '9a7e1254b9aa6badfe70164e6cfe815d'; // https://jogosdehoje.com.br/ API

var next = 10,
	leagusName = {
		39:"Premier League",
		61:"League 1",
		78:"Bundesliga",
		135:"Serie A",
		88:"Eredivisie",
		140:"La Liga",
	},

	leagusIds = Object.keys(leagusName),
	fixtureCount=(next * leagusIds.length );


	window.statistics = {};
	window.allTeams = {};

	window.globalJson = {
		"fixtures": [],
		"predictions": [],
		"time": ""
	};


if( location.hostname === "localhost" || location.hostname === "192.168.0.30"  ) {
	$('button').show();
}
//GetPantryJson();
getStatistics();

var stats = '<table class="sticky">';
	stats += '<tr><th>Tim</th></tr>';
	stats += '<tr><th>Broj utakmica</th></tr>';
	stats += '<tr><th>Broj golova</th></tr>';
	stats += '<tr><th>0-0</th></tr>';
	stats += '<tr><th>X</th></tr>';
	stats += '<tr><th>1+</th></tr>';
	stats += '<tr><th>2+</th></tr>';
	stats += '<tr><th>3+</th></tr>';
	stats += '<tr><th>4+</th></tr>';
	stats += '<tr><th>5+</th></tr>';
	stats += '<tr><th>0-4</th></tr>';

	stats += '<tr><th>Tim domacin</th></tr>';
	stats += '<tr><th>Tim gost</th></tr>';
	stats += '<tr><th>Tim domacin 1+</th></tr>';
	stats += '<tr><th>Tim domacin 2+</th></tr>';
	stats += '<tr><th>Tim domacin 3+</th></tr>';
	stats += '<tr><th>Tim gost 1+</th></tr>';
	stats += '<tr><th>Tim gost 2+</th></tr>';
	stats += '<tr><th>Tim gost 3+</th></tr>';

	stats += '<tr><th>Dom. pobednik</th></tr>';
	stats += '<tr><th>Gost pobednik</th></tr>';
	stats += '<tr><th>Tim primio</th></tr>';
	stats += '<tr><th>Tim dom. primio</th></tr>';
	stats += '<tr><th>Tim gost primio</th></tr>';	
	stats += '<tr><th>GG</th></tr>';
	stats += '<tr><th>I Pol. 2+</th></tr>';
	stats += '<tr><th>II Pol. 2+</th></tr>';
	stats += '<tr><th>1X</th></tr>';
	stats += '<tr><th>12</th></tr>';
	stats += '<tr><th>X2</th></tr>';
	stats += '<tr><th>I0-1&II0-1</th></tr>';
	stats += '<tr><th>I0-1&II0-2</th></tr>';
	stats += '<tr><th>I0-1&II0-3</th></tr>';
	stats += '<tr><th>I0-2&II0-1</th></tr>';
	stats += '<tr><th>I0-2&II0-2</th></tr>';
	stats += '<tr><th>I0-2&II0-3</th></tr>';
	stats += '<tr><th>I1+&II1+</th></tr>';
	stats += '<tr class="remove_table" style="display: none;"><th>X</th></tr>';
	stats += '</table>'
	stats += '<div class="values-wrapper">'
	stats += '<div class="values"></div>'
	stats += '</div>'

$(stats).appendTo('#statisticsTeam');


UpdateValuesWrapperWidth();




$('body').on( 'click', '#pantryLoad', function() {

	GetPantryJson();

}).on( 'click', '#apiLoad', function() {


	var	today = new Date(),
		currentDay = String(today.getDate()).padStart(2, '0');

	globalJson = {
		"fixtures": [],
		"predictions": [],
		"time": currentDay
	};
	GetFixtures();

}).on( 'click', '#getStatistics', function() {

	getStatistics();

}).on( 'click', '.remove_table', function(e) {
	$(this).closest('table').remove();
	UpdateValuesWidth();
	
	var teamName = $(this).closest('[data-teamName]').attr('data-teamName');	
	$(".chosen-select").multipleSelect('uncheck', teamName);
	
}).on( 'click', 'a[team-id]', function(e) {
	e.preventDefault;






});


window.UpdatePantryJson = function( values ) {
	if( !values ) return;

	var settings = {
	  "url": "https://getpantry.cloud/apiv1/pantry/1f3a2c9e-cbc5-4c5b-b93f-5d0f48a83ce8/basket/bet",
	  "method": "POST",
	  "timeout": 0,
	  "headers": {
		"Content-Type": "application/json"
	  },
	  "data": JSON.stringify(values),
	};

	$.ajax(settings).done(function(response) {
		GetPantryJson();
	})
	.fail(function() {
		setTimeout((function() {
			UpdatePantryJson( globalJson );
		}),3000);
	});

}
/*
$.getJSON( "https://soccerbet.rs/api/Prematch/GetMatchBets", { matchId: "3535391" } )
  .done(function( json ) {
    console.log( json );
  })
  .fail(function( jqxhr, textStatus, error ) {
    var err = textStatus + ", " + error;
    console.log( "Request Failed: " + err );
});




	$.ajax({
        url: 'https://soccerbet.rs/api/Prematch/GetMatchBets',
        type: "GET",
        data: { matchId: "3535391" },
        dataType: "json",
        headers: {
            "Access-Control-Request-Headers": "*",
            "Access-Control-Request-Method": "*",
            'Content-Type':'application/json',
            'Cookie':'__RequestVerificationToken=0qWv9b4oy7ToGfNE4_1ZsxrEyhV6h_fnEH0aXvnW_u_maYFr3sEZFveQoBWJ7NkqB7OgRjpGF_IQWuVCJ9YCJqivFhfAI5x6pDWrON8Kpqw1; ASP.NET_SessionId=1b4rydmg53yc1agqm4yd0fjo; .AspNet.ApplicationCookie=3td7PNZNWwUiMMkmfBi-9oX0EIicNVo4hA6NQCd36RV2GIpqheKNYCE6yqc8tC7RXucrUq72Yj-7dRZ6dFnKA_uDcL3fWkzG9prmUEuL5zUcY7AEBro894ApgziTxpLypU4_DdYw7lV4pfv-hyINTHsICFm3hPm3BOzPEYWbotCXUvbWI44kPxkFZY59Udl0R7R87CTaRqsBYhNUGh1z4hnbKrFlw2kEw2NIvlOWYPaKyRgGqfpyqel-eceDYbwtY_7KQjTI9BC2d84CTYjQtlGb3uN17Ly5mHl1ixQSJuYo9_9fTasAEUqHU9xvwO6dVGKYVQuhnZ2CC8bVbpmUHMbAbEve8pSPdmzPPaoPgUbrJicfioS7-o-nsZ16fqaBOPkEYsyTE9o9qtviBeA2U9ouqcubS9coml-MNDj-A7E9Ft9u77zMHxYq6iunvqt61e8k0e8xdoaHxepDMHv0kPCcIMzj0eqZKFP0wwNkE7Znl7uoKb33M1yEAMPJWDWu'
        },
        success: function (data) {
            chatbotConfig = data;
            console.log(chatbotConfig);
        }
    })


*/

function GetPantryJson() {

	var settings = {
	  "url": 'https://getpantry.cloud/apiv1/pantry/1f3a2c9e-cbc5-4c5b-b93f-5d0f48a83ce8/basket/bet',
	  "method": "GET",
	  "timeout": 0,
	  "headers": {
		"Content-Type": "application/json"
	  },
	};

	$.ajax(settings).done(function (response) {

		globalJson = response;		

		WriteToBodyPantry(response);
		/*

		var	today = new Date(),
			currentDay = String(today.getDate()).padStart(2, '0');

		if( response && response.time && response.time == currentDay ) {
			GetFixtures();
			WriteToBodyPantry(response);
		} else {

			globalJson.time = currentDay;
			GetFixtures();

		}
		*/
	})
	.fail(function() {
		setTimeout((function() {
			GetPantryJson();
		}),3000);
	});
}



function GetFixtures() {

	for (let l = 0; l < leagusIds.length; l++) {
		var leagueId = leagusIds[l];
		fetch("https://v3.football.api-sports.io/fixtures?league="+leagueId+"&next="+next+"&status=NS", {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "v3.football.api-sports.io",
				"x-rapidapi-key": API
			}
		})
		.then(response => response.text())
		.then(result => WriteToBody(result))
		.catch(error => console.log('error', error));
	}
}

function getStatistics() {

	var last = false,
		allLeagusArray = {},
		countingAjax = 0;
	for (let l = 0; l < leagusIds.length; l++) {

		var leagusId = leagusIds[l];

		var settings = {
		  "url": "https://v3.football.api-sports.io/fixtures?league="+leagusId+"&season=2022&status=FT",
		  "method": "GET",
		  "timeout": 0,
		  "headers": {
			"x-rapidapi-key": API,
			"x-rapidapi-host": "v3.football.api-sports.io"
		  },
		};

		$.ajax(settings).done(function (events) {
			
			
			countingAjax++;
			if( countingAjax == leagusIds.length ) last = true;

			var leagueName = leagusName[events.parameters.league],
				text = '<table id="league-'+leagueName.replace(/ /g, "_")+'">';

			statistics[events.parameters.league] = events.response;
			
			text += '<tr><th>' + leagueName + '</th></tr>';

			var response = events.response,
				BrojUtakmica = events.results,
				UkupanBrojGolova = 0,
				NulaNula = 0,
				X = 0,
				JedanPlus = 0,
				DvaPlus = 0,
				TriPlus = 0,
				CetiriPlus = 0,
				PetPlus = 0,
				NulaCetiri = 0,
				DomacinPobednik = 0,
				GostPobednik = 0,
				ObaTimaGol = 0,
				PrvoDvaPlus = 0,
				DrugoDvaPlus = 0,
				JedanX = 0,
				JedanDva = 0,
				XDva = 0,
				Max1PrvoMax1Drugo = 0,
				Max1PrvoMax2Drugo = 0,
				Max1PrvoMax3Drugo = 0,
				Max2PrvoMax1Drugo = 0,
				Max2PrvoMax2Drugo = 0,
				Max2PrvoMax3Drugo = 0,
				Min1PrvoMin1Drugo = 0,
				end;

			for (let l = 0; l < response.length; l++) {
				var fixture = response[l],
					score = fixture.score,
					halftimeHome = score.halftime.home,
					halftimeAway = score.halftime.away,
					fulltimeHome = score.fulltime.home,
					fulltimeAway = score.fulltime.away,
					ukupnoGolovaKraj = fulltimeHome + fulltimeAway,
					ukupnoGolovaPrvo = halftimeHome + halftimeAway,
					ukupnoGolovaDrugo = ukupnoGolovaKraj - ukupnoGolovaPrvo;

					// Broj golova
					UkupanBrojGolova += ukupnoGolovaKraj;

					// Na utakmici je bilo golova
					if( ukupnoGolovaKraj > 0 ) {

						JedanPlus++;

						if( ukupnoGolovaKraj > 1 ) DvaPlus++;
						if( ukupnoGolovaKraj > 2 ) TriPlus++;
						if( ukupnoGolovaKraj > 3 ) CetiriPlus++;
						if( ukupnoGolovaKraj > 4 ) PetPlus++;


					// Rezultat je 0-0
					} else {
						NulaNula++;
					}

					// Rezultat je 0-4
					if( ukupnoGolovaKraj < 5 ) NulaCetiri++;



					// Rezultat je X
					if ( fulltimeHome === fulltimeAway ) X++;

					// Domacin pobednik
					if ( fulltimeHome > fulltimeAway ) DomacinPobednik++;

					// Gost pobednik
					if ( fulltimeAway > fulltimeHome ) GostPobednik++;

					// Oba tima daju bar 1 gol
					if ( fulltimeHome > 0 && fulltimeAway > 0 ) ObaTimaGol++;

					// Prvo poluvreme 2 plus
					if ( ukupnoGolovaPrvo > 1 ) PrvoDvaPlus++;

					// Drugo poluvreme 2 plus
					if ( ukupnoGolovaDrugo > 1 ) DrugoDvaPlus++;

					// Domacin pobednik ili X
					if ( ( fulltimeHome > fulltimeAway ) || ( fulltimeHome === fulltimeAway ) ) JedanX++;

					// Gost pobednik ili X
					if ( ( fulltimeAway > fulltimeHome ) || ( fulltimeHome === fulltimeAway ) ) XDva++;

					// Domacin ili Gost pobednik
					if ( fulltimeHome != fulltimeAway ) JedanDva++;

					// Najvise 1 u prvom i najvise 1 u drugom
					if( ukupnoGolovaPrvo <= 1 && ukupnoGolovaDrugo <= 1 ) Max1PrvoMax1Drugo++;

					// Najvise 1 u prvom i najvise 2 u drugom
					if( ukupnoGolovaPrvo <= 1 && ukupnoGolovaDrugo <= 2 ) Max1PrvoMax2Drugo++;

					// Najvise 1 u prvom i najvise 3 u drugom
					if( ukupnoGolovaPrvo <= 1 && ukupnoGolovaDrugo <= 3 ) Max1PrvoMax3Drugo++;

					// Najvise 2 u prvom i najvise 1 u drugom
					if( ukupnoGolovaPrvo <= 2 && ukupnoGolovaDrugo <= 1 ) Max2PrvoMax1Drugo++;

					// Najvise 2 u prvom i najvise 2 u drugom
					if( ukupnoGolovaPrvo <= 2 && ukupnoGolovaDrugo <= 2 ) Max2PrvoMax2Drugo++;

					// Najvise 2 u prvom i najvise 3 u drugom
					if( ukupnoGolovaPrvo <= 2 && ukupnoGolovaDrugo <= 3 ) Max2PrvoMax3Drugo++;

					// Najmanje 1 u prvom i najmanje 1 u drugom
					if( ukupnoGolovaPrvo >= 1 && ukupnoGolovaDrugo >= 1 ) Min1PrvoMin1Drugo++;
			}

			text += '<tr><th>' + BrojUtakmica + '</th></tr>';
			text += '<tr><th>' + UkupanBrojGolova + ' ( '+(UkupanBrojGolova/BrojUtakmica).toFixed(1)+' )</th></tr>';
			text += '<tr><th>' + NulaNula + ' <span>(' + ((NulaNula/BrojUtakmica)*100).toFixed(2) + '%)</span>' + '</th></tr>';
			text += '<tr><th>' + X + ' <span>(' + ((X/BrojUtakmica)*100).toFixed(2) + '%)</span>' + '</th></tr>';
			text += '<tr><th>' + JedanPlus + ' <span>(' + ((JedanPlus/BrojUtakmica)*100).toFixed(2) + '%)</span>' + '</th></tr>';
			text += '<tr><th>' + DvaPlus + ' <span>(' + ((DvaPlus/BrojUtakmica)*100).toFixed(2) + '%)</span>' + '</th></tr>';
			text += '<tr><th>' + TriPlus + ' <span>(' + ((TriPlus/BrojUtakmica)*100).toFixed(2) + '%)</span>' + '</th></tr>';
			text += '<tr><th>' + CetiriPlus + ' <span>(' + ((CetiriPlus/BrojUtakmica)*100).toFixed(2) + '%)</span>' + '</th></tr>';
			text += '<tr><th>' + PetPlus + ' <span>(' + ((PetPlus/BrojUtakmica)*100).toFixed(2) + '%)</span>' + '</th></tr>';
			text += '<tr><th>' + NulaCetiri + ' <span>(' + ((NulaCetiri/BrojUtakmica)*100).toFixed(2) + '%)</span>' + '</th></tr>';
			text += '<tr><th>' + DomacinPobednik + ' <span>(' + ((DomacinPobednik/BrojUtakmica)*100).toFixed(2) + '%)</span>' + '</th></tr>';
			text += '<tr><th>' + GostPobednik + ' <span>(' + ((GostPobednik/BrojUtakmica)*100).toFixed(2) + '%)</span>' + '</th></tr>';
			text += '<tr><th>' + ObaTimaGol + ' <span>(' + ((ObaTimaGol/BrojUtakmica)*100).toFixed(2) + '%)</span>' + '</th></tr>';
			text += '<tr><th>' + PrvoDvaPlus + ' <span>(' + ((PrvoDvaPlus/BrojUtakmica)*100).toFixed(2) + '%)</span>' + '</th></tr>';
			text += '<tr><th>' + DrugoDvaPlus + ' <span>(' + ((DrugoDvaPlus/BrojUtakmica)*100).toFixed(2) + '%)</span>' + '</th></tr>';
			text += '<tr><th>' + JedanX + ' <span>(' + ((JedanX/BrojUtakmica)*100).toFixed(2) + '%)</span>' + '</th></tr>';
			text += '<tr><th>' + JedanDva + ' <span>(' + ((JedanDva/BrojUtakmica)*100).toFixed(2) + '%)</span>' + '</th></tr>';
			text += '<tr><th>' + XDva + ' <span>(' + ((XDva/BrojUtakmica)*100).toFixed(2) + '%)</span>' + '</th></tr>';
			text += '<tr><th>' + Max1PrvoMax1Drugo + ' <span>(' + ((Max1PrvoMax1Drugo/BrojUtakmica)*100).toFixed(2) + '%)</span>' + '</th></tr>';
			text += '<tr><th>' + Max1PrvoMax2Drugo + ' <span>(' + ((Max1PrvoMax2Drugo/BrojUtakmica)*100).toFixed(2) + '%)</span>' + '</th></tr>';
			text += '<tr><th>' + Max1PrvoMax3Drugo + ' <span>(' + ((Max1PrvoMax3Drugo/BrojUtakmica)*100).toFixed(2) + '%)</span>' + '</th></tr>';
			text += '<tr><th>' + Max2PrvoMax1Drugo + ' <span>(' + ((Max2PrvoMax1Drugo/BrojUtakmica)*100).toFixed(2) + '%)</span>' + '</th></tr>';
			text += '<tr><th>' + Max2PrvoMax2Drugo + ' <span>(' + ((Max2PrvoMax2Drugo/BrojUtakmica)*100).toFixed(2) + '%)</span>' + '</th></tr>';
			text += '<tr><th>' + Max2PrvoMax3Drugo + ' <span>(' + ((Max2PrvoMax3Drugo/BrojUtakmica)*100).toFixed(2) + '%)</span>' + '</th></tr>';
			text += '<tr><th>' + Min1PrvoMin1Drugo + ' <span>(' + ((Min1PrvoMin1Drugo/BrojUtakmica)*100).toFixed(2) + '%)</span>' + '</th></tr>';

			text += '</table>'

			allLeagusArray[events.parameters.league] = text;

			if( last ) {

				var stats = '<table class="sticky">';
					stats += '<tr><th>Liga</th></tr>';
					stats += '<tr><th>Broj utakmica</th></tr>';
					stats += '<tr><th>Broj golova</th></tr>';
					stats += '<tr><th>0-0</th></tr>';
					stats += '<tr><th>X</th></tr>';
					stats += '<tr><th>1+</th></tr>';
					stats += '<tr><th>2+</th></tr>';
					stats += '<tr><th>3+</th></tr>';
					stats += '<tr><th>4+</th></tr>';
					stats += '<tr><th>5+</th></tr>';
					stats += '<tr><th>0-4</th></tr>';
					stats += '<tr><th>Dom. pobednik</th></tr>';
					stats += '<tr><th>Gost pobednik</th></tr>';			
					stats += '<tr><th>GG</th></tr>';
					stats += '<tr><th>I Pol. 2+</th></tr>';
					stats += '<tr><th>II Pol. 2+</th></tr>';
					stats += '<tr><th>1X</th></tr>';
					stats += '<tr><th>12</th></tr>';
					stats += '<tr><th>X2</th></tr>';
					stats += '<tr><th>I0-1&II0-1</th></tr>';
					stats += '<tr><th>I0-1&II0-2</th></tr>';
					stats += '<tr><th>I0-1&II0-3</th></tr>';
					stats += '<tr><th>I0-2&II0-1</th></tr>';
					stats += '<tr><th>I0-2&II0-2</th></tr>';
					stats += '<tr><th>I0-2&II0-3</th></tr>';
					stats += '<tr><th>I1+&II1+</th></tr>';
					stats += '</table>'
					stats += '<div class="values-wrapper">'
					stats += '<div class="values"></div>'
					stats += '</div>'

				$(stats).appendTo('#statistics');


				for (let l = 0; l < leagusIds.length; l++) {

					if( allLeagusArray[leagusIds[l]] ) {


						$(allLeagusArray[leagusIds[l]]).appendTo('#statistics .values');

					}

				}

				setTimeout(function() {
					


					var teamSelection = $('#statisticsTeam select'),
						selectText = '';

					// Get all teams from fixtures
					if( Object.keys(statistics).length > 0 ) {
						for (var key in statistics) {
							if (statistics.hasOwnProperty(key)) {

								allTeams[key] = {};


								selectText += '<optgroup label="'+leagusName[key]+'">';

								var fixtures = statistics[key];

								for (let f = 0; f < fixtures.length; f++) {
									var fixture = fixtures[f],
										home = fixture.teams.home,
										away = fixture.teams.away,
										homeID = home.id,
										awayID = away.id;

									if( !allTeams[key][homeID] ) {
										allTeams[key][homeID] = home.name;
										selectText += '<option data-leagueID="'+key+'" data-id="'+homeID+'">'+home.name+'</option>';

									}
									if( !allTeams[key][awayID] ) {
										allTeams[key][awayID] = away.name;
										selectText += '<option data-leagueID="'+key+'" data-id="'+awayID+'">'+away.name+'</option>';
									}
								}

								selectText += '</optgroup>';
							}
						}
					}

					teamSelection.html(selectText);
					
					UpdateValuesWidth();

					$(".chosen-select").multipleSelect({
						hideOptgroupCheckboxes: true,
						selectAll: false,
						width: "100%",
						onClick: function(values) {
							if( values.selected ) {
								
								var	leagueID = values.data.leagueid,
									teamID = values.data.id,
									teamName = values.text,
									allGames = statistics[leagueID].filter(obj => {
									  return obj.teams.away.id == teamID || obj.teams.home.id == teamID;
									}),
									BrojUtakmica = allGames.length,
									UkupanBrojGolova = 0,
									NulaNula = 0,
									X = 0,									
									TimUkupnoPrimioGolova = 0,
									TimDomacPrimioGolova = 0,									
									TimGostPrimioGolova = 0,									
									TimBioDomacin = 0,
									TimBioGost = 0,
									TimDomacinJedanPlus = 0,
									TimDomacinDvaPlus = 0,
									TimDomacinTriPlus = 0,
									TimGostJedanPlus = 0,
									TimGostDvaPlus = 0,
									TimGostTriPlus = 0,
									JedanPlus = 0,
									DvaPlus = 0,
									TriPlus = 0,
									CetiriPlus = 0,
									PetPlus = 0,
									NulaCetiri = 0,
									DomacinPobednik = 0,
									GostPobednik = 0,
									ObaTimaGol = 0,
									PrvoDvaPlus = 0,
									DrugoDvaPlus = 0,
									JedanX = 0,
									JedanDva = 0,
									XDva = 0,
									Max1PrvoMax1Drugo = 0,
									Max1PrvoMax2Drugo = 0,
									Max1PrvoMax3Drugo = 0,
									Max2PrvoMax1Drugo = 0,
									Max2PrvoMax2Drugo = 0,
									Max2PrvoMax3Drugo = 0,
									Min1PrvoMin1Drugo = 0,
									end;

								if( $('#tim-'+teamName.replace(/ /g, "_")).length ) return false;

								for (let l = 0; l < allGames.length; l++) {
									var fixture = allGames[l],
										score = fixture.score,
										halftimeHome = score.halftime.home,
										halftimeAway = score.halftime.away,
										fulltimeHome = score.fulltime.home,
										fulltimeAway = score.fulltime.away,
										ukupnoGolovaKraj = fulltimeHome + fulltimeAway,
										ukupnoGolovaPrvo = halftimeHome + halftimeAway,
										ukupnoGolovaDrugo = ukupnoGolovaKraj - ukupnoGolovaPrvo,
										timeJeDomacin = (fixture.teams.home.id == teamID)? true: false;


										// Broj golova
										if ( timeJeDomacin ) {

											UkupanBrojGolova += fulltimeHome;
											TimUkupnoPrimioGolova += fulltimeAway;
											TimDomacPrimioGolova += fulltimeAway;

											TimBioDomacin++;

											if( fulltimeHome > 0 ) TimDomacinJedanPlus++;
											if( fulltimeHome > 1 ) TimDomacinDvaPlus++;
											if( fulltimeHome > 2 ) TimDomacinTriPlus++;

										} else {

											UkupanBrojGolova += fulltimeAway;
											TimUkupnoPrimioGolova += fulltimeHome;
											TimGostPrimioGolova += fulltimeHome;

											TimBioGost++;

											if( fulltimeAway > 0 ) TimGostJedanPlus++;
											if( fulltimeAway > 1 ) TimGostDvaPlus++;
											if( fulltimeAway > 2 ) TimGostTriPlus++;
										}

										// Na utakmici je bilo golova
										if( ukupnoGolovaKraj > 0 ) {

											JedanPlus++;

											if( ukupnoGolovaKraj > 1 ) DvaPlus++;
											if( ukupnoGolovaKraj > 2 ) TriPlus++;
											if( ukupnoGolovaKraj > 3 ) CetiriPlus++;
											if( ukupnoGolovaKraj > 4 ) PetPlus++;


										// Rezultat je 0-0
										} else {
											NulaNula++;
										}

										// Rezultat je 0-4
										if( ukupnoGolovaKraj < 5 ) NulaCetiri++;

										// Rezultat je X
										if ( fulltimeHome === fulltimeAway ) X++;


										 // Domacin pobednik
										if ( timeJeDomacin && fulltimeHome > fulltimeAway ) DomacinPobednik++;

										// Gost pobednik
										if ( !timeJeDomacin && fulltimeAway > fulltimeHome ) GostPobednik++;

										// Prvo poluvreme 2 plus
										if ( ukupnoGolovaPrvo > 1 ) PrvoDvaPlus++;

										// Drugo poluvreme 2 plus
										if ( ukupnoGolovaDrugo > 1 ) DrugoDvaPlus++;

										// Oba tima daju bar 1 gol
										if ( fulltimeHome > 0 && fulltimeAway > 0 ) ObaTimaGol++;



										// Domacin pobednik ili X
										if ( timeJeDomacin ) {

											if ( ( fulltimeHome > fulltimeAway ) || ( fulltimeHome == fulltimeAway ) ) JedanX++;


										} else {

											// Gost pobednik ili X
											if ( ( fulltimeAway > fulltimeHome ) || ( fulltimeHome == fulltimeAway ) ) XDva++;
										}

										// Domacin ili Gost pobednik
										if ( fulltimeHome != fulltimeAway ) JedanDva++;

										// Najvise 1 u prvom i najvise 1 u drugom
										if( ukupnoGolovaPrvo <= 1 && ukupnoGolovaDrugo <= 1 ) Max1PrvoMax1Drugo++;

										// Najvise 1 u prvom i najvise 2 u drugom
										if( ukupnoGolovaPrvo <= 1 && ukupnoGolovaDrugo <= 2 ) Max1PrvoMax2Drugo++;

										// Najvise 1 u prvom i najvise 3 u drugom
										if( ukupnoGolovaPrvo <= 1 && ukupnoGolovaDrugo <= 3 ) Max1PrvoMax3Drugo++;

										// Najvise 2 u prvom i najvise 1 u drugom
										if( ukupnoGolovaPrvo <= 2 && ukupnoGolovaDrugo <= 1 ) Max2PrvoMax1Drugo++;

										// Najvise 2 u prvom i najvise 2 u drugom
										if( ukupnoGolovaPrvo <= 2 && ukupnoGolovaDrugo <= 2 ) Max2PrvoMax2Drugo++;

										// Najvise 2 u prvom i najvise 3 u drugom
										if( ukupnoGolovaPrvo <= 2 && ukupnoGolovaDrugo <= 3 ) Max2PrvoMax3Drugo++;

										// Najmanje 1 u prvom i najmanje 1 u drugom
										if( ukupnoGolovaPrvo >= 1 && ukupnoGolovaDrugo >= 1 ) Min1PrvoMin1Drugo++;
								}

								var text = '<table data-id="'+teamID+'" data-teamName="'+teamName+'" id="tim-'+teamName.replace(/ /g, "_")+'">';
								text += '<tr><th>' + teamName + '</th></tr>';
								text += '<tr><th>' + BrojUtakmica + '</th></tr>';
								text += '<tr><th>' + UkupanBrojGolova + ' ( '+(UkupanBrojGolova/BrojUtakmica).toFixed(1)+' )</th></tr>';
								text += '<tr><th>' + NulaNula + ' <span>(' + ((NulaNula/BrojUtakmica)*100).toFixed(2) + '%)</span>' + '</th></tr>';
								text += '<tr><th>' + X + ' <span>(' + ((X/BrojUtakmica)*100).toFixed(2) + '%)</span>' + '</th></tr>';
								text += '<tr><th>' + JedanPlus + ' <span>(' + ((JedanPlus/BrojUtakmica)*100).toFixed(2) + '%)</span>' + '</th></tr>';
								text += '<tr><th>' + DvaPlus + ' <span>(' + ((DvaPlus/BrojUtakmica)*100).toFixed(2) + '%)</span>' + '</th></tr>';
								text += '<tr><th>' + TriPlus + ' <span>(' + ((TriPlus/BrojUtakmica)*100).toFixed(2) + '%)</span>' + '</th></tr>';
								text += '<tr><th>' + CetiriPlus + ' <span>(' + ((CetiriPlus/BrojUtakmica)*100).toFixed(2) + '%)</span>' + '</th></tr>';
								text += '<tr><th>' + PetPlus + ' <span>(' + ((PetPlus/BrojUtakmica)*100).toFixed(2) + '%)</span>' + '</th></tr>';
								text += '<tr><th>' + NulaCetiri + ' <span>(' + ((NulaCetiri/BrojUtakmica)*100).toFixed(2) + '%)</span>' + '</th></tr>';
								
								text += '<tr><th>' + TimBioDomacin + ' <span>(' + ((TimBioDomacin/BrojUtakmica)*100).toFixed(2) + '%)</span>' + '</th></tr>';
								text += '<tr><th>' + TimBioGost + ' <span>(' + ((TimBioGost/BrojUtakmica)*100).toFixed(2) + '%)</span>' + '</th></tr>';


								text += '<tr><th>' + TimDomacinJedanPlus + ' <span>(' + ((TimDomacinJedanPlus/TimBioDomacin)*100).toFixed(2) + '%)</span>' + '</th></tr>';
								text += '<tr><th>' + TimDomacinDvaPlus + ' <span>(' + ((TimDomacinDvaPlus/TimBioDomacin)*100).toFixed(2) + '%)</span>' + '</th></tr>';
								text += '<tr><th>' + TimDomacinTriPlus + ' <span>(' + ((TimDomacinTriPlus/TimBioDomacin)*100).toFixed(2) + '%)</span>' + '</th></tr>';

								text += '<tr><th>' + TimGostJedanPlus + ' <span>(' + ((TimGostJedanPlus/TimBioGost)*100).toFixed(2) + '%)</span>' + '</th></tr>';
								text += '<tr><th>' + TimGostDvaPlus + ' <span>(' + ((TimGostDvaPlus/TimBioGost)*100).toFixed(2) + '%)</span>' + '</th></tr>';
								text += '<tr><th>' + TimGostTriPlus + ' <span>(' + ((TimGostTriPlus/TimBioGost)*100).toFixed(2) + '%)</span>' + '</th></tr>';
								
								
								text += '<tr><th>' + DomacinPobednik + ' <span>(' + ((DomacinPobednik/TimBioDomacin)*100).toFixed(2) + '%)</span>' + '</th></tr>';
								text += '<tr><th>' + GostPobednik + ' <span>(' + ((GostPobednik/TimBioGost)*100).toFixed(2) + '%)</span>' + '</th></tr>';
								
								text += '<tr><th>' + TimUkupnoPrimioGolova + ' <span>(' + ((TimUkupnoPrimioGolova/BrojUtakmica)).toFixed(1) + ')</span>' + '</th></tr>';
								text += '<tr><th>' + TimDomacPrimioGolova + ' <span>(' + ((TimDomacPrimioGolova/TimBioDomacin)).toFixed(1) + ')</span>' + '</th></tr>';
								text += '<tr><th>' + TimGostPrimioGolova + ' <span>(' + ((TimGostPrimioGolova/TimBioGost)).toFixed(1) + ')</span>' + '</th></tr>';
								




								

								text += '<tr><th>' + ObaTimaGol + ' <span>(' + ((ObaTimaGol/BrojUtakmica)*100).toFixed(2) + '%)</span>' + '</th></tr>';
								text += '<tr><th>' + PrvoDvaPlus + ' <span>(' + ((PrvoDvaPlus/BrojUtakmica)*100).toFixed(2) + '%)</span>' + '</th></tr>';
								text += '<tr><th>' + DrugoDvaPlus + ' <span>(' + ((DrugoDvaPlus/BrojUtakmica)*100).toFixed(2) + '%)</span>' + '</th></tr>';


								text += '<tr><th>' + JedanX + ' <span>(' + ((JedanX/TimBioDomacin)*100).toFixed(2) + '%)</span>' + '</th></tr>';
								text += '<tr><th>' + JedanDva + ' <span>(' + ((JedanDva/BrojUtakmica)*100).toFixed(2) + '%)</span>' + '</th></tr>';
								text += '<tr><th>' + XDva + ' <span>(' + ((XDva/TimBioGost)*100).toFixed(2) + '%)</span>' + '</th></tr>';
								text += '<tr><th>' + Max1PrvoMax1Drugo + ' <span>(' + ((Max1PrvoMax1Drugo/BrojUtakmica)*100).toFixed(2) + '%)</span>' + '</th></tr>';
								text += '<tr><th>' + Max1PrvoMax2Drugo + ' <span>(' + ((Max1PrvoMax2Drugo/BrojUtakmica)*100).toFixed(2) + '%)</span>' + '</th></tr>';
								text += '<tr><th>' + Max1PrvoMax3Drugo + ' <span>(' + ((Max1PrvoMax3Drugo/BrojUtakmica)*100).toFixed(2) + '%)</span>' + '</th></tr>';
								text += '<tr><th>' + Max2PrvoMax1Drugo + ' <span>(' + ((Max2PrvoMax1Drugo/BrojUtakmica)*100).toFixed(2) + '%)</span>' + '</th></tr>';
								text += '<tr><th>' + Max2PrvoMax2Drugo + ' <span>(' + ((Max2PrvoMax2Drugo/BrojUtakmica)*100).toFixed(2) + '%)</span>' + '</th></tr>';
								text += '<tr><th>' + Max2PrvoMax3Drugo + ' <span>(' + ((Max2PrvoMax3Drugo/BrojUtakmica)*100).toFixed(2) + '%)</span>' + '</th></tr>';
								text += '<tr><th>' + Min1PrvoMin1Drugo + ' <span>(' + ((Min1PrvoMin1Drugo/BrojUtakmica)*100).toFixed(2) + '%)</span>' + '</th></tr>';
								text += '<tr class="remove_table"><th>X</th></tr>';	// remove table
								text += '</table>'


								$(text).appendTo('#statisticsTeam .values');

							} else {
								
								if( $('#tim-' + values.text.replace(/ /g, "_") ).length ) {
									$('#tim-' + values.text.replace(/ /g, "_") ).remove();
								}

							}
							
							
							UpdateValuesWidth();
							
							


							
								

						}
					});
					
					$('#preload').fadeOut();


				}, 100 );



			}


		});

	};
}



function UpdateValuesWrapperWidth() {
	$('.values-wrapper').each( function() {
		var parent = $(this).parent();
		$(this).width( parent.width() - parent.find('.sticky').width() - 5 );	
	});
}
function UpdateValuesWidth() {
	UpdateValuesWrapperWidth();
	$('.values-wrapper').each( function() {
		var tables = $(this).find('table'),
			values = $(this).find('.values'),
			width = 0;

		tables.each( function() {
			width += $(this).outerWidth(true);
		});

		if( width > $(this).width() ) {
			values.width( width );
			$(this).addClass('noBorder');
		} else {
			values.css('width', '');
			$(this).removeClass('noBorder');
		}	

	});
}

$(window).on('resize', function(){
    UpdateValuesWidth();
});


var numberOfFixturesLoaded = 0;


function WriteToBody(json) {

	numberOfFixturesLoaded++;

	json = JSON.parse(json);

	var fixtures = json.response;

	for (let i = 0; i < fixtures.length; i++) {
		var fixture = fixtures[i],
			id = fixture.fixture.id;

		globalJson.fixtures.push(fixture);

		//GetPrediction(id);
	}

	if( numberOfFixturesLoaded == leagusIds.length ) {
		var numberOfFixtures = globalJson.fixtures.length;

		console.log( 'ALl fixtures loaded' );

		for (let i = 0; i < numberOfFixtures; i++) {

			setTimeout(function timer() {
				var fixture = globalJson.fixtures[i],
					id = fixture.fixture.id,
					last = ( i === numberOfFixtures-1 )? true: false;

				GetPrediction(id, last);

			}, i * 2000 );
		}
	}
}

function GetPrediction(id, last) {
	fetch("https://v3.football.api-sports.io/predictions?fixture="+id, {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "v3.football.api-sports.io",
			"x-rapidapi-key": API
		}
	})
	.then(response => response.text())
	.then(result => WritePrediction(result,id, last))
	.catch(error => console.log('error', error));
}

function WritePrediction(result, id, last) {
	result = JSON.parse(result);

	if( result.response.length ) {

		var predictions = result.response[0].predictions;
		predictions.id = id;

		console.log( 'prediction '+ id +' loaded' );

		globalJson.predictions.push(predictions);

		WriteToBodyPantry(globalJson);
	}

	if ( last ) {
		console.log( 'UPDATE PANTRY JSON HERE' );
		UpdatePantryJson( globalJson );
	}
}

function WriteToBodyPantry(json) {
	var fixtures = json.fixtures;

	var wrapper = document.getElementById("wrapper"),
		text = '';

		for (let l = 0; l < leagusIds.length; l++) {
			var leagueID = leagusIds[l],
				result = fixtures.filter(obj => {
				  return obj.league.id == leagueID;
				});

			if( result.length === 0 ) continue;

			text += '<div class="league" league-id="'+leagueID+'" league-name="'+leagusName[leagueID]+'">';
			text += '<div class="league-logo"><img src="'+result[0].league.logo+'"/></div>';

			for (let i = 0; i < result.length; i++) {
				var fixture = result[i],
					id = fixture.fixture.id,
					home = fixture.teams.home,
					away = fixture.teams.away,
					time =  new Date(fixture.fixture.date),
					prediction = json.predictions.find(o => o.id === id);




				if( !prediction ) continue;

				text += '<div class="row" data-round="'+fixture.league.round+'">';
				text += '<div class="time">'+time.getDate()  + "." + (time.getMonth()+1) + "." + time.getFullYear() + ' - ' + time.getHours() + ":" + (time.getMinutes()<10?'0':'') + time.getMinutes() + 'h</div>';

				text += '<div class="team home">';
				text += '<img src="'+home.logo+'"/><a team-id="'+home.id+'">' + home.name + '</a>';
				text += '</div>';


				text += '<div id="'+id+'" class="prediction">';

				if( prediction.under_over ) {
					
					
					text += prediction.under_over;
					
					
				} else if( prediction.advice ) {
					text += prediction.advice.replace('Double chance', 'Dupla šansa').replace(' or ', ' ili ').replace('Winner', 'Pobednik').replace('draw', 'nerešeno').replace('and', 'i').replace('goals', 'golova').replace('Combo', '');
				} else {
					text += '------';
				}
				

				text += '</div>';

				text += '<div class="team away">';
				text += '<img src="'+away.logo+'"/><a team-id="'+away.id+'" >' + away.name + '</a>';
				text += '</div>';

				text += '</div>';
			}
			text += '</div>';
		}

	wrapper.innerHTML = text;
	
}


































