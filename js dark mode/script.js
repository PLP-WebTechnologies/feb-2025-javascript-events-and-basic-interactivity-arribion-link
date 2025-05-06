document.addEventListener('DOMContentLoaded', () => {

    console.log("DOM fully loaded and parsed");

    // --- FORM VALIDATION ---
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const formFeedback = document.getElementById('form-feedback');

    // Get references to error message containers
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const subjectError = document.getElementById('subject-error');
    const messageError = document.getElementById('message-error');

   
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default browser form submission
        console.log('Form submission attempt.');

        // Clear previous feedback messages and error states
        clearAllErrors();
        formFeedback.textContent = '';
        formFeedback.className = 'feedback-message'; // Reset classes

        // Perform validation
        const isNameValid = validateRequired(nameInput, nameError, 'Name is required.') && validateMinLength(nameInput, nameError, 3, 'Name must be at least 3 characters.');
        const isEmailValid = validateRequired(emailInput, emailError, 'Email is required.') && validateEmailFormat(emailInput, emailError, 'Please enter a valid email address.');
        const isSubjectValid = validateRequired(subjectInput, subjectError, 'Subject is required.');
        const isMessageValid = validateRequired(messageInput, messageError, 'Message is required.') && validateMinLength(messageInput, messageError, 10, 'Message must be at least 10 characters.');

        // Check if the overall form is valid
        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            console.log('Form is valid. (Simulating sending...)');
            formFeedback.textContent = 'Message sent successfully!';
            formFeedback.classList.add('success');

            console.log('Form Data:', {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                subject: subjectInput.value.trim(),
                message: messageInput.value.trim()
            });

          
        } else {
            console.log('Form has validation errors.');
            formFeedback.textContent = 'Please correct the errors above.';
            formFeedback.classList.add('error');
        }
    });

   
    nameInput.addEventListener('input', () => {
        clearError(nameInput, nameError); // Clear previous error for this field first
        validateRequired(nameInput, nameError, 'Name is required.');
        validateMinLength(nameInput, nameError, 3, 'Name must be at least 3 characters.');
    });
    emailInput.addEventListener('input', () => {
        clearError(emailInput, emailError);
        validateRequired(emailInput, emailError, 'Email is required.');
        validateEmailFormat(emailInput, emailError, 'Please enter a valid email address.');
    });
     subjectInput.addEventListener('input', () => {
        clearError(subjectInput, subjectError);
        validateRequired(subjectInput, subjectError, 'Subject is required.');
    });
     messageInput.addEventListener('input', () => {
        clearError(messageInput, messageError);
        validateRequired(messageInput, messageError, 'Message is required.');
        validateMinLength(messageInput, messageError, 10, 'Message must be at least 10 characters.');
    });


    // --- Validation Helper Functions ---

    /**
     * Displays an error message for a specific field and adds invalid styling.
     * @param {HTMLInputElement|HTMLTextAreaElement} inputElement - The input field element.
     * @param {HTMLElement} errorElement - The element to display the error message in.
     * @param {string} message - The error message text.
     */
    function showError(inputElement, errorElement, message) {
        errorElement.textContent = message;
        inputElement.classList.add('invalid');
    }

    /**
     * Clears the error message and invalid styling for a specific field.
     * @param {HTMLInputElement|HTMLTextAreaElement} inputElement - The input field element.
     * @param {HTMLElement} errorElement - The error message element.
     */
    function clearError(inputElement, errorElement) {
        errorElement.textContent = '';
        inputElement.classList.remove('invalid');
    }

    function clearAllErrors() {
        clearError(nameInput, nameError);
        clearError(emailInput, emailError);
        clearError(subjectInput, subjectError);
        clearError(messageInput, messageError);
    }

    /**
     * Validates if a field is required (not empty).
     * @param {HTMLInputElement|HTMLTextAreaElement} inputElement
     * @param {HTMLElement} errorElement
     * @param {string} message - Error message if invalid.
     * @returns {boolean} - True if valid, false otherwise.
     */
    function validateRequired(inputElement, errorElement, message) {
        const value = inputElement.value.trim();
        if (value === '') {
            showError(inputElement, errorElement, message);
            return false;
        }
       
        return true;
    }

    /**
     * Validates if a field meets a minimum length requirement.
     * @param {HTMLInputElement|HTMLTextAreaElement} inputElement
     * @param {HTMLElement} errorElement
     * @param {number} minLength - Minimum required length.
     * @param {string} message - Error message if invalid.
     * @returns {boolean} - True if valid, false otherwise.
     */
    function validateMinLength(inputElement, errorElement, minLength, message) {
        const value = inputElement.value.trim();
       
        if (value !== '' && value.length < minLength && errorElement.textContent === '') {
            showError(inputElement, errorElement, message);
            return false;
        }

        return true;
    }

    /**
     * Validates if an email field has a basic valid format.
     * @param {HTMLInputElement} inputElement
     * @param {HTMLElement} errorElement
     * @param {string} message 
     * @returns {boolean} 
     */
    function validateEmailFormat(inputElement, errorElement, message) {
        const value = inputElement.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple regex
        
        if (value !== '' && !emailRegex.test(value) && errorElement.textContent === '') {
            showError(inputElement, errorElement, message);
            return false;
        }
      
        return true;
    }

    // --- INTERACTIVE ELEMENTS ---

    const toggleBox = document.getElementById('toggle-box');
    const lightThemeButton = document.getElementById('light-theme-button');
    const darkThemeButton = document.getElementById('dark-theme-button');
    const bodyElement = document.body;

    
    toggleBox.addEventListener('click', () => {
        console.log('Toggle box clicked');
        const currentState = toggleBox.getAttribute('data-state');

        if (currentState === 'off') {
            toggleBox.classList.add('active'); 
            toggleBox.textContent = 'Toggle Me! (State: ON)';
            toggleBox.setAttribute('data-state', 'on'); 
            console.log('Box toggled ON');
        } else {
            toggleBox.classList.remove('active'); 
            toggleBox.textContent = 'Toggle Me! (State: OFF)';
            toggleBox.setAttribute('data-state', 'off');
             console.log('Box toggled OFF');
        }
    });

    lightThemeButton.addEventListener('click', () => {
        console.log('Switching to light theme');
        bodyElement.classList.remove('dark-theme');
        
    });
  
    darkThemeButton.addEventListener('click', () => {
        console.log('Switching to dark theme');
        bodyElement.classList.add('dark-theme');
       
    });
});