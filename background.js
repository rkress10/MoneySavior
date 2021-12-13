// let rc_interval = 1000 * 60 * 60 * 24 * 7 * 4;
let currDate = new Date();
let tempDict = {}
tempDict["rc_service"] = 0;

let rc_service, rc_time;

chrome.storage.sync.get(tempDict, function(time) {
    
    rc_service = time["rc_service"]
    console.log(rc_service)
    
});
tempDict = {}
tempDict["rc_time"] = 0;
chrome.storage.sync.get(tempDict, function(time) {
    rc_time = time["rc_time"]
    
});

window.onload=(function () {
    let difference_in_time, reminder_interval;
    chrome.storage.sync.get(["reminderInterval"], function(time2) {
        reminder_interval = time2.reminderInterval;    
    });
    chrome.storage.sync.get(["reminderStartTime"], function(time) {
        difference_in_time = currDate.getTime() - time.reminderStartTime 
        // To calculate the no. of days between two dates
        var difference_in_days = difference_in_time / (1000 * 3600 * 24);
        console.log(difference_in_days)
        if (difference_in_days >= reminder_interval){
            console.log("surpass reminder interval")
            var temp = new Date();
            temp = temp.getTime();
            chrome.storage.sync.set({"reminderStartTime": temp}, function() {});
            chrome.notifications.create("remind", {
                type: 'basic',
                iconUrl: 'icon16.png',
                title: 'Money Savior',
                message: "You only spent " + rc_time + " minutes on " + rc_service + " in the past interval. You might want to cancel that to save money.",
                priority: 1
            });
        }
        
    });

});
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
                if (timeString == "fubo.tv"){
                    timeString = timeString.replace(".tv","");
                }
                else{
                    timeString = timeString.replace(".com","");
                }
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

}, 60000); // Test with one seconds, should be one minute

// setInterval(function() {
//     confirm("You only spent " + rc_time + " minutes on " + rc_service + " in the past interval. You might want to cancel that to save money.");
// }, rc_interval);

function GetCurrentTab() {
    var services = ["www.netflix.com", "www.hulu.com", "www.peacocktv.com","www.disneyplus.com",
    "www.hbomax.com", "www.paramountplus.com","www.sling.com", "www.pluto.tv", "www.fubo.tv",
    "tubitv.com","www.crunchyroll.com","www.sho.com","www.starz.com"];
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
            else if (services.includes(taburl.hostname)) {
                chrome.notifications.create(options={
                    type: 'basic',
                    iconUrl: 'icon16.png',
                    title: 'Money Savior',
                    message: 'Sign up for a new service? Don\'t forget to add it to your list!',
                    priority: 1
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

