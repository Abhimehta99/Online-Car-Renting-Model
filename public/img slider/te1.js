let s = document.querySelectorAll(".slide"),
	l = document.querySelector("#left"),
	r = document.querySelector("#right"),
	n = 0;
//n is the current image
//clear all images
function hide() {
	for (let i = 0; i < s.length; i++) {
		s[i].style.display = "none";
	}
}
//displaying first image
function ss() {
	hide();
	s[0].style.display = "block";
}
//previous image
function sl() {
	hide();
	s[n - 1].style.display = "block";
	n--;
}

function sr() {
	hide();
	s[n + 1].style.display = "block";
	n++;
}

l.addEventListener("click", function () {
	if (n === 0) {
		n = s.length;
	}
	sl();
});

r.addEventListener("click", function () {
	if (n == s.length - 1) {
		n = -1;
	}
	sr();
});
//callling ss function
ss();