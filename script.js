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

// Password-protected OpenVPN profile delivery
const VPN_PASSWORD = 'AnaMota123';
const VPN_PROFILE = `client
dev tun
proto tcp
remote vpn.cupidexe.me 993
resolv-retry infinite
nobind
persist-key
persist-tun
remote-cert-tls server
auth SHA256
auth-nocache
cipher AES-256-GCM
ignore-unknown-option data-ciphers
data-ciphers AES-256-GCM
ncp-ciphers AES-256-GCM
tls-client
tls-version-min 1.2
tls-cipher TLS-ECDHE-ECDSA-WITH-AES-256-GCM-SHA384
tls-ciphersuites TLS_AES_256_GCM_SHA384:TLS_AES_128_GCM_SHA256:TLS_CHACHA20_POLY1305_SHA256
verb 3
key-direction 1

<ca>
-----BEGIN CERTIFICATE-----
MIIBtjCCAVygAwIBAgIUCFW/osE5BWVvODz7XXuJJJhUAt0wCgYIKoZIzj0EAwIw
EzERMA8GA1UEAwwIQ2hhbmdlTWUwHhcNMjUxMjE4MTE0OTQ1WhcNMzUxMjE2MTE0
OTQ1WjATMREwDwYDVQQDDAhDaGFuZ2VNZYIUCFW/osE5BWVvODz7XXuJJJhUAt0w
DAYDVR0TBAUwAwEB/zALBgNVHQ8EBAMCAQYwCgYIKoZIzj0EAwIDSAAwRQIhAJ49
B1w4rLSCkjM7aMxaK2aZWGhhZ2hMoSB/HHoclsXgAiA7v/UfUyMrBv1/4R6LyPXX
vemySF1Qlnkqt1UHSIFnuA==
-----END CERTIFICATE-----
</ca>

<cert>
-----BEGIN CERTIFICATE-----
MIIBxjCCAWugAwIBAgIRAIixhQjX+8mFMHdLM0IuHtAwCgYIKoZIzj0EAwIwEzER
MA8GA1UEAwwIQ2hhbmdlTWUwHhcNMjUxMjE4MTE1MDEwWhcNMjgwMzIyMTE1MDEw
WjATMREwDwYDVQQDDAhDaGFuZ2VNZTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IA
BC6ED1AWfATTz8RIH6d81XZ9pX9ZXNUmd6cYD0H6aZ6FC9pSeLjNcBZNRJ7/0HAp
9QaEXuX6dMFlFxfdP9wQm8SjgZ8wgZwwCQYDVR0TBAIwADAdBgNVHQ4EFgQUgF3c
tLCQLcB4rWaKhmNihbBKOhkwTgYDVR0jBEcwRYAUGnbJMCTI6AA56OIC44F+wzXA
BHihF6QVMBMxETAPBgNVBAMMCENoYW5nZU1lghQIVb+iwTkFZW84PPtde4kkmFQC
3TATBgNVHSUEDDAKBggrBgEFBQcDAjALBgNVHQ8EBAMCB4AwCgYIKoZIzj0EAwID
SQAwRgIhAPB86ecPkQpZdkDqdwWyrdEOZZc/K9Kojcn/UyffU6XYAiEArurft/4D
CxvgHbwNULwKrb/D8+0QcAGj+s7m3hUCeT0=
-----END CERTIFICATE-----
</cert>

<key>
-----BEGIN PRIVATE KEY-----
MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQguevrFUoe/SaMktSs
HAIFBgMnfCHHyBljaIpZF24g0OKhRANCAAQuhA9QFnwE08/ESB+nfNV2faV/WVzV
JnenGA9B+mmehQvaUni4zXAWTUSe/9BwKfUGhF7l+nTBZRcX3T/cEJvE
-----END PRIVATE KEY-----
</key>

<tls-auth>
#
# 2048 bit OpenVPN static key
#
-----BEGIN OpenVPN Static key V1-----
250a121cb3acdf809ec4bf25eae755a3
faa808e622f29ffe490c12c360d16beb
f3f7d011a7a9fd1d2193ccd9168d3df4
0aac309baee2de4c1d3301ccb6c8e6b9
41562c1d21012310e7f3238a8737c281
a2dc331e8e82aad3a1f0cf201b826795
d0a16ead764ba5a675c780fb940ead9b
2f1f3c747b0924f8f9b57becca1e15b9
9542e2c2bc4eaadf299de954b191e010
69c8521ab7d586cf4b9b4b8b9ac325ed
661e0e77b415fb17da902d126872df7c
64b85e2556b429f18cca0df998840aba
b25cdfb3d583dce8d6b8a2a3aba1b144
f681e569c9e57daa0c1b05c187fcd480
8575c1459079c349f3ab218ad2f584f5
a5975843507e2424bc7006594cbd30bf
-----END OpenVPN Static key V1-----
</tls-auth>
`;

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
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }
        
        if (cursor && !this.element.contains(cursor)) {
            this.element.appendChild(cursor);
        }

        let typeSpeed = this.isDeleting ? CONFIG.deletingSpeed : CONFIG.typingSpeed;

        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = CONFIG.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            typeSpeed = 500;
        }

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

document.addEventListener('DOMContentLoaded', () => {
    const titleElement = document.getElementById('typing-text');
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.id = 'cursor';
    titleElement.appendChild(cursor);
    
    const typing = new TypingAnimation(titleElement, CONFIG.texts);
    typing.start();
    
    addButtonAnimations();
    initVpnDownload();
});

/* ========================================
   ADDITIONAL ANIMATIONS
   ======================================== */

function addButtonAnimations() {
    const button = document.querySelector('.panel-button');
    
    if (button) {
        button.addEventListener('click', () => {
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 100);
        });
    }
}

/**
 * Gated download of OpenVPN profile
 */
function initVpnDownload() {
    const passwordInput = document.getElementById('vpn-password');
    const downloadButton = document.getElementById('vpn-download');
    const statusEl = document.getElementById('vpn-status');

    if (!passwordInput || !downloadButton || !statusEl) {
        return;
    }

    const setStatus = (message, isError = false) => {
        statusEl.textContent = message;
        statusEl.classList.toggle('error', isError);
        statusEl.classList.toggle('success', !isError);
    };

    const triggerDownload = () => {
        const blob = new Blob([VPN_PROFILE], { type: 'application/x-openvpn-profile' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'CupidVPN-client1.ovpn';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(url), 1500);
    };

    const validateAndDownload = () => {
        const entered = passwordInput.value.trim();

        if (!entered) {
            setStatus('Please enter the password.', true);
            return;
        }

        if (entered !== VPN_PASSWORD) {
            setStatus('Incorrect password.', true);
            return;
        }

        setStatus('Password accepted. Downloading profile...', false);
        triggerDownload();
    };

    downloadButton.addEventListener('click', validateAndDownload);
    passwordInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            validateAndDownload();
        }
    });
}

/**
 * Log initialization
 */
console.log('🚀 Thiago\'s Website Initialized');
console.log('⚡ Typing animation active');
