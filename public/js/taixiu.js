//game tai xiu
// start when erro
function whenErro() {
	var clear = setInterval(function () {
		var timeStart = new Date().getTime();
		timeThuc = (timeStart - timeGameStartTaiXiu) / 1000;
		if (timeThuc < 15) {
			$(".threeXucXac img").remove();
			$('.alertBet, .drawTai, .drawXiu, .soNut').hide();
		}
		else {
			clearInterval(clear);
		}
	}, 1000)
}
//bắt đầu game tai xiu
function gameStartTaiXiu() {
	stopGetTaiXiu = [];
	$('.drawXiu, .drawTai').hide();
	gameTaiXiuContinue();
}
$('#loginXocDia').click(function () {
	// addListPlayer();
	$('#taiXiu').show();
	$('#loginListGame').hide();
})
// moneyCuoc
$('#moneyCuoc1k').click(function () {
	var amount = parseInt($('#moneyCuoc').val());
	var tongAmount = amount + 1000;
	$('#moneyCuoc').val(tongAmount);
})
$('#moneyCuoc10k').click(function () {
	var amount = parseInt($('#moneyCuoc').val());
	var tongAmount = amount + 10000;
	$('#moneyCuoc').val(tongAmount);
})
$('#moneyCuoc50k').click(function () {
	var amount = parseInt($('#moneyCuoc').val());
	var tongAmount = amount + 50000;
	$('#moneyCuoc').val(tongAmount);
})
$('#moneyCuoc100k').click(function () {
	var amount = parseInt($('#moneyCuoc').val());
	var tongAmount = amount + 100000;
	$('#moneyCuoc').val(tongAmount);
})
$('#moneyCuocX2').click(function () {
	var amount = parseInt($('#moneyCuoc').val());
	var tongAmount = amount * 2;
	$('#moneyCuoc').val(tongAmount);
})
//move monney
$('#moveMoney').click(function () {
	$('#moneyCuoc').val("0");
})


//auto play video tung xuc xac tai xiu
$("#tungXucXac").get(0);
function AutoPlayVDXucXac() {
	$("#tungXucXac").get(0);
	$("#tungXucXac").get(0).play();
}
// thiết lập time cược game tai xiu
function GetTimeBetsTaiXiu() {
	var timeThuc = 0, giay;
	var interval_obj = setInterval(function () {
		var timeStart = new Date().getTime();
		timeThuc = timeStart - timeGameStartTaiXiu;
		giay = 90 - parseInt(timeThuc / 1000);
		$('.timeBets').html(giay)
		if (0 > giay) {
			$('.timeBets').html(0);
		}
		if (20 <= giay < 101) {
			$('.timeBets').css({ "color": "#000" });
		}
		if (giay < 20) {
			$('.timeBets').css({ "color": "red" });
			$('.btnTai, .btnXiu').hide();
		}
		if (giay < 1) {
			clearInterval(interval_obj);
			$('.canCua').show();
		}
	}, 100)
}

// xác định xúc xắc tai xiu
function xacDinhXucXac(number1, number2, number3) {
	$('.threeXucXac').html('<img src="./img/so' + number1 + '.png">' + '<img src="./img/so' + number2 + '.png">' + '<img src="./img/so' + number3 + '.png">');
}
// hiển thị xúc xắc
function showXucXac() {
	// random();
	$('#tungXucXac').hide();
	$('.threeXucXac').show();
	$('.soNut').html('<div class="col p-0">' + totalXX + '</div>');
	$('.soNut').show();

}
// close tài xỉu
$('.closeTaiXiu').click(function () {
	$('#taiXiu').hide();
	$('#loginListGame').show();
	// removeListPlayer();
})
// show info user
$('#user-pic').click(function () {
	$('.usernamet').html(userNameGG);
	$('.chipt').html(coin);
	$('.infoUser').show();
})
$('.infoUser3').click(function () {
	$('.infoUser').hide();
})

// continue game tai xiu
function gameTaiXiuContinue() {
	$('.threeXucXac, .soNut').hide();
	$(".bowlXD, .timeBets, .btnTai, .btnXiu").show();
	$(".threeXucXac img").remove();
	$(".timeBets").html("0");
	GetTimeBetsTaiXiu();
}

var amountClick = [];
// push data bet xiu
$('.btnXiu').click(function () {
	amountClick.push('result');
	var logAmountClick = amountClick.length;
	if (logAmountClick == 1) {
		document.getElementById("btnXiu").disabled = true;
		setTimeout(() => {
			document.getElementById("btnXiu").disabled = false;
		}, 1000);
	} else {
		document.getElementById("btnXiu").disabled = true;
		setTimeout(() => {
			document.getElementById("btnXiu").disabled = false;
		}, 300);
	}
	var moneyCuoc = parseInt($('#moneyCuoc').val());
	$.ajax({
		url: 'https://us-central1-taixiu-d9c98.cloudfunctions.net/function-1',
		crossDomain: true,
		type: 'POST',
		dataType: 'json',
		data: {
			id: uid,
			moneyXiu: moneyCuoc,
			timeGameStart: timeGameStartTaiXiu
		},
		success: (data) => {
			if (data.alert != undefined) {
				$('.alertBet').html(data.alert).show();
				setTimeout(function () {
					$('.alertBet').hide();
				}, 1500)
			}
		},
		error: (err) => {
			console.log(err);
		}
	})
})
// push data bet tai
var amountClick = [];
$('.btnTai').click(function () {
	amountClick.push('result');
	var logAmountClick = amountClick.length;
	if (logAmountClick == 1) {
		document.getElementById("btnTai").disabled = true;
		setTimeout(() => {
			document.getElementById("btnTai").disabled = false;
		}, 1000);
	} else {
		document.getElementById("btnTai").disabled = true;
		setTimeout(() => {
			document.getElementById("btnTai").disabled = false;
		}, 300);
	}
	var moneyCuoc = parseInt($('#moneyCuoc').val());
	$.ajax({
		url: 'https://us-central1-taixiu-d9c98.cloudfunctions.net/function-4',
		crossDomain: true,
		type: 'POST',
		dataType: 'json',
		data: {
			id: uid,
			moneyTai: moneyCuoc,
			timeGameStart: timeGameStartTaiXiu
		},
		success: (data) => {
			if (data.qe != undefined) {
				$('.alertBet').html(data.qe).show();
				setTimeout(function () {
					$('.alertBet').hide();
				}, 1500)
			}
		},
		error: (err) => {
			console.log(err);
		}
	})

})


function getTaiXiu(data) {
	// console.log(data);
	idResultTaiXiu = data.result.idTaiXiu;
	hat1 = data.result.hat1;
	hat2 = data.result.hat2;
	hat3 = data.result.hat3;
	resultTaiXiu = data.result.resultTaiXiu;
	timeStartTaiXiu = data.result.timeStartTaiXiu;
	totalXX = hat1 + hat2 + hat3;
	// console.log(stopGetTaiXiu);
	
	if (timeStartTaiXiu == timeGameStartTaiXiu && stopGetTaiXiu.length == 0) {
		stopGetTaiXiu.push('stopGetTaiXiu');
		$('.canCua').hide();
		$('.soNut col').html(resultTaiXiu);
		$('.bowlXD').hide();
		$('.timeBets').hide();
		AutoPlayVDXucXac();
		$('#tungXucXac').show();
		setTimeout(function () {
			showXucXac();
			xacDinhXucXac(hat1, hat2, hat3);
			if (resultTaiXiu > 10) {
				$('.drawTai').show();
			} else {
				$('.drawXiu').show();
			}
		}, 1300)
	}
	$('.iDVan span').html(idResultTaiXiu);
}

// luat choi tai xiu
var luatChoiTaiXiu = [];
$('#luatChoiTaiXiu').click(function () {
	luatChoiTaiXiu.push('luat');
	if (luatChoiTaiXiu.length % 2 == 0) {
		$('.framseLuatTaiXiu').hide();
	} else {
		$('.framseLuatTaiXiu').show();
	}
})

// chat tài xỉu
// luat choi tai xiu
var chatTaiXiu = [];
$('#chatTaiXiu').click(function () {
	luatChoiTaiXiu.push('chat');
	if (luatChoiTaiXiu.length % 2 == 0) {
		$('.framseChatTaiXiu').hide();
	} else {
		$('.framseChatTaiXiu').show();
	}
})
// update content chat
function writeChat() {
	var content = $('#contentChatTaiXiu').val();
	var postData = {
		name: userNameGG,
		content: content,
	};
	var updates = {};
	updates['/chat/' + makeid()] = postData;
	firebase.database().ref().update(updates);
	// firebase.database().ref('chat').set({
	// 	content,
	// });
}

function makeid() {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < 30; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}

// nhạc
function nhac() {
	var vid1 = document.getElementById("nhac");
	vid1.play();
	$(".openNhac").hide();
	$(".closeNhac").show();
}
function closeNhac() {
	var vid1 = document.getElementById("nhac");
	vid1.pause();
	$(".openNhac").show();
	$(".closeNhac").hide();
}





