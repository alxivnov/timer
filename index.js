"use strict";

// https://regex101.com
// const regex = /((?<=# )\d+ ?(sec|min): (.|\n)*?(?=(\n\n|\Z)))|(\d+ ?(sec|min): .*?(?=(\n|\Z)))/gi;
const regex = /(# \d+ ?(sec|min): (.|\n)*?(?=(\n\n|$)))|(\d+ ?(sec|min): .*?(?=(\n|$)))/gi;

let timer = null;
let pos = null;
let neg = null;

$(document).ready(() => {
	$("#text").focus();
//	$("#text").attr("placeholder", "30 sec: Timer 1\t\t\t\t\t\t\t\t1 min: Timer 2\t\t\t\t\t\t\t\t1.5 min: Timer 3");

	pos = new Audio('http://media.steampowered.com/apps/portal2/soundtrack/02/ringtones/sfx/m4a/Portal2_sfx_button_positive.m4a');
	neg = new Audio('http://media.steampowered.com/apps/portal2/soundtrack/02/ringtones/sfx/m4a/Portal2_sfx_button_negative.m4a');

	$('#modal').on('hide.bs.modal', function (e) {
		stop();
	});
});

function stop() {
	$("#play").find("i").removeClass("fa-stop").addClass("fa-play");
	$("#play").find("span").text("Start");

	clearInterval(timer);
	timer = null;

	neg.play();

	$("#timer").text(null);
	$("#label").text(null);
}

function play() {
	if (timer) {
		$("#modal").modal("hide");
	} else {
		let text = $("#text").html()
			.trim()
			.replace(/<br\s*\/*>/ig, '\n') 
			.replace(/(<(p|div))/ig, '\n$1') 
			.replace(/(<([^>]+)>)/ig, "");
//			console.log(text);
		
		let arr = text.match(regex);
		if (arr == null || arr.length == 0)
			return;

		$("#modal").modal("show");

		$("#play").find("i").removeClass("fa-play").addClass("fa-stop");
		$("#play").find("span").text("Stop");

		let idx = 0;
		let val = idx < arr.length ? arr[idx] : null;
		let sec = val ? parseFloat(val.replace("#", "")) : null;
		if (val && val.split(":")[0].endsWith("min"))
			sec *= 60;

		var title = val ? val.split(":")[1].trim() : null;
		(title && title == title.toUpperCase() ? neg : pos).play();

		$("#timer").text(sec > 0 ? sec + " sec" : null);
		$("#label").text(title);

		timer = setInterval(function() {
			sec--;

			if (sec == 0) {
				idx++;

				val = idx < arr.length ? arr[idx] : null;
				sec = val ? parseFloat(val.replace("#", "")) : null;
				if (val && val.split(":")[0].endsWith("min"))
					sec *= 60;

				if (idx >= arr.length) {
					$("#modal").modal("hide");
				} else {
					title = val ? val.split(":")[1].trim() : null;
					(title && title == title.toUpperCase() ? neg : pos).play();
				}
			}
			
			$("#timer").text(sec > 0 ? sec + " sec" : null);
			$("#label").text(title);
		}, 1000);
	}
}

vue_import_components([
	'https://alxivnov.github.io/client-side-vue/btn.vue',
	'https://alxivnov.github.io/client-side-vue/dropdown-divider.vue',
	'https://alxivnov.github.io/client-side-vue/dropdown-item.vue',
	'https://alxivnov.github.io/client-side-vue/nav-dropdown.vue',
	'https://alxivnov.github.io/client-side-vue/nav-link.vue',
	'https://alxivnov.github.io/client-side-vue/navbar.vue',
	'./editable.vue',
	'./modal.vue',
]);

var app = new Vue({
	el: '#app',
	data: {
		text: null,
		shoulders1: null,
		shoulders2: null,
		test: null,
	},
	mounted() {
		fetch('./Shoulders 1.md').then(res => res.text()).then(text => this.shoulders1 = text);
		fetch('./Shoulders 2.md').then(res => res.text()).then(text => this.shoulders2 = text);
		fetch('./Test.md').then(res => res.text()).then(text => this.test = text);

		setTimeout(() => {
//		this.$nextTick(() => {
			document.getElementById('text').focus();
		}, 1000);
	}
});
