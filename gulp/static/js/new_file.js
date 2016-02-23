$(function() {
	//				$("#add").on("click", function() {
	//					var last = $(".pw").find(".on:last");
	//					var inputNum = $(".pw li.on").length;
	//					if (inputNum == 0) {
	//						$(".pw li:first").addClass("on").text("·");
	//					} else if (inputNum < 6) {
	//						last.next().addClass("on").text("·");
	//					}
	//				});
	//				$("#delete").on("click", function() {
	//					var inputNum = $(".pw li.on").length;
	//					if (inputNum > 0) {
	//						$(".pw .on:last").removeClass("on").text("");
	//						var str = $("#tex").val();
	//						$("#tex").val(str.substring(0, str.length - 1));
	//					}
	//				});
	$("#dpi").on("click", function() {
		alert(window.devicePixelRatio);
	});
	$(".keybord li").on("click", function(e) {
		e.preventDefault();
		//       console.log(e.target.textContent);
		var inputNum, tmp = $("#tex").val();
		if ($(this).hasClass("delete")) {
			inputNum = $(".pw li.on").length;
			if (inputNum > 0) {
				$(".pw .on:last").removeClass("on").text("");
				var str = $("#tex").val();
				$("#tex").val(str.substring(0, str.length - 1));
			}
		}
		if (tmp.length < 6 && !$(this).hasClass("delete")) {
			$("#tex").val($("#tex").val() + e.target.textContent);
			if (e.target.textContent.length !== 0) {
				var last = $(".pw").find(".on:last");
				inputNum = $(".pw li.on").length;
				if (inputNum === 0) {
					$(".pw li:first").addClass("on").text("·");
				} else if (inputNum < 6) {
					last.next().addClass("on").text("·");
				}
				if ($("#tex").val().length == 6) {
					alert("您已输入密码：" + $("#tex").val() + "::" + (new Date()).getTime());
				}
			}
		}
	});
});