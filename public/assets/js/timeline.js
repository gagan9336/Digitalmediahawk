var items = document.querySelectorAll(".timeline li");

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function callbackFunc() {
  for (var i = 0; i < items.length; i++) {
    if (isElementInViewport(items[i])) {
      if (!items[i].classList.contains("in-view")) {
        items[i].classList.add("in-view");
      }
    } else if (items[i].classList.contains("in-view")) {
      items[i].classList.remove("in-view");
    }
  }
}

window.addEventListener("load", callbackFunc);
window.addEventListener("scroll", callbackFunc);

const notes = document.querySelector('#form-submit')
  notes.addEventListener('click',function(e) { 
      const ani = e.target.dataset.ani;
      e.target.classList.add('animated', 'infinite', ani);
    window.setTimeout(function(){
      e.target.classList.remove('animated', 'infinite', ani);
    }, 1000);
  });



// $(".link1").on("mouseover", ()=> {
//   $(".image1").addClass("service-image1");
//   $(".image1").removeClass("reverse-service-image1");

// }).on("mouseleave", function() {
//   $(".image1").removeClass("service-image1");
//   $(".image1").addClass("reverse-service-image1");
// });


// $(".link2").on("mouseover", ()=> {
//   $(".image1").addClass("service-image2");

//   $(".image1").removeClass("reverse-service-image2");

// }).on("mouseleave", function() {
//   $(".image1").removeClass("service-image2");

//   $(".image1").addClass("reverse-service-image2");
// });


// $(".link3").on("mouseover", ()=> {
//   $(".image1").addClass("service-image3");

//   $(".image1").removeClass("reverse-service-image3");

// }).on("mouseleave", function() {
//   $(".image1").removeClass("service-image3");

//   $(".image1").addClass("reverse-service-image3");
// });


// $(".link4").on("mouseover", ()=> {
//   $(".image1").addClass("service-image4");

//   $(".image1").removeClass("reverse-service-image4");

// }).on("mouseleave", function() {
//   $(".image1").removeClass("service-image4");

//   $(".image1").addClass("reverse-service-image4");
// });
