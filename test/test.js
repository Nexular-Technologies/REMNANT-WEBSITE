document.querySelectorAll('.accenture-card').forEach(card => {
  card.addEventListener('click', () => {
    // Remove 'active' from all other cards
    document.querySelectorAll('.accenture-card').forEach(c => c.classList.remove('active'));
    // Add to this one
    card.classList.add('active');
  });
});