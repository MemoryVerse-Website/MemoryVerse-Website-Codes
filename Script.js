// MemoryVerse Website JavaScript

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Initialize all interactive features
    initHeader();
    initParticles();
    initMemoryCards();
    initButtons();
    initScrollAnimations();
});

// Header background change on scroll
function initHeader() {
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.9)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.1)';
        }
    });
}

// Create floating particles
function initParticles() {
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 10 + 5;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 3 + 5) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        const particlesContainer = document.getElementById('particles');
        if (particlesContainer) {
            particlesContainer.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                }
            }, 8000);
        }
    }

    // Create particles periodically
    setInterval(createParticle, 2000);
    
    // Create initial particles
    for (let i = 0; i < 5; i++) {
        setTimeout(createParticle, i * 400);
    }
}

// Add hover effects to memory cards
function initMemoryCards() {
    document.querySelectorAll('.memory-card').forEach((card, index) => {
        // Store original z-index
        card.dataset.originalZ = card.style.zIndex || (3 - index);
        
        card.addEventListener('mouseenter', () => {
            const currentTransform = getComputedStyle(card).transform;
            card.style.transform = currentTransform + ' scale(1.05)';
            card.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset to original transform (remove scale)
            const rotation = card.style.getPropertyValue('--rotation') || '0deg';
            card.style.transform = `rotate(${rotation})`;
            card.style.zIndex = card.dataset.originalZ;
        });
    });
}

// Add loading animation for buttons
function initButtons() {
    document.querySelectorAll('.primary-btn, .secondary-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Only prevent default for demo purposes
            if (btn.getAttribute('href') === '#' || btn.getAttribute('href') === '#signup' || btn.getAttribute('href') === '#demo') {
                e.preventDefault();
                
                const originalText = btn.textContent;
                btn.textContent = 'Loading...';
                btn.style.opacity = '0.7';
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.opacity = '1';
                    
                    // Show different messages based on button
                    if (btn.textContent.includes('Demo')) {
                        showNotification('Demo coming soon! 🎬');
                    } else {
                        showNotification('Welcome to MemoryVerse! Sign up functionality will be implemented here. ✨');
                    }
                }, 1500);
            }
        });
    });
}

// Show notification function
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #ff6b6b, #ffd93d);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(255, 107, 107, 0.3);
        z-index: 10000;
        font-weight: 600;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

// Intersection Observer for fade-in animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards and steps for animation
    document.querySelectorAll('.feature-card, .step').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const memoryCards = document.querySelector('.memory-cards');
    
    if (hero && memoryCards) {
        const rate = scrolled * -0.5;
        memoryCards.style.transform = `translateY(${rate}px)`;
    }
});

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Mobile menu toggle (for future mobile menu implementation)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-active');
}

// Add click handlers for footer links (demo purposes)
document.querySelectorAll('.footer-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const linkText = link.textContent;
            showNotification(`${linkText} page coming soon! 📄`);
        }
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const memoryCards = document.querySelector('.memory-cards');
    
    if (hero && memoryCards && scrolled < window.innerHeight) {
        const rate = scrolled * -0.3;
        memoryCards.style.transform = `translateY(${rate}px)`;
    }
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Add smooth hover effects for all interactive elements
function initHoverEffects() {
    // Add hover effect to all buttons
    document.querySelectorAll('button, .btn, .primary-btn, .secondary-btn, .cta-button').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0)';
        });
    });
}

// Initialize hover effects
initHoverEffects();

// Add loading state management
class LoadingManager {
    constructor() {
        this.loadingElements = new Set();
    }
    
    startLoading(element) {
        this.loadingElements.add(element);
        element.classList.add('loading');
        element.style.pointerEvents = 'none';
    }
    
    stopLoading(element) {
        this.loadingElements.delete(element);
        element.classList.remove('loading');
        element.style.pointerEvents = 'auto';
    }
    
    isLoading(element) {
        return this.loadingElements.has(element);
    }
}

const loadingManager = new LoadingManager();

// Form validation and submission (for future forms)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function handleFormSubmission(form) {
    const formData = new FormData(form);
    const email = formData.get('email');
    
    if (email && !validateEmail(email)) {
        showNotification('Please enter a valid email address ❌');
        return false;
    }
    
    return true;
}

// Analytics tracking (placeholder for future implementation)
function trackEvent(eventName, properties = {}) {
    console.log('Event tracked:', eventName, properties);
    // Here you would integrate with analytics services like Google Analytics, Mixpanel, etc.
}

// Track button clicks
document.querySelectorAll('.primary-btn, .secondary-btn, .cta-button').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('button_click', {
            button_text: btn.textContent,
            button_location: btn.closest('section')?.className || 'header'
        });
    });
});

// Add Easter egg for memory cards
let clickCount = 0;
document.querySelectorAll('.memory-card').forEach(card => {
    card.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 5) {
            showNotification('🎉 You found the easter egg! Thanks for exploring MemoryVerse!');
            clickCount = 0;
        }
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals or notifications
        document.querySelectorAll('.notification').forEach(notification => {
            notification.remove();
        });
    }
});

// Add focus management for accessibility
function initAccessibility() {
    // Add focus indicators
    document.querySelectorAll('a, button, [tabindex]').forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid #ffd700';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = 'none';
        });
    });
}

initAccessibility();

// Console message for developers
console.log(`
🌟 Welcome to MemoryVerse! 
Built with love for preserving beautiful memories.
For development inquiries, contact the team.
`);

// Export functions for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showNotification,
        validateEmail,
        trackEvent,
        LoadingManager
    };
}
