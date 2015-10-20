$(function(){
	$(".item-content").on("click",function(){
		$(".item-content").removeClass("cur");
		$(this).toggleClass("cur");
	})
})
