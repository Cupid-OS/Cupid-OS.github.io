/* ========================================
   CONFIGURATION
   ======================================== */

const CONFIG = {
    typingSpeed: 100,        // Speed of typing in milliseconds
    deletingSpeed: 50,       // Speed of deleting in milliseconds
    pauseTime: 2000,         // Pause before starting to delete
    texts: [
        'Welcome!',
        '¡Bienvenido!',    // Spanish
        'Bem-vindo!',       // Portuguese
        'Welcome!'
    ]
};

/* ========================================
   TYPING ANIMATION
   ======================================== */

class TypingAnimation {
    constructor(element, texts) {
        this.element = element;
        this.texts = texts;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.isPaused = false;
    }

    /**
     * Main typing loop
     */
    type() {
        const currentText = this.texts[this.textIndex];
        const cursor = document.getElementById('cursor');
        
        // Update displayed text (preserve cursor)
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }
        
        // Re-add cursor after text update
        if (cursor && !this.element.contains(cursor)) {
            this.element.appendChild(cursor);
        }

        // Calculate typing speed
        let typeSpeed = this.isDeleting ? CONFIG.deletingSpeed : CONFIG.typingSpeed;

        // Check if word is complete
        if (!this.isDeleting && this.charIndex === currentText.length) {
            // Pause at end of word
            typeSpeed = CONFIG.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            // Move to next word
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            typeSpeed = 500; // Brief pause before next word
        }

        // Continue animation
        setTimeout(() => this.type(), typeSpeed);
    }

    /**
     * Start the typing animation
     */
    start() {
        this.type();
    }
}

/* ========================================
   INITIALIZATION
   ======================================== */

/**
 * Initialize when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    // Get the title element
    const titleElement = document.getElementById('typing-text');
    
    // Create and add cursor element right after the text
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.id = 'cursor';
    titleElement.appendChild(cursor);
    
    // Start typing animation
    const typing = new TypingAnimation(titleElement, CONFIG.texts);
    typing.start();
    
    // Add smooth scroll for button click (if needed in future)
    addButtonAnimations();
});

/* ========================================
   ADDITIONAL ANIMATIONS
   ======================================== */

/**
 * Add extra animations to interactive elements
 */
function addButtonAnimations() {
    const button = document.querySelector('.panel-button');
    
    if (button) {
        button.addEventListener('click', (e) => {
            // Add a ripple effect or confirmation animation if needed
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 100);
        });
    }
}

/**
 * Log initialization
 */
console.log('🚀 Thiago\'s Website Initialized');
console.log('⚡ Typing animation active');
