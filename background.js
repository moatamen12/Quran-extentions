//starts whene extention is installed or chrome starte
chrome.runtime.onInstalled.addListener(function(){
    // read the saved intervale
    chrome.storage.local.get(['interval'], function(data){
        const minutes = data.interval || 30;

        //making a repeted alarem 
        chrome.alarms.create('verseAlarm', {
            periodInMinutes: minutes
        });
    });
});

// go to nixt vers when alarm
chrome.alarms.onAlarm.addListener(function(alarm) {
    if(alarm.name === 'verseAlarm'){
        chrome.storage.local.get(['verseInex'], function(data) {
            const current = data.verseIndex || 0;
            const next = (current + 1) % 6236;

        })
    }
})

