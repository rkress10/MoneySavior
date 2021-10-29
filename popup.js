window.onload=function() {
    document.getElementById("addServiceDiv").style.display = 'none';
    document.getElementById('netflixDiv').style.display = 'none';
    document.getElementById('huluDiv').style.display = 'none';
    document.getElementById('peacockDiv').style.display = 'none';
    document.getElementById('hboDiv').style.display = 'none';
    showVisitData();
    showTimeData();
    deleteButton();
    closeButton();
    welcomeMessage();
    addStreamingService();
}

function welcomeMessage() {
    chrome.storage.sync.get(["firstTime"], function(data) {
            if(data["firstTime"]) {
                var welcomeDivStr = "<div id='welcomeMessage'>";
                welcomeDivStr += "Welcome to Money Savior. Click the plus button above to add your streaming services!";
                welcomeDivStr += "</div>";
                document.getElementById('messageContainer').innerHTML = welcomeDivStr;
                chrome.storage.sync.set({"firstTime": false}, function() {});

            }
            
        });
}

function addStreamingService() {
    document.getElementById("addButton").addEventListener("click", 
    function() {
        if (document.getElementById("addButton").innerHTML === '+') {
            document.getElementById("addButton").innerHTML = '-';
            document.getElementById("addServiceDiv").style.display = 'inline';
            document.getElementById("messageContainer").style.display = 'none';
            document.getElementById("subscriptionServiceListDiv").style.display = 'none';
        }
       else {
            document.getElementById("addButton").innerHTML = '+';
            document.getElementById("addServiceDiv").style.display = 'none';
            document.getElementById("subscriptionServiceListDiv").style.display = 'block';
       } 
    });

    document.getElementById("addNetflix").addEventListener("click", function() {
        chrome.storage.sync.get({"hostnames":[]}, 
        function(data) {
            if (!data["hostnames"].includes("www.netflix.com")) {
                data["hostnames"].push("www.netflix.com");
                chrome.storage.sync.get({"usingTime":[]}, function(time) {
                    time["usingTime"].push("netflixTime");
                    chrome.storage.sync.set({"usingTime": time["usingTime"]}, function (){
                        document.getElementById("netflixTime").innerHTML = 'Minutes of Netflix Visits: 0';
                    });
                });
                chrome.storage.sync.set({"hostnames": data["hostnames"]}, function (){
                    alert('added netflix');
                    document.getElementById('netflixDiv').style.display = 'inline';
                    document.getElementById("netflixInfo").innerHTML = 'Number of Netflix Visits: 0';
                });
                
             
            }
        })
    })

    document.getElementById("addHulu").addEventListener("click", function() {
        chrome.storage.sync.get({"hostnames":[]}, 
        function(data) {
            if (!data["hostnames"].includes("www.hulu.com")) {
                data["hostnames"].push("www.hulu.com");
                
                chrome.storage.sync.set({"hostnames": data["hostnames"]}, function (){
                    alert('added hulu');
                    document.getElementById('huluDiv').style.display = 'inline';
                    document.getElementById("huluInfo").innerHTML = 'Number of Hulu Visits: 0';
                });
                
                chrome.storage.sync.get({"usingTime":[]}, function(time) {
                    time["usingTime"].push("huluTime");
                    chrome.storage.sync.set({"usingTime": time["usingTime"]}, function (){
                        document.getElementById("huluTime").innerHTML = 'Minutes of Hulu Visits: 0';
                    });
                });
            }
        })
    })

    document.getElementById("addPeacock").addEventListener("click", function() {
        chrome.storage.sync.get({"hostnames":[]}, 
        function(data) {
            if (!data["hostnames"].includes("www.peacocktv.com")) {
                data["hostnames"].push("www.peacocktv.com");
                
                chrome.storage.sync.set({"hostnames": data["hostnames"]}, function (){
                    alert('added peacock');
                    document.getElementById('peacockDiv').style.display = 'inline';
                    document.getElementById("peacockInfo").innerHTML = 'Number of Peacock Visits: 0';
                });
                
                chrome.storage.sync.get({"usingTime":[]}, function(time) {
                    time["usingTime"].push("peacockTime");
                    chrome.storage.sync.set({"usingTime": time["usingTime"]}, function (){
                        document.getElementById("peacockTime").innerHTML = 'Minutes of Peacock Visits: 0';
                    });
                });
            }
        })
    })

    document.getElementById("addHbo").addEventListener("click", function() {
        chrome.storage.sync.get({"hostnames":[]}, 
        function(data) {
            if (!data["hostnames"].includes("www.hbomax.com")) {
                data["hostnames"].push("www.hbomax.com");
                
                chrome.storage.sync.set({"hostnames": data["hostnames"]}, function (){
                    alert('added hbo max');
                    document.getElementById('hboDiv').style.display = 'inline';
                    document.getElementById("hboInfo").innerHTML = 'Number of HBO Max Visits: 0';
                });
                
                chrome.storage.sync.get({"usingTime":[]}, function(time) {
                    time["usingTime"].push("hboTime");
                    chrome.storage.sync.set({"usingTime": time["usingTime"]}, function (){
                        document.getElementById("hboTime").innerHTML = 'Minutes of HBO Max Visits: 0';
                    });
                });
            }
        })
    })
}

function showVisitData() {
    chrome.storage.sync.get({"hostnames":[]}, function(data) {
        for (var i = 0; i < data["hostnames"].length; i++) {
            switch (data["hostnames"][i]) {
                case "www.netflix.com":
                    netflixData();
                    break;
                case "www.hulu.com":
                    huluData();
                    break;
                case "www.peacocktv.com":
                    peacockData();
                    break;
                case "www.hbomax.com":
                    hboData();
                    break;
                
            }
        }
    })
}

function showTimeData() {
    chrome.storage.sync.get({"usingTime":[]}, function(data) {
        for (var i = 0; i < data["usingTime"].length; i++) {
            switch (data["usingTime"][i]) {
                case "netflixTime":
                    chrome.storage.sync.get({"netflixTime": 0}, function(data) {
                        document.getElementById('netflixTime').innerHTML = "Minutes of Netflix Visits: " + data["netflixTime"];
                    });
                    break;
                case "huluTime":
                    chrome.storage.sync.get({"huluTime": 0}, function(data) {
                        document.getElementById('huluTime').innerHTML = "Minutes of Hulu Visits: " + data["huluTime"];
                    });
                    break;
                case "peacockTime":
                    chrome.storage.sync.get({"peacockTime": 0}, function(data) {
                        document.getElementById('peacockTime').innerHTML = "Minutes of Peacock Visits: " + data["peacockTime"];
                    });
                    break;
                case "hboTime":
                    chrome.storage.sync.get({"hboTime": 0}, function(data) {
                        document.getElementById('hboTime').innerHTML = "Minutes of HBO Max Visits: " + data["hboTime"];
                    });
                    break;
                default:
                    alert('problem');
                    break;
            }
        }
    })
}

function netflixData() {
    document.getElementById('netflixDiv').style.display = 'inline';
    chrome.storage.sync.get({"www.netflix.com": 0}, function(data) {
        document.getElementById('netflixInfo').innerHTML = "Number of Netflix Visits: " + data["www.netflix.com"];
    });
}

function huluData() {
    document.getElementById('huluDiv').style.display = 'inline';
    chrome.storage.sync.get({"www.hulu.com": 0}, function(data) {
        console.log(data);
        document.getElementById('huluInfo').innerHTML = "Number of Hulu Visits: " + data["www.hulu.com"];
    });
}

function peacockData() {
    document.getElementById('peacockDiv').style.display = 'inline';
    chrome.storage.sync.get({"www.peacocktv.com": 0}, function(data) {
        console.log(data);
        document.getElementById('peacockInfo').innerHTML = "Number of Peacock Visits: " + data["www.peacocktv.com"];
    });
}

function hboData() {
    document.getElementById('hboDiv').style.display = 'inline';
    chrome.storage.sync.get({"www.hbomax.com": 0}, function(data) {
        console.log(data);
        document.getElementById('hboInfo').innerHTML = "Number of HBO Max Visits: " + data["www.hbomax.com"];
    });
}

// deletes data from storage
// TODO: add preventative measures to make sure user doesn't accidentally hit the button
function deleteButton() {
    document.getElementById('deleteData').addEventListener('click',
    function () {
        chrome.storage.sync.remove(["www.google.com", "www.hulu.com", "www.netflix.com", "www.peacocktv.com", "www.hbomax.com", "hostnames",
                                    "netflixTime", "HuluTime", "hboTime", "peacockTime"], function() {
            alert("Deleted Stored Data");
        });
        chrome.storage.sync.set({"firstTime": true}, function(){});
        window.location.reload();
    }
    );
}

// adds functionality to close button
function closeButton() {
    document.getElementById('closeButton').addEventListener("click",
    function() {
        window.close();
    }
    );
}
 
