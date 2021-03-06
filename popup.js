window.onload=function() {
    
    addCustomStreamingService();
    document.getElementById("addServiceDiv").style.display = 'none';
    document.getElementById('fuboDiv').style.display = 'none';
    document.getElementById('slingDiv').style.display = 'none';
    document.getElementById('paramountplusDiv').style.display = 'none';
    document.getElementById('netflixDiv').style.display = 'none';
    document.getElementById('disneyplusDiv').style.display = 'none';
    document.getElementById('huluDiv').style.display = 'none';
    document.getElementById('intervalSettings').style.display = 'none';
    document.getElementById('peacocktvDiv').style.display = 'none';
    document.getElementById('hbomaxDiv').style.display = 'none';
    document.getElementById('amazonDiv').style.display = 'none';
    document.getElementById('deleteMessageContainer').style.display = 'none';
    document.getElementById("deletenetflixDiv").style.display = 'none';
    document.getElementById("deletedisneyplusDiv").style.display = 'none';
    document.getElementById("deletehuluDiv").style.display = 'none';
    document.getElementById("deletepeacocktvDiv").style.display = 'none';
    document.getElementById("deletehbomaxDiv").style.display = 'none';
    document.getElementById("deleteamazonDiv").style.display = 'none';
    document.getElementById("deleteslingDiv").style.display = 'none';
    document.getElementById("deleteparamountplusDiv").style.display = 'none';
    document.getElementById("deletefuboDiv").style.display = 'none';
    document.getElementById("otherService").style.display = 'none';
    document.getElementById("deleteAllContainer").style.display = 'none';

    showDeleteAllMessage();
    showVisitData();
    showTimeData();
    deleteButton();
    closeButton();
    welcomeMessage();
    addStreamingService();
    sortByTimeButton();
    sortByNumberButton();

    document.getElementById("app").onmouseenter=function() {
        chrome.storage.sync.get({"sortedBy": "none"}, function(data) {
            if (data["sortedBy"] !== "none") {
                orderDivs(data["sortedBy"]);
            }
        })
    };
    // netflixDeleteHandler();
    // huluDeleteHandler();
    // peacockDeleteHandler();
    // hboDeleteHandler();
    // amazonDeleteHandler();

    //handles all the cancelBtn available in subscriptionServiceListDiv
    var elements = document.getElementsByClassName("cancelBtn");
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('mouseenter', cancelButtonHandler);
    }
    
    
}



function addCustomStreamingService() {

    chrome.storage.sync.get(["otherData"], function(data) {
        if(data["otherData"]) {
            
            var name = data["otherData"][0].main_url
            name = name.replace("www.", "")
            name = name.replace(".com", "")
            console.log(name)
            var tempDivId = name +"Div";
            var tempDivPrice = name +"Price";
            var tempDivInfo = name +"Info";
            var tempDivCancel = name +"Cancel";
            var tempNameTime = name + "Time";
            var tmp = name + "Time";
            console.log(tmp);
            var objtmp = {};
            objtmp[tmp] = 0;
            var objtmp2 = {};
            var tmpUrl = data["otherData"][0].main_url;
            objtmp2[tmpUrl] = 0;
            chrome.storage.sync.get(objtmp2, function(data3) {
                
                console.log(tmpUrl);
                console.log(data3[tmpUrl]);
                chrome.storage.sync.get(objtmp, function(data2) {
                    
                    console.log(data2);
                    console.log(typeof data2[tempNameTime]);
                    
                    var tempOtherDiv = "<div id='" + tempDivId +"' data-time='0' data-num='0' class='sort'>";
                    tempOtherDiv += "<div class='serviceHeader'><span class='serviceTitle'>" + name + "</span></div>";
                    tempOtherDiv += "<div class='infodiv'>";
                    tempOtherDiv +=  "<div id='" + tempDivPrice +"' class='infoSpace'></div>";
                    tempOtherDiv += "<div id='" + tempDivInfo +"' class='infoSpace'></div>";
                    tempOtherDiv += "<div id='" + tempNameTime +"' class='infoSpace'></div>";
    
                    tempOtherDiv += "<div class='infoSpace'>";
                    tempOtherDiv += "<button id='" + tempDivCancel +"'  class='cancelBtn'>Cancel " + name +"</button>";
                    tempOtherDiv += "</div></div></div>";
                    
    
                    document.getElementById('subscriptionServiceListDiv').insertAdjacentHTML("beforeend",tempOtherDiv);
                    document.getElementById(tempDivId).style.display = 'inline';
                    
                    document.getElementById(tempDivPrice).innerHTML = data["otherData"][0].price; 
                    document.getElementById(tempDivInfo).innerHTML = "Number of " + data["otherData"][0].name +" Visits: " + data3[tmpUrl];
                    document.getElementById(tempNameTime).innerHTML = "Minutes of " + data["otherData"][0].name +" Visits: " + data2[tmp];
                    document.getElementById(tempDivId).dataset.time = (data2[tmp]).toString();
                    document.getElementById(tempDivId).dataset.num = data3[tmpUrl].toString();
                    console.log(document.getElementById(tempDivId).dataset.time);
                    // add custom service delete button confirmation div

                    var tempDeleteNameDiv = "<div id='delete" + name +"Div'>";
                    tempDeleteNameDiv += "<button id='delete" + name + "Yes' class='yesButton'>Yes</button>"
                    tempDeleteNameDiv += "<button id='delete" + name + "No' class='noButton'>No</button>"
                    tempDeleteNameDiv += "</div>"
                    document.getElementById('deleteMessageContainer').insertAdjacentHTML("beforeend",tempDeleteNameDiv);
                    document.getElementById("delete" + name +"Div").style.display = 'none';
                    document.getElementById(tempDivCancel).addEventListener("mouseenter", cancelButtonHandler);
                    

                });
            
            })
           

        }
            
    });
}

function cancelButtonHandler(event){
    console.log(event.target.id)
    var nameCancel = event.target.id
    
    var name = nameCancel.replace("Cancel","");
    var deleteNameDiv = "delete" + name + "Div";
    var deleteNameNo = "delete" + name + "No";
    console.log(deleteNameNo)
    var deleteNameYes = "delete" + name + "Yes";

    document.getElementById(nameCancel).addEventListener("click", function() {
        document.getElementById("sortButtonContainer").style.display = 'none';
        document.getElementById("subscriptionServiceListDiv").style.display = 'none';
        document.getElementById('deleteMessageContainer').style.display = 'flex';
        document.getElementById(deleteNameDiv).style.display = 'flex';
        document.getElementById("deleteAllContainer").style.display = 'none';
        document.getElementById("deleteData").style.display = 'none';
    });
    document.getElementById(deleteNameNo).addEventListener("click", function() {
        window.location.reload();
    });
    document.getElementById(deleteNameYes).addEventListener("click", deleteOneService);
    
}


function sortByTimeButton() {
    document.getElementById("sortByTimeButton").addEventListener("click", function() {
        chrome.storage.sync.set({"sortedBy": "time"}, function() {console.log("time sort saved")});
        orderDivs("time");
    });
}

function sortByNumberButton() {
    document.getElementById("sortByNumberButton").addEventListener("click", function() {
        chrome.storage.sync.set({"sortedBy": "num"}, function() {console.log("number sort saved")});
        orderDivs("num");
    });
}

function orderDivs(sortedBy) {
    
    var parentNode = document.getElementById('subscriptionServiceListDiv');
    var div = document.getElementById('subscriptionServiceListDiv').children;
    console.log(div);
    let t = [].slice.call(div).sort(function(a,b) {
        if (parseInt(a.dataset[sortedBy]) < parseInt(b.dataset[sortedBy])) { console.log('true'); return -1;}
        else { console.log('false'); return 1; }
    }).forEach(function(val) {
        parentNode.appendChild(val);
    });
    div = document.getElementById('subscriptionServiceListDiv').children;
    for (let i = 0; i < div.length; i++){
        if (div[i].style.display == "inline"){
            let get_rc_time = div[i].id
            get_rc_time = get_rc_time.replace("Div", "Time")
            console.log(get_rc_time)
            chrome.storage.sync.get("rc_service", function(service) {
                console.log(service["rc_service"])
                service = div[i].children[0].innerText
                console.log(service)
                chrome.storage.sync.set({"rc_service": service}, function() {});
            });
            let tempDict = {}
            tempDict[get_rc_time] = 0

            chrome.storage.sync.get(tempDict, function(time) {
                console.log(time[get_rc_time])
                chrome.storage.sync.get("rc_time", function(temp) {
                    console.log(temp["rc_time"])
                    
                    chrome.storage.sync.set({"rc_time": time[get_rc_time]}, function() {});
                });
                
            });
            
            break;

        }
        
    }
    
}

function welcomeMessage() {
    chrome.storage.sync.get(["firstTime"], function(data) {
        if(data["firstTime"]) {
            chrome.storage.sync.get(["reminderStartTime"], function(time) {
                console.log(time.reminderStartTime)
                time["reminderStartTime"] = new Date();
                console.log(time.reminderStartTime)

                time["reminderStartTime"] = time["reminderStartTime"].getTime()
                chrome.storage.sync.set({"reminderStartTime": time["reminderStartTime"]}, function() {});
                    
            });
            chrome.storage.sync.get(["reminderInterval"], function(time2) {
                time2["reminderInterval"] = 30;
                chrome.storage.sync.set({"reminderInterval": time2["reminderInterval"]}, function() {});
                    
            });
            var welcomeDivStr = "<div id='welcomeMessage'>";
            welcomeDivStr += "Welcome to Money Savior. Click the plus button above to add your streaming services!";
            welcomeDivStr += "</div>";
            document.getElementById('mainMessage').innerHTML = welcomeDivStr;
            chrome.storage.sync.set({"firstTime": false}, function() {});

        }
            
    });
}

function addStreamingService() {
    document.getElementById("chooseAll").addEventListener("click", 
    function() {
        document.getElementById("allService").style.display = 'flex';
        document.getElementById("otherService").style.display = 'none';
        document.getElementById("chooseAll").style.color = "white";
        document.getElementById("chooseAll").style.backgroundColor = "#87d7e9";
        document.getElementById("chooseAll").style.borderColor = "#87d7e9";
        document.getElementById("chooseOther").style.color = "black";
        document.getElementById("chooseOther").style.backgroundColor = "white";
        document.getElementById("chooseOther").style.borderColor = "#87d7e9";
    });

    document.getElementById("chooseOther").addEventListener("click", 
    function() {
        document.getElementById("allService").style.display = 'none';
        document.getElementById("otherService").style.display = 'flex';
        document.getElementById("chooseOther").style.color = "white";
        document.getElementById("chooseOther").style.backgroundColor = "#87d7e9";
        document.getElementById("chooseOther").style.borderColor = "#87d7e9";
        document.getElementById("chooseAll").style.color = "black";
        document.getElementById("chooseAll").style.backgroundColor = "white";
        document.getElementById("chooseAll").style.borderColor = "#87d7e9";
    });

    document.getElementById("changeReminderButton").addEventListener("click", function() {
        document.getElementById("mainMessage").style.display = 'none';
        document.getElementById("sortButtonContainer").style.display = 'none';
        document.getElementById("subscriptionServiceListDiv").style.display = 'none';
        document.getElementById('deleteMessageContainer').style.display = 'none';
        document.getElementById("deleteAllContainer").style.display = 'none';
        document.getElementById("deleteData").style.display = 'none';
        document.getElementById("addButtonDiv").style.display = 'none';
        document.getElementById("intervalSettings").style.display = "flex";
    });

    document.getElementById("ThreeDays").addEventListener("click", function() {
        // rc_interval = 1000 * 60 * 60 * 24 * 3;
        chrome.storage.sync.get(["reminderInterval"], function(time2) {
            time2["reminderInterval"] = 3;
            chrome.storage.sync.set({"reminderInterval": time2["reminderInterval"]}, function() {});
                
        });
        alert("Setting reminder to cancel a service in 3 days!")
    });

    document.getElementById("OneWeek").addEventListener("click", function() {
        // rc_interval = 1000 * 60 * 60 * 24 * 7;
        chrome.storage.sync.get(["reminderInterval"], function(time2) {
            time2["reminderInterval"] = 7;
            chrome.storage.sync.set({"reminderInterval": time2["reminderInterval"]}, function() {});
                
        });
        alert("Setting reminder to cancel a service in 1 week!")
    });

    document.getElementById("TwoWeeks").addEventListener("click", function() {
        // rc_interval = 1000 * 60 * 60 * 24 * 14;
        chrome.storage.sync.get(["reminderInterval"], function(time2) {
            time2["reminderInterval"] = 14;
            chrome.storage.sync.set({"reminderInterval": time2["reminderInterval"]}, function() {});
                
        });
        alert("Setting reminder to cancel a service in 2 weeks!")
    });

    document.getElementById("backToMain").addEventListener("click", function() {
        document.getElementById("intervalSettings").style.display = "none";
        document.getElementById("sortButtonContainer").style.display = 'flex';
        document.getElementById("addServiceDiv").style.display = 'none';
        document.getElementById("buttonChoice").style.display = 'none';
        document.getElementById("subscriptionServiceListDiv").style.display = 'block';
        document.getElementById("addButtonDiv").style.display = 'flex';
        document.getElementById("deleteData").style.display = 'inline';
    });

    document.getElementById("addButton").addEventListener("click", 
    function() {
        if (document.getElementById("addButton").innerHTML === '+') {
            document.getElementById("addButton").innerHTML = '-';
            document.getElementById("buttonChoice").style.display = 'flex';
            document.getElementById("addServiceDiv").style.display = 'flex';
            document.getElementById("mainMessage").style.display = 'none';
            document.getElementById("sortButtonContainer").style.display = 'none';
            document.getElementById("subscriptionServiceListDiv").style.display = 'none';
            document.getElementById('deleteMessageContainer').style.display = 'none';
            // document.getElementById("deleteNetflixDiv").style.display = 'none';
            // document.getElementById("deleteHuluDiv").style.display = 'none';
            // document.getElementById("deletePeacockDiv").style.display = 'none';
            // document.getElementById("deleteHboDiv").style.display = 'none';
            document.getElementById("deleteAllContainer").style.display = 'none';
            document.getElementById("deleteData").style.display = 'none';

            // document.getElementById("deleteAmazonDiv").style.display = 'none';
        }
       else {
            document.getElementById("sortButtonContainer").style.display = 'flex';
            document.getElementById("addButton").innerHTML = '+';
            document.getElementById("addServiceDiv").style.display = 'none';
            document.getElementById("buttonChoice").style.display = 'none';
            document.getElementById("subscriptionServiceListDiv").style.display = 'block';
            
            document.getElementById("deleteData").style.display = 'inline';
       } 
    });

    document.getElementById("addAmazon").addEventListener("click", function() {
        chrome.storage.sync.get({"hostnames":[]}, 
        function(data) {
            if (!data["hostnames"].includes("www.amazon.com")) {
                data["hostnames"].push("www.amazon.com");
                chrome.storage.sync.get({"usingTime":[]}, function(time) {
                    time["usingTime"].push("amazonTime");
                    chrome.storage.sync.set({"usingTime": time["usingTime"]}, function (){
                        document.getElementById("amazonTime").innerHTML = 'Minutes of Amazon Prime Visits: 0';
                    });
                });
                chrome.storage.sync.set({"hostnames": data["hostnames"]}, function (){
                    alert('added amazon prime');
                    document.getElementById('amazonDiv').style.display = 'inline';
                    document.getElementById("amazonInfo").innerHTML = 'Number of Amazon Prime Visits: 0';
                });

                // add cancellation url for amazon
                chrome.storage.sync.get({"cancelUrlDict": {}}, function (d){
                    
                    if (!d["cancelUrlDict"]["amazonCancel"]) {
                        d["cancelUrlDict"]["amazonCancel"] = ("https://www.amazon.com/gp/help/customer/display.html?nodeId=GTJQ7QZY7QL2HK4Y");
                        chrome.storage.sync.set({"cancelUrlDict": d["cancelUrlDict"]}, function (){});
                    }
                });

                // add price for amazon
                var select = document.getElementById('amazonSelect');
				var option = select.options[select.selectedIndex];

                chrome.storage.sync.set({"amazonPrice": option.text}, function (){
                    document.getElementById('amazonPrice').innerHTML = option.text; 
                });
             
            }
            else {
                alert('already added Amazon Prime');
            }
        })
    })

    document.getElementById("addDisneyPlus").addEventListener("click", function() {
        chrome.storage.sync.get({"hostnames":[]}, 
        function(data) {
            if (!data["hostnames"].includes("www.disneyplus.com")) {
                data["hostnames"].push("www.disneyplus.com");
                chrome.storage.sync.get({"usingTime":[]}, function(time) {
                    time["usingTime"].push("disneyplusTime");
                    chrome.storage.sync.set({"usingTime": time["usingTime"]}, function (){
                        document.getElementById("disneyplusTime").innerHTML = 'Minutes of Disney Plus Visits: 0';
                    });
                });
                chrome.storage.sync.set({"hostnames": data["hostnames"]}, function (){
                    alert('added disney plus');
                    document.getElementById('disneyplusDiv').style.display = 'inline';
                    document.getElementById("disneyplusInfo").innerHTML = 'Number of Disney Plus Visits: 0';
                });

                // add cancellation url for amazon
                chrome.storage.sync.get({"cancelUrlDict": {}}, function (d){
                    
                    if (!d["cancelUrlDict"]["disneyplusCancel"]) {
                        d["cancelUrlDict"]["disneyplusCancel"] = ("https://help.disneyplus.com/csp?id=csp_article_content&sys_kb_id=0c5ab5bddb0b3050dbc9c28d13961967");
                        chrome.storage.sync.set({"cancelUrlDict": d["cancelUrlDict"]}, function (){});
                    }
                });

                // add price for amazon
                var select = document.getElementById('disneyplusSelect');
				var option = select.options[select.selectedIndex];

                chrome.storage.sync.set({"disneyplusPrice": option.text}, function (){
                    document.getElementById('disneyplusPrice').innerHTML = option.text; 
                });
             
            }
            else {
                alert('already added Disney Plus');
            }
        })
    })

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

                // add cancellation url for netflix
                chrome.storage.sync.get({"cancelUrlDict": {}}, function (d){
                    
                    if (!d["cancelUrlDict"]["netflixCancel"]) {
                        d["cancelUrlDict"]["netflixCancel"] = ("https://help.netflix.com/en/node/407");
                        chrome.storage.sync.set({"cancelUrlDict": d["cancelUrlDict"]}, function (){});
                    }
                });

                // add price for netflix
                var select = document.getElementById('netflixSelect');
				var option = select.options[select.selectedIndex];

                chrome.storage.sync.set({"netflixPrice": option.text}, function (){
                    document.getElementById('netflixPrice').innerHTML = option.text; 
                });


                
                

                chrome.storage.sync.set({"www.netflix.com":0}, function() {});
                chrome.storage.sync.set({"netflixTime":0}, function() {});
             
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

                // add cancellation url for hulu
                chrome.storage.sync.get({"cancelUrlDict": {}}, function (d){
                    
                    if (!d["cancelUrlDict"]["huluCancel"]) {
                        d["cancelUrlDict"]["huluCancel"] = ("https://help.hulu.com/s/article/cancel-hulu-subscription");
                        chrome.storage.sync.set({"cancelUrlDict": d["cancelUrlDict"]}, function (){});
                    }
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
                    alert('added POeacock tv');
                    document.getElementById('peacocktvDiv').style.display = 'inline';
                    document.getElementById("peacocktvInfo").innerHTML = 'Number of Peacock Visits: 0';
                });
                
                chrome.storage.sync.get({"usingTime":[]}, function(time) {
                    time["usingTime"].push("peacocktvTime");
                    chrome.storage.sync.set({"usingTime": time["usingTime"]}, function (){
                        document.getElementById("peacocktvTime").innerHTML = 'Minutes of Peacock Visits: 0';
                    });
                });

                // add cancellation url for peacock tv
                chrome.storage.sync.get({"cancelUrlDict": {}}, function (d){
                    
                    if (!d["cancelUrlDict"]["peacocktvCancel"]) {
                        d["cancelUrlDict"]["peacocktvCancel"] = ("https://www.peacocktv.com/help/article/cancellation");
                        chrome.storage.sync.set({"cancelUrlDict": d["cancelUrlDict"]}, function (){});
                    }
                });
                // add price for peacock
                var select = document.getElementById('peacockSelect');
				var option = select.options[select.selectedIndex];

                chrome.storage.sync.set({"peacocktvPrice": option.text}, function (){
                    document.getElementById('peacocktvPrice').innerHTML = option.text; 
                });
            }
            else {
                alert('already added Peacock tv');
            }
        })
    })

    document.getElementById("addParamountPlus").addEventListener("click", function() {
        chrome.storage.sync.get({"hostnames":[]}, 
        function(data) {
            if (!data["hostnames"].includes("www.paramountplus.com")) {
                data["hostnames"].push("www.paramountplus.com");
                
                chrome.storage.sync.set({"hostnames": data["hostnames"]}, function (){
                    alert('added Paramount Plus');
                    document.getElementById('paramountplusDiv').style.display = 'inline';
                    document.getElementById("paramountplusInfo").innerHTML = 'Number of Paramount Plus Visits: 0';
                });
                
                chrome.storage.sync.get({"usingTime":[]}, function(time) {
                    time["usingTime"].push("paramountplusTime");
                    chrome.storage.sync.set({"usingTime": time["usingTime"]}, function (){
                        document.getElementById("paramountplusTime").innerHTML = 'Minutes of Paramount Plus Visits: 0';
                    });
                });

                // add cancellation url for peacock tv
                chrome.storage.sync.get({"cancelUrlDict": {}}, function (d){
                    
                    if (!d["cancelUrlDict"]["paramountplusCancel"]) {
                        d["cancelUrlDict"]["paramountplusCancel"] = ("https://help.paramountplus.com/s/article/PD-How-can-I-cancel-my-Paramount-subscription");
                        chrome.storage.sync.set({"cancelUrlDict": d["cancelUrlDict"]}, function (){});
                    }
                });
                // add price for peacock
                var select = document.getElementById('paramountplusSelect');
				var option = select.options[select.selectedIndex];

                chrome.storage.sync.set({"paramountplusPrice": option.text}, function (){
                    document.getElementById('paramountplusPrice').innerHTML = option.text; 
                });
            }
            else {
                alert('already added Paramount Plus');
            }
        })
    })

    document.getElementById("addHbo").addEventListener("click", function() {
        chrome.storage.sync.get({"hostnames":[]}, 
        function(data) {
            if (!data["hostnames"].includes("www.hbomax.com")) {
                data["hostnames"].push("www.hbomax.com");
                
                chrome.storage.sync.set({"hostnames": data["hostnames"]}, function (){
                    alert('added HBO Max');
                    document.getElementById('hbomaxDiv').style.display = 'inline';
                    document.getElementById("hbomaxInfo").innerHTML = 'Number of HBO Max Visits: 0';
                });
                
                chrome.storage.sync.get({"usingTime":[]}, function(time) {
                    time["usingTime"].push("hbomaxTime");
                    chrome.storage.sync.set({"usingTime": time["usingTime"]}, function (){
                        document.getElementById("hbomaxTime").innerHTML = 'Minutes of HBO Max Visits: 0';
                    });
                });

                // add cancellation url for hbo max
                chrome.storage.sync.get({"cancelUrlDict": {}}, function (d){
                    
                    if (!d["cancelUrlDict"]["hbomaxCancel"]) {
                        d["cancelUrlDict"]["hbomaxCancel"] = ("https://help.hbomax.com/us/Answer/Detail/000001191");
                        chrome.storage.sync.set({"cancelUrlDict": d["cancelUrlDict"]}, function (){});
                    }
                });

                // add price for hbo
                var select = document.getElementById('hboSelect');
				var option = select.options[select.selectedIndex];

                chrome.storage.sync.set({"hbomaxPrice": option.text}, function (){
                    document.getElementById('hbomaxPrice').innerHTML = option.text; 
                });
            }
            else {
                alert('already added HBO Max');
            }
        })
    })

    document.getElementById("addSling").addEventListener("click", function() {
        chrome.storage.sync.get({"hostnames":[]}, 
        function(data) {
            if (!data["hostnames"].includes("www.sling.com")) {
                data["hostnames"].push("www.sling.com");
                
                chrome.storage.sync.set({"hostnames": data["hostnames"]}, function (){
                    alert('added Sling');
                    document.getElementById('slingDiv').style.display = 'inline';
                    document.getElementById("slingInfo").innerHTML = 'Number of Sling Visits: 0';
                });
                
                chrome.storage.sync.get({"usingTime":[]}, function(time) {
                    time["usingTime"].push("slingTime");
                    chrome.storage.sync.set({"usingTime": time["usingTime"]}, function (){
                        document.getElementById("slingTime").innerHTML = 'Minutes of Sling Visits: 0';
                    });
                });

                // add cancellation url for sling
                chrome.storage.sync.get({"cancelUrlDict": {}}, function (d){
                    
                    if (!d["cancelUrlDict"]["slingCancel"]) {
                        d["cancelUrlDict"]["slingCancel"] = ("https://www.sling.com/help/en/account-questions/account-changes/pause-cancel-subscription#cancel");
                        chrome.storage.sync.set({"cancelUrlDict": d["cancelUrlDict"]}, function (){});
                    }
                });

                // add price for sling
                var select = document.getElementById('slingSelect');
				var option = select.options[select.selectedIndex];

                chrome.storage.sync.set({"slingPrice": option.text}, function (){
                    document.getElementById('slingPrice').innerHTML = option.text; 
                });
            }
            else {
                alert('already added Sling');
            }
        })
    })

    document.getElementById("addFubo").addEventListener("click", function() {
        chrome.storage.sync.get({"hostnames":[]}, 
        function(data) {
            if (!data["hostnames"].includes("www.fubo.tv")) {
                data["hostnames"].push("www.fubo.tv");
                
                chrome.storage.sync.set({"hostnames": data["hostnames"]}, function (){
                    alert('added Fubo');
                    document.getElementById('fuboDiv').style.display = 'inline';
                    document.getElementById("fuboInfo").innerHTML = 'Number of Fubo Visits: 0';
                });
                
                chrome.storage.sync.get({"usingTime":[]}, function(time) {
                    time["usingTime"].push("fuboTime");
                    chrome.storage.sync.set({"usingTime": time["usingTime"]}, function (){
                        document.getElementById("fuboTime").innerHTML = 'Minutes of Fubo Visits: 0';
                    });
                });

                // add cancellation url for sling
                chrome.storage.sync.get({"cancelUrlDict": {}}, function (d){
                    
                    if (!d["cancelUrlDict"]["fuboCancel"]) {
                        d["cancelUrlDict"]["fuboCancel"] = ("https://support.fubo.tv/hc/en-us/articles/360021527991-How-do-I-cancel-my-fuboTV-subscription-");
                        chrome.storage.sync.set({"cancelUrlDict": d["cancelUrlDict"]}, function (){});
                    }
                });

                // add price for sling
                var select = document.getElementById('fuboSelect');
				var option = select.options[select.selectedIndex];

                chrome.storage.sync.set({"fuboPrice": option.text}, function (){
                    document.getElementById('fuboPrice').innerHTML = option.text; 
                });
            }
            else {
                alert('already added Fubo');
            }
        })
    })


    document.getElementById("addOtherService").addEventListener("click", function() {
        // TODO: print out error code if no input is received
        // will get the inputted data from otherService div
        var name= document.getElementsByName("name");
        // name = name[0].value.toLowerCase().replace(" ", "")
        var price= document.getElementsByName("price");
        var main_url= document.getElementsByName("main_url");
        var tempname = main_url[0].value
        tempname = tempname.replace("www.", "")
        tempname = tempname.replace(".com", "")
        var cancel_url= document.getElementsByName("cancel_url");
        var tempDivId = tempname +"Div";
        var tempDivPrice = tempname +"Price";
        var tempDivInfo = tempname +"Info";
        var tempDivCancel = tempname +"Cancel";
        var tempNameTime = tempname + "Time";
        console.log(tempname);
        if(name[0].value == "" || price[0].value == "" || main_url[0].value == "" || cancel_url[0].value == ""){
            alert("One of the provided textbox is empty. Please fill in all the textboxs.")
            return;
        }
        chrome.storage.sync.get({"hostnames":[]}, 
        function(data) {
            if (!data["hostnames"].includes(main_url[0].value)) {
                console.log(main_url[0].value)
                data["hostnames"].push(main_url[0].value);
                
                //create div for added custom service
                chrome.storage.sync.get({"otherData": []}, function (data2){
                    main_url= document.getElementsByName("main_url");
                    console.log(main_url[0].value)
                    var tempDict = {
                        "name": name[0].value,
                        "price": name[0].value +": $" + price[0].value,
                        "main_url": main_url[0].value,
                        "cancel_url": cancel_url[0].value,
                        "visitNum": 0,
                        "timeNum": 0

                    };
                    if (!data2["otherData"].includes(tempDict)) {

                        data2["otherData"].push(tempDict);
                        console.log(data2["otherData"])
                        
                    }
                    chrome.storage.sync.get({"cancelUrlDict": {}}, function (d){
                    
                        if (!d["cancelUrlDict"][tempDivCancel]) {
                            d["cancelUrlDict"][tempDivCancel] = (cancel_url[0].value);
                            chrome.storage.sync.set({"cancelUrlDict": d["cancelUrlDict"]}, function (){});
                        }
                    });
                    
                    var tempOtherDiv = "<div id='" + tempDivId +"' data-time='0' data-num='0' class='sort'>";
                    tempOtherDiv += "<div class='serviceHeader'><span class='serviceTitle'>" + name[0].value + "</span></div>";
                    tempOtherDiv += "<div class='infodiv'>";
                    tempOtherDiv +=  "<div id='" + tempDivPrice +"' class='infoSpace'></div>";
                    tempOtherDiv += "<div id='" + tempDivInfo +"' class='infoSpace'></div>";
                    tempOtherDiv += "<div id='" + tempNameTime +"' class='infoSpace'></div>";

                    tempOtherDiv += "<div class='infoSpace'>";
                    tempOtherDiv += "<button id='" + tempDivCancel +"'  class='cancelBtn'>Cancel " + name[0].value +"</button>";
                    tempOtherDiv += "</div></div></div>";
                    console.log(tempOtherDiv);

                    document.getElementById('subscriptionServiceListDiv').insertAdjacentHTML("beforeend",tempOtherDiv);

                    // add custom service delete button confirmation div

                    var tempDeleteNameDiv = "<div id='delete" + tempname +"Div'>";
                    tempDeleteNameDiv += "<button id='delete" + tempname + "Yes' class='yesButton'>Yes</button>"
                    tempDeleteNameDiv += "<button id='delete" + tempname + "No' class='noButton'>No</button>"
                    tempDeleteNameDiv += "</div>"
                    document.getElementById('deleteMessageContainer').insertAdjacentHTML("beforeend",tempDeleteNameDiv);
                    document.getElementById("delete" + tempname +"Div").style.display = 'none';
                    document.getElementById(tempDivCancel).addEventListener("mouseenter", cancelButtonHandler);
                    
                    chrome.storage.sync.set({"otherData": data2["otherData"]}, function (){
                        
                    });
                });

                // add info for visit data update later
                var save = {};
                main_url = main_url[0].value
                save[main_url[0].value] = 0;
                chrome.storage.sync.set(save, function() {});
                save = {};
                save[tempNameTime] = 0;
                chrome.storage.sync.set(save, function() {});
                
                
                chrome.storage.sync.set({"hostnames": data["hostnames"]}, function (){
                    
                    
                    document.getElementById(tempDivId).style.display = 'inline';
                    document.getElementById(tempDivInfo).innerHTML = "Number of " + name[0].value +" Visits: 0";
                });
                
                chrome.storage.sync.get({"usingTime":[]}, function(time) {
                    
                    time["usingTime"].push(tempNameTime);
                    chrome.storage.sync.set({"usingTime": time["usingTime"]}, function (){
                        document.getElementById(tempNameTime).innerHTML = "Minutes of " + name[0].value +" Visits: 0";
                    });
                });

                // add price for custom service
                

                chrome.storage.sync.set({tempDivPrice: price[0].value}, function (){
                    document.getElementById(tempDivPrice).innerHTML = name[0].value +": $" + price[0].value; 
                });
                alert("adding custom service with main url " + main_url)
            }
            else {
                alert('already added the custom service ' + main_url[0].value);
            }
        })
    })
}

function showVisitData() {
    chrome.storage.sync.get({"hostnames":[]}, function(data) {
        for (var i = 0; i < data["hostnames"].length; i++) {
            switch (data["hostnames"][i]) {
                case "www.amazon.com":
                    amazonData();
                    
                    // added price set here for convinience of not adding new function.
                    // can change if it's cluttering this function
                    chrome.storage.sync.get(["amazonPrice"], function (price){
                        document.getElementById('amazonPrice').innerHTML = price["amazonPrice"]; 
                    });
                    break;
                case "www.disneyplus.com":
                    disneyplusData();
                    
                    // added price set here for convinience of not adding new function.
                    // can change if it's cluttering this function
                    chrome.storage.sync.get(["disneyplusPrice"], function (price){
                        document.getElementById('disneyplusPrice').innerHTML = price["disneyplusPrice"]; 
                    });
                    break;
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
                    chrome.storage.sync.get(["peacocktvPrice"], function (price){
                        document.getElementById('peacocktvPrice').innerHTML = price["peacocktvPrice"]; 
                    });
                    break;
                case "www.paramountplus.com":
                    paramountplusData();
                    chrome.storage.sync.get(["paramountplusPrice"], function (price){
                        document.getElementById('paramountplusPrice').innerHTML = price["paramountplusPrice"]; 
                    });
                    break;
                case "www.hbomax.com":
                    hboData();
                    chrome.storage.sync.get(["hbomaxPrice"], function (price){
                        document.getElementById('hbomaxPrice').innerHTML = price["hbomaxPrice"]; 
                    });
                    break;
                case "www.sling.com":
                    slingData();
                    chrome.storage.sync.get(["slingPrice"], function (price){
                        document.getElementById('slingPrice').innerHTML = price["slingPrice"]; 
                    });
                    break;
                case "www.fubo.tv":
                    fuboData();
                    chrome.storage.sync.get(["fuboPrice"], function (price){
                        document.getElementById('fuboPrice').innerHTML = price["fuboPrice"]; 
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
                case "amazonTime":
                    chrome.storage.sync.get({"amazonTime": 0}, function(data) {
                        document.getElementById('amazonTime').innerHTML = "Minutes of Amazon Prime Visits: " + data["amazonTime"];
                        document.getElementById('amazonDiv').dataset.time = (data["amazonTime"]).toString();
                        console.log(document.getElementById('amazonDiv').dataset.time);
                    });
                    break;
                case "disneyplusTime":
                    chrome.storage.sync.get({"disneyplusTime": 0}, function(data) {
                        document.getElementById('disneyplusTime').innerHTML = "Minutes of Disney Plus Visits: " + data["disneyplusTime"];
                        document.getElementById('disneyplusDiv').dataset.time = (data["disneyplusTime"]).toString();
                        console.log(document.getElementById('disneyplusDiv').dataset.time);
                    });
                    break;
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
                case "peacocktvTime":
                    chrome.storage.sync.get({"peacocktvTime": 0}, function(data) {
                        document.getElementById('peacocktvTime').innerHTML = "Minutes of Peacock Visits: " + data["peacocktvTime"];
                        document.getElementById('peacocktvDiv').dataset.time = (data["peacocktvTime"]).toString();
                        console.log(document.getElementById('peacocktvDiv').dataset.time);
                    });
                    break;
                case "paramountplusTime":
                    chrome.storage.sync.get({"paramountplusTime": 0}, function(data) {
                        document.getElementById('paramountplusTime').innerHTML = "Minutes of Paramount Plus Visits: " + data["paramountplusTime"];
                        document.getElementById('paramountplusDiv').dataset.time = (data["paramountplusTime"]).toString();
                        console.log(document.getElementById('paramountplusDiv').dataset.time);
                    });
                    break;
                case "hbomaxTime":
                    chrome.storage.sync.get({"hbomaxTime": 0}, function(data) {
                        document.getElementById('hbomaxTime').innerHTML = "Minutes of HBO Max Visits: " + data["hbomaxTime"];
                        document.getElementById('hbomaxDiv').dataset.time = (data["hbomaxTime"]).toString();
                        console.log(document.getElementById('hbomaxDiv').dataset.time);
                    });
                    break;
                case "slingTime":
                    chrome.storage.sync.get({"slingTime": 0}, function(data) {
                        document.getElementById('slingTime').innerHTML = "Minutes of Sling Visits: " + data["slingTime"];
                        document.getElementById('slingDiv').dataset.time = (data["slingTime"]).toString();
                        console.log(document.getElementById('slingDiv').dataset.time);
                    });
                    break;
                case "fuboTime":
                    chrome.storage.sync.get({"fuboTime": 0}, function(data) {
                        document.getElementById('fuboTime').innerHTML = "Minutes of Fubo Visits: " + data["fuboTime"];
                        document.getElementById('fuboDiv').dataset.time = (data["fuboTime"]).toString();
                        console.log(document.getElementById('fuboDiv').dataset.time);
                    });
                    break;
                default:
                    // alert('problem');
                    break;
            }
        };
    })
}

function amazonData() {
    document.getElementById('amazonDiv').style.display = 'inline';
    chrome.storage.sync.get({"www.amazon.com": 0}, function(data) {
        document.getElementById('amazonInfo').innerHTML = "Number of Amazon Visits: " + data["www.amazon.com"];
        document.getElementById('amazonDiv').dataset.num = (data["www.amazon.com"]).toString();
    });
}

function disneyplusData() {
    document.getElementById('disneyplusDiv').style.display = 'inline';
    chrome.storage.sync.get({"www.disneyplus.com": 0}, function(data) {
        document.getElementById('disneyplusInfo').innerHTML = "Number of Disney Plus Visits: " + data["www.disneyplus.com"];
        document.getElementById('disneyplusDiv').dataset.num = (data["www.disneyplus.com"]).toString();
    });
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
    document.getElementById('peacocktvDiv').style.display = 'inline';
    chrome.storage.sync.get({"www.peacocktv.com": 0}, function(data) {
        document.getElementById('peacocktvInfo').innerHTML = "Number of Peacock Visits: " + data["www.peacocktv.com"];
        document.getElementById('peacocktvDiv').dataset.num = (data["www.peacocktv.com"]).toString();
    });
}

function paramountplusData() {
    document.getElementById('paramountplusDiv').style.display = 'inline';
    chrome.storage.sync.get({"www.paramountplus.com": 0}, function(data) {
        document.getElementById('paramountplusInfo').innerHTML = "Number of Paramount Plus Visits: " + data["www.paramountplus.com"];
        document.getElementById('paramountplusDiv').dataset.num = (data["www.paramountplus.com"]).toString();
    });
}

function hboData() {
    document.getElementById('hbomaxDiv').style.display = 'inline';
    chrome.storage.sync.get({"www.hbomax.com": 0}, function(data) {
        document.getElementById('hbomaxInfo').innerHTML = "Number of HBO Max Visits: " + data["www.hbomax.com"];
        document.getElementById('hbomaxDiv').dataset.num = (data["www.hbomax.com"]).toString();
    });
}

function slingData() {
    document.getElementById('slingDiv').style.display = 'inline';
    chrome.storage.sync.get({"www.sling.com": 0}, function(data) {
        document.getElementById('slingInfo').innerHTML = "Number of Sling Visits: " + data["www.sling.com"];
        document.getElementById('slingDiv').dataset.num = (data["www.sling.com"]).toString();
    });
}

function fuboData() {
    document.getElementById('fuboDiv').style.display = 'inline';
    chrome.storage.sync.get({"www.fubo.tv": 0}, function(data) {
        document.getElementById('fuboInfo').innerHTML = "Number of Fubo Visits: " + data["www.fubo.tv"];
        document.getElementById('fuboDiv').dataset.num = (data["www.fubo.tv"]).toString();
    });
}


function showDeleteAllMessage() {
    
    document.getElementById('deleteData').addEventListener('click',
    function () {
        document.getElementById("sortButtonContainer").style.display = 'none';
        document.getElementById("subscriptionServiceListDiv").style.display = 'none';
        document.getElementById("deleteAllContainer").style.display = 'flex';
        document.getElementById("deleteData").style.display = 'none';
        
    }
    );

}

// deletes data from storage
function deleteButton() {
    document.getElementById('deleteAllYes').addEventListener('click',
    function () {
        
        chrome.storage.sync.clear(function() {
            alert("Deleted Stored Data");
        });
        chrome.storage.sync.set({"firstTime": true}, function(){});
        window.location.reload();
    }
    );

    document.getElementById('deleteAllNo').addEventListener('click',
    function () {
        document.getElementById("deleteAllContainer").style.display = 'none';
        document.getElementById("sortButtonContainer").style.display = 'flex';
        document.getElementById("subscriptionServiceListDiv").style.display = 'block';
        document.getElementById("deleteData").style.display = 'inline';
    }
    );

}

// handles the delete of one service for every hard coded services so far
function deleteOneService(event) {
    var name = event.target.id
    name = name.replace("delete","");
    name = name.replace("Yes","");
    name = name.toLowerCase();
    var hostname = ""
    if(name == "fubo"){
        hostname = "www." + name + ".tv";
    }
    else {
        hostname = "www." + name + ".com";
    }
    
    var nameTime = name + "Time";
    var nameDiv = name + "Div";
    var nameCancel = name + "Cancel";
    chrome.storage.sync.get({"hostnames":[]}, 
    function(data) {
        if (data["hostnames"].includes(hostname)) {
            console.log(data["hostnames"]);
            for (var i = 0; i < data["hostnames"].length; i++){
                if (data["hostnames"][i] == hostname) {
                    data["hostnames"].splice(i, 1);
                    console.log(data["hostnames"]);
                    chrome.storage.sync.set({"hostnames":data["hostnames"]}, function(){});
                }
            }

            chrome.storage.sync.get({"usingTime":[]}, function(data) {
                for (var i = 0; i < data["usingTime"].length; i++) {
                    if (data["usingTime"][i] == nameTime) {
                        data["usingTime"].splice(i, 1);
                        console.log(data["usingTime"]);
                        chrome.storage.sync.set({"usingTime":data["usingTime"]}, function(){});
                    }
                }
            });
            // delete custom service if applicable
            chrome.storage.sync.get({"otherData":[]}, function(d) {
                for (var i = 0; i < d["otherData"].length; i++) {
                    var temp_main_url = d["otherData"][i].main_url.replace("www.", "").replace(".com", "")
                    console.log(temp_main_url)
                    if (temp_main_url == name) {
                        d["otherData"].splice(i, 1);
                        chrome.storage.sync.set({"otherData":d["otherData"]}, function(){});
                        
                    }
                }
            });

            console.log(nameDiv)
            document.getElementById(nameDiv).style.display = 'none';
            chrome.storage.sync.get({"cancelUrlDict":{}}, function(d) {
                var tempUrlCancel = d["cancelUrlDict"][nameCancel]
                console.log(hostname)
                delete d["cancelUrlDict"][nameCancel];
                console.log(nameTime)
                chrome.storage.sync.set({"cancelUrlDict":d["cancelUrlDict"]}, function(){});
                
                
                var save = {};
                save[hostname] = 0;
                chrome.storage.sync.set(save, function() {});
                save = {};
                save[nameTime] = 0;
                chrome.storage.sync.set(save, function() {});
                window.open(tempUrlCancel, "_blank");
                
                
            });
            
            
        }
        else {
            console.log("no " + name);
        }
    })
}

// adds functionality to close button
function closeButton() {
    document.getElementById('closeButton').addEventListener("click",
    function() {
        window.close();
    }
    );
}

