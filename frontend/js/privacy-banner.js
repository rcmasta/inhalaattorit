// Privacy notice banner shown on first visit until dismissed.
// Stores acknowledgment in localStorage so it does not show again.
import { getLang } from './lang.js';

const STORAGE_KEY = 'privacy-notice-seen';

const messages = {
    fi: {
        before: 'Käyttämällä sivustoa hyväksyt ',
        link: 'tietosuojaselosteen',
        after: '.',
        dismiss: 'OK'
    },
    sv: {
        before: 'Genom att använda webbplatsen godkänner du ',
        link: 'dataskyddsbeskrivningen',
        after: '.',
        dismiss: 'OK'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    showBanner();
});

function showBanner() {
    const lang = getLang();
    const t = messages[lang] || messages.fi;

    const banner = document.createElement('div');
    banner.className = 'privacy-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', t.before + t.link + t.after);

    // link is inline in the sentence: "By using the site you accept [the privacy policy]."
    const textWrap = document.createElement('span');
    textWrap.className = 'privacy-banner__text';

    const link = document.createElement('a');
    link.className = 'privacy-banner__link';
    link.href = 'tietosuoja.html';
    link.textContent = t.link;

    textWrap.append(t.before, link, t.after);

    const dismissBtn = document.createElement('button');
    dismissBtn.type = 'button';
    dismissBtn.className = 'privacy-banner__dismiss';
    dismissBtn.textContent = t.dismiss;
    dismissBtn.addEventListener('click', () => {
        localStorage.setItem(STORAGE_KEY, '1');
        banner.remove();
    });

    banner.append(textWrap, dismissBtn);
    document.body.appendChild(banner);
}
