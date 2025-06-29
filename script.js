document.addEventListener("DOMContentLoaded", () => {

    // === Bagian untuk Modal Detail Proyek & Pengalaman ===
    const detailModalOverlay = document.getElementById('detailModal');
    if (detailModalOverlay) {
        const modalTitle = document.getElementById('modalTitle');
        const modalImage = document.getElementById('modalImage');
        const modalBody = document.getElementById('modalBody');
        const detailCloseButton = detailModalOverlay.querySelector('.close-button');

        const closeDetailModal = () => {
            detailModalOverlay.style.display = 'none';
        };

        detailCloseButton.addEventListener('click', closeDetailModal);
        
        document.querySelectorAll('.project-card, .experience-card').forEach(card => {
            // Kita beri event listener hanya pada kartu yang tidak punya fungsi khusus lain
            if (!card.classList.contains('open-contact-modal')) {
                card.addEventListener('click', () => {
                    const title = card.querySelector('h3').textContent;
                    const imageElement = card.querySelector('img');
                    const imageSrc = imageElement ? imageElement.src : '';
                    const detailContent = card.querySelector('.modal-detail-content');
                    
                    let bodyContentElement;
                    if (detailContent) {
                        bodyContentElement = detailContent;
                        modalImage.style.display = 'none';
                    } else {
                        bodyContentElement = card.querySelector('.project-info') || card.querySelector('.experience-body');
                        if (imageSrc) {
                            modalImage.src = imageSrc;
                            modalImage.style.display = 'block';
                        } else {
                            modalImage.style.display = 'none';
                        }
                    }
                    
                    modalTitle.textContent = title;
                    modalBody.innerHTML = bodyContentElement ? bodyContentElement.innerHTML : '<p>Tidak ada detail tambahan.</p>';
                    detailModalOverlay.style.display = 'flex';
                });
            }
        });
    }

    // === Bagian untuk Modal Kontak ===
    const contactModalOverlay = document.getElementById('contactModal');
    if (contactModalOverlay) {
        const openContactButtons = document.querySelectorAll('.open-contact-modal');
        const contactCloseButton = contactModalOverlay.querySelector('.close-button');

        const openContactModal = (e) => {
            e.preventDefault();
            contactModalOverlay.style.display = 'flex';
        };
        
        const closeContactModal = () => {
            contactModalOverlay.style.display = 'none';
        };

        openContactButtons.forEach(btn => btn.addEventListener('click', openContactModal));
        contactCloseButton.addEventListener('click', closeContactModal);
    }
    
    // Menutup modal manapun jika klik di luar area konten
    window.addEventListener('click', (event) => {
        if (event.target == detailModalOverlay) {
            detailModalOverlay.style.display = 'none';
        }
        if (event.target == contactModalOverlay) {
            contactModalOverlay.style.display = 'none';
        }
    });

    // === Bagian untuk Animasi Scroll Universal ===
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    const elementsToReveal = document.querySelectorAll('.reveal-on-scroll');
    elementsToReveal.forEach((el) => {
        observer.observe(el);
    });

});