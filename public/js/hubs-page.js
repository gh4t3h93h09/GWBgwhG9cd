const delay = ms => new Promise(res => setTimeout(res, ms));

fetch('./hub-code.json')
    .then(response => response.json())
    .then(data => {
        const hubCode = document.getElementById('hub-code');
        hubCode.textContent = data;
    })

fetch('./supported-games.json')
    .then(response => response.json())
    .then(data => {
        const games = document.getElementById('games');

        for (var game in data) {
            const template = document.getElementById('template');
            const clone = template.content.cloneNode(true);

            const gameIcon = clone.getElementById('game-icon');
            const gameName = clone.getElementById('game-name');
            gameIcon.src = data[game].icon;
            gameName.textContent = data[game].name

            games.appendChild(clone);
        }
    })

function openPopUp() {
    const navbar = document.getElementById('navbar');
    const mainContainer = document.getElementById('main-container');
    const popUp = document.getElementById('pop-up');
    navbar.style.filter = 'opacity(0.3)';
    mainContainer.style.filter = 'opacity(0.3)';
    popUp.style.display = 'flex';
}

function closePopUp() {
    const navbar = document.getElementById('navbar');
    const mainContainer = document.getElementById('main-container');
    const popUp = document.getElementById('pop-up');
    navbar.style.filter = '';
    mainContainer.style.filter = '';
    popUp.style.display = 'none';
}

async function copyScript() {
    const hubCode = document.getElementById('hub-code');
    const copyButton = document.getElementById('copy-script');

    if (hubCode.innerHTML == '') {
        copyButton.innerHTML = 'Code not avaliable';
        copyButton.style.backgroundColor = '#ff3f3f';
        await delay(3000);
        copyButton.innerHTML = 'Copy Key';
        copyButton.style.backgroundColor = 'var(--purple)';
    }
    else {
        navigator.clipboard.writeText(hubCode.innerHTML);
        copyButton.innerHTML = 'Copied!';
        await delay(3000);
        copyButton.innerHTML = 'Copy Key';
    }
}