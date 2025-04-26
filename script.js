 // Initialize AOS animations
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
        
        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Floating CTA text toggle
        const floatingCta = document.querySelector('.floating-cta');
        const floatingCtaText = document.querySelector('.floating-cta-text');
        
        floatingCta.addEventListener('mouseenter', function() {
            floatingCtaText.style.display = 'block';
        });
        
        floatingCta.addEventListener('mouseleave', function() {
            floatingCtaText.style.display = 'none';
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close navbar collapse on mobile
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }
                }
            });
        });
        
        // Dark mode detection
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
        }
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            if (event.matches) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        });
        
        // Text animation for section titles
        document.querySelectorAll('.text-animate').forEach(element => {
            const text = element.textContent;
            element.innerHTML = '';
            
            for (let i = 0; i < text.length; i++) {
                const span = document.createElement('span');
                span.textContent = text[i] === ' ' ? ' ' : text[i];
                span.style.animationDelay = `${i * 0.05}s`;
                element.appendChild(span);
            }
        });
        
        // Hero Canvas Animation
        document.addEventListener('DOMContentLoaded', function() {
            const canvas = document.getElementById('hero-canvas');
            const ctx = canvas.getContext('2d');
            
            // Set canvas dimensions
            function resizeCanvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            
            window.addEventListener('resize', resizeCanvas);
            resizeCanvas();
            
            // Particle class
            class Particle {
                constructor() {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.size = Math.random() * 5 + 1;
                    this.speedX = Math.random() * 3 - 1.5;
                    this.speedY = Math.random() * 3 - 1.5;
                    this.color = this.getRandomColor();
                }
                
                getRandomColor() {
                    const colors = [
                        'rgba(76, 175, 80, 0.7)',  // green
                        'rgba(156, 39, 176, 0.7)', // purple
                        'rgba(33, 150, 243, 0.7)', // blue
                        'rgba(255, 87, 34, 0.7)'   // orange
                    ];
                    return colors[Math.floor(Math.random() * colors.length)];
                }
                
                update() {
                    this.x += this.speedX;
                    this.y += this.speedY;
                    
                    if (this.x < 0 || this.x > canvas.width) {
                        this.speedX = -this.speedX;
                    }
                    
                    if (this.y < 0 || this.y > canvas.height) {
                        this.speedY = -this.speedY;
                    }
                }
                
                draw() {
                    ctx.fillStyle = this.color;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            
            // Create particles
            const particles = [];
            for (let i = 0; i < 100; i++) {
                particles.push(new Particle());
            }
            
            // Connect particles with lines
            function connectParticles() {
                const maxDistance = 200;
                for (let i = 0; i < particles.length; i++) {
                    for (let j = i; j < particles.length; j++) {
                        const dx = particles[i].x - particles[j].x;
                        const dy = particles[i].y - particles[j].y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        if (distance < maxDistance) {
                            const opacity = 1 - (distance / maxDistance);
                            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(particles[i].x, particles[i].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                            ctx.stroke();
                        }
                    }
                }
            }
            
            // Animation loop
            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                // Draw and update particles
                particles.forEach(particle => {
                    particle.update();
                    particle.draw();
                });
                
                connectParticles();
                
                requestAnimationFrame(animate);
            }
            
            animate();
        });