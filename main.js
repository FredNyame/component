//Get Mobile Menu
let mobileBtn = document.querySelector('.mobile_nav');
mobileBtn.addEventListener('click', animateBtn);
function animateBtn(){
  //Get the bar menu
  let menuBtn = document.querySelector('#nav');
  if(mobileBtn.className === 'mobile_nav'){
     mobileBtn.classList.add('change');
     //show menu
      menuBtn.style.visibility = 'visible';
      menuBtn.style.width = '300px';
      mobileBtn.style.position = 'fixed';
      //document.body.style.marginRight = '300px';

  } else{
    mobileBtn.classList.remove('change');
    //hide menu
    menuBtn.style.visibility = 'hidden';
    menuBtn.style.width = '0px';
    mobileBtn.style.position = 'absolute';
      //document.body.style.marginRight = '0px';
  }
}

//Accordion
let btnShow = document.getElementsByClassName('accordion');
let btnShowLen = btnShow.length;
//loop through and add event listener
for (let i = 0; i < btnShowLen; i++) {
  btnShow[i].addEventListener('click', showPanel);
}
//Show Panel Function
function showPanel(e){
  this.classList.toggle('active');
  let panel = e.target.nextElementSibling;
  //check if panel has height
  if(panel.style.maxHeight){
    panel.style.maxHeight = null;
  } else{
    panel.style.maxHeight = panel.scrollHeight+'px';
  }
  
}

//Testimonial Carousel
//Addevent to next
let next = document.querySelector('.next');
next.addEventListener('click', function(){
  controlSlides(1)
});
//Addevent to prev
let prev = document.querySelector('.prev');
prev.addEventListener('click', function(){
  controlSlides(-1);
});

//Keep track of the currentSlide
let countSlide = 1;
function controlSlides(n){
  toShowCard(countSlide += n);
}

//Main function
function toShowCard(n){
  //hide all the card and only show one
  let card = document.getElementsByClassName('testimonial');
  let cardLen = card.length;
  //Track slide
  if(n > cardLen){
    countSlide = 1;
  }
  if(n < 1){
    countSlide = cardLen;
  }
  //loop them
  for (let i = 0; i < cardLen; i++) {
    //Kepep everything display to none 
    card[i].style.display = 'none';
  }
  //At least one card showing
  card[countSlide - 1].style.display = 'block';
}
toShowCard();

