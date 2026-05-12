/* ========================================
   CONFIGURATION
   ======================================== */

// Typing animation removed; static title with translations now.
};

// VPN delivery removed (no longer used)
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
        aboutP1: 'Oi! Sou um entusiasta de tecnologia de 18 anos com um histórico multicultural. Nascido no Reino Unido com herança espanhola e portuguesa, trago uma perspectiva diversa para tudo o que faço.',
        aboutP2: 'Atualmente estudo um curso de TI, aprofundando em tecnologia e expandindo habilidades em administração de sistemas e redes. Este site é meu hub para gerenciar meu painel de servidor de Minecraft e outros servidores de jogo que rodo para jogar com amigos.',
        infoAgeLabel: 'Idade',
        infoAgeValue: '18',
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
// initVpnDownload removed

/* ==========================
   Support modal helpers
   ========================== */
// Note: modal and confetti/test-mode removed per user request. Support form opens mail client directly.

/**
 * Log initialization
 */
console.log('🚀 Thiago\'s Website Initialized');
console.log('⚡ Typing animation active');
