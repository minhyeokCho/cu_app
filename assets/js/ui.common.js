/* CU멤버십 2021 */

var $window = $(window),
	$body = $("body");

$(document).ready(function() {
	$(".btn_alert").length && popAlert(); //알럿팝업
	$(".btm_open").length && btmPopup(); //바닥팝업
	$(".bt_full").length && fullPopup(); //전체팝업
	$("div[ui-type=tab_menu], div[class*='tab_']").length && tabMenuUi(); //탭메뉴 layout
	$(".accordion").length && accBoard(); //아코디언 게시판
	$(".photo_view").length && photoSwiper(); //사진 크게보기 슬라이드
	$(".main_guide").length && mainGuide(); //이용안내
	$(".rv_photo").length && rvImgStyle(); //리뷰 이미지 스타일
	$(".bnr_slide_wrap").length && bnrSwiper(); //배너 슬라이드
	$(".issue_slide_wrap").length && issueBnrSwiper() //핫이슈 배너 슬라이드
	$(".sale_slide_wrap").length && saleBnrSwiper() //마감할인 팝업 배너 슬라이드
	$(".close_slide_wrap").length && closeBnrSwiper() //마감할인 배너 슬라이드
	$(".opt_sel").length && prdSelect(); //상품/옵션 select박스
	$(".sch_calender").length && dateCalender(); //달력
	$(".tooltip").length && toolTip(); //툴팁
	$(".msg_slide_wrap").length && msgSwiper() // 선물하기:메세지입력 슬라이드
	$(".tab_msg").length && tabMsgSlide(); // 선물하기 탭메뉴
	$(".footer_wrap").length && footerfold(); // 푸터 아코디언
	$(".ui_qr_code").length && qrCodeUI(); //QR코드 UI
	$(".full_popup").length && fullPopHeight(); //전체팝업 컨텐츠 영역 잡기
	$(".mem_card_list").length && memCardSwiper(); //멤버십카드슬라이드
	$(".pop_slider").length && pop_slider();   // 오늘하루 열지않기 슬라이드 팝업
	toastPop(); //토스트팝업
	rollingNoti(); //공지롤링
	rdoValue(); //검색조건 라디오버튼 선택
	layoutCheck(); //footer, fixed 버튼, 탭바 유무 체크
});

function layoutCheck(){ //footer, fixed 버튼, 탭바 유무 체크
	var $footer = $("#footer").length,
		$tabBar = $(".tap_bar").length,
		$fixBtn = $(".btn_fixed").length;
	// 탭바가 있을 시
	if($tabBar > 0 && $footer == 0){
		 $("#container").addClass("sub_btm_pad");
	}
	// 바닥고정버튼 있을 시
	if($fixBtn > 0 && $footer == 0){
		$("#container").addClass("sub_btm_pad");
	}
	// footer+바닥고정버튼
	if($fixBtn > 0 && $footer == 1){
		$("#wrap").addClass("foot_pad");
		if($(".btm_popup .btn_fixed").length){
			$("#wrap").removeClass("foot_pad");
		}
	}
	// footer+탭바
	if($tabBar > 0 && $footer == 1){
		$("#wrap").addClass("foot_pad");
	}
}

// 스크롤 슬라이드 탭
function tabMenuUi(){ //탭메뉴 layout
	var scrIWidth = 0;
	$('.tab_menu_bg > ul, .tab_menu > ul').each(function(){
		var $scrItem = $(this).children("li");
		 scrIWidth = 0;
		for (var i=0; i<$scrItem.length; i++) {
			scrIWidth += $scrItem.eq(i).outerWidth()+8;
		}
		$(this).css('width',scrIWidth+16);
		$scrItem.click(function(){
			var target = $(this);
			target.siblings("li").removeClass('on');
			target.addClass('on');
			muCenter(target);
		});
	});

	// class "on" 체크 하여 스크롤 위치이동
	$(".tab_menu_bg > ul > li").each(function(){
		if($(this).hasClass("on")===true){
			var target = $(this);
			muCenter(target);
		}
	});

	$("div[class*='tab_']").on("click", "a", function(e) {
		e.preventDefault();
		var $this = $(this);
		$this.closest("li").addClass("on").siblings("li").removeClass("on");
	});
	function muCenter(target){
		var box = target.closest('.tab_menu_bg, .tab_menu');
		var boxItem = box.find('li');
		var boxHarf = box.width()/2;
		var pos;
		var listWidth=0;
		var targetLeft = 0;
		boxItem.each(function(){
			listWidth += $(this).outerWidth();
		});
		for (var i=0; i<target.index(); i++) targetLeft += boxItem.eq(i).outerWidth()+8; // 선택요소 까지 길이
		var selectTargetPos = (targetLeft + target.outerWidth()/2);
		if (selectTargetPos <= boxHarf) { // left
			pos = 0;
		//}else if(listWidth - selectTargetPos <= boxHarf) { //right : target 절반 이후 영역이 boxHarf 보다 작을경우 right 정렬   // 2022-03-14 센터정렬 오류로 주석
			//pos = listWidth-box.width()/2;}
		}else {
			pos = selectTargetPos + 16 - boxHarf; // 중앙정렬
		}
		setTimeout(function(){
			box.animate({scrollLeft:pos},300);
		}, 200);
	}
}

function foldContent(){ //아코디언 컨텐츠
	var accWrap = $(".cotn_acc");
	$(".cotn_acc").each(function() {
		var $this = $(this),
			content = $(this).children(".cotn"),
			height = content.outerHeight();
			content.css("height", height);

		$this.on("click", ".ctrl_trg", function() {
			var btn = $(this),
				wrap = btn.closest(accWrap),
				content = wrap.children(".cotn");

			if(!wrap.hasClass("closed")){
				wrap.addClass("closed");
				content.css({
					"height": 0,
					"overflow": 'hidden'
				});
			} else {
				wrap.removeClass("closed");

				let re_height = 40;
				$(this).closest('.cotn_acc').find('>.cotn >div, >.cotn > section').each(function() {
					if($(this).css('display') == 'block') re_height += $(this).outerHeight();
				});

				content.css({
					"height": re_height,
					"overflow": "inherit"
				});
			}
		});

		if($this.hasClass("closed")){
			content.css("height", 0);
		}
	});
}

function accBoard(){ //아코디언 게시판
	var cotnHeight = 0;
	$(".accordion .go_view").on("click", function(e) {
		e.preventDefault();
		var $this = $(this),
			listDiv = $this.closest("li"),
			cotnHeight = listDiv.find(".acc_cotn_wrap").outerHeight();

		if(!listDiv.hasClass("active")){
			$(".accordion li").removeClass("active");
			$(".accordion .acc_open_wrap").css({height: 0});
			listDiv.addClass("active");
			listDiv.find(".acc_open_wrap").css({height: cotnHeight});
		}else{
			listDiv.removeClass("active");
			listDiv.find(".acc_open_wrap").css({height: 0});
		}
	});
}

function listStop(){ //리스트 영역 scroll stop
	var $window = $(window),
		$body = $("body");
	var didScroll;

	$window.scroll(function(event) { // 스크롤
		didScroll = true;
		// console.log(didScroll);
	});

	setInterval(function() { // hasScroll() 실행하고 didScroll 상태 재설정
		if(didScroll){
			hasScroll();
			didScroll = false;
		}
	});

	hasScroll();

	function hasScroll() { // 헤더 영역 fixed 클래스 추가/삭제
		var sT = $(document).scrollTop();
		// console.log(sT);

		if(sT > 380){
			$body.addClass('up_stop');
		}else{
			$body.removeClass('up_stop');
		}
	}
}

function bnrSwiper(){ //배너 슬라이드
	var bnrSlider = new Swiper(".bnr_slide_wrap .swiper", {
		loop: true,
		spaceBetween:11,
		pagination: {
			el: ".bnr_slide_wrap .swiper-pagination",
			type: "fraction",
		},
	});
}

function rvImgStyle(){ //리뷰 이미지 스타일
	$(".rv_photo").each(function(){
		var img = $(this).find(".img").length;
		$(this).find("div").addClass("amt_" + img);
	});
}

function hdrScroll(){ //헤더 스크롤 이벤트
	var cnt = $(window),
		$body = $("body");

	$(window).scroll(function(){
		if($(cnt).scrollTop() > 0){
			$body.addClass('bg');
		}else{
			$body.removeClass('bg');
		}
	});
}

function productDetail(){ //상품상세 UI
	var detailImgSlider = new Swiper(".img_wrap .swiper", { //이미지슬라이드
		loop: true,
		pagination: {
			el: ".img_wrap .swiper-pagination",
		},
	});

	if($(".img_wrap .img").length <= 3){ //이미지 1개일 경우 (loop 상태여서 기본 갯수는 3개임)
		detailImgSlider.destroy();
	}

	$(".detail_prd .tab_depth1").on("click", "a", function() { //탭메뉴 앵커 이동
		$("html, body").animate({
			scrollTop: $(this.hash).offset().top - 150
		}, 550);
		$(this.hash).closest("li").addClass("on");
	});
	foldContent(); //아코디언 컨텐츠
}

//상품상세정보 더보기/접기
function infoFold(){
	var dtlWrap = $(".detail_prd .admin_write .detail"),
		dtlCotn = dtlWrap.find(".cotn"),
		cotnImg = dtlCotn.find("img").height(),
		cotnH = dtlCotn.outerHeight(),
		moreBtn = dtlWrap.find(".btn_wrap");

	if(cotnImg > 800){ //상품정보 더보기 버튼 show/hide
		dtlCotn.css('height', '800px');
		moreBtn.css('display', 'flex');
	}else{
		moreBtn.hide();
	}

	$(moreBtn).on("click", ".btn", function(e) { //상품상세영역 더보기/접기
		e.preventDefault();
		var $this = $(this),
			textArea = $this.find("span");

		if(!dtlCotn.hasClass("active")){
			textArea.text("상품정보 접기");
			dtlCotn.addClass("active");
			dtlCotn.css('height', cotnH);
		}else{
			textArea.text("상품정보 더보기");
			dtlCotn.removeClass("active");
			dtlCotn.css('height', '800px');
		}
	});
}

function prdSelect(){ //상품/옵션 select박스
	$(".opt_choice").on("click", function(e){
		e.preventDefault();
		var $this = $(this),
		listDiv = $this.siblings(".opt_list");

		if(listDiv.hasClass("active")){
			$(this).removeClass("active");
			$(listDiv).removeClass("active");
		}else{
			$(this).addClass("active");
			$(listDiv).addClass("active");
		}
	});
}

function paymentUI(){ //주문/결제 UI
	foldContent(); //아코디언 컨텐츠
	cuEasyPay(); //CU 간편결제 slide

	var pickupTime = new Swiper(".time_table .swiper", { /* 편픽주문결제:시간선택 */
		slidesPerView: "auto",
		spaceBetween: 8,
		freeMode: true,
	});

	// 결제수단:간편결제, 일반결제 열기/닫기
	var methodWrap = $(".pymnt_method .main_way").closest(".cotn");
	$(".pymnt_method .main_way").on("click", ".form_rdo input", function() {
		var $this = $(this),
			pymntWrap = $this.closest(".cotn");

		if(pymntWrap.hasClass("close")){
			methodWrap.addClass("close");
			methodWrap.removeClass("open");
			pymntWrap.removeClass("close");
			pymntWrap.addClass("open");
		}
	});
}

function cuEasyPay(){ //CU 간편결제 slide
	var easyPaySlider = new Swiper(".select_card .swiper", {
		slidesPerView: 1,
		spaceBetween: 16,
		speed: 800,
		pagination: {
			el: ".select_card .swiper-pagination",
		},
	});
}
function spExhibSwiper() { //기획전배너슬라이드
	$(".sp_exhib_list").each(function(){
		var $this = $(this);
		var spExhibSwiper = new Swiper(this,{
			slidesPerView : 'auto',
			spaceBetween: 16,
			loop: true,
			freeMode: true
		});

		// 슬라이드 2개 이하 일때 loop 멈춤
		var $slideItem = $(this).children().children(".swiper-slide");
		slideLen = 0;
		for (var i=0; i < $slideItem.length; i++) {
			slideLen = $slideItem.eq(i).attr("data-swiper-slide-index");
		}
		if(slideLen <= 1){
			spExhibSwiper.loopDestroy();
			spExhibSwiper.slideTo(0);
		}
	});
}
function listView(){ //목록/지도보기
	$(".btn_sort a").on("click", function(e){
		e.preventDefault();

		var $this = $(".pick_list_wrap"),
			mapDiv = $this.siblings(".pick_map_wrap");

		if(!mapDiv.hasClass("active")){
			$(".pick_map_wrap").addClass("active");
			$($this).addClass("active");
		}else{
			$(".pick_map_wrap").removeClass("active");
			$($this).removeClass("active");
		}
	});
}

function pickupStore(){ //점포픽업:상품재고
	listView(); //목록/지도보기

	var storeSet = $(".pick_store_wrap .store_info");

	$(".pick_store_wrap .txt_link").on("click", function(e) {
		e.preventDefault();
		var $this = $(this),
			storeWrap = $this.closest(".store_info"),
			prdCotn = storeWrap.find(".store_chose");

		//console.log(prdCotn);
		if(!$(storeWrap).hasClass("on")){
			storeSet.removeClass("on");
			storeWrap.addClass("on");
		}
	});

	$(".store_chose").on("click", ".closed", function(e) {
		e.preventDefault();
		$(this).closest(".store_info").removeClass("on");
	});
}

function dateCalender(){ //달력
	$.datepicker.setDefaults({
		showOn: 'both',
		dateFormat: 'yy-mm-dd',
		prevText: '이전달',
		nextText: '다음달',
		monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		dayNames: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
		dayNamesShort: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
		dayNamesMin:  ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
		minDate: 0,
	});

	$('.sch_calender').datepicker();
}

function rollingNoti() {  //공지롤링
	var count = $(".rolling li").length,
	 	height = $(".rolling li").height();

	step(1);

	function step(index) {
		$(".rolling").delay(3000).animate({
			top: -height * index,
		}, 500, function() {
			step((index + 1) % count);
		});
	}
}

function qrCodeUI(){ //탭바:QR코드 UI
	var qrPymnt = $(".qr_pymnt"),
		pickProd = $(".pick_prd"),
		cuponWrap = $(".cp_wrap");

	var $checkBox = "input:checkbox";

	$(".tap_bar").on("click", ".qr_code", function(e) {
		e.preventDefault();
		$("body").addClass("on_qr");
	});

	setTimeout(function() { //픽업상품 툴팁 hide
		pickProd.find(".prd_set .tooltip").removeClass("active");
	}, 2200);

	/* 2022-02-08 개발처리로 주석처리 함

	qrPymnt.on("click", "input", function() { //포인트/결제선택
		var payBox = $(this).closest(".box_shape");

		if(!payBox.hasClass("on")){
			payBox.addClass("on");
		}else{
			payBox.removeClass("on");
		}

		if($('input[name=pymnt]:checked').length > 0) {
			// 주문상품 비활성
			pickProd.addClass("disable") //.find($checkBox).attr("disabled", true);
		} else {
			// 주문상품 활성
			if($('.qr_pymnt_wrap .coupon_list input:checked').length > 0){
				pickProd.addClass("disable") //.find($checkBox).attr("disabled", true);
			}else{
				pickProd.removeClass("disable") //.find($checkBox).attr("disabled", false);
			}
		}
	});

	$(".prd_set input").on("click", function() { //주문상품선택
		var $this = $(this),
			prdSet = $this.closest(".prd_set");

		if(!prdSet.hasClass("on")){
			prdSet.addClass("on"); // 주문상품:활성
			disableTrue(); // 결제/쿠폰 비활성
			cuponWrap.find($(".cp_set").removeClass("on")); //쿠폰선택:remove
		}else{
			prdSet.removeClass("on");
		}

		if(!$(".prd_set").hasClass("on")){
			disableFalse(); // 결제/쿠폰 활성
		}
	});

	cuponWrap.on("click", "input", function() {
		//$(this).closest(".cp_set").addClass("on");
		var thisWrap = $(this).closest(".cp_set");
		if(!$(thisWrap).hasClass("on")){
			thisWrap.addClass("on");
		}else{
			thisWrap.removeClass("on");
		}
		// 쿠폰 클릭시
		if($('.qr_pymnt_wrap .coupon_list input:checked').length > 0) {
			// 주문상품 비활성
			pickProd.addClass("disable") //.find($checkBox).attr("disabled", true);
		} else {
			// 주문상품 활성
			if($('input[name=pymnt]:checked').length > 0){
				pickProd.addClass("disable") //.find($checkBox).attr("disabled", true);
			}else{
				pickProd.removeClass("disable") //.find($checkBox).attr("disabled", false);
			}
		}
	});

	function disableTrue(){ //checkbox disabled:true
		qrPymnt.addClass("disable")//.prop("checked", false).find($checkBox).attr("disabled", true).prop("checked", false);
		cuponWrap.addClass("disable")//.prop("checked", false).find($checkBox).attr("disabled", true).prop("checked", false);
	}

	function disableFalse(){ //checkbox disabled:false
		qrPymnt.removeClass("disable") //.find($checkBox).attr("disabled", false);
		cuponWrap.removeClass("disable") //.find($checkBox).attr("disabled", false);
	}
	*/
	/* $(".refresh").on("click", function() { //QR코드 새로고침
		if(!$(this).hasClass("on")){
			$(this).addClass("on");
			setTimeout(function() {
				$(".refresh").removeClass("on");
			}, 1400);
		}
	}); */

	/* $(".close_qr").on("click", function(e) { //QR코드:닫기
		e.preventDefault();

		//$(".ui_qr_code .head, .ui_qr_code .contents").hide();

		var $qrClaose = $(this);
		$(this).addClass("hide");

		setTimeout(function() {
			$("body").removeClass("on_qr");
		}, 500);

		setTimeout(function() {
			$qrClaose.removeClass('hide');
		}, 1000);
	}); 2022-02-08 개발처리로 주석처리 함 */
}

function toolTip(){ //툴팁
	var $closeBtn = $(".tooltip .btn_close");

	$(".btn_tip").on("click", function(e){
		e.preventDefault();

		var $this = $(this),
			tip = $this.closest("div").find(".tooltip");
		if(tip.hasClass("active")){
			tip.removeClass("active");
		}else{
			$(".tooltip").removeClass("active");
			tip.addClass("active");
		}
	});

	$closeBtn.on("click", function(e){
		e.preventDefault();
		var target = $(this).closest(".tooltip");

		if(target.hasClass("active")){
			target.removeClass("active");
		}
	});
}

function toastPop(){ //토스트팝업
	var $toastBtn = $(".btn_toast"),
		$toast = $(".toast_pop");

	$toastBtn.on("click", function(e){
		e.preventDefault();

		var target = $(e.target).attr("open-toast") || e;
		$(".toast_pop" + "." + target + "").addClass("active");

		setTimeout(function(){
			$toast.removeClass("active")
		}, 3000);
	});
}

function popAlert(){ //알럿팝업
	var $openBtn = $(".btn_alert"),
		$closeBtn = $(".alert_pop .btn_wrap_flx .btn");

	$openBtn.on("click", function(e) { /* 열기 */
		e.preventDefault();
		var target = $(this).attr("open-layer-class") || e;
		$(".alert_pop" + '.' + target + "").fadeIn(150).addClass("on");
		dimShow();
	});

	$closeBtn.on("click", function() { /* 닫기 */
		var target= $(this).closest(".alert_pop");
		target.fadeOut(150).removeClass("on");
		setTimeout(dimHide, 200);
	});
}

function btmPopup(){ //바닥팝업
	var $openBtn = $(".btm_open"),
		$closeBtn = $(".btm_popup .closed");

	$openBtn.on("click", function(e) { /* 열기 */
		e.preventDefault();
		var target = $(e.target).attr("open-layer-class") || e;
		$(".btm_popup" + '.' + target + "").fadeIn(100).addClass("on");
		dimShow();
	});

	$(document).mouseup(function (e){ /* 닫기 */
		var popArea = $(".btm_popup");
		if(popArea.has(e.target).length === 0 && popArea.hasClass("on")){
			popArea.fadeOut(150).removeClass("on");
			dimHide();
		}
	});

	$closeBtn.on("click", function() { /* 닫기 */
		var target= $(this).closest(".btm_popup");
		target.fadeOut(150).removeClass("on");
		dimHide();
	});
}

function fullPopup(){ //전체팝업
	var $openBtn = $(".bt_full"),
		$closeBtn = $(".full_popup .closed");

	$openBtn.on("click", function(e) { /* 열기 */
		e.preventDefault();
		var target = $(e.target).attr("open-full-pop") || e;
		$(".full_popup" + '.' + target + "").addClass("on");
		$("body").addClass("up");
	});

	$closeBtn.on("click", function() { /* 닫기 */
		var target= $(this).closest(".full_popup");
		target.removeClass("on");
		$("body").removeClass("up");
	});
}

function dimShow(){ /* 딤드 show */
	$("body").addClass("dim");
}
function dimHide(){ /* 딤드 hide */
	$("body").removeClass("dim");
}

function photoSwiper(){ //사진 크게보기 슬라이드
	photoSwiper = new Swiper(".photo_swiper .swiper-container", {
		loop: true,
		slidesPerView:'1',
		spaceBetween:0,
		pagination:{
			el: '.photo_swiper .swiper-pagination',
			type: 'fraction',
			renderFraction: function (currentClass, totalClass) {
				return '<span class="' + currentClass + ' current' + '"></span>' + ' <span>/</span> ' + '<span class="' + totalClass + ' total' + '"></span>';
			}
		},
	});
}

function mainGuide(){ //이용안내
	mainGuide = new Swiper(".main_guide .swiper-container", {
		slidesPerView:'1',
		spaceBetween:0,
		pagination:{
			el: '.swiper-pagination',
			type: 'fraction',
			renderFraction: function (currentClass, totalClass) {
				return '<span class="' + currentClass + ' current' + '"></span>' + ' <span>/</span> ' + '<span class="' + totalClass + ' total' + '"></span>';
			}
		},
	});
}

function issueBnrSwiper(){ //핫이슈 상품 슬라이드
	var bnrSlider = new Swiper(".issue_slide_wrap .swiper", {
		slidesPerView : 'auto',
		spaceBetween: 16,
		loop: true,
		pagination: {
			el: ".issue_slide_wrap .swiper-pagination",
			type: "fraction",
			renderFraction: function (currentClass) {
				return '<span class="' + currentClass + ' current' + '">';
			}
		},
	});
}

function rdoValue(){ //검색조건 라디오버튼 선택
	var rdoValue = $('.rdo_value');
	var rdoButton = rdoValue.find('label');

	rdoButton.click(function(e) {
		var $this = $(this);
		var index = $this.index();
		var current = $this.closest("div").siblings("span").find("i");
		current.css({width: 25 * index + '%'});

		for (var i = 0; i<5; i++){
			if(i > index){
				$this.closest("div").find('label').eq(i).find("input").prop("checked", false);
			}else{
				$this.closest("div").find('label').eq(i).find("input").prop("checked", true);
			}
		}
	});
}

// 할인배너 팝업 슬라이드
function saleBnrSwiper(){
	var saleSlider = new Swiper(".sale_slide_wrap .swiper", {
		loop: true,
		pagination: {
			el: ".sale_slide_wrap .swiper-pagination",
			// type: "fraction",
		},
	});
	if($(".sale_slide_wrap .swiper-slide").length <= 3){ //이미지 1개일 경우 (loop 상태여서 기본 갯수는 3개임)
		saleSlider.destroy();
	}
}

// 마감할인 슬라이드
function closeBnrSwiper(){
	var closeSlider = new Swiper(".close_slide_wrap .swiper", {
		loop: true,
		spaceBetween: 11,
		pagination: {
			el: ".close_slide_wrap .swiper-pagination",
			// type: "fraction",
		},
		autoHeight: true,
	});

	if($(".close_slide_wrap .swiper-slide").length <= 3){ //이미지 1개일 경우 (loop 상태여서 기본 갯수는 3개임)
		closeSlider.destroy();
	}
}

function msgSwiper(){ // 선물하기:메세지입력 슬라이드
	var msgSlider = new Swiper(".msg_slide_wrap .swiper", {
		spaceBetween:11,
		pagination: {
			el: ".msg_slide_wrap .swiper-pagination",
		},
	});
}

function tabMsgSlide(){ // 선물하기 탭메뉴
	var msgTab = $('.tab_msg');
	var msgSlideList = $('.gift_slide .msg_slide_wrap');

	msgTab.on("click", "a", function(e) {
		e.preventDefault();
		var $thisNum = $(this).closest("li").index();
		msgSlideList.eq($thisNum).addClass("on").siblings("div").removeClass("on");
	});
}

function mainUI() { // 메인UI
	// 탭
	var $tabMenu = $("#nav_tab ul li"),
		$tabCotn = $(".main_area"),
		$tabFix = $(".tab_menu");

	$tabMenu.on("click", function(){
		var tabId = $(this).attr("data-tab");

		$tabMenu.removeClass("on");
		$tabCotn.removeClass("on");
		$(this).addClass("on");
		$("#" + tabId).addClass("on");
		// 메인 혜택 sticky 제거
		if($(".main .sub_top nav li").eq(1).hasClass("on")==true){  // 혜택 메뉴 active
			$(".sub_top").css("position","relative");
		}else{
			$(".sub_top").css("position","");
		}
		tabMenuUi(); // 탭메뉴 슬라이드 js 실행
	});

	//스크롤
	var $window = $(window),
	$body = $("body");

	$(window).scroll(function(){

		if($(window).scrollTop() > 100) {
			$body.addClass("upto");
			$(".sub_top").addClass("hide");
		}else {
			$(".sub_top").removeClass("hide");
			$body.removeClass("upto");
		}
	});
}

function pagingSwiper(){ //main paging슬라이드
	var pagingSlider = new Swiper(".tdy_slide_wrap .swiper", {
		spaceBetween:16,
		pagination: {
			el: ".tdy_slide_wrap .swiper-pagination",
		},
	});
}

function secSwiper(){ //main 시즌상품 paging슬라이드
	var secSlider = new Swiper(".pdsec_slide .swiper", {
		spaceBetween:16,
		pagination: {
			el: ".pdsec_slide .swiper-pagination",
		},
	});
}

function memCardSwiper() { //멤버십카드슬라이드
	$(".mem_card_list").each(function(){
		var $this = $(this);
		var spExhibSwiper = new Swiper(this,{
			slidesPerView : 'auto',
			spaceBetween: 20,
			loop: true,
			centeredSlides: true
		});
	});
}

// 푸터 아코디언
function footerfold(){ //아코디언 컨텐츠
	var accWrap = $("#footer");

	$(".cotn_acc_foo").each(function() {
		var $this = $(this),
			content = $(this).closest("#footer"),
			height = content.outerHeight();

		$this.on("click", ".ctrl_trg", function() {
			var btn = $(this),
				wrap = btn.closest(accWrap),
				content = wrap.find(".cotn_acc_foo");
				height = content.outerHeight();
			if(!content.hasClass("closed")){ // 아코디언열려있음
				content.addClass("closed");
				wrap.css({
					"height": 95,
				});
				wrap.removeClass("open");
			}else{ // 아코디언닫혀있음
				content.removeClass("closed");
				wrap.css({
					"height":height,
				});
				setTimeout(function() {
					wrap.addClass("open");
				}, 300);
				$("html, body").animate({
					scrollTop:$(content).offset().top
				}, 300);
			}
		});

		if($this.hasClass("closed")){
			content.css({
				"height": 95,
			});
		}
	});
}

function fullPopHeight(){ //전체팝업 컨텐츠 영역 잡기
	var $fullPopup = $(".full_popup");
	$fullPopup.each(function() {
		var $this = $(this);

		if($this.find(".foot").length == 0){
			$this.addClass("no_foot_full_pop");
		}
	});
}

function delShow(){ //input text 삭제버튼
	var input = $(".form_txt input");

	input.focus(function() { /* show */
		var $this = $(this),
			delButton = $this.closest("div").find(".del");
		delButton.length && delButton.show();
	});

	input.focusout(function() { /* hide */
		var $this = $(this),
			delButton = $this.closest("div").find(".del");
		delButton.length && delButton.hide();
	});

	/* 2021-11-30 show/hide 퍼블리싱에서 컨트롤 하지 않음 */
}

// 오늘 하루 열지 않기, 슬라이드 팝업
function pop_slider(){
	var secSlider = new Swiper(".pop_slider .swiper", {
		// spaceBetween:11,
		// autoHeight: true,
		loop:true,
		pagination: {
			el: ".pop_slider .swiper-pagination",
		},
	});
}
