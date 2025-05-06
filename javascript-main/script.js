
document.addEventListener('DOMContentLoaded', () => {

    // --- FORM VALIDATION ---
    const form = document.getElementById('registration-form');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const formFeedback = document.getElementById('form-feedback');

    // Get error message spans
    const usernameError = document.getElementById('username-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirm-password-error');

    // **Event Listener: Form Submission**
    form.addEventListener('submit', (event) => {
        // Prevent the default form submission behavior
        event.preventDefault();
        console.log('Form submission intercepted.');

        // Reset previous feedback
        clearErrors();
        formFeedback.textContent = '';
        formFeedback.className = 'feedback-message'; // Reset classes

        // Validate the form fields
        let isValid = validateForm();

        if (isValid) {
            console.log('Form is valid. Submitting (simulated)...');
          
            formFeedback.textContent = 'Registration Successful!';
            formFeedback.classList.add('success');

            console.log('Form Data:', {
                username: usernameInput.value,
                email: emailInput.value,
              
            });

            
        } else {
            console.log('Form has validation errors.');
             formFeedback.textContent = 'Please fix the errors above.';
             formFeedback.classList.add('error');
        }
    });

    // **Event Listener: Input Validation (Real-time feedback - optional but good UX)**
    usernameInput.addEventListener('input', () => validateField(usernameInput, usernameError, validateUsername));
    emailInput.addEventListener('input', () => validateField(emailInput, emailError, validateEmail));
    passwordInput.addEventListener('input', () => validateField(passwordInput, passwordError, validatePassword));
    confirmPasswordInput.addEventListener('input', () => validateField(confirmPasswordInput, confirmPasswordError, validateConfirmPassword));


    // --- Validation Helper Functions ---

    function validateForm() {
    
        const isUsernameValid = validateField(usernameInput, usernameError, validateUsername);
        const isEmailValid = validateField(emailInput, emailError, validateEmail);
        const isPasswordValid = validateField(passwordInput, passwordError, validatePassword);
        const isConfirmPasswordValid = validateField(confirmPasswordInput, confirmPasswordError, validateConfirmPassword);

     
        return isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;
    }

    function validateField(inputElement, errorElement, validationFunction) {
        const isValid = validationFunction(inputElement.value);
        if (!isValid) {
            inputElement.classList.add('invalid');
        } else {
            inputElement.classList.remove('invalid');
            errorElement.textContent = ''; 
        }
        return isValid; 
    }

    function showError(errorElement, message) {
        errorElement.textContent = message;
    }

    function clearErrors() {
        usernameError.textContent = '';
        emailError.textContent = '';
        passwordError.textContent = '';
        confirmPasswordError.textContent = '';

        usernameInput.classList.remove('invalid');
        emailInput.classList.remove('invalid');
        passwordInput.classList.remove('invalid');
        confirmPasswordInput.classList.remove('invalid');
    }

 
    function validateUsername(username) {
        username = username.trim();
        if (username === '') {
            showError(usernameError, 'Username is required.');
            return false;
        }
        if (username.length < 4) {
            showError(usernameError, 'Username must be at least 4 characters long.');
            return false;
        }

        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
             showError(usernameError, 'Username can only contain letters, numbers, and underscores.');
             return false;
        }
        return true;
    }

    function validateEmail(email) {
        email = email.trim();
         if (email === '') {
            showError(emailError, 'Email is required.');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError(emailError, 'Please enter a valid email address.');
            return false;
        }
        return true;
    }

     function validatePassword(password) {
        if (password === '') {
            showError(passwordError, 'Password is required.');
            return false;
        }
        if (password.length < 8) {
            showError(passwordError, 'Password must be at least 8 characters long.');
            return false;
        }
    
        return true;
    }

    function validateConfirmPassword(confirmPassword) {
        if (confirmPassword === '') {
            showError(confirmPasswordError, 'Please confirm your password.');
            return false;
        }
        if (confirmPassword !== passwordInput.value) {
            showError(confirmPasswordError, 'Passwords do not match.');
            return false;
        }
        return true;
    }


    // --- INTERACTIVE ELEMENTS ---

    const colorBox = document.getElementById('color-box');
    const incrementButton = document.getElementById('increment-button');
    const decrementButton = document.getElementById('decrement-button');
    const counterValueSpan = document.getElementById('counter-value');
    let counter = 0;

    // **Event Listener: Mouse Hover on Box** (CSS handles basic hover, JS for more complex)
    colorBox.addEventListener('mouseover', () => {
        console.log('Mouse entered the box!');
        colorBox.style.borderColor = 'black';
    });

    colorBox.addEventListener('mouseout', () => {
        console.log('Mouse left the box!');
        // Reset style change
        colorBox.style.borderColor = '#999';
    });

    // **Event Listener: Click on Box**
    colorBox.addEventListener('click', () => {
        console.log('Box clicked!');
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'); // Generate random hex color
        colorBox.style.backgroundColor = randomColor;
        colorBox.textContent = `Clicked! New color: ${randomColor}`;
    });

    // **Event Listener: Increment Button Click**
    incrementButton.addEventListener('click', () => {
        counter++;
        updateCounterDisplay();
        console.log('Counter incremented to:', counter);
    });

     // **Event Listener: Decrement Button Click**
    decrementButton.addEventListener('click', () => {
        counter--;
        updateCounterDisplay();
        console.log('Counter decremented to:', counter);
    });

    // Helper function to update the counter display
    function updateCounterDisplay() {
        counterValueSpan.textContent = counter;
    }

    // Initialize counter display
    updateCounterDisplay();

}); // End of DOMContentLoaded listener