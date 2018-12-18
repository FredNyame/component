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