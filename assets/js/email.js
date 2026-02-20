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
                    // Success Modal Trigger
                    const modalElement = document.getElementById('successModal');
                    const successModal = new bootstrap.Modal(modalElement);
                    successModal.show();

                    contactForm.reset();
                    btn.disabled = false;
                    btn.innerText = originalBtnText;

                    // Redirect to home after 3.5 seconds
                    setTimeout(() => {
                        window.location.href = 'index.html'; 
                    }, 3500);

                }, (error) => {
                    btn.disabled = false;
                    btn.innerText = originalBtnText;
                    console.error('EmailJS Error:', error);
                    alert('Submission failed. Please check your console for details.');
                });
        });
    }
});