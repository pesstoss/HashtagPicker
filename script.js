const hashtags = {
    general: "#bokehbros #shuttersisters #snap_community_member #snap_potd #podium #pictas #rebels_united #bpa_arts #fotomasters #elitepix #picplanet #exquisitepics20 #hey_ihadtosnapthat2 #imagehub",
    art: "#snap_artgallery #snap_communityarts #pictasart #snap_allblack #snap_allwhite #snap_colours #snap_colorsplash #snap_abstract #snap_surreal #snap_edit #snap_minimal #snap_filmfoto #snap_flatlays",
    spec: "#snap_depthoffield #snap_macro #podium_macro #rebel_macro #snap_longexposure #snap_reflection #snap_symmetry #snap_silhouette #snap_cuteness #snap_moody #pictasmoody #snap_mobile #snap_numbers #snap_textures",
    vspec: "#click_dogs #click_machines #click_astro #creepydollsaturday #Sunday_Churches #Sat_door_day #pictasdrone #snap_drone #snap_ai #ai_magazine",
    bnw: "#snap_bnw #podium_mono #monomoods_photography #monomoods_street #rebel_bnw #pictasmonochrome #bnw_bistro #elitepix_mono #monoculture",
    city: "#snap_cityscape #snap_architecture #snap_abandoned #snap_bridges #snap_transports #snap_lighthouses",
    world: "#snap_world #snap_asia #snap_china #snap_thailand #snap_india #snap_africa #snap_middleeast #snap_usa #snap_canada #snap_nordic #snap_europe #snap_uk #snap_ireland #snap_germany #snap_france #pictastravel",
    nature: "#snap_allnature #snap_alltrees #snap_flowers #snap_gardening #snap_landscape #snap_waters #snap_beaches #snap_mountains #snap_country #snap_hikes #snap_seasons #snap_drops #snap_foggy #snap_skies #rebel_sky #snap_nightshots #podium_night",
    fauna: "#snap_wildlife #podium_wildlife #pictasanimals #snap_herpetology #snap_butterflies #snap_oceanlife #snap_insects #snap_horses #snap_fishing #snap_pets #snap_cats #snap_birds #pictasbirds #BIFFeatures",
    human: "#snap_people #podium_portraits #pictasportrait #pictasboudoir #snap_tattoos #snap_street #podium_street #pictasstreet #snap_writings #snap_books #snap_allsports #snap_toys #snap_coffee #snap_kitchen #pictasfood"
};

const themeSelect = document.getElementById('theme');
const resultDiv = document.getElementById('result');
const clipboardDisplay = document.getElementById('clipboardDisplay');
const copyButton = document.getElementById('copyButton');
const transferSelectedButton = document.getElementById('transferSelectedButton');
const transferAllButton = document.getElementById('transferAllButton');
const modifyButton = document.getElementById('modifyButton');

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

function toggleSelected() {
    this.classList.toggle('selected');
}

transferSelectedButton.addEventListener('click', () => {
    const selectedHashtags = Array.from(resultDiv.querySelectorAll('span.selected'));
    selectedHashtags.forEach(span => {
        clipboardDisplay.appendChild(span);
        span.classList.remove('selected');
        span.removeEventListener('click', toggleSelected);
        span.addEventListener('click', toggleClipboardSelected);
    });
    modifyButton.style.display = 'block';
    copyButton.style.display = 'block';
});

transferAllButton.addEventListener('click', () => {
    const allHashtags = Array.from(resultDiv.querySelectorAll('span'));
    allHashtags.forEach(span => {
        clipboardDisplay.appendChild(span);
        span.classList.remove('selected');
        span.removeEventListener('click', toggleSelected);
        span.addEventListener('click', toggleClipboardSelected);
    });
    modifyButton.style.display = 'block';
    copyButton.style.display = 'block';
});

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
            copyButton.textContent = "Done!";
            copyButton.onclick = resetAll; // Change the button's action
        }).catch(err => {
            console.error('Could not copy text: ', err);
            alert('Could not copy text.');
        });
    } else {
        alert('Clipboard is empty.');
    }
}

function resetAll() {
    resultDiv.innerHTML = '';
    clipboardDisplay.innerHTML = '';
    copyButton.textContent = "Copy to Clipboard";
    copyButton.onclick = copyText;
    transferSelectedButton.style.display = 'none';
    transferAllButton.style.display = 'none';
    modifyButton.style.display = 'none';
}

copyButton.onclick = copyText;
