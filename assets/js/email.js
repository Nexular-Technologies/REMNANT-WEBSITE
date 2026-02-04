import emailjs from '@emailjs/browser';

/**
 * RMNT Advisory - Email Service Logic
 */

const PUBLIC_KEY = "vrPfxZMgyjrWE_X91";
const SERVICE_ID = "contact_service"; 
const TEMPLATE_ID = "contact_form";

export const initEmailService = () => {
    const contactForm = document.getElementById('contact-form');

    if (!contactForm) return;

    emailjs.init({ publicKey: PUBLIC_KEY });

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const btn = this.querySelector('button[type="submit"]');
        const originalText = btn.innerText;

        btn.innerText = 'SENDING...';
        btn.disabled = true;

        // Using sendForm automatically picks up all your HTML 'name' attributes
        // (first-name, last-name, email, service, message)
        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this)
            .then(() => {
                alert('Thank you! Your message has been sent to RMNT Advisory.');
                contactForm.reset();
            })
            .catch((error) => {
                console.error('EmailJS Error:', error);
                alert('Failed to send. Please email advisory@rmnt.co.za directly.');
            })
            .finally(() => {
                btn.innerText = originalText;
                btn.disabled = false;
            });
    });
};