const hashtags = {
  general: "#bokehbros #shuttersisters #podium #pictas #rebels_united #bpa_arts #fotomasters #elitepix #picplanet #exquisitepics20 #hey_ihadtosnapthat2",
  spec1: "#snap_abstract #snap_surreal #snap_communityarts #snap_artgallery #pictasart #snap_textures #snap_minimal #snap_potd #snap_longexposure #snap_depthoffield #snap_nightshots #podium_night #snap_reflection",
  spec2: "#snap_symmetry #snap_silhouette #snap_cuteness #snap_moody #pictasmoody #snap_mobile #snap_macro #podium_macro #rebel_macro #snap_edit snap_filmfoto #snap_colours #snap_colorsplash #snap_ai #snap_numbers",
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

themeSelect.addEventListener('change', () => {
  const selectedTheme = themeSelect.value;
  const hashtagString = hashtags[selectedTheme] || '';
  const hashtagArray = hashtagString.split(' ');

  resultDiv.innerHTML = '';

  hashtagArray.forEach(hashtag => {
    const paragraph = document.createElement('p');
    paragraph.textContent = hashtag;
    resultDiv.appendChild(paragraph);
  });

  if (hashtagString) {
    copyButton.style.display = 'block';
  } else {
    copyButton.style.display = 'none';
  }
});

copyButton.addEventListener('click', () => {
  const textToCopy = resultDiv.textContent;
  navigator.clipboard.writeText(textToCopy).then(() => {
    alert('Hashtags copied to clipboard!');
  }).catch(err => {
    console.error('Could not copy text: ', err);
    alert('Could not copy text.');
  });
});
