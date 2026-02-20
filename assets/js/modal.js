document.addEventListener('DOMContentLoaded', function() {
  // 1. Select Team Modal Elements
  const teamModal = document.getElementById('teamModal');
  const closeBtn = document.getElementById('closeModalBtn');
  
  const modalImg = document.getElementById('modalMemberImage');
  const modalName = document.getElementById('modalMemberName');
  const modalTitle = document.getElementById('modalMemberTitle');
  const modalBio = document.getElementById('modalMemberBio');

  // 2. Team Member Click Logic
  document.querySelectorAll('.open-modal-btn').forEach(button => {
    button.addEventListener('click', function(e) {
      // Prevent any default behavior
      e.preventDefault();

      const memberId = this.getAttribute('data-member-id');
      const parentMember = this.closest('.team-member');
      
      // Safety check: ensure the parent and bio exist
      const bioElement = document.getElementById('bio-' + memberId);
      
      if (parentMember && bioElement) {
        // Extract data
        const name = parentMember.querySelector('h4').innerText;
        const title = parentMember.querySelector('span').innerText;
        const imgSrc = parentMember.querySelector('img').src;

        // Inject into Modal
        modalImg.src = imgSrc;
        modalName.innerText = name;
        modalTitle.innerText = title;
        modalBio.innerHTML = bioElement.innerHTML;

        // Show Modal
        teamModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Stop background scroll
      } else {
        console.error("Missing Bio or Member for ID:", memberId);
      }
    });
  });

  // 3. Close Logic (X button)
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      teamModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  }

  // 4. Close Logic (Clicking outside the box)
  window.addEventListener('click', (event) => {
    if (event.target === teamModal) {
      teamModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
});