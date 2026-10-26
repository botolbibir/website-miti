// Toggle menu di layar kecil
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Tutup menu setiap kali salah satu link diklik (khusus tampilan mobile)
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Form kontak: sementara belum terhubung ke server/backend.
// Tahap ini baru profil perusahaan, jadi form cukup menampilkan pesan konfirmasi.
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

if (contactForm && formNote) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formNote.textContent = 'Terima kasih! Pesan Anda Telah Kami Catat.';
    contactForm.reset();
  });
}

// ===== Demo GapBot =====
// Chatbot rule-based sederhana: mencocokkan kata kunci dari pertanyaan
// pelanggan dengan jawaban yang sudah disiapkan untuk UMKM contoh "Kopi Rimba".
const demoForm = document.getElementById('demoForm');
const demoInput = document.getElementById('demoInput');
const demoBody = document.getElementById('demoBody');

if (demoForm) {
  const gapBotRules = [
    { keywords: ['jam', 'buka', 'tutup', 'operasional'], reply: 'Kopi Rimba buka setiap hari jam 08.00–21.00 WIB, termasuk weekend ya!' },
    { keywords: ['harga', 'berapa', 'harganya', 'mahal', 'murah'], reply: 'Menu kami mulai dari Rp15.000 untuk kopi susu, sampai Rp28.000 untuk menu signature. Mau aku kirim daftar menu lengkap?' },
    { keywords: ['ongkir', 'antar', 'kirim', 'delivery'], reply: 'Gratis ongkir untuk radius 3 km dari toko. Di luar itu kena tambahan sesuai jarak via GoSend/GrabExpress.' },
    { keywords: ['pesan', 'order', 'cara beli', 'gimana cara'], reply: 'Gampang kok — tinggal sebutkan menu dan jumlahnya di sini, nanti admin kami bantu proses pembayaran dan pengiriman.' },
    { keywords: ['lokasi', 'alamat', 'dimana', 'di mana'], reply: 'Kami di Jl. Soekarno Hatta, Malang, Jawa Timur. Lokasi pin Google Maps bisa kami kirim kalau mau.' },
    { keywords: ['bayar', 'pembayaran', 'qris', 'transfer', 'cash'], reply: 'Bisa bayar via QRIS, transfer bank, atau cash langsung di tempat.' },
    { keywords: ['halo', 'hai', 'hi', 'pagi', 'siang', 'malam'], reply: 'Halo juga! Ada yang bisa GapBot bantu hari ini? 😊' },
    { keywords: ['makasih', 'terima kasih', 'thanks'], reply: 'Sama-sama! Ditunggu kedatangannya di Kopi Rimba ya ☕' }
  ];

  function findReply(text) {
    const lower = text.toLowerCase();
    const match = gapBotRules.find(rule => rule.keywords.some(k => lower.includes(k)));
    return match
      ? match.reply
      : 'Hmm, pertanyaan itu agak di luar yang aku tahu — aku teruskan ke admin Kopi Rimba ya, mohon tunggu sebentar 🙏';
  }

  function addMessage(text, who) {
    const bubble = document.createElement('div');
    bubble.className = `demo-msg demo-msg-${who}`;
    bubble.textContent = text;
    demoBody.appendChild(bubble);
    demoBody.scrollTop = demoBody.scrollHeight;
  }

  function showTyping() {
    const typing = document.createElement('div');
    typing.className = 'demo-msg-typing';
    typing.id = 'demoTyping';
    typing.innerHTML = '<span></span><span></span><span></span>';
    demoBody.appendChild(typing);
    demoBody.scrollTop = demoBody.scrollHeight;
  }

  function removeTyping() {
    const typing = document.getElementById('demoTyping');
    if (typing) typing.remove();
  }

  demoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = demoInput.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    demoInput.value = '';

    showTyping();
    setTimeout(() => {
      removeTyping();
      addMessage(findReply(text), 'bot');
    }, 700 + Math.random() * 500);
  });
}
