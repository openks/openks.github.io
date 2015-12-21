$(function() {

	$("#calc").on("click", function() {
		$(".error").removeClass("error");
		var totle = $("#totle").val(),
			inst_per_y = $("#inst-per-y").val(),
			inst_per_m = $("#inst-per-m").val(),
			inst_fen_y = $("#inst-fen-y").val(),
			inst_fen_m = $("#inst-fen-m").val();

		if (isNaN(parseFloat(totle))) {
			$("#totle").toggleClass("error");
			return;
		}
		if (!isNaN(parseFloat(inst_per_y))) {
			$("#instest").val(totle * inst_per_y / 100);
			$("#day-instest").val($("#instest").val() / 365);
			$("#inst-per-m").val(inst_per_y / 12);
			$("#inst-fen-y").val(inst_per_y / 10);
			$("#inst-fen-m").val(inst_per_y / 120);
			return;
		}
		if (!isNaN(parseFloat(inst_per_m))) {
			$("#instest").val(totle * inst_per_m / 1200);
			$("#day-instest").val($("#instest").val() / 365);
			$("#inst-per-y").val(inst_per_m * 12);
			$("#inst-fen-y").val(inst_per_m * 10);
			$("#inst-fen-m").val(inst_per_m * 10 / 12);
			return;
		}
		if (!isNaN(parseFloat($("#inst-fen-y").val()))) {
			$("#instest").val(totle * inst_fen_y * 1);
			$("#day-instest").val($("#instest").val() / 365);
			$("#inst-per-y").val(inst_fen_y * 10);
			$("#inst-per-m").val(inst_fen_y * 10 / 12);
			$("#inst-fen-m").val(inst_fen_y / 12);
			return;
		}
		if (!isNaN(parseFloat($("#inst-fen-m").val()))) {
			$("#instest").val(totle * inst_fen_m * 12);
			$("#day-instest").val($("#instest").val() / 365);
			$("#inst-per-y").val(inst_fen_m * 120);
			$("#inst-per-m").val(inst_fen_m * 10);
			$("#inst-fen-y").val(inst_fen_m * 12);
			return;
		}
		$("#inst-per-y").toggleClass("error");
	});
	$("#clean").on("click", function(e) {
		$("#inst-per-y,#inst-per-m,#inst-fen-y,#nst-fen-m").val();
	})
});