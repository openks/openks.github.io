(function() {
	var jsUsers = {
		"u1": {
			"name": "张三",
			"age": 20,
			"email": "zs3@qq.com",
		},
		"u2": {
			"name": "张四",
			"age": 21,
			"email": "zs4@qq.com",
		},
		"u3": {
			"name": "张五",
			"age": 22,
			"email": "zs5@qq.com",
		},
		"u4": {
			"name": "张六",
			"age": 26,
			"email": "zs6@qq.com",
		}
	};
	var templateContent = document.querySelector('#appTmpl').content;
	var host = document.querySelector('.names');
	var root = host.createShadowRoot();
	root.appendChild(document.importNode(templateContent.querySelector("style"), true));
	for (key in jsUsers) {
		var name = jsUsers[key].name,
			age = jsUsers[key].age,
			email = jsUsers[key].email;
		templateContent.querySelector(".name").innerHTML = name;
		templateContent.querySelector(".age").innerHTML = age;
		templateContent.querySelector(".email").innerHTML = email;
		root.appendChild(document.importNode(templateContent.querySelector(".user"), true));
	};
})();
