const Form = document.querySelector('form');
const Inputs = document.querySelectorAll('input');
const cardInfos = document.querySelectorAll('.card-information');
const inputNumbers = document.querySelectorAll('.input-number');
const inputName = document.querySelector('#name');

const formPage = document.querySelector('.form-page');
const thankYouPage = document.querySelector('.thank-you-page');
const startAgain = document.querySelector('#continue');

// card details update in real-time
Inputs.forEach( input =>{
    input.addEventListener('input', () =>{
            let data = input.getAttribute('data-id');
            cardInfos.forEach( info =>{
                if( info.getAttribute('data-id') === data ){
                    info.textContent = input.value;
                }
            });
        }
    )
});

// helper functions
function addInvalid( el, msg ){
    el.classList.add('invalid');
    if(el.getAttribute('data-id') === 'month' || el.getAttribute('data-id') === 'year'){
        el.parentNode.nextElementSibling.textContent = msg;
    } else {
        el.nextElementSibling.textContent = msg;
    }
}

function removeInvalid( el ){
    el.classList.remove('invalid');
    if(el.getAttribute('data-id') === 'month' || el.getAttribute('data-id') === 'year'){
        el.parentNode.nextElementSibling.innerHTML = "&nbsp";
    } else {
        el.nextElementSibling.innerHTML = "&nbsp";
    }
}

// name field validation
function checkNameValidity(){
    if( inputName.value === '' ){
        addInvalid(inputName, "Can't be blank");
    } else {
        removeInvalid(inputName);
    }    
}

// other fields validation
function checkOtherFieldsValidity(){
    let currentYear = new Date().getFullYear().toString();
    inputNumbers.forEach( input => {
        if( input.value === '' ){
            addInvalid(input, "Can't be blank");
        } else if ( isNaN(Number(input.value.replace(/\s/g, ''))) ){
            addInvalid(input, "Wrong format, numbers only");
        }   else  if (input.getAttribute('data-id') === 'month' && ( input.value < 1 || input.value > 12 )){
            addInvalid(input, "Invalid month");
        } else if( input.getAttribute('data-id') === 'year' && (input.value < +currentYear.slice(2, 4) )){
            addInvalid(input, "Your card has expired");
        } else{
            removeInvalid(input);
        } 
    })
}

// form submission
Form.addEventListener('submit', (e) =>{
    e.preventDefault();
    checkNameValidity();
    checkOtherFieldsValidity();

    let hasInvalidClass = false;
    Inputs.forEach(input =>{
        if( input.classList.contains('invalid') ){
            hasInvalidClass = true;
        }
    })

    if(!hasInvalidClass){
        formPage.hidden = true;
        thankYouPage.hidden = false;
        Inputs.forEach(input => input.value = '');
    }
});

// start entering data again 
startAgain.addEventListener('click', () =>{
    formPage.hidden = false;
    thankYouPage.hidden = true;
});
