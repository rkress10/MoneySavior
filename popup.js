window.onload=function() {
    here();
    here2();
    here3();
    deleteButton();
    closeButton();
    welcomeMessage();
    

}

function welcomeMessage() {
    chrome.storage.sync.get(["firstTime"], function(data) {
            if(data["firstTime"]) {
                var welcomeDivStr = "<div id='welcomeMessage'>";
                welcomeDivStr += "Welcome to Money Savior. Do you have any current streaming subscriptions";
                welcomeDivStr += "<div id='yesButtonDiv'><button id='yesButton'>Yes</button></div>";
                welcomeDivStr += "<div id='noButtonDiv'><button id='noButton'>No</button></div>";
                welcomeDivStr += "</div>";
                document.getElementById('messageContainer').innerHTML = welcomeDivStr;
                chrome.storage.sync.set({"firstTime": false}, function() {});
                noButtonFunc();
                yesButtonFunc();

            }
            
        });
}


function here() {
    document.getElementById('showDataGoog').addEventListener("click",
    function() {
        chrome.storage.sync.get({"www.google.com": 0}, function(data) {
            console.log(data);
            document.getElementById('showDataGoogle').innerHTML = "Number of Google Visits: " + data["www.google.com"];
        });
    });
}

function here2() {
    document.getElementById('showDataNetf').addEventListener("click",
    function() {
        chrome.storage.sync.get({"www.netflix.com": 0}, function(data) {
            console.log(data);
            document.getElementById('showDataNetflix').innerHTML = "Number of Netflix Visits: " + data["www.netflix.com"];
        });
    });
}

function here3() {
    document.getElementById('showDataHulu').addEventListener("click",
    function() {
        chrome.storage.sync.get({"www.hulu.com": 0}, function(data) {
            console.log(data);
            document.getElementById('showDataHuluText').innerHTML = "Number of Hulu Visits: " + data["www.hulu.com"];
        });
    });
}

// deletes data from storage
// TODO: add preventative measures to make sure user doesn't accidentally hit the button
function deleteButton() {
    document.getElementById('deleteData').addEventListener('click',
    function () {
        chrome.storage.sync.remove(["www.google.com", "www.hulu.com", "www.netflix.com"], function() {
            alert("Deleted Stored Data");
        })
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

// adds functionality to the no button
function noButtonFunc() {
    document.getElementById('noButton').addEventListener("click",
    function() {
        // removes the welcomeMessage div when clicked
        document.getElementById('welcomeMessage').remove();
    }
    );
}

// adds functionality to the yes button
function yesButtonFunc() {
    document.getElementById('yesButton').addEventListener("click",
    function() {
        // removes the welcomeMessage div when clicked
        document.getElementById('welcomeMessage').remove();
        // TODO: implement checkbox option for lists of streaming services to choose

    }
    );
}