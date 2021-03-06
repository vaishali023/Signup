const form = document.getElementById('form');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('re-pass');
const requiredErrors = {
  'firstname' : 'First Name',
  'lastname' : 'Last Name',
  'email' : 'Email',
  'password' : 'Password',
  're-pass' : 'Re-enter Password'
}

//show input error message
function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = 'formControl error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//show success outline
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'formControl success'
}

// Check email is valid
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
      showSuccess(input);
    } else {
      showError(input, 'Email is not valid');
    }
  }
  
  // Check required fields
  function checkRequired(inputArr) {
    inputArr.forEach(function(input) {
      if (input.value.trim() === '') {
        showError(input, `${getFieldName(input)} is required`);
      } else {
        showSuccess(input);
      }
    });
  }

// Check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
      showError(
        input,
        `${getFieldName(input)} must be at least ${min} characters`
      );
    } else if (input.value.length > max) {
      showError(
        input,
        `${getFieldName(input)} must be less than ${max} characters`
      );
    } else {
      showSuccess(input);
    }
  }
  
  // Check passwords match
  function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
      showError(input2, 'Passwords do not match');
    }
  }
  
  // Get fieldname
  function getFieldName(input) {
    return requiredErrors[input.id]
  }
  
  // Event listeners
  form.addEventListener('submit', function(e) {
    e.preventDefault();
  
    checkRequired([firstname,lastname, email, password, password2]);
    checkLength(firstname, 3, 15);
    checkLength(lastname, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
  });
  