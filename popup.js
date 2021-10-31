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
    sortByTimeButton();
    sortByNumberButton();
}

function sortByTimeButton() {
    document.getElementById("sortByTimeButton").addEventListener("click", function() {
        orderDivs("time");
    });
}

function sortByNumberButton() {
    document.getElementById("sortByNumberButton").addEventListener("click", function() {
        orderDivs("num");
    });
}

function orderDivs(sortedBy) {
    alert(sortedBy);
    var parentNode = document.getElementById('subscriptionServiceListDiv');
    var div = document.getElementById('subscriptionServiceListDiv').children;
    console.log(div);
    let a = [].slice.call(div).sort(function(a,b) {
        if (parseInt(a.dataset[sortedBy]) < parseInt(b.dataset[sortedBy])) { console.log('true'); return -1;}
        else { console.log('false'); return 1; }
    }).forEach(function(val) {
        parentNode.appendChild(val);
    });
    console.log(parentNode);
    
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

                // add price for netflix
                var select = document.getElementById('netflixSelect');
				var option = select.options[select.selectedIndex];

                chrome.storage.sync.set({"netflixPrice": option.text}, function (){
                    document.getElementById('netflixPrice').innerHTML = option.text; 
                });
             
            }
            else {
                alert('already added Netflix');
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

                // add price for hulu
                var select = document.getElementById('huluSelect');
				var option = select.options[select.selectedIndex];

                chrome.storage.sync.set({"huluPrice": option.text}, function (){
                    document.getElementById('huluPrice').innerHTML = option.text; 
                });
            }
            else {
                alert('already added Hulu');
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

                // add price for peacock
                var select = document.getElementById('peacockSelect');
				var option = select.options[select.selectedIndex];

                chrome.storage.sync.set({"peacockPrice": option.text}, function (){
                    document.getElementById('peacockPrice').innerHTML = option.text; 
                });
            }
            else {
                alert('already added Peacock');
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

                // add price for hbo
                var select = document.getElementById('hboSelect');
				var option = select.options[select.selectedIndex];

                chrome.storage.sync.set({"hboPrice": option.text}, function (){
                    document.getElementById('hboPrice').innerHTML = option.text; 
                });
            }
            else {
                alert('already added HBO Max');
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
                    
                    // added price set here for convinience of not adding new function.
                    // can change if it's cluttering this function
                    chrome.storage.sync.get(["netflixPrice"], function (price){
                        document.getElementById('netflixPrice').innerHTML = price["netflixPrice"]; 
                    });
                    break;
                case "www.hulu.com":
                    huluData();
                    chrome.storage.sync.get(["huluPrice"], function (price){
                        document.getElementById('huluPrice').innerHTML = price["huluPrice"]; 
                    });
                    break;
                case "www.peacocktv.com":
                    peacockData();
                    chrome.storage.sync.get(["peacockPrice"], function (price){
                        document.getElementById('peacockPrice').innerHTML = price["peacockPrice"]; 
                    });
                    break;
                case "www.hbomax.com":
                    hboData();
                    chrome.storage.sync.get(["hboPrice"], function (price){
                        document.getElementById('hboPrice').innerHTML = price["hboPrice"]; 
                    });
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
                        document.getElementById('netflixDiv').dataset.time = (data["netflixTime"]).toString();
                        console.log(document.getElementById('netflixDiv').dataset.time);
                    });
                    break;
                case "huluTime":
                    chrome.storage.sync.get({"huluTime": 0}, function(data) {
                        document.getElementById('huluTime').innerHTML = "Minutes of Hulu Visits: " + data["huluTime"];
                        document.getElementById('huluDiv').dataset.time = (data["huluTime"]).toString();
                        console.log(document.getElementById('huluDiv').dataset.time);
                    });
                    break;
                case "peacockTime":
                    chrome.storage.sync.get({"peacockTime": 0}, function(data) {
                        document.getElementById('peacockTime').innerHTML = "Minutes of Peacock Visits: " + data["peacockTime"];
                        document.getElementById('peacockDiv').dataset.time = (data["peacockTime"]).toString();
                        console.log(document.getElementById('peacockDiv').dataset.time);
                    });
                    break;
                case "hboTime":
                    chrome.storage.sync.get({"hboTime": 0}, function(data) {
                        document.getElementById('hboTime').innerHTML = "Minutes of HBO Max Visits: " + data["hboTime"];
                        document.getElementById('hboDiv').dataset.time = (data["hboTime"]).toString();
                        console.log(document.getElementById('hboDiv').dataset.time);
                    });
                    break;
                default:
                    alert('problem');
                    break;
            }
        };
    })
}

function netflixData() {
    document.getElementById('netflixDiv').style.display = 'inline';
    chrome.storage.sync.get({"www.netflix.com": 0}, function(data) {
        document.getElementById('netflixInfo').innerHTML = "Number of Netflix Visits: " + data["www.netflix.com"];
        document.getElementById('netflixDiv').dataset.num = (data["www.netflix.com"]).toString();
    });
}

function huluData() {
    document.getElementById('huluDiv').style.display = 'inline';
    chrome.storage.sync.get({"www.hulu.com": 0}, function(data) {
        document.getElementById('huluInfo').innerHTML = "Number of Hulu Visits: " + data["www.hulu.com"];
        document.getElementById('huluDiv').dataset.num = (data["www.hulu.com"]).toString();
    });
}

function peacockData() {
    document.getElementById('peacockDiv').style.display = 'inline';
    chrome.storage.sync.get({"www.peacocktv.com": 0}, function(data) {
        document.getElementById('peacockInfo').innerHTML = "Number of Peacock Visits: " + data["www.peacocktv.com"];
        document.getElementById('peacockDiv').dataset.num = (data["www.peacocktv.com"]).toString();
    });
}

function hboData() {
    document.getElementById('hboDiv').style.display = 'inline';
    chrome.storage.sync.get({"www.hbomax.com": 0}, function(data) {
        document.getElementById('hboInfo').innerHTML = "Number of HBO Max Visits: " + data["www.hbomax.com"];
        document.getElementById('hboDiv').dataset.num = (data["www.hbomax.com"]).toString();
    });
}

// deletes data from storage
// TODO: add preventative measures to make sure user doesn't accidentally hit the button
function deleteButton() {
    document.getElementById('deleteData').addEventListener('click',
    function () {
        chrome.storage.sync.remove(["www.google.com", "www.hulu.com", "www.netflix.com", "www.peacocktv.com", "www.hbomax.com", "hostnames",
                                    "usingTime", "netflixTime", "huluTime", "hboTime", "peacockTime"], function() {
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
 
