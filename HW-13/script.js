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

        !nameValue
            ? displayError('name', 'Please enter your name.')
            : messageValue.length < 5 ? displayError('message', 'Message must be at least 5 characters long.')
                : !(/^\+380\d{9}$/.test(phoneNumberValue))
                    ? displayError('tel', 'Please enter a valid phone number starting with +380.')
                    : !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue))
                        ? displayError('email', 'Please enter a valid email address.')
                        : (clearErrorMessages(), console.log('Name:', nameValue, '\nMessage:', messageValue, '\nPhone number:', phoneNumberValue, '\nEmail:', emailValue));
    });
});
