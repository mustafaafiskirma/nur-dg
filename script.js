document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Start Overlay & Particles ---
    const startOverlay = document.getElementById('startOverlay');
    const startBtn = document.querySelector('.start-btn');
    const particlesContainer = document.getElementById('particles');

    // Generate random particles
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + 'vw';
        p.style.top = Math.random() * 100 + 'vh';
        p.style.width = Math.random() * 5 + 2 + 'px';
        p.style.height = p.style.width;
        p.style.animationDelay = Math.random() * 3 + 's';
        p.style.animationDuration = Math.random() * 2 + 2 + 's';
        particlesContainer.appendChild(p);
    }

    startBtn.addEventListener('click', () => {
        startOverlay.style.opacity = '0';
        setTimeout(() => {
            startOverlay.style.display = 'none';
        }, 800);
        fireInitialConfetti();
    });

    function fireInitialConfetti() {
        const duration = 3000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#BF3073', '#D959C3', '#F1A7F2', '#ffffff']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#BF3073', '#D959C3', '#F1A7F2', '#ffffff']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }

    // --- 2. Countdown Timer ---
    // Target: May 19, 2026, 00:00:00
    const targetDate = new Date('2026-05-19T00:00:00').getTime();
    
    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-mins');
    const secsEl = document.getElementById('cd-secs');
    const countdownEl = document.getElementById('countdown');
    const bdayMessageEl = document.getElementById('birthdayMessage');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance <= 0) {
            // Birthday arrived!
            countdownEl.style.display = 'none';
            bdayMessageEl.style.display = 'block';
            clearInterval(countdownInterval);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.textContent = days.toString().padStart(2, '0');
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minsEl.textContent = minutes.toString().padStart(2, '0');
        secsEl.textContent = seconds.toString().padStart(2, '0');
    }

    // Update every second
    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); // initial call


    // --- 3. Scroll Animations & Observer ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger typewriter if it's the letter card
                if (entry.target.classList.contains('letter-card')) {
                    startTypewriter();
                }
                
                scrollObserver.unobserve(entry.target); // only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-on-scroll').forEach(el => {
        scrollObserver.observe(el);
    });

    // --- 4. Typewriter Effect ---
    let typewriterStarted = false;
    
    function startTypewriter() {
        if (typewriterStarted) return;
        typewriterStarted = true;
        
        const lines = document.querySelectorAll('.typewriter-line');
        let lineIndex = 0;

        function typeLine() {
            if (lineIndex >= lines.length) return;
            
            const line = lines[lineIndex];
            const text = line.getAttribute('data-text');
            line.classList.add('typing');
            line.textContent = '';
            
            let charIndex = 0;
            const typingSpeed = 50; // ms per char

            function typeChar() {
                if (charIndex < text.length) {
                    line.textContent += text.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeChar, typingSpeed);
                } else {
                    line.classList.remove('typing');
                    line.classList.add('done');
                    lineIndex++;
                    setTimeout(typeLine, 500); // Wait before next line
                }
            }
            typeChar();
        }
        
        setTimeout(typeLine, 500); // Initial delay
    }

    // --- 5. Gallery Generation ---
    const trackLeft = document.querySelector('.track-left');
    const trackRight = document.querySelector('.track-right');
    const trackLeftFast = document.querySelector('.track-left-fast');

    const photoNames = [
        "WhatsApp Image 2026-05-15 at 16.42.58 (1).jpeg",
        "WhatsApp Image 2026-05-15 at 16.42.58 (2).jpeg",
        "WhatsApp Image 2026-05-15 at 16.42.58 (3).jpeg",
        "WhatsApp Image 2026-05-15 at 16.42.58 (4).jpeg",
        "WhatsApp Image 2026-05-15 at 16.42.58.jpeg",
        "WhatsApp Image 2026-05-15 at 16.42.59 (1).jpeg",
        "WhatsApp Image 2026-05-15 at 16.42.59 (10).jpeg",
        "WhatsApp Image 2026-05-15 at 16.42.59 (2).jpeg",
        "WhatsApp Image 2026-05-15 at 16.42.59 (3).jpeg",
        "WhatsApp Image 2026-05-15 at 16.42.59 (4).jpeg",
        "WhatsApp Image 2026-05-15 at 16.42.59 (5).jpeg",
        "WhatsApp Image 2026-05-15 at 16.42.59 (6).jpeg",
        "WhatsApp Image 2026-05-15 at 16.42.59 (7).jpeg",
        "WhatsApp Image 2026-05-15 at 16.42.59 (8).jpeg",
        "WhatsApp Image 2026-05-15 at 16.42.59 (9).jpeg",
        "WhatsApp Image 2026-05-15 at 16.42.59.jpeg",
        "WhatsApp Image 2026-05-15 at 16.43.01 (1).jpeg",
        "WhatsApp Image 2026-05-15 at 16.43.01 (2).jpeg",
        "WhatsApp Image 2026-05-15 at 16.43.01 (3).jpeg",
        "WhatsApp Image 2026-05-15 at 16.43.01 (4).jpeg",
        "WhatsApp Image 2026-05-15 at 16.43.01 (5).jpeg",
        "WhatsApp Image 2026-05-15 at 16.43.01 (6).jpeg",
        "WhatsApp Image 2026-05-15 at 16.43.01 (7).jpeg",
        "WhatsApp Image 2026-05-15 at 16.43.01 (8).jpeg",
        "WhatsApp Image 2026-05-15 at 16.43.01 (9).jpeg",
        "WhatsApp Image 2026-05-15 at 16.43.01.jpeg",
        "WhatsApp Image 2026-05-15 at 16.43.14.jpeg"
    ];

    const totalPhotos = photoNames.length;
    const photosPerRow = Math.ceil(totalPhotos / 3);

    function createPhotoItem(index) {
        if (index >= totalPhotos) return null;
        
        const div = document.createElement('div');
        div.className = 'gallery-item';
        
        div.innerHTML = `<img src="assets/photos/${photoNames[index]}" alt="Anı ${index + 1}" loading="lazy">`;
        
        // Lightbox click event
        div.addEventListener('click', () => {
            openLightbox(div.querySelector('img').src);
        });
        return div;
    }

    // To make CSS infinite scroll smooth, we need to duplicate the content
    function populateTrack(track, startIndex, count) {
        // Original set
        for (let i = 0; i < count; i++) {
            const item = createPhotoItem(startIndex + i);
            if (item) track.appendChild(item);
        }
        // Duplicated set for seamless loop
        for (let i = 0; i < count; i++) {
            const item = createPhotoItem(startIndex + i);
            if (item) track.appendChild(item);
        }
    }

    populateTrack(trackLeft, 0, photosPerRow);
    populateTrack(trackRight, photosPerRow, photosPerRow);
    populateTrack(trackLeftFast, photosPerRow * 2, totalPhotos - (photosPerRow * 2));


    // --- 6. Lightbox ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeLightboxBtn = document.getElementById('closeLightbox');

    function openLightbox(src) {
        lightboxImg.src = src;
        lightbox.classList.add('active');
    }

    closeLightboxBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    // --- 7. Interactive Buttons ---
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');
    const celebrationOverlay = document.getElementById('celebrationOverlay');
    const interactionArea = document.querySelector('.interaction-area');
    let noClickCount = 0;

    function moveNoButton() {
        noClickCount++;

        if (noClickCount === 1) {
            noBtn.textContent = "Emin misin?";
            noBtn.style.transform = "scale(0.9)";
        } else if (noClickCount === 2) {
            noBtn.textContent = "Bir daha düşün!";
            noBtn.style.transform = "scale(0.8)";
        } else if (noClickCount === 3) {
            noBtn.textContent = "Hadi ama!";
            noBtn.style.transform = "scale(0.7)";
        } else {
            noBtn.textContent = "Yakalayamazsın!";
            noBtn.style.opacity = Math.max(0, 1 - (noClickCount * 0.1));
        }

        // Random position
        const areaRect = interactionArea.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();
        
        const maxX = areaRect.width - btnRect.width;
        const maxY = areaRect.height - btnRect.height;

        const randomX = Math.random() * maxX;
        // Make it jump around, allow negative Y to jump above container
        const randomY = (Math.random() * maxY * 2) - maxY;

        noBtn.style.position = 'absolute';
        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;

        // Grow YES button
        const currentScale = 1 + (noClickCount * 0.15);
        yesBtn.style.transform = `scale(${currentScale})`;
    }

    noBtn.addEventListener('mouseover', moveNoButton);
    noBtn.addEventListener('click', moveNoButton);
    // Mobile touch
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveNoButton();
    }, { passive: false });


    yesBtn.addEventListener('click', () => {
        celebrationOverlay.style.display = 'flex';
        
        // Massive Confetti Explosion
        const duration = 5000;
        const end = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10001 };
        
        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
            const timeLeft = end - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            
            confetti(Object.assign({}, defaults, { 
                particleCount, 
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                colors: ['#BF3073', '#D959C3', '#F1A7F2', '#d4a574']
            }));
            confetti(Object.assign({}, defaults, { 
                particleCount, 
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                colors: ['#BF3073', '#D959C3', '#F1A7F2', '#d4a574']
            }));
        }, 250);
    });

});
