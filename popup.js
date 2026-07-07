
// A small sample of verses (you'll expand this)
const verses = [
  {
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    translation: "In the name of Allah, the Most Gracious...",
    ref: "Al-Fatiha 1:1"
  },
  {
    arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    translation: "All praise is due to Allah, Lord of all worlds",
    ref: "Al-Fatiha 1:2"
  }
];

// Grab the HTML elements we need
const arabicEl    = document.getElementById('arabic-text');
const translEl    = document.getElementById('translation');
const refEl       = document.getElementById('reference');
const nextBtn     = document.getElementById('next-btn');
const saveBtn     = document.getElementById('save-btn');
const intervalEl  = document.getElementById('interval-input');

// Display a verse by its index number
function showVerse(index) {
  const verse = verses[index];
  arabicEl.textContent = verse.arabic;
  translEl.textContent = verse.translation;
  refEl.textContent    = verse.ref;
}

// Move to the next verse and save the new position
function goToNextVerse(currentIndex) {
  // The % operator wraps back to 0 after the last verse
  const nextIndex = (currentIndex + 1) % verses.length;
  showVerse(nextIndex);
  chrome.storage.local.set({ verseIndex: nextIndex });
}

// On popup open: load saved data and display the right verse
chrome.storage.local.get(['verseIndex', 'interval'], function(data) {
  const index    = data.verseIndex || 0;
  const interval = data.interval   || 30;

  showVerse(index);
  intervalEl.value = interval;

  // Next button: go to next verse
  nextBtn.addEventListener('click', function() {
    goToNextVerse(index);
  });

  // Save button: store the interval setting
  saveBtn.addEventListener('click', function() {
    const newInterval = parseInt(intervalEl.value);
    chrome.storage.local.set({ interval: newInterval });
    saveBtn.textContent = 'Saved ✓';
    setTimeout(function() {
      saveBtn.textContent = 'Save';
    }, 1500);
  });
});