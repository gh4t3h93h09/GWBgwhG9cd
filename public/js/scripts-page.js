const searchInput = document.getElementById('search-input');
const copyButton = document.getElementById('copy-script');
let scriptCode

const delay = ms => new Promise(res => setTimeout(res, ms));

function getVideoId(url) {
    const start = url.indexOf('v=');
    if (start !== -1) {
        const videoId = url.substring(start + 2);

        return videoId;
    } else {
        console.log('Não foi possível encontrar o valor do vídeo.');

        return null;
    }
};

fetch('./videos-data.json')
    .then(response => response.json())
    .then(data => {
        for (video in data) {
            const videosContainer = document.getElementById('videos');

            const template = document.getElementById('template');
            const clone = template.content.cloneNode(true);

            let progress = []

            let buttonElement = clone.getElementById('video');
            buttonElement.textContent = data[video].title;
            buttonElement.style.backgroundImage = 'url(http://img.youtube.com/vi/' + getVideoId(data[video].url) + '/0.jpg)'
            buttonElement.setAttribute('name', data[video].url);
            buttonElement.setAttribute('value', data[video].script);

            videosContainer.appendChild(clone);

            const videoTitle = document.getElementById('video-title');
            const urlTitle = document.getElementById('url-title');
            const scriptTitle = document.getElementById('script-title');
            const subscribeChannel = document.getElementById('subscribe-channel');
            const likeVideo = document.getElementById('like-video');
            const unlockProgress = document.getElementById('unlock-progress');
            const getScript = document.getElementById('get-script');
            const closeModal = document.getElementById('close');
            const closeScript = document.getElementById('close-script');

            buttonElement.onclick = function () {
                progress = [];

                const navbar = document.getElementById('navbar');
                const mainContainer = document.getElementById('main-container');
                const popUp = document.getElementById('pop-up');
                navbar.style.filter = 'opacity(0.3)';
                mainContainer.style.filter = 'opacity(0.3)';
                popUp.style.display = 'flex';

                videoTitle.textContent = buttonElement.textContent;
                urlTitle.textContent = buttonElement;
                urlTitle.textContent = buttonElement.getAttribute('name');
                scriptTitle.textContent = buttonElement.getAttribute('value');
            };

            likeVideo.onclick = function () {
                window.open(urlTitle.textContent, '_blank');
                if (!progress.includes('liked')) {
                    progress.push('liked');
                }

                setInterval(() => {
                    if (progress.length == 0) {
                        unlockProgress.textContent = 'unlock progress 0/2';
                    } else if (progress.length == 1) {
                        unlockProgress.textContent = 'unlock progress 1/2';
                    } else {
                        unlockProgress.textContent = 'unlock progress 2/2';
                        getScript.removeAttribute("disabled");
                    }
                }, 5000);
            }

            subscribeChannel.onclick = function () {
                window.open('https://www.youtube.com/@Sr_LDS?sub_confirmation=1', '_blank');

                if (!progress.includes('sub')) {
                    progress.push('sub');
                }

                setInterval(() => {
                    if (progress.length == 0) {
                        unlockProgress.textContent = 'unlock progress 0/2';
                    } else if (progress.length == 1) {
                        unlockProgress.textContent = 'unlock progress 1/2';
                    } else {
                        unlockProgress.textContent = 'unlock progress 2/2';
                        getScript.removeAttribute("disabled");
                        getScript.style.backgroundColor = 'var(--purple)';
                        getScript.style.color = '#fff';
                    }
                }, 5000);
            }


            getScript.onclick = function () {
                if (videoTitle.textContent.includes('LDS HUB')) {
                    window.location.href = 'hubs.html';
                } else {
                    const popUp = document.getElementById('pop-up');
                    const scriptContainer = document.getElementById('script-container');
                    scriptCode = document.getElementById('script-code');
                    popUp.style.display = 'none';
                    scriptContainer.style.display = 'flex';
                    scriptCode.textContent = scriptTitle.textContent;
                }
            }

            closeModal.onclick = function () {
                const navbar = document.getElementById('navbar');
                const mainContainer = document.getElementById('main-container');
                const popUp = document.getElementById('pop-up');
                navbar.style.filter = '';
                mainContainer.style.filter = '';
                popUp.style.display = 'none';

                progress = [];
                unlockProgress.textContent = 'unlock progress 0/2';
                getScript.setAttribute("disabled", "disabled");
                getScript.style.backgroundColor = '#d6d9e3';
                getScript.style.color = '#000';
            };

            closeScript.onclick = function () {
                const navbar = document.getElementById('navbar');
                const mainContainer = document.getElementById('main-container');
                const scriptContainer = document.getElementById('script-container');
                navbar.style.filter = '';
                mainContainer.style.filter = '';
                scriptContainer.style.display = 'none';

                progress = [];
                unlockProgress.textContent = 'unlock progress 0/2';
                getScript.setAttribute("disabled", "disabled");
                getScript.style.backgroundColor = '#d6d9e3';
                getScript.style.color = '#000';
            };

            searchInput.addEventListener('input', e => {
                const value = e.target.value.toLowerCase();
                const isVisible = buttonElement.textContent.toLowerCase().includes(value);
                buttonElement.classList.toggle('hide', !isVisible);
            });
        };
    });

async function copyScript() {
    if (scriptCode.textContent == '') {
        copyButton.textContent = 'Key not avaliable';
        copyButton.style.backgroundColor = '#ff3f3f';
        await delay(3000);
        copyButton.textContent = 'Copy Key';
        copyButton.style.backgroundColor = 'var(--purple)';
    } else {
        navigator.clipboard.writeText(scriptCode.textContent);
        copyButton.textContent = 'Copied!';
        await delay(3000);
        copyButton.textContent = 'Copy Key';
    }
};