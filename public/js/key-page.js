var keyValue = document.getElementById('key');
var copyButton = document.getElementById('copyButton');

const delay = ms => new Promise(res => setTimeout(res, ms));

function getCookie(cookieName) {
    var cookies = document.cookie;
    var key = cookieName + '=';
    var start = cookies.indexOf(key);

    if (start === -1) return null;

    var pos = start + key.length;
    var last = cookies.indexOf(';', pos);

    if (last !== -1) return cookies.substring(pos, last);

    return cookies.substring(pos);
};

async function copyKey() {
    if (keyValue.textContent == '') {
        copyButton.textContent = 'Key not avaliable';
        copyButton.style.backgroundColor = '#ff3f3f';
        await delay(3000);
        copyButton.textContent = 'Copy Key';
        copyButton.style.backgroundColor = 'var(--purple)';
    } else {
        navigator.clipboard.writeText(keyValue.textContent);
        copyButton.textContent = 'Copied!';
        await delay(3000);
        copyButton.textContent = 'Copy Key';
    }
}

keyValue.textContent = getCookie('key');

if (document.referrer.indexOf('linkvertise.com') == -1) {
    window.location.href = '/';
}