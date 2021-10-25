

window.addEventListener('load', (event) => {
    var closeButton = document.getElementById("closeButton");
    document.getElementById("inputText").addEventListener("change", event =>{
    document.getElementById("headingText").innerHTML = event.target.value;
    
    });

    closeButton.addEventListener("click", async () =>{
        window.close();
        
    });
});




