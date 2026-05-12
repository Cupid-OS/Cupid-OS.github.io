/* ========================================
   CONFIGURATION
   ======================================== */

const LANG_STORAGE_KEY = 'cupidexe-language';
const DEFAULT_LANG = 'en';

const TRANSLATIONS = {
    en: {
        eyebrow: 'Y2K control panel · v2.5',
        title: 'Welcome!',
        subtitle: "I'm Thiago",
        lead: 'Game servers, VPN access, and tools wrapped in a retro-future shell.',
        panelButton: 'Access Server Panel',
        tag1: 'Minecraft + friends',
        tag2: 'Network admin',
        tag3: 'Multilingual mix',
        scrollPrompt: 'Scroll down',
        aboutTitle: 'About Me',
        statusOnline: 'Status: Online',
        aboutP1: "Hi there! I'm a 18-year-old tech enthusiast with a multicultural background. Born in the UK with Spanish and Portuguese heritage, I bring a diverse perspective to everything I do.",
        aboutP2: 'Currently, I am studying an IT course, diving deep into technology and expanding my skills in systems administration and networking. This website serves as my hub for managing my Minecraft server panel and other game servers that I run for playing with friends.',
        infoAgeLabel: 'Age',
        infoAgeValue: '18',
        infoLocationLabel: 'Location',
        infoLocationValue: 'UK',
        infoHeritageLabel: 'Heritage',
        infoHeritageValue: 'UK ES PT',
        infoStudiesLabel: 'Studies',
        infoStudiesValue: 'IT Course',
        footerText: 'Hosting and managing game servers since 2025'
    },
    es: {
        eyebrow: 'Panel de control Y2K · v2.5',
        title: 'Bienvenido!',
        subtitle: 'Soy Thiago',
        lead: 'Servidores de juego, acceso VPN y herramientas con una estetica retrofuturista.',
        panelButton: 'Acceder al Panel del Servidor',
        tag1: 'Minecraft + amigos',
        tag2: 'Admin de red',
        tag3: 'Mezcla multilingue',
        scrollPrompt: 'Bajar',
        aboutTitle: 'Sobre Mi',
        statusOnline: 'Estado: En linea',
        aboutP1: 'Hola! Soy un entusiasta de tecnologia de 18 anos con un contexto multicultural. Naci en el Reino Unido con herencia espanola y portuguesa, y aporto una perspectiva diversa a todo lo que hago.',
        aboutP2: 'Actualmente estudio un curso de IT, profundizando en tecnologia y ampliando habilidades en administracion de sistemas y redes. Este sitio es mi centro para gestionar mi panel de Minecraft y otros servidores de juego para jugar con amigos.',
        infoAgeLabel: 'Edad',
        infoAgeValue: '18',
        infoLocationLabel: 'Ubicacion',
        infoLocationValue: 'Reino Unido',
        infoHeritageLabel: 'Herencia',
        infoHeritageValue: 'UK ES PT',
        infoStudiesLabel: 'Estudios',
        infoStudiesValue: 'Curso de IT',
        footerText: 'Alojando y gestionando servidores de juego desde 2025'
    },
    pt: {
        eyebrow: 'Painel de controle Y2K · v2.5',
        title: 'Bem-vindo!',
        subtitle: 'Sou o Thiago',
        lead: 'Servidores de jogo, acesso VPN e ferramentas com visual retrofuturista.',
        panelButton: 'Acessar Painel do Servidor',
        tag1: 'Minecraft + amigos',
        tag2: 'Admin de rede',
        tag3: 'Mistura multilingue',
        scrollPrompt: 'Descer',
        aboutTitle: 'Sobre Mim',
        statusOnline: 'Status: Online',
        aboutP1: 'Oi! Sou um entusiasta de tecnologia de 18 anos com historico multicultural. Nascido no Reino Unido com heranca espanhola e portuguesa, trago uma perspectiva diversa para tudo o que faco.',
        aboutP2: 'Atualmente estudo um curso de IT, aprofundando em tecnologia e ampliando habilidades em administracao de sistemas e redes. Este site e meu hub para gerenciar meu painel de Minecraft e outros servidores para jogar com amigos.',
        infoAgeLabel: 'Idade',
        infoAgeValue: '18',
        infoLocationLabel: 'Local',
        infoLocationValue: 'Reino Unido',
        infoHeritageLabel: 'Heranca',
        infoHeritageValue: 'UK ES PT',
        infoStudiesLabel: 'Estudos',
        infoStudiesValue: 'Curso de IT',
        footerText: 'Hospedando e gerenciando servidores de jogo desde 2025'
    }
};

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
    const buttons = document.querySelectorAll('.panel-button');

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            button.style.transform = 'scale(0.97)';
            setTimeout(() => {
                button.style.transform = '';
            }, 100);
        });
    });
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
        buttons.forEach((btn) => btn.classList.toggle('active', btn.dataset.lang === lang));
    };

    const applyLang = (lang) => {
        applyTranslations(lang);
        setActive(lang);
        localStorage.setItem(LANG_STORAGE_KEY, lang);
    };

    buttons.forEach((btn) => {
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
}
