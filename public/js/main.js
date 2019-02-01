// in game
//ham chạy khi web bật
function HiddenResidual() {
	$('#loginListGame').hide();
	$('#taiXiu, .threeXucXac, .soNut, .infoUser, .displayRecharge, #bauCua, .canCua, .alertBet, #tungXucXac, .framseLuatTaiXiu, .framseChatTaiXiu, .nhacNen').hide();
}



$(document).ready(function () {
	handlingWidth();
	HiddenResidual();
});

// bat su kien width thay doi
$(window).on('resize', function () {
	handlingWidth();
})
// hàm xử lý width
function handlingWidth() {
	ww = $(window).width();
	if (ww < 992 && ww > 0) {
		$('html').hide();
		alert("Xin lỗi, thiết bị của quý khách k thích hợp với game giao diện web này!");
	}
	else if (ww == 0) {
		$('html').show();
		if ($(window).width() >= 992) {
			$('html').show();
		}
		if ($(window).width() < 992) {
			$('html').hide();
			alert("Xin lỗi, thiết bị của quý khách k thích hợp với game giao diện web này!");
		}
	}
}

function loginFinish() {
	$('.common, .header_menu, .bodyer').hide();
	$('#loginListGame').show();
	TextWelcome('#welcome', 'Chào mừng ' + userNameGG + ' đến với game đánh bài ThanVip !');
}
function TextWelcome(id, content) {
	var text = '';
	var size = content.length;
	var arr = content.split("");
	var num = 0;
	var interval = setInterval(function () {
		text += arr[num];
		$(id).html(text);
		num++;
		if (num == size) {
			clearInterval(interval);
		}
	}, 80);
}
// list help
$('.recharge').click(function () {
	$('.displayRecharge').show();
})
$('.closeFramesRecharge').click(function () {
	$('.displayRecharge').hide();
})
// NẠP THẺ
$('.viettel').click(function () {
	loaiThe = 'vtt';
	$('.NTDT').html('NẠP THẺ VIETTEL');
	$('.viettel').css({ 'opacity': '1', 'border': '3px solid red' })
	$('.mobi').css({ 'opacity': '0.5', 'border': '0' })
	$('.vina').css({ 'opacity': '0.5', 'border': '0' })
})
$('.mobi').click(function () {
	loaiThe = 'vms';
	$('.NTDT').html('NẠP THẺ MOBIPHONE')
	$('.mobi').css({ 'opacity': '1', 'border': '3px solid red' })
	$('.viettel').css({ 'opacity': '0.5', 'border': '0' })
	$('.vina').css({ 'opacity': '0.5', 'border': '0' })
})
$('.vina').click(function () {
	loaiThe = 'vnp';
	$('.NTDT').html('NẠP THẺ VINAPHONE')
	$('.vina').css({ 'opacity': '1', 'border': '3px solid red' })
	$('.viettel').css({ 'opacity': '0.5', 'border': '0' })
	$('.mobi').css({ 'opacity': '0.5', 'border': '0' })
})
function isNumberKey(evt) {
	var charCode = (evt.which) ? evt.which : event.keyCode
	if (charCode > 31 && (charCode < 48 || charCode > 57))
		return false;
	return true;
}
$('#nap').click(function () {
	var maThe, serial, menhGia, serviceTransId;
	$('.alertNapThe').html('<img src="./img/loading1.gif">')
	maThe = $("#maThe").val();
	serial = $("#serial").val();
	menhGia = $("#menhGia").val();
	serviceTransId = $("#serviceTransId").val();
	if (loaiThe == undefined) {
		$('.alertNapThe').html('Xin vui lòng chọn loại thẻ thanh toán');
	}
	$.support.cors = true;
	$.ajax({
		url: "http://5ty.org:8080/api/card/post",
		crossDomain: true,
		data: {
			serviceId: 'IUt048hc1ci8qJ3jNNCI',
			type: loaiThe,
			serial: serial,
			code: maThe,
			money: menhGia,
			serviceTransId: serviceTransId,
			hash: 'shajdkhashdaksj',
		},
		dataType: 'json',
		type: "POST",
		success: function (data) {
			$('.alertNapThe').html(data.Message);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			if (jqXHR.status == 415) {
				console.log('lỗi');
			}
			if (jqXHR.status == 500) {
				$('.loader').hide();
				alert("Account not enough to withdraw!");
			}
			if (jqXHR.status == 404) {

				$('.loader').hide();
			}
		}
	})
});
//update list top and time game
setInterval(
	function () {
		$.get("https://us-central1-taixiu-d9c98.cloudfunctions.net/updateListTop", function (data) {
			if (timeGameStartTaiXiu != data.timeStartTaiXiu) {
				timeGameStartTaiXiu = data.timeStartTaiXiu;

				gameStartTaiXiu();
				whenErro();
			}
			if (timeGameStartBauCua != data.timeStartBauCua) {
				timeGameStartBauCua = data.timeStartBauCua;

				gameStartBauCua();
				// whenErro();
			}

			var log = data.reListTop.length;
			for (var i = 0; i < log; i++) {
				$('.no' + (i + 1) + ' .username').html(data.reListTop[i].displayName);
				$('.no' + (i + 1) + ' .money span').html(numberFormat2.format(data.reListTop[i].money));
			}
		});
	}, 1000
)
// update data when in game
function inGame() {
	$.ajax({
		url: 'https://us-central1-taixiu-d9c98.cloudfunctions.net/inGame',
		crossDomain: true,
		type: 'POST',
		dataType: 'json',
		data: {
			id: uid,
			timeGameStartTaiXiu: timeGameStartTaiXiu,
			timeGameStartBauCua: timeGameStartBauCua
		},
		success: (data) => {
			//tai xiu
			$('.moneyTai span').html(numberFormat2.format(data.gameTaiXiu.moneyTai));
			$('.moneyXiu span').html(numberFormat2.format(data.gameTaiXiu.moneyXiu));
			$('.totalMoneyTai span').html(numberFormat2.format(data.gameTaiXiu.totalAmountTaiCan));
			$('.totalMoneyXiu span').html(numberFormat2.format(data.gameTaiXiu.totalAmountXiuCua));
			$('.amountPPXiu span').html(data.gameTaiXiu.totalPlayerXiu);
			$('.amountPPTai span').html(data.gameTaiXiu.totalPlayerTai);
			$('.inconCham').html(data.gameTaiXiu.listResultTaiXiu);
			getTaiXiu(data.gameTaiXiu);
			console.log(data.gameBauCua);
			//Bầu cua
			$('.amountPPHuu span').html(data.gameBauCua.totalPlayerHuu);
			$('.amountPPBau span').html(data.gameBauCua.totalPlayerBau);
			$('.amountPPGa span').html(data.gameBauCua.totalPlayerGa);
			$('.amountPPCa span').html(data.gameBauCua.totalPlayerCa);
			$('.amountPPCua span').html(data.gameBauCua.totalPlayerCua);
			$('.amountPPTom span').html(data.gameBauCua.totalPlayerTom);

			getBauCua(data.gameBauCua);
			//update money user
			$('.chipt').html(numberFormat2.format(data.chipt));
		},
		error: (err) => {
			console.log(err);
		}
	});
}
