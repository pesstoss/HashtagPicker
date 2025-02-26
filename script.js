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
