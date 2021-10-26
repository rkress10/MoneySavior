window.onload=function() {
    here();
    here2();
    here3();
    deleteButton();
    closeButton();
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
        chrome.storage.sync.remove(['google_visits', "www.google.com"], function() {
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