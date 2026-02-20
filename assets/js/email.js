// assets/js/email.js

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const btn = this.querySelector('button[type="submit"]');
            const originalBtnText = btn.innerText;
            
            // UI State: Loading
            btn.disabled = true;
            btn.innerText = 'SENDING...';

            // Send to EmailJS
            // Service ID: service_r5z4jx9 | Template ID: RMNT_EMAIL_CONNECTION_
            emailjs.sendForm('service_r5z4jx9', 'RMNT_EMAIL_CONNECTION_', this)
                .then(() => {
                    // 1. Success Modal Trigger (Using Bootstrap)
                    const modalElement = document.getElementById('successModal');
                    const successModal = new bootstrap.Modal(modalElement);
                    successModal.show();

                    // 2. Reset Form
                    contactForm.reset();
                    btn.disabled = false;
                    btn.innerText = originalBtnText;

                    // 3. Redirect to home after 3.5 seconds
                    setTimeout(() => {
                        window.location.href = 'index.html'; 
                    }, 3500);

                }, (error) => {
                    // This is the error currently appearing in your alert
                    alert('Failed to send request. Please check your internet or console for details.');
                    btn.disabled = false;
                    btn.innerText = originalBtnText;
                    console.error('EmailJS Error:', error);
                });
        });
    }
});