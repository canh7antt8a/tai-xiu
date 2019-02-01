
// game bau cua
$('#loginCrabGourd').click(function () {
	$('#bauCua').show();
	$('#loginListGame').hide();
})

$('.closeBauCua').click(function () {
	$('#bauCua').hide();
	$('#loginListGame').show();
})

//bắt đầu game bầu cua
function gameStartBauCua() {
	stopGetBauCua = [];
	$('.resultBauCua').hide();
	GetTimeBetsBauCua();
	$('.vungchao').show()
}

// thiết lập time cược game bầu cua
function GetTimeBetsBauCua() {
	let timeThuc = 0, giay;
	var interval_baucua = setInterval(function () {
		var timeStartBauCua = new Date().getTime();
		timeThuc = timeStartBauCua - timeGameStartBauCua;
		giay = 60 - parseInt(timeThuc / 1000);
		$('.timeBauCua').html(giay)
		if (0 > giay) {
			$('.timeBauCua').html(0);
		}
		if (15 <= giay < 60) {
			$('.timeBauCua').css({ "color": "#000" });
		}
		if (giay < 15) {
			$('.timeBauCua').css({ "color": "red" });
			// $('.btnTai, .btnXiu').hide();
		}
		if (giay < 1) {
			clearInterval(interval_baucua);
		}
	}, 100)
}

function xacDinhResultBauCua(number1, number2, number3) {
	console.log(number1, number2, number3);
	$('.resultBauCua').html('<img src="./img/bc' + number1 + '.png">' + '<img src="./img/bc' + number2 + '.png"><br>' + '<img src="./img/bc' + number3 + '.png">');
}
//update game bau cua
function getBauCua(data) {
	// console.log(data);
	
	hinh1 = data.hinh1;
	hinh2 = data.hinh2;
	hinh3 = data.hinh3;
	// var resultTaiXiu = data.result.resultTaiXiu;
	timeStartBauCua = data.timeStartBauCua;

	if (timeStartBauCua == timeGameStartBauCua && stopGetBauCua.length == 0) {
		stopGetBauCua.push('stopGetBauCua');
		$('.vungchao').hide();
		$('.resultBauCua').show();
		xacDinhResultBauCua(hinh1, hinh2, hinh3);
		// $('.canCua').hide();
		// $('.soNut col').html(resultTaiXiu);
		// $('.bowlXD').hide();
		// $('.timeBets').hide();
		// AutoPlayVDXucXac();
		// $('#tungXucXac').show();
		// setTimeout(function () {
		// 	// showXucXac();
		// 	xacDinhXucXac(hat1, hat2, hat3);
		// 	if (resultTaiXiu > 10) {
		// 		$('.drawTai').show();
		// 	} else {
		// 		$('.drawXiu').show();
		// 	}
		// }, 1300)
	}
	$('.idBauCua').html('#'+data.idBauCua);
}

// moneyCuocBauCua
$('#moneyCuoc1kBauCua').click(function () {
	var amount = parseInt($('#moneyCuocBauCua').val());
	var tongAmount = amount + 1000;
	$('#moneyCuocBauCua').val(tongAmount);
})
$('#moneyCuoc10kBauCua').click(function () {
	var amount = parseInt($('#moneyCuocBauCua').val());
	var tongAmount = amount + 10000;
	$('#moneyCuocBauCua').val(tongAmount);
})
$('#moneyCuoc50kBauCua').click(function () {
	var amount = parseInt($('#moneyCuocBauCua').val());
	var tongAmount = amount + 50000;
	$('#moneyCuocBauCua').val(tongAmount);
})
$('#moneyCuoc100kBauCua').click(function () {
	var amount = parseInt($('#moneyCuocBauCua').val());
	var tongAmount = amount + 100000;
	$('#moneyCuocBauCua').val(tongAmount);
})
$('#moneyCuocX2BauCua').click(function () {
	var amount = parseInt($('#moneyCuocBauCua').val());
	var tongAmount = amount * 2;
	$('#moneyCuocBauCua').val(tongAmount);
})
//move monney
$('#moveMoneyBauCua').click(function () {
	$('#moneyCuocBauCua').val("0");
})

// push data bet huu
var amountClickHuu = [];
$('.btnHuu').click(function () {
	amountClickHuu.push('result');
	var logAmountClick = amountClickHuu.length;
	if (logAmountClick == 1) {
		document.getElementById("btnHuu").disabled = true;
		setTimeout(() => {
			document.getElementById("btnHuu").disabled = false;
		}, 1000);
	} else {
		document.getElementById("btnHuu").disabled = true;
		setTimeout(() => {
			document.getElementById("btnHuu").disabled = false;
		}, 300);
	}
	var moneyCuocBauCua = parseInt($('#moneyCuocBauCua').val());
	$.ajax({
		url: 'https://us-central1-taixiu-d9c98.cloudfunctions.net/function-4',
		crossDomain: true,
		type: 'POST',
		dataType: 'json',
		data: {
			id: uid,
			moneyCuocBauCua: moneyCuocBauCua,
			timeGameStartBauCua: timeGameStartBauCua
		},
		success: (data) => {
			console.log(data);
			
			// if (data.qe != undefined) {
			// 	$('.alertBet').html(data.qe).show();
			// 	setTimeout(function () {
			// 		$('.alertBet').hide();
			// 	}, 1500)
			// }
		},
		error: (err) => {
			console.log(err);
		}
	})

})