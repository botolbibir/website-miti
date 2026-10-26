// Toggle menu di layar kecil
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  mainNav.classList.toggle('open');
});

// Tutup menu setiap kali salah satu link diklik (khusus tampilan mobile)
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mainNav.classList.remove('open'));
});

// Form kontak: sementara belum terhubung ke server/backend.
// Tahap ini baru profil perusahaan, jadi form cukup menampilkan pesan konfirmasi.
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formNote.textContent = 'Terima kasih! Pesan Anda Telah Kami Catat.';
  contactForm.reset();
});
