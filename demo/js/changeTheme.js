$(function() {
	$("#red").on("click", function(e) {
		$("link.alt").attr("disabled", "disabled");
		$("link.red").removeAttr("disabled");

	});
	$("#green").on("click", function(e) {
		$("link.alt").attr("disabled", "disabled");
		$("link.green").removeAttr("disabled");
	});
})