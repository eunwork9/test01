/*------------------------------------------------------------------------------
 * PROJECT : HAI chatbot
 * NAME : chatbot.js 
 * DESC : Chatbot UI
 * Author : Lee Inkyung
 * Copyright 2018 Hana Bank All rights reserved.
 *------------------------------------------------------------------------------ */

/*
$(document).ready(function(){
	underAreaEvent(); // 키보드영역 관련 이벤트 (2018-05-04 수정)
	layerPopEvent(); // 레이어 팝업 관련 이벤트
	toggleBtn(); //토글 버튼 관련 이벤트
	cardType(); //카드타입 3개 이상일때 영역 스크롤
	voiceInfo(); // 음성인식 '듣고있습니다' 안내문구 관련 (2018-05-04 추가)
});
*/

function underAreaEvent(){ 
	var chatbotWrap = $('.chatbotWrap'),
		messageArea = chatbotWrap.find('.messageArea'),
		underArea = chatbotWrap.find('.underArea'),
		inp = $('.inputStyle > input'),
		quick =$('.quickMenu'),
		menuBtn = $('.menuBtn'),
		tabArea = $('.tabArea'),
		tabMenu = tabArea.find('.tabMenu'),
		tabBtns = tabMenu.find('.tabBtn > li'),
		tabCont = tabArea.find('.tabCont'),
		tabList = tabCont.find('> ul'),
		tagBtnList = tabList.find('> li'),
		tabClose = $('.tabClose'),
		speadBtn = tabArea.find('.speadBtn');
	
	/* 채팅 높이에 따른 scroll bottom[S] */
	// 채팅창 높이값 체크
		var headerH = chatbotWrap.find('header').height(),
		chatWrapH = chatbotWrap.height()- headerH,
		tabAreaH = tabArea.height(),
		tabMenuH = tabMenu.height(),
		tabContH = tabCont.height(),
		tabContFullH = chatWrapH - tabMenuH,
		talkH = $('.talk').height(),
		messageH = messageArea.height(),
		menuOnScrollTop =  messageH - tabAreaH;
	
	var you = $('.talk').find('.you');
	you.last().addClass('lastStyle');
	
	// scroll bottom 관련 
	scrollEvent = function(){
		messageArea.css('height', messageH + 'px');
		messageArea.scrollTop(talkH);
	}
	scrollEvent();
	scrollEventMenuOn = function(){
		messageArea.css('height', menuOnScrollTop + 'px');
		messageArea.scrollTop(talkH);
	}
	scrollKeyup = function(){
		var underH = $('.quickMenu').height(),
			messageFc = messageH - underH;
		messageArea.css('height', messageFc + 'px');
	}
	/* 채팅 높이에 따른 scroll bottom[E] */

	/* tab 영역 관련[S] */
	tabInit = function(){
		tabMenu.find('> ul').scrollLeft(0);
		tabBtns.removeClass('on');
		tabBtns.eq(0).addClass('on');
		tabCont.eq(0).addClass('active');
	}
	tabInit();
	tabListInit = function(){
		tagBtnList.css('margin-bottom','40px');
		tabList.css('margin-top','285px');
		tabCont.scrollTop(0);
	}
	tabListMotion = function(){
		if (tabBtns.hasClass('on')){
			tagBtnList.stop().animate({margin:'0'},1500);
			tabList.stop().animate({margin:'0'},1000);
		}
	}
	underAreaInit = function(){
		underArea.show();
		tabArea.css('height', '285px'); //초기값
		tabCont.css('height', '244px'); //초기값
	}
	tabBtns.each(function(){
		$(this).find('a').on('click', function(e) {
			e.preventDefault();
			var tabBtn = $(this),
				href = tabBtn.attr('href'),
				tabCon = $(href);
			tabCont.scrollTop(0);
			tabListInit();
			tabListMotion();
			tabBtn.parent().addClass('on').siblings().removeClass('on');
			tabCon.addClass('active').siblings('.tabCont').removeClass('active');
		});
	})
	speadBtn.on('click', function(){
		var speadThis = $(this);
		speadThis.toggleClass('full');
		underAreaInit();
		if (speadThis.hasClass('full')){
			underArea.hide();
			tabArea.css('height', chatWrapH + 'px');
			tabCont.css('height', tabContFullH + 'px');
		}
	})
	/* tab 영역 관련[E] */

	/* underArea 영역 동작 관련[S] */
	quickClose = function(){
		quick.find('.qMenu').scrollLeft(0);
		quick.hide();
		inp.focusout();
	}
	quickOpen = function(){
		quick.show();
		tabArea.hide();
	}
	/*$('.messageArea, .micBtn, .carmeraBtn').on('click', function(){
		tabInit();
		scrollEvent();
		tabListInit();
		tabArea.hide();
		inp.blur();
	});*/
	menuBtn.on('click', function(){
		tabArea.show();
		quickClose();
		tabListMotion();
		scrollEventMenuOn();
	});
	inp.on('focus', function(){
		tabInit();
		quick.show();
		tabArea.hide();
		tabListInit();
		scrollKeyup();
		messageArea.scrollTop(talkH);
		if(this.getAttribute('title')  == this.value){
			this.value = '';
		} return false;
	}).on('blur', function(){
		scrollEvent();
		if(''== this.value){
			this.value = this.getAttribute('title');
			setTimeout(function() {
				quickClose();
			}, 100);
		}
	});
	tagAreaClose = function(){
		tabInit();
		underAreaInit();
		underArea.show();
		tabArea.hide();
		tabListInit();
		scrollEvent();
		speadBtn.removeClass('full');
	}
	tabClose.on('click', function(){
		tagAreaClose();
	});
	tagBtnList.each(function(){ // 도움말리스트 버튼 클릭시 기본 채팅 인풋화면으로 닫힘
		$(this).on('click', function(){
			tagAreaClose();
		});
	});
	/* underArea 영역 동작 관련[E] */
}

function addChat(){ // 테스트용
	var chatBody = $('.talk');
	if($('#chatInp').val() ==''){
		$('#chatInp').focus();
		return false;
	}
	var str = '<li class="me"><div>'
	str += $('#chatInp').val().replace(/[\n]/g,'<br/>');
	str += '</div></li>'
	chatBody.append(str);
	$('#chatInp').val('').focus();
}

function layerPopEvent(){
	var layerBtn = $('.lyBtn'),
		layerPopup = $('.lyPopup'),
		layerClose = $('.lyClose');

	layerInit = function(){
		layerPopup.animate({top:'100%'},50);
		//$('html, body').css({'overflow': 'auto', 'height': '100%'}); 
	}

	layerPopup.hide();
	layerInit();
	
	layerBtn.each(function(){
		$(this).on('click', function(e){
			e.preventDefault();
			var lyBtn = $(this),
				lyHref = lyBtn.attr('href'),
				lyBox = $(lyHref);
			lyBtn.toggleClass('on');
			lyBox.toggleClass('open');
			lyBox.show();
			if ($('.open').hasClass('dimPop')){
				$('.dim').show();
			}
			lyBox.animate({top:'0'},500);
			//$('html, body').css({'overflow': 'hidden', 'height': '100%'}); 
		});
	});

	layerClose.each(function(){
		$(this).on('click', function(){
			var lyCloseBtn = $(this),
				lyCloseBox = lyCloseBtn.closest('.lyPopup');
			lyCloseBox.removeClass('open');
			lyCloseBox.removeClass('on');
			if ($('.lyPopup').hasClass('dimPop')){
				$('.dim').hide();
			}
			lyCloseBox.removeClass('open');
			lyCloseBox.fadeOut();
			layerInit();
		});
	});

}

function tab(){
	var tabMenu = $('.tabMenu');
	tabMenu.each(function(){
		var tabCt = $(this).find('.tabCt');
		$(this).find('a').on('click focusin', function(e) {
			e.preventDefault();
			var tabBt = $(this);
			tabBt.parent().addClass('on').siblings().removeClass('on');
			tabCt.hide();
			tabBt.next('.tabCt').show();
		})
	})
}

function btnToggle(){
	$('.btnTg').each(function(){
		$(this).on('click', function(){
			$(this).parent().toggleClass('on');
		})
	})
}

function voiceInfo(){
	var voiceTxt = $('.voice');
	if (voiceTxt.find('> p').text() != ''){
		voiceTxt.removeClass('vInfo');
	} else {
		voiceTxt.addClass('vInfo');
	}
}