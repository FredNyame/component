//Get nav
let nav = document.getElementById('header-nav');
//Top of the element
let eTop = document.getElementById('first').offsetTop;
//Get the top arrow
let topArrow = document.getElementById('top-arrow');

let userScroll = 0;
let ticking = false;

window.addEventListener('scroll', function(e){
  //Get how far user has srolled down
  userScroll = window.scrollY; //ScrollBar Position
  // let scrollWheight = document.body.scrollHeight; //Body Height of the document
  // let cHeight = document.body.clientHeight; //Body visible Height of the //document in the browser
  // //

  if (!ticking) {
    window.requestAnimationFrame(function() {
      scrollWindow(userScroll, eTop);
      ticking = false;
    });
  
    ticking = true;
  }
});
//

//what happens when user is scrolling
function scrollWindow(scrollPos, eTop){
  //When user is scolling check if scroll is pass the element top
  if(scrollPos >= eTop){
    //stop jerky motion add padding to the body
    //document.body.style.paddingTop = nav.offsetHeight + 'px';
    document.body.classList.add('fixed-top');
    topArrow.classList.add('overlay-show');
  } else{
    //document.body.style.paddingTop = 0;
    document.body.classList.remove('fixed-top');
    topArrow.classList.remove('overlay-show');
  }
}
