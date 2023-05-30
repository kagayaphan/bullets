var hpBarW = 100;

document.getElementById("updateButton").addEventListener("click", function() {
    hpBarW -= 10;
    var hpWidth = hpBarW; // Set the HP width based on your requirements
    var hpBar = document.getElementById("hp-bar-progress");
    hpBar.style.width = hpWidth + "%";
});