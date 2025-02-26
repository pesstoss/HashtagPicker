const allHashtags = [
    "#bokehbros", "#shuttersisters", "#podium", "#pictas", "#rebels_united", "#bpa_arts", "#fotomasters", "#elitepix", "#picplanet", "#exquisitepics20", "#hey_ihadtosnapthat2",
    "#snap_abstract", "#snap_surreal", "#snap_communityarts", "#snap_artgallery", "#pictasart", "#snap_textures", "#snap_minimal", "#snap_potd", "#snap_longexposure", "#snap_depthoffield", "#snap_nightshots", "#podium_night",
    "#snap_reflection", "#snap_symmetry", "#snap_silhouette", "#snap_cuteness", "#snap_moody", "#pictasmoody", "#snap_mobile", "#snap_macro", "#podium_macro", "#rebel_macro", "#snap_edit", "#snap_filmfoto", "#snap_colours", "#snap_colorsplash", "#snap_ai", "#snap_numbers",
    "#click_dogs", "#click_machines", "#click_astro", "#creepydollsaturday", "#Sunday_Churches", "#Sat_door_day", "#pictasdrone", "#snap_drone",
    "#snap_bnw", "#snap_allwhite", "#snap_allblack", "#podium_mono", "#monomoods_photography", "#monomoods_street", "#rebel_bnw", "#pictasmonochrome", "#bnw_bistro", "#elitepix_mono", "#monoculture",
    "#snap_cityscape", "#snap_architecture", "#snap_lighthouses", "#snap_abandoned", "#snap_bridges", "#snap_transports", "#snap_homestyle", "#snap_flatlays",
    "#snap_world", "#snap_asia", "#snap_africa", "#snap_europe", "#snap_canada", "#snap_nordic", "#snap_uk", "#snap_germany", "#snap_nordic", "#snap_ireland", "#snap_france", "#snap_india", "#snap_china", "#snap_thailand", "#snap_middleeast", "#pictastravel",
    "#snap_wildlife", "#snap_herpetology", "#snap_butterflies", "#snap_oceanlife", "#snap_insects", "#snap_horses", "#snap_birds", "#snap_fishing", "#snap_birds", "#snap_pets", "#snap_cats", "#snap_allnature", "#snap_beaches", "#snap_waters", "#snap_drops",
    "#snap_foggy", "#snap_landscape", "#snap_mountains", "#snap_country", "#snap_hikes", "#snap_skies", "#snap_gardening", "#snap_alltrees", "#snap_flowers", "#snap_seasons", "#podium_wildlife", "#pictasbirds", "#BIFFeatures", "#pictasanimals", "#rebel_sky",
    "#snap_people", "#snap_tattoos", "#snap_street", "#snap_writings", "#snap_books", "#snap_allsports", "#snap_coffee", "#snap_kitchen", "#snap_toys", "#podium_portraits", "#podium_street", "#pictasportrait", "#pictasstreet", "#pictasboudoir", "#pictasfood"
];

const hashtags = {
    general: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    spec1: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
    spec2: [23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 48], //Added 48 here
    vspec: [39, 40, 41, 42, 43, 44, 45, 46],
    bnw: [47, 49, 50, 51, 52, 53, 54, 55, 56, 57], //Removed 48 here
    city: [58, 59, 60, 61, 62, 63, 64, 65],
    world: [66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81],
    nature1: [82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96],
    nature2: [97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111],
    human: [112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126]
};

const themeSelect = document.getElementById('theme');
const hashtagDisplay = document.getElementById('hashtagDisplay');
const clipboardDisplay = document.getElementById('clipboardDisplay');
const transferSelectedButton = document.getElementById('transferSelectedButton');
const transferAllButton = document.getElementById('transferAllButton');
const modifyButton = document.getElementById('modifyButton');
const doneButton = document.getElementById('doneButton');

function resetDisplays() {
    hashtagDisplay.innerHTML = '';
    transferSelectedButton.style.display = 'none';
    transferAllButton.style.display = 'none';
}

resetDisplays();

themeSelect.addEventListener('change', () => {
    const selectedTheme = themeSelect.value;
    resetDisplays();

    if (hashtags[selectedTheme]) {
        hashtags[selectedTheme].forEach(index => {
            const hashtag = allHashtags[index];
            const span = document.createElement('span');
            let displayHashtag = hashtag;

            if (window.innerWidth <= 768) {
                displayHashtag = hashtag.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/_/g, ' ');
            }

            span.textContent = displayHashtag;
            hashtagDisplay.appendChild(span);
            span.addEventListener('click', toggleSelected);
            span.addEventListener('touchstart', toggleSelected);

            function toggleSelected(event) {
                event.preventDefault();
                span.classList.toggle('selected');
            }
        });

        transferSelectedButton.style.display = 'block';
        transferAllButton.style.display = 'block';
    }
});

transferSelectedButton.addEventListener('click', transferSelected);
transferSelectedButton.addEventListener('touchstart', transferSelected);

function transferSelected() {
    const selectedHashtags = Array.from(hashtagDisplay.querySelectorAll('span.selected'));
    selectedHashtags.forEach(span => {
        clipboardDisplay.appendChild(span);
        span.classList.remove('selected');
        span.removeEventListener('click', toggleClipboardSelected);
        span.removeEventListener('touchstart', toggleClipboardSelected);
        span.addEventListener('click', toggleClipboardSelected);
        span.addEventListener('touchstart', toggleClipboardSelected);
    });
    modifyButton.style.display = 'block';
    doneButton.style.display = 'block';
}

transferAllButton.addEventListener('click', transferAll);
transferAllButton.addEventListener('touchstart', transferAll);

function transferAll() {
    const allHashtags = Array.from(hashtagDisplay.querySelectorAll('span'));
    allHashtags.forEach(span => {
        clipboardDisplay.appendChild(span);
        span.classList.remove('selected');
        span.removeEventListener('click', toggleClipboardSelected);
        span.removeEventListener('touchstart',
                                 
