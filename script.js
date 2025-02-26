const hashtags = {
    general: "#bokehbros #shuttersisters #podium #pictas #rebels_united #bpa_arts #fotomasters #elitepix #picplanet #exquisitepics20 #hey_ihadtosnapthat2",
    spec1: "#snap_abstract #snap_surreal #snap_communityarts #snap_artgallery #pictasart #snap_textures #snap_minimal #snap_potd #snap_longexposure #snap_depthoffield #snap_nightshots #podium_night",
    spec2: "#snap_reflection #snap_symmetry #snap_silhouette #snap_cuteness #snap_moody #pictasmoody #snap_mobile #snap_macro #podium_macro #rebel_macro #snap_edit #snap_filmfoto #snap_colours #snap_colorsplash #snap_ai #snap_numbers",
    vspec: "#click_dogs #click_machines #click_astro #creepydollsaturday #Sunday_Churches #Sat_door_day #pictasdrone #snap_drone",
    bnw: "#snap_bnw #snap_allwhite #snap_allblack #podium_mono #monomoods_photography #monomoods_street #rebel_bnw #pictasmonochrome #bnw_bistro #elitepix_mono #monoculture",
    city: "#snap_cityscape #snap_architecture #snap_lighthouses #snap_abandoned #snap_bridges #snap_transports #snap_homestyle #snap_flatlays",
    world: "#snap_world #snap_asia #snap_africa #snap_europe #snap_canada #snap_nordic #snap_uk #snap_germany #snap_nordic #snap_ireland #snap_france #snap_india #snap_china #snap_thailand #snap_middleeast #pictastravel",
    nature1: "#snap_wildlife #snap_herpetology #snap_butterflies #snap_oceanlife #snap_insects #snap_horses #snap_birds #snap_fishing #snap_birds #snap_pets #snap_cats #snap_allnature #snap_beaches #snap_waters #snap_drops",
    nature2: "#snap_foggy #snap_landscape #snap_mountains #snap_country #snap_hikes #snap_skies #snap_gardening #snap_alltrees #snap_flowers #snap_seasons #podium_wildlife #pictasbirds #BIFFeatures #pictasanimals #rebel_sky",
    human: "#snap_people #snap_tattoos #snap_street #snap_writings #snap_books #snap_allsports #snap_coffee #snap_kitchen #snap_toys #podium_portraits #podium_street #pictasportrait #pictasstreet #pictasboudoir #pictasfood"
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
        const hashtagArray = hashtags[selectedTheme].split(' ');
        hashtagArray.forEach(hashtag => {
            const span = document.createElement('span');
            let displayHashtag = hashtag;

            if (window.innerWidth <= 768) {
                displayHashtag = hashtag.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/_/g, ' ');
            }

            span.textContent = displayHashtag;
            hashtagDisplay.appendChild(span);
            span.addEventListener('click', () => {
                span.classList.toggle('selected');
            });
        });

        transferSelectedButton.style.display = 'block';
        transferAllButton.style.display = 'block';
    }
});

transferSelectedButton.addEventListener('click', () => {
    const selectedHashtags = Array.from(hashtagDisplay.querySelectorAll('span.selected'));
    selectedHashtags.forEach(span => {
        clipboardDisplay.appendChild(span);
        span.classList.remove('selected');
        span.removeEventListener('click', () => {});
        span.addEventListener('click', () => {
            span.classList.toggle('selected');
        });
    });
    modifyButton.style.display = 'block';
    doneButton.style.display = 'block';
});

transferAllButton.addEventListener('click', () => {
    const allHashtags = Array.from(hashtagDisplay.querySelectorAll('span'));
    allHashtags.forEach(span => {
        clipboardDisplay.appendChild(span);
        span.classList.remove('selected');
        span.removeEventListener('click', () => {});
        span.addEventListener('click', () => {
            span.classList.toggle('selected');
        });
    });
    modifyButton.style.display = 'block';
    doneButton.style.display = 'block';
});

modifyButton.addEventListener('click', () => {
    const clipboardSpans = Array.from(clipboardDisplay.querySelectorAll('span'));
    clipboardSpans.forEach(span => {
        span.addEventListener('click', () => {
            span.classList.toggle('selected');
        });
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

    doneButton.textContent = "Finish Modify";
    doneButton.removeEventListener('click', doneClick);
    doneButton.addEventListener('click', finishModify);

    function finishModify(){
        deleteButton.remove();
        modifyButton.style.display = 'block';
        doneButton.textContent = "Done!";
        doneButton.removeEventListener('click', finishModify);
        doneButton.addEventListener('click', doneClick);
    }
});

function doneClick(){
    const clipboardHashtags = Array.from(clipboardDisplay.querySelectorAll('span'));
    const clipboardText = clipboardHashtags.map(span => span.textContent).join(' ');

    if (clipboardText) {
        navigator.clipboard.writeText(clipboardText).then(() => {
            const originalText = doneButton.textContent;
            doneButton.textContent = 'Copied!';
            setTimeout(() => {
                doneButton.textContent = originalText;
            }, 2000);
        }).catch(err => {
            console.error('Could not copy text: ', err);
            alert('Failed to copy hashtags. Please try again.');
        });
    } else {
        alert('Clipboard is empty.');
    }
}
doneButton.addEventListener('click', doneClick);

const hashtags = {
    // ... (your hashtags object remains the same)
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
        const hashtagArray = hashtags[selectedTheme].split(' ');
        hashtagArray.forEach(hashtag => {
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
        span.removeEventListener('touchstart', toggleClipboardSelected);
        span.addEventListener('click', toggleClipboardSelected);
        span.addEventListener('touchstart', toggleClipboardSelected);
    });
    modifyButton.style.display = 'block';
    doneButton.style.display = 'block';
}

modifyButton.addEventListener('click', modifyClipboard);
modifyButton.addEventListener('touchstart', modifyClipboard);

function modifyClipboard() {
    const clipboardSpans = Array.from(clipboardDisplay.querySelectorAll('span'));
    clipboardSpans.forEach(span => {
        span.addEventListener('click', toggleClipboardSelected);
        span.addEventListener('touchstart', toggleClipboardSelected);
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Selected';
    deleteButton.addEventListener('click', deleteSelected);
    deleteButton.addEventListener('touchstart', deleteSelected);

    modifyButton.parentNode.appendChild(deleteButton);
    modifyButton.style.display = 'none';

    doneButton.textContent = "Finish Modify";
    doneButton.removeEventListener('click', doneClick);
    doneButton.removeEventListener('touchstart', doneClick);
    doneButton.addEventListener('click', finishModify);
    doneButton.addEventListener('touchstart', finishModify);

    function finishModify() {
        deleteButton.remove();
        modifyButton.style.display = 'block';
        doneButton.textContent = "Done!";
        doneButton.removeEventListener('click', finishModify);
        doneButton.removeEventListener('touchstart', finishModify);
        doneButton.addEventListener('click', doneClick);
        doneButton.addEventListener('touchstart', doneClick);
    }

    function deleteSelected(event) {
        event.preventDefault();
        const selectedClipboardHashtags = Array.from(clipboardDisplay.querySelectorAll('span.selected'));
        selectedClipboardHashtags.forEach(span => {
            span.remove();
        });
    }
}

function doneClick(event) {
    event.preventDefault();
    const clipboardHashtags = Array.from(clipboardDisplay.querySelectorAll('span'));
    const clipboardText = clipboardHashtags.map(span => span.textContent).join(' ');

    if (clipboardText) {
        navigator.clipboard.writeText(clipboardText).then(() => {
            const originalText = doneButton.textContent;
            doneButton.textContent = 'Copied!';
            setTimeout(() => {
                doneButton.textContent = originalText;
            }, 2000);
        }).catch(err => {
            console.error('Could not copy text: ', err);
            alert('Failed to copy hashtags. Please try again.');
        });
    } else {
        alert('Clipboard is empty.');
    }
}

doneButton.addEventListener('click', doneClick);
doneButton.addEventListener('touchstart', doneClick);

function toggleClipboardSelected(event) {
    event.preventDefault();
    this.classList.toggle('selected');
}

