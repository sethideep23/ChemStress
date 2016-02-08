/*var myShakeEvent = new Shake({
		threshold: 15, // optional shake strength threshold
	timeout: 1000 // optional, determines the frequency of event generation
});
myShakeEvent.start();

window.addEventListener('shake', shakeEventDidOccur, false);

//function to call when shake occurs
function shakeEventDidOccur (e) {

    //put your own code here etc.
    alert('Shake, the strength: ' + e.detail.strength);
}*/

function drawImage() {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    var img = document.getElementById("vial");
    ctx.drawImage(img, 10, 10);
}