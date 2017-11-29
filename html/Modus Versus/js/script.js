	function showMenu() {
    var x = document.getElementById("header-navbar-menu");
    if (x.style.display == "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

var slideIndex = 1;
showSlides(slideIndex);

var autoSlide = function(){
  this.loop = setInterval(showSlides, 5000);
}

document.getElementsByClassName('hide').style.visibility = 'block';

autoSlide();

function moveSlides(n) {
  clearInterval(this.loop);
  showSlides(slideIndex += n);
  setTimeout(autoSlide, 2000);

}

function currentSlide(n) {
  clearInterval(this.loop);
  showSlides(slideIndex = n);
  setTimeout(autoSlide, 2000);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("image-slider");

  var dots = document.getElementsByClassName("indicator-box");

  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}

  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }

  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active-ib", "");
  }

  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active-ib";

  if (slideIndex < slides.length){
    slideIndex++;
  }else{
    slideIndex = 1;
  }
 
}
