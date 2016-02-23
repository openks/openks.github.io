function app() {
	console.log('index');
}

app();

$(function() {
	$("#tt").on("click", function() {
		var img = '/h5/img/140-120_b4cf6fd.png',
		img2 = '/h5/img/140-1201_5e2132f.png',;
		
		if($(".img-logo").css("background-image").indexOf("1201")>-1){
			$(".img-logo").css('background-image',"url("+img+")");
		}else{
			$(".img-logo").css('background-image',"url("+img2+")");
		}
	});
});