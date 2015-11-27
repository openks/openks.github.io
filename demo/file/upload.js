$(function() {
	$(".js_upload").on("change", function() {
		console.log("clicked!!" + this.value)
	})

	var area = document.getElementById("J_UploadArea"),
		file = document.getElementById("J_UploadFile");

	function uploadFile(fs) {
		console.log(fs);
		var div_new = document.createElement("div");
		var str = "选择文件各属性如下：<br/>",
			selectFile = fs[0];
		for (var i in selectFile) {
			str += i + ":" + selectFile[i] + "<br/>";
		}
		div_new.innerHTML = str;
		jsinfo = document.getElementById("js-info");
		jsinfo.innerHTML = "";
		jsinfo.insertBefore(div_new, null);
	}
	area.onclick = function() {
		file.click();
	};
	file.onchange = function(e) {
		uploadFile(this.files);
		var file = e.target.files[0];
		var reader = new FileReader()
		reader.onload = function(e) {
			var $img = $('.showPic img').attr("src", e.target.result);
			$('.showPic').empty().append($img);
		}
		reader.readAsDataURL(file)
	};
	area.ondragenter = function(ev) {
		this.className = 'up-area hover';
		ev.preventDefault();
	};
	area.ondragover = function(ev) {
		ev.preventDefault();
	};
	area.ondrop = function(ev) {
		ev.preventDefault();
		console.log('drop');
		var dt = ev.dataTransfer;
		this.className = 'up-area';
		uploadFile(dt.files);
	};
})