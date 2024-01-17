$(document).ready(function() {
	topBtn();	//top버튼
	tabMenu();	//탭메뉴
	reload();   // 새로고침 시 이동
	Skrollr();
});

// 새로고침 시, 최상단으로 이동
function reload(){
	// window.onload = function() {
	// 	$('html, body').animate({
	// 		scrollTop: 0
	// 	},100);
	// };
	window.onbeforeunload = function () {
		window.scrollTo(0,0);
	}
}
//E


function topBtn(){// Scroll Top
	$('.go_top').on('click', function(e) {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: 0
		}, 650);
		return false;
	});
}

function tabMenu(){ // 탭메뉴
	var $tab = $('.intro_tab ul');
	var $menu = $('.intro_tab ul li');
	var $con = $('.contents > div');
	var $tabArea = $('.tab_wrap');

	$(window).scroll(function () {
		var $scrollTop = $("html,body").scrollTop();
		var $contTop = $('#contents').offset().top;
		var $endTop = $('#section_04').offset().top;
		$.each($con, function(idx, item){
			var $target = $con.eq(idx);
			var targetTop = $target.offset().top;
			if(targetTop - 100 <= $scrollTop){
				$menu.removeClass("on");
				$menu.eq(idx).addClass("on");
			}
		});
		if($scrollTop < $contTop || $scrollTop > $endTop - 110){
			$tabArea.removeClass('on');
		}else{
			$tabArea.addClass('on');
		}
	});

	$tab.on("click", "a", function(e) {
		var $thisNum = $(this).closest("li").index();
		$menu.eq($thisNum).addClass("on").siblings("li").removeClass("on");
	});
}
// 모바일 실행 js
function Skrollr(){
	var s = skrollr.init({
		forceHeight: false,
		mobileCheck: function(){
			if((/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
				// mobile device
			}
		},
	});
}
