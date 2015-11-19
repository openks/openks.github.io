$(function() {
	//导航标记
	nav_mark('competition');
	if ($(".introduce-wrapper.close").height() < 150) {
		$(".introduce-more").css({
			"display": "none"
		});
	}

	$(".introduce-more").on("click", function(e) {
		e.preventDefault();
		if ($(".introduce-wrapper").hasClass("close")) {
			$(this).html("收起 ∧");
		} else {
			$(this).html("展开 ∨");
		}
		$(".introduce-wrapper").toggleClass("close");
	});
	//图集
	$(".monents-pics").on("click", function() {
		if($(".team-pics").hasClass("hide")){
			$(".team-pics").toggleClass("hide");
			$(".team-video").toggleClass("hide");
		}
	});
	//视频
	$(".monents-videos").on("click", function() {
		if($(".team-video").hasClass("hide")){
			$(".team-pics").toggleClass("hide");
			$(".team-video").toggleClass("hide");
		}
	});
})