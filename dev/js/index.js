function app() {
	console.log('index');
}

app();

$(function() {
	$("#tt").on("click", function() {
		var img = __uri('../img/140-1201.png');
		console.log(img);
		$(".img-logo").css('background-image',"url("+img+")");
	});
});