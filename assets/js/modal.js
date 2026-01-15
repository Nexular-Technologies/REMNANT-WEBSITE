/**
 * Modal Logic for Team Member Bios
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Get DOM Elements
    const modal = document.getElementById('teamModal');
    const openModalButtons = document.querySelectorAll('.open-modal-btn');
    const closeModalButton = document.getElementById('closeModalBtn');

    const modalMemberImage = document.getElementById('modalMemberImage');
    const modalMemberName = document.getElementById('modalMemberName');
    const modalMemberTitle = document.getElementById('modalMemberTitle');
    const modalMemberBio = document.getElementById('modalMemberBio');

    /**
     * Fills the modal with the selected team member's data and shows it.
     * @param {string} memberId - The ID of the member (e.g., 'coenraad')
     * @param {HTMLElement} memberCard - The parent card element to extract data from.
     */
    function openModal(memberId, memberCard) {
        // Find the specific elements within the clicked card
        const name = memberCard.querySelector('h4').textContent;
        const title = memberCard.querySelector('span').textContent;
        // The full bio is stored in the hidden <p> with a specific ID
        const fullBio = document.getElementById(`bio-${memberId}`).innerHTML; 
        
        // Find the image src from the member-img container
        const imageElement = memberCard.querySelector('.member-img img');
        const imageUrl = imageElement ? imageElement.src : '';

        // 2. Populate the Modal with Data
        modalMemberName.textContent = name;
        modalMemberTitle.textContent = title;
        modalMemberBio.innerHTML = fullBio;
        modalMemberImage.src = imageUrl;
        modalMemberImage.alt = `${name} photo`;

        // 3. Display the Modal
        modal.classList.add('modal-visible');
        document.body.style.overflow = 'hidden'; // Prevent scrolling the background
    }

    /**
     * Closes the modal and resets the body overflow.
     */
    function closeModal() {
        modal.classList.remove('modal-visible');
        document.body.style.overflow = ''; // Restore background scrolling
    }

    // 4. Add Event Listeners to Open Buttons
    openModalButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Get the member ID from the data attribute
            const memberId = event.currentTarget.getAttribute('data-member-id');
            // Traverse up the DOM to find the main 'team-member' container
            const memberCard = event.currentTarget.closest('.team-member');
            
            if (memberId && memberCard) {
                openModal(memberId, memberCard);
            }
        });
    });

    // 5. Add Event Listeners to Close Modal
    closeModalButton.addEventListener('click', closeModal);

    // Close when clicking outside the modal content
    modal.addEventListener('click', (event) => {
        // If the click target is the overlay itself (not the content box)
        if (event.target === modal) {
            closeModal();
        }
    });

    // Close when the ESC key is pressed
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('modal-visible')) {
            closeModal();
        }
    });
});