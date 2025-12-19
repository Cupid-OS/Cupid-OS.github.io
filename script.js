/* ========================================
   CONFIGURATION
   ======================================== */

// Typing animation removed; static title with translations now.

const DEFAULT_LANG = 'en';
const LANG_STORAGE_KEY = 'cupidexe-lang';

const TRANSLATIONS = {
    en: {
        eyebrow: 'Y2K control panel · v2.5',
    title: 'Welcome!',
        subtitle: "I'm Thiago",
        lead: 'Game servers, VPN access, and tools wrapped in a retro-future shell.',
        panelButton: '🎮 Access Server Panel',
        tag1: 'Minecraft + friends',
        tag2: 'Network admin',
        tag3: 'Multilingual mix',
        scrollPrompt: 'Scroll down',
        aboutTitle: 'About Me',
        statusOnline: 'Status: Online',
        aboutP1: "Hi there! I'm a 17-year-old tech enthusiast with a multicultural background. Born in the UK with Spanish and Portuguese heritage, I bring a diverse perspective to everything I do.",
        aboutP2: 'Currently, I\'m studying an IT course, diving deep into technology and expanding my skills in systems administration and networking. This website serves as my hub for managing my Minecraft server panel and other game servers that I run for playing with friends.',
        infoAgeLabel: 'Age',
        infoAgeValue: '17',
        infoLocationLabel: 'Location',
        infoLocationValue: 'UK',
        infoHeritageLabel: 'Heritage',
        infoHeritageValue: '🇬🇧 🇪🇸 🇵🇹',
        infoStudiesLabel: 'Studies',
        infoStudiesValue: 'IT Course',
        vpnTitle: 'VPN Access',
        vpnPill: 'Secure gate',
        vpnCopy: 'Enter the password to download the preconfigured OpenVPN profile.',
        vpnPasswordPlaceholder: 'Password',
        vpnButton: 'Get VPN Config',
        supportTitle: 'Report a Server Issue',
        supportPill: 'Need help?',
        supportLabelDiscord: 'Discord name',
        supportPlaceholderDiscord: 'username#1234',
        supportLabelMC: 'Minecraft name',
        supportPlaceholderMC: 'Steve',
        supportLabelTopic: 'Topic',
        supportPlaceholderTopic: "Short summary (e.g. can't join server)",
        supportLabelDescription: 'Describe the issue',
        supportPlaceholderDescription: 'Describe what happened, steps to reproduce, error messages...',
        supportButton: 'Send Email',
        supportNote: 'This will open your email client addressed to thiago197533@gmail.com',
        footerText: 'Hosting & managing game servers since 2025'
    },
    es: {
        eyebrow: 'Panel de control Y2K · v2.5',
    title: '¡Bienvenido!',
        subtitle: 'Soy Thiago',
        lead: 'Servidores de juego, acceso VPN y herramientas con estética retro-futurista.',
        panelButton: '🎮 Acceder al panel del servidor',
        tag1: 'Minecraft + amigos',
        tag2: 'Admin de redes',
        tag3: 'Mezcla multilingüe',
        scrollPrompt: 'Desplaza hacia abajo',
        aboutTitle: 'Sobre mí',
        statusOnline: 'Estado: En línea',
        aboutP1: '¡Hola! Soy un entusiasta de la tecnología de 17 años con un trasfondo multicultural. Nací en el Reino Unido con herencia española y portuguesa, y aporto una perspectiva diversa a todo lo que hago.',
        aboutP2: 'Actualmente estudio un curso de TI, profundizando en tecnología y ampliando mis habilidades en administración de sistemas y redes. Este sitio es mi centro para gestionar mi panel de servidor de Minecraft y otros servidores de juego que administro para jugar con amigos.',
        infoAgeLabel: 'Edad',
        infoAgeValue: '17',
        infoLocationLabel: 'Ubicación',
        infoLocationValue: 'Reino Unido',
        infoHeritageLabel: 'Herencia',
        infoHeritageValue: '🇬🇧 🇪🇸 🇵🇹',
        infoStudiesLabel: 'Estudios',
        infoStudiesValue: 'Curso de TI',
        vpnTitle: 'Acceso VPN',
        vpnPill: 'Puerta segura',
        vpnCopy: 'Ingresa la contraseña para descargar el perfil de OpenVPN preconfigurado.',
        vpnPasswordPlaceholder: 'Contraseña',
        vpnButton: 'Obtener config VPN',
        supportTitle: 'Reportar un problema del servidor',
        supportPill: '¿Necesitas ayuda?',
        supportLabelDiscord: 'Nombre de Discord',
        supportPlaceholderDiscord: 'usuario#1234',
        supportLabelMC: 'Nombre de Minecraft',
        supportPlaceholderMC: 'Steve',
        supportLabelTopic: 'Asunto',
        supportPlaceholderTopic: 'Resumen breve (ej. no puedo entrar)',
        supportLabelDescription: 'Describe el problema',
        supportPlaceholderDescription: 'Describe qué pasó, pasos para reproducir, mensajes de error...',
        supportButton: 'Enviar correo',
        supportNote: 'Esto abrirá tu cliente de correo dirigido a thiago197533@gmail.com',
        footerText: 'Alojando y gestionando servidores de juego desde 2025'
    },
    pt: {
        eyebrow: 'Painel de controle Y2K · v2.5',
    title: 'Bem-vindo!',
        subtitle: 'Sou o Thiago',
        lead: 'Servidores de jogo, acesso VPN e ferramentas com um visual retrofuturista.',
        panelButton: '🎮 Acessar painel do servidor',
        tag1: 'Minecraft + amigos',
        tag2: 'Admin de rede',
        tag3: 'Mistura multilíngue',
        scrollPrompt: 'Rolar para baixo',
        aboutTitle: 'Sobre mim',
        statusOnline: 'Status: Online',
        aboutP1: 'Oi! Sou um entusiasta de tecnologia de 17 anos com um histórico multicultural. Nascido no Reino Unido com herança espanhola e portuguesa, trago uma perspectiva diversa para tudo o que faço.',
        aboutP2: 'Atualmente estudo um curso de TI, aprofundando em tecnologia e expandindo habilidades em administração de sistemas e redes. Este site é meu hub para gerenciar meu painel de servidor de Minecraft e outros servidores de jogo que rodo para jogar com amigos.',
        infoAgeLabel: 'Idade',
        infoAgeValue: '17',
        infoLocationLabel: 'Local',
        infoLocationValue: 'Reino Unido',
        infoHeritageLabel: 'Herança',
        infoHeritageValue: '🇬🇧 🇪🇸 🇵🇹',
        infoStudiesLabel: 'Estudos',
        infoStudiesValue: 'Curso de TI',
        vpnTitle: 'Acesso VPN',
        vpnPill: 'Portão seguro',
        vpnCopy: 'Digite a senha para baixar o perfil OpenVPN pré-configurado.',
        vpnPasswordPlaceholder: 'Senha',
        vpnButton: 'Baixar config VPN',
        supportTitle: 'Reportar um problema no servidor',
        supportPill: 'Precisa de ajuda?',
        supportLabelDiscord: 'Nome no Discord',
        supportPlaceholderDiscord: 'usuario#1234',
        supportLabelMC: 'Nome no Minecraft',
        supportPlaceholderMC: 'Steve',
        supportLabelTopic: 'Assunto',
        supportPlaceholderTopic: 'Resumo curto (ex.: não consigo entrar)',
        supportLabelDescription: 'Descreva o problema',
        supportPlaceholderDescription: 'Conte o que aconteceu, passos para reproduzir, mensagens de erro...',
        supportButton: 'Enviar email',
        supportNote: 'Isso vai abrir seu cliente de email endereçado a thiago197533@gmail.com',
        footerText: 'Hospedando e gerenciando servidores de jogo desde 2025'
    }
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
   INITIALIZATION
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    addButtonAnimations();
    initVpnDownload();
    initSupportForm();
    initLanguageSwitcher();
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

/* ========================================
   LANGUAGE SWITCHER / TRANSLATION
   ======================================== */
function initLanguageSwitcher() {
    const buttons = document.querySelectorAll('.lang-btn');
    if (!buttons.length) return;

    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    const initialLang = TRANSLATIONS[saved] ? saved : DEFAULT_LANG;

    const setActive = (lang) => {
        buttons.forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
    };

    const applyLang = (lang) => {
        applyTranslations(lang);
        setActive(lang);
        localStorage.setItem(LANG_STORAGE_KEY, lang);
    };

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            if (!TRANSLATIONS[lang]) return;
            applyLang(lang);
        });
    });

    applyLang(initialLang);
}

function applyTranslations(lang) {
    const pack = TRANSLATIONS[lang] || TRANSLATIONS[DEFAULT_LANG];
    document.documentElement.lang = lang;

    const container = document.querySelector('main.container');
    if (container) {
        container.classList.add('lang-transition');
        setTimeout(() => container.classList.remove('lang-transition'), 500);
    }

    document.querySelectorAll('[data-l10n-key]').forEach((el) => {
        const key = el.dataset.l10nKey;
        if (pack[key]) {
            el.textContent = pack[key];
        }
    });

    document.querySelectorAll('[data-l10n-placeholder]').forEach((el) => {
        const key = el.dataset.l10nPlaceholder;
        if (pack[key]) {
            el.placeholder = pack[key];
        }
    });
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
 * Support form handler - builds a mailto: link and opens the user's email client
 */
function initSupportForm() {
    const form = document.getElementById('support-form');
    if (!form) return;
    form.addEventListener('submit', (evt) => {
        evt.preventDefault();

        const discord = document.getElementById('discord-name')?.value.trim() || '';
        const mc = document.getElementById('mc-name')?.value.trim() || '';
        const topic = document.getElementById('topic')?.value.trim() || '';
        const description = document.getElementById('description')?.value.trim() || '';

        // Basic validation
        if (!topic) {
            alert('Please enter a short topic for the issue.');
            return;
        }

        if (!description) {
            alert('Please describe the issue so I can help.');
            return;
        }

        const to = 'thiago197533@gmail.com';
        const subject = `[Server issue] ${topic}`;
        const bodyLines = [
            `Discord: ${discord}`,
            `Minecraft: ${mc}`,
            '',
            'Issue description:',
            description,
            '',
            `Page: ${window.location.href}`
        ];

        const body = encodeURIComponent(bodyLines.join('\n'));
        const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${body}`;

        // Open the user's email client with the prefilled message (no modal, no confetti)
        window.location.href = mailto;
    });
}

/* ==========================
   Support modal helpers
   ========================== */
// Note: modal and confetti/test-mode removed per user request. Support form opens mail client directly.

/**
 * Log initialization
 */
console.log('🚀 Thiago\'s Website Initialized');
console.log('⚡ Typing animation active');
