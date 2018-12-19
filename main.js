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
      menuBtn.style.width = '240px';
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

/////////////////////////////////////////////////////////
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

//////////////////////////////////////////////////////////
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

///////////////////////////////////////////////////////////
//Form Validation
//Select form to be validated
let myForm = document.querySelector('#myForm');
//Stop Native Broswer validation behavoir
myForm.setAttribute('novalidate', true);

//Add event listener to the form
myForm.addEventListener('blur', inputFieldValidaty, true);
//Function to capture input field value when blur
function inputFieldValidaty(e){
  //Get the input field pass on to error handling function
  let errorInput = hasError(e.target);

  //If there is an error
  if(errorInput){
    showError(e.target, errorInput);
    return;
  }

  //Remove error
  removeError(e.target);
}

//Add event listener to the form
myForm.addEventListener('submit', formSubmit);
function formSubmit(e){
  e.preventDefault();
  // Get all of the form elements
  let fields = event.target.elements;
    // Validate each field
    // Store the first field with an error to a variable so we can bring it into focus later
    let error, hasErrors;
    for (var i = 0; i < fields.length; i++) {
        error = hasError(fields[i]);
        if (error) {
            showError(fields[i], error);
            if (!hasErrors) {
                hasErrors = fields[i];
            }
        }
    }

    // If there are errrors, don't submit form and focus on first element with error
    if (hasErrors) {
        hasErrors.focus();
    }

    // Otherwise, let the form submit normally
    // You could also bolt in an Ajax form submit process here
}

//Error handling function for myForm input field
let hasError = function (field){
  //Ignore input field with disabled attribute, submit type,//file type, button //type, reset type
  if(field.disabled || field.type === 'submit' || field.type === 'reset' || field.type === 'button' || field.type === 'file'){
    return;
  }

  //Else if feild is none of the above go on to validate the input field
  let inputValidate = field.validity;

  //// If valid, return null
  if (inputValidate.valid) return;

  // If field is required and empty
  if (inputValidate.valueMissing) return 'Please fill out this field.';

  // If not the right type
  if (inputValidate.typeMismatch) {
    //Check the field type and respond accordingly
    if(field.type === 'email'){
      //Email
      return 'Please enter an email address.';
    }
    if(field.type === 'url'){
      // URL
      if (field.type === 'url') return 'Please enter a URL.';
    }
    //else gotcha all
    return 'Please use the correct input type.';
  } 

  // If too short
  if (inputValidate.tooShort) {
    return 'Please lengthen this text to ' + field.getAttribute('minLength') + ' characters or more. You are currently using ' + field.value.length + ' characters.';
  };

  // If too long
  if (inputValidate.tooLong) {
    return 'Please shorten this text to ' + field.getAttribute('maxLength') + ' characters or more. You are currently using ' + field.value.length + ' characters.';
  };

  // If number input isn't a number
  if (inputValidate.badInput) return 'Please enter a number.';

  // If a number value doesn't match the step interval
  if (inputValidate.stepMismatch) return 'Please select a valid value.';

  // If a number field is over the max
  if (inputValidate.rangeOverflow) {
    return 'Please select a value that is no more than ' + field.getAttribute('max') + '.';
  };

  // If a number field is below the min
  if (inputValidate.rangeUnderflow) {
    return 'Please select a value that is more than ' + field.getAttribute('min') + '.';
  };

  // If pattern doesn't match
  if (inputValidate.patternMismatch) {
    // If pattern info is included, return custom error
    if (inputValidate.hasAttribute('title')) {
      return field.getAttribute('title');
    }

    // Otherwise, generic error
    return 'Please match the requested format.';
  };

  // If all else fails, return a generic catchall error
  return 'The value you entered for this field is invalid.';
}

//Show Error function
let showError = function(fieldInput, error){
  //add class to style input field when there is an error
  fieldInput.classList.add('error');
  
   // Get field id or name
   var id = fieldInput.id || fieldInput.name;
   if (!id) return;

  //Check if there is an error that exist if not create one 
  let message = fieldInput.form.querySelector('.error-message#error-for-' + id);
  if(!message){
    //Create a div tag to contain the error and class of error to style it up
    message = document.createElement('div');
    message.className = 'error-message';
    message.id = 'error-for-' + id;
    fieldInput.parentNode.insertBefore(message, fieldInput.nextElementSibling);
  }
  
  // Add ARIA role to the field
  fieldInput.setAttribute('aria-describedby', 'error-for-' + id);

  //Showing the error messsge
  // Update error message
  message.innerHTML = error;

  // Show error message
  message.style.display = 'block';
  message.style.visibility = 'visible';
}

// Remove the error message
let removeError = function (fieldInput) {

  // Remove error class to field
  fieldInput.classList.remove('error');

  // Remove ARIA role from the field
  fieldInput.removeAttribute('aria-describedby');

  // Get field id or name
  let id = fieldInput.id || fieldInput.name;
  if (!id) return;

  // Check if an error message is in the DOM
  let message = fieldInput.form.querySelector('.error-message#error-for-' + id);
  if (!message) return;

  // If so, hide it
  message.innerHTML = '';
  message.style.display = 'none';
  message.style.visibility = 'hidden';

};