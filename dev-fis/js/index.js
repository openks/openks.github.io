function app() {
	console.log('index');
}

app();

$(function() {
	$("#tt").on("click", function() {
		var img = __uri('../img/140-120.png'),
		img2 = __uri('../img/140-1201.png');
		
		if($(".img-logo").css("background-image").indexOf("1201")>-1){
			$(".img-logo").css('background-image',"url("+img+")");
		}else{
			$(".img-logo").css('background-image',"url("+img2+")");
		}
	});
});