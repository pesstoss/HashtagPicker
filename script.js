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
const resultDiv = document.getElementById('result');
const copyButton = document.getElementById('copyButton');
const copySelectedButton = document.getElementById('copySelectedButton');
const hashtagDisplay = document.getElementById('hashtagDisplay');

// Initial state
hashtagDisplay.innerHTML = '';
copyButton.style.display = 'none';
copySelectedButton.style.display = 'none';

themeSelect.addEventListener('change', () => {
  const selectedTheme = themeSelect.value;
  let hashtagString = hashtags[selectedTheme] || '';
  const hashtagArray = hashtagString.split(' ');

  // Clear existing hashtags before adding new ones
  hashtagDisplay.innerHTML = '';

  if (hashtagString) {
    hashtagArray.forEach(hashtag => {
      const span = document.createElement('span');
      span.textContent = hashtag;
      span.addEventListener('click', () => {
        span.classList.toggle('selected');
      });
      hashtagDisplay.appendChild(span);
    });

    copyButton.style.display = 'block';
    copySelectedButton.style.display = 'block';
  } else {
    copyButton.style.display = 'none';
    copySelectedButton.style.display = 'none';
  }
});

copyButton.addEventListener('click', () => {
  const selectedTheme = themeSelect.value;
  let textToCopy = hashtags[selectedTheme] || '';
  textToCopy = textToCopy.replace(/\s+/g, ' ');

  navigator.clipboard.writeText(textToCopy).then(() => {
    const originalText = copyButton.textContent;
    copyButton.textContent = 'Copied!';
    setTimeout(() => {
      copyButton.textContent = originalText;
    }, 2000);
  }).catch(err => {
    console.error('Could not copy text: ', err);
    alert('Failed to copy hashtags. Please try again.');
  });
});

copySelectedButton.addEventListener('click', () => {
  const selectedHashtags = Array.from(hashtagDisplay.querySelectorAll('span.selected'));
  const selectedText = selectedHashtags.map(span => span.textContent).join(' ');

  if (selectedText) {
    navigator.clipboard.writeText(selectedText).then(() => {
      const originalText = copySelectedButton.textContent;
      copySelectedButton.textContent = 'Copied!';
      setTimeout(() => {
        copySelectedButton.textContent = originalText;
      }, 2000);
    }).catch(err => {
      console.error('Could not copy text: ', err);
      alert('Failed to copy selected hashtags. Please try again.');
    });
  } else {
    alert('Please select hashtags to copy.');
  }
});
