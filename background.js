// A function that check if the user opens a streaming website every minute
setInterval(function() {
    // TODO
}, 60000);

function GetCurrentTab() {
    chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
        let taburl = new URL(tabs[0].url);
        chrome.storage.sync.get({"hostnames":[]}, function(data) {
            if (data["hostnames"].includes(taburl.hostname)) {
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
                    case 'www.peacocktv.com':
                        alert("Streaming website: peacock");
                        chrome.storage.sync.get({"www.peacocktv.com": 0}, function(data) {
                            chrome.storage.sync.set({"www.peacocktv.com": data["www.peacocktv.com"] + 1}, function() {});
                        });
                        break;
                    case 'www.hbomax.com':
                        alert("Streaming website: hbo max");
                        chrome.storage.sync.get({"www.hbomax.com": 0}, function(data) {
                            chrome.storage.sync.set({"www.hbomax.com": data["www.hbomax.com"] + 1}, function() {});
                        });
                        break;
                    default:
                        alert('Somethings Wrong');
                }
                }
        })
        
        }
    )
}



chrome.tabs.onUpdated.addListener (function (tabID, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        GetCurrentTab();
    }
})

chrome.runtime.onInstalled.addListener(details => {
    
    if (details.reason === "install") {
        chrome.storage.sync.set({"firstTime": true}, function() {
        }
        );
    }
});
