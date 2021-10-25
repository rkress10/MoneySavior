function GetCurrentTab() {
    chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
        var tab = tabs[0];
        chrome.storage.sync.get({'google_visits': 1}, function(data) {
            alert('updating number of visits');
        });
        chrome.storage.sync.set({'google_visits': chrome.storage.sync.get({'google_visits': 1}, function(data) {})})
        alert(tab.url);
        return tab.url;
    })
}

chrome.tabs.onUpdated.addListener (function (tabID, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        let url = GetCurrentTab();
    }
})