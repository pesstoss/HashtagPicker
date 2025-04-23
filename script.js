const hashtags = {
    general: "#shuttersisters #bokehbros #snap_community_member #snap_potd #podium #pictas #rebels_united #fotomasters #elitepix #picplanet #exquisitepics20 #hey_ihadtosnapthat2 #imagehub #shutter_stories",
    bnw: "#bnw_bistro #snap_bnw #podium_mono #monomoods_photography #monomoods_street #rebel_bnw #pictasmonochrome #elitepix_mono #monoculture",
    art: "#snap_artgallery #snap_communityarts #bpa_arts #pictasart #snap_allblack #snap_allwhite #snap_colours #snap_colorsplash #snap_abstract #seeing_abstract #snap_surreal #snap_edit #snap_minimal #snap_filmfoto #snap_flatlays #ArtWithoutBorders #art_to_share",
    genre: "#snap_macro #podium_macro #rebel_macro #snap_moody #pictasmoody #snap_mobile #snap_numbers #snap_textures #snap_symmetry #snap_silhouette #snap_reflection #snap_depthoffield #snap_longexposure",
    spec: "#click_machines #click_astro #snap_ai #ai_magazine #snap_drone #pictasdrone #snap_cuteness #creepydollsaturday #Sunday_Churches #Sat_door_day",
    city: "#snap_cityscape #snap_architecture #snap_street #podium_street #pictasstreet #snap_abandoned #snap_bridges #snap_transports #snap_lighthouses",
    world: "#snap_world #snap_asia #snap_china #snap_thailand #snap_india #snap_africa #snap_middleeast #snap_australia #snap_usa #snap_canada #snap_nordic #snap_europe #snap_uk #snap_ireland #snap_germany #snap_france #pictastravel",
    nature: "#snap_allnature #snap_alltrees #snap_flowers #snap_gardening #snap_landscape #snap_waters #snap_beaches #snap_mountains #snap_country #snap_hikes #snap_seasons #snap_drops #snap_foggy #snap_skies #rebel_sky #snap_nightshots #podium_night",
    animal: "#snap_wildlife #podium_wildlife #twowa #pictasanimals #snap_herpetology #snap_butterflies #snap_oceanlife #snap_insects #snap_horses #snap_fishing #snap_pets #click_dogs #snap_cats #snap_birds #pictasbirds #BIFFeatures",
    human: "#snap_people #podium_portraits #pictasportrait #pictasboudoir #snap_tattoos #snap_writings #snap_books #snap_allsports #snap_toys #snap_coffee #snap_kitchen #pictasfood"
};

const themeSelect = document.getElementById('theme');
const resultDiv = document.getElementById('result');
const clipboardDisplay = document.getElementById('clipboardDisplay');
const copyButton = document.getElementById('copyButton');
const transferSelectedButton = document.getElementById('transferSelectedButton');
const transferAllButton = document.getElementById('transferAllButton');
const modifyButton = document.getElementById('modifyButton');
let activeTab = null;

themeSelect.addEventListener('change', () => {
    const selectedTheme = themeSelect.value;
    const hashtagString = hashtags[selectedTheme] || '';
    const hashtagArray = hashtagString.split(' ');

    resultDiv.innerHTML = '';

    hashtagArray.forEach(hashtag => {
        const span = document.createElement('span');
        span.textContent = hashtag;
        resultDiv.appendChild(span);
        span.addEventListener('click', toggleSelected);
    });

    transferSelectedButton.style.display = hashtagString ? 'block' : 'none';
    transferAllButton.style.display = hashtagString ? 'block' : 'none';
});

document.addEventListener('DOMContentLoaded', function() {
    const infoButton = document.getElementById('infoButton');
    const infoBalloon = document.getElementById('infoBalloon');

    infoButton.addEventListener('click', function() {
        if (infoBalloon.style.display === 'none' || infoBalloon.style.display === '') {
            infoBalloon.style.display = 'block';
        } else {
            infoBalloon.style.display = 'none';
        }
    });

    document.addEventListener('click', function(event) {
        if (infoBalloon && !infoBalloon.contains(event.target) && event.target !== infoButton) {
            infoBalloon.style.display = 'none';
        }
    });
});

function toggleSelected() {
    this.classList.toggle('selected');
}

transferSelectedButton.addEventListener('click', () => {
    transferHashtags('selected');
});

transferAllButton.addEventListener('click', () => {
    transferHashtags('all');
});

function transferHashtags(selectionType) {
    const selectedTheme = themeSelect.value;
    let hashtagsToTransfer;

    if (selectionType === 'selected') {
        hashtagsToTransfer = Array.from(resultDiv.querySelectorAll('span.selected'));
    } else {
        hashtagsToTransfer = Array.from(resultDiv.querySelectorAll('span'));
    }

    if (hashtagsToTransfer.length > 0) {
        let tabDiv = document.getElementById(`tab-${selectedTheme}`);
        if (!tabDiv) {
            createTab(selectedTheme);
            tabDiv = document.getElementById(`tab-${selectedTheme}`);
        }

        const existingClipboardHashtags = Array.from(tabDiv.querySelectorAll('span')).map(span => span.textContent);
        const newHashtags = [];
        const duplicateHashtags = [];

        hashtagsToTransfer.forEach(span => {
            if (!existingClipboardHashtags.includes(span.textContent)) {
                const clonedSpan = span.cloneNode(true);
                tabDiv.appendChild(clonedSpan);
                newHashtags.push(span.textContent);
            } else {
                duplicateHashtags.push(span.textContent);
            }
        });

        Array.from(tabDiv.querySelectorAll('span')).forEach(span => {
            span.removeEventListener('click', toggleClipboardSelected);
            span.addEventListener('click', toggleClipboardSelected);
        });

        showTab(selectedTheme);
        modifyButton.style.display = 'block';
        copyButton.style.display = 'block';

        if (newHashtags.length > 0 && duplicateHashtags.length > 0) {
            alert("Existing ignored!");
        } else if (newHashtags.length > 0 && duplicateHashtags.length === 0) {
            // No message for only new items added
        } else if (newHashtags.length === 0) {
            alert("Already added!");
        }
    }
}

function createTab(theme) {
    const tabButton = document.createElement('button');
    tabButton.textContent = theme.toUpperCase();
    tabButton.classList.add('tab-button');
    tabButton.addEventListener('click', () => showTab(theme));
    clipboardDisplay.querySelector('.tab-buttons').appendChild(tabButton);

    const tabDiv = document.createElement('div');
    tabDiv.id = `tab-${theme}`;
    tabDiv.classList.add('tab-content');
    clipboardDisplay.querySelector('.tab-contents').appendChild(tabDiv);
}

function showTab(theme) {
    if (activeTab) {
        document.getElementById(`tab-${activeTab}`).style.display = 'none';
    }
    document.getElementById(`tab-${theme}`).style.display = 'block';
    activeTab = theme;
}

modifyButton.addEventListener('click', () => {
    const clipboardSpans = Array.from(clipboardDisplay.querySelectorAll('span'));
    clipboardSpans.forEach(span => {
        span.addEventListener('click', toggleClipboardSelected);
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Selected';
    deleteButton.addEventListener('click', () => {
        const selectedClipboardHashtags = Array.from(clipboardDisplay.querySelectorAll('span.selected'));
        selectedClipboardHashtags.forEach(span => {
            span.remove();
        });
    });

    modifyButton.parentNode.appendChild(deleteButton);
    modifyButton.style.display = 'none';

    copyButton.textContent = "Finish Modify";
    copyButton.onclick = () => {
        deleteButton.remove();
        modifyButton.style.display = 'block';
        copyButton.textContent = "Copy to Clipboard";
        copyButton.onclick = copyText;
    };
});

function toggleClipboardSelected() {
    this.classList.toggle('selected');
}

function copyText() {
    const clipboardHashtags = Array.from(clipboardDisplay.querySelectorAll('span'));
    const clipboardText = clipboardHashtags.map(span => span.textContent).join(' ');

    if (clipboardText) {
        navigator.clipboard.writeText(clipboardText).then(() => {
            copyButton.textContent = "All Done!";
            copyButton.onclick = resetAndGoHome;
        }).catch(err => {
            console.error('Could not copy text: ', err);
            alert('Could not copy text.');
        });
    } else {
        alert('Clipboard is empty.');
    }
}

function resetAndGoHome() {
    resultDiv.innerHTML = '';
    clipboardDisplay.querySelector('.tab-contents').innerHTML = '';
    clipboardDisplay.querySelector('.tab-buttons').innerHTML = '';
    copyButton.textContent = "Copy to Clipboard";
    copyButton.onclick = copyText;
    transferSelectedButton.style.display = 'none';
    transferAllButton.style.display = 'none';
    modifyButton.style.display = 'none';
    themeSelect.value = "empty";
    activeTab = null;
}

copyButton.onclick = copyText;

clipboardDisplay.innerHTML = '<div class="tab-buttons"></div><div class="tab-contents"></div>';
