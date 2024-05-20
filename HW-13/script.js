document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', event => {
        event.preventDefault();

        const getField = name => form.querySelector(`[name="${name}"]`).value.trim();

        const nameValue = getField('name');
        const messageValue = getField('message');
        const phoneNumberValue = getField('tel');
        const emailValue = getField('email');

        const displayError = (fieldName, errorMessage) => {
            const field = form.querySelector(`[name="${fieldName}"]`);
            const errorContainer = document.createElement('div');
            errorContainer.classList.add('error-message');
            errorContainer.textContent = errorMessage;
            field.parentNode.appendChild(errorContainer);
        };

        const clearErrorMessages = () => {
            form.querySelectorAll('.error-message').forEach(errorMessage => errorMessage.remove());
        };

        clearErrorMessages();

        let hasErrors = false;

        if (!nameValue) {
            displayError('name', 'Please enter your name.');
            hasErrors = true;
        }

        if (messageValue.length < 5) {
            displayError('message', 'Message must be at least 5 characters long.');
            hasErrors = true;
        }

        if (!/^\+380\d{9}$/.test(phoneNumberValue)) {
            displayError('tel', 'Please enter a valid phone number starting with +380.');
            hasErrors = true;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
            displayError('email', 'Please enter a valid email address.');
            hasErrors = true;
        }

        if (!hasErrors) {
            console.log('Name:', nameValue, '\nMessage:', messageValue, '\nPhone number:', phoneNumberValue, '\nEmail:', emailValue);
        }
    });
});
