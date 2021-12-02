// A function that check if the user opens a streaming website every minute
setInterval(function() {
   chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
        let websiteInFile = false;
        let taburl = new URL(tabs[0].url);
        chrome.storage.sync.get({"hostnames":[]}, function(data) {
            websiteInFile = data["hostnames"].includes(taburl.hostname);
        });

        chrome.storage.sync.get({"usingTime":[]}, function(data) {
            if (websiteInFile) {
                var timeString = taburl.hostname.replace("www.","");
                timeString = timeString.replace(".com","");
                timeString = timeString + 'Time';
                var obj = {};
                obj[timeString] = 0;
                chrome.storage.sync.get(obj, function(data) {
                    var obj2 = {};
                    obj2[timeString] = data[timeString] + 1;
                    chrome.storage.sync.set(obj2, function() {});
                });
                }
        })
        
        }
    )

}, 1000); // Test with one seconds, should be one minute

function GetCurrentTab() {
    chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
        let taburl = new URL(tabs[0].url);
        chrome.storage.sync.get({"hostnames":[]}, function(data) {
            if (data["hostnames"].includes(taburl.hostname)) {

                var obj = {};
                obj[taburl.hostname] = 0;
                chrome.storage.sync.get(obj, function(data) {
                    var obj2 = {};
                    obj2[taburl.hostname] = data[taburl.hostname] + 1;
                    chrome.storage.sync.set(obj2, function() {});
                });
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

