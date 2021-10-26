hostnames = ["www.google.com", "www.hulu.com", "www.netflix.com"];

function GetCurrentTab() {
    chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
        let taburl = new URL(tabs[0].url);
        if (hostnames.includes(taburl.hostname)) {
            switch (taburl.hostname) {
                case 'www.netflix.com':
                    alert("Streaming website: Netflix");
                    chrome.storage.sync.get({"www.netflix.com": 0}, function(data) {
                        chrome.storage.sync.set({"www.netflix.com": data["www.netflix.com"] + 1}, function() {});
                    });
                    break;
                case 'www.hulu.com':
                    alert("Streaming website: Hulu");
                    chrome.storage.sync.get({"www.hulu.com": 0}, function(data) {
                        chrome.storage.sync.set({"www.hulu.com": data["www.hulu.com"] + 1}, function() {});
                    });
                    break;
                case 'www.google.com':
                    alert("Streaming website: Google");
                    chrome.storage.sync.get({"www.google.com": 0}, function(data) {
                        chrome.storage.sync.set({"www.google.com": data["www.google.com"] + 1}, function() {});
                    });
                    break;
                default:
                    alert('Somethings Wrong');
            }
            }
        }
    )
}

chrome.tabs.onUpdated.addListener (function (tabID, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        GetCurrentTab();
    }
})