var hours = document.getElementById("hours");
var minutes = document.getElementById("minutes");
var seconds = document.getElementById("seconds");
var totalSeconds = 0;
var myStart;
var btnStart = document.getElementsByClassName("btn start")[0];
var btnPause = document.getElementsByClassName("btn pause")[0];
var btnStop = document.getElementsByClassName("btn stop")[0];
var btnReset = document.getElementsByClassName("btn reset")[0];
var clickedStart = false, clickedPause = false;
var audioPlayer = document.getElementById("audioPlayer");
var audioVolume = document.getElementById("audioVolume");
var startSound = document.getElementById("startSound");
var breakSound = document.getElementById("breakSound");
var btnCam = document.getElementsByClassName("btn cam")[0];
var countCam = 0;

window.onload = main;
function main(){
    var today = new Date();
    var date = today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear();
    document.getElementById("today").innerHTML = date;
    btnStart.onclick = runStart;
    btnPause.onclick = runPause;
    btnStop.onclick  = runStop;
    btnReset.onclick = runReset;
    audioVolume.oninput = runVolume;
    var video = document.getElementById('video');
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            video.srcObject = stream;
            video.play();   
        });
    }
    btnCam.onclick = togCam;
}

function runVolume(){
    audioPlayer.volume = (audioVolume.value/100);
    var titleVolume = document.getElementsByClassName("titleVolume")[0];
    titleVolume.innerHTML = audioVolume.value +"%";
}

function runStart(){
    myStart = setInterval(fStart, 1000);
    btnStart.disabled=true;
    clickedStart = true;
    audioPlayer.play();
    startSound.play();
}

function runPause(){
    if(clickedStart == true){
        clearInterval(myStart);
        btnStart.value="Conti.";
        btnStart.disabled=false;
        clickedPause = true;
        audioPlayer.pause();
    }
}

function runStop(){
    if(clickedStart == true || clickedPause == true){
        btnStart.value="Start";
        clearInterval(myStart);
        btnStart.disabled=true;
        btnPause.disabled=true;
        audioPlayer.pause();
    }
}

function runReset(){
        btnStart.value="Start";
        clearInterval(myStart);
        btnStart.disabled=false;
        btnPause.disabled=false;
        clickedStart = false;
        clickedPause = false;
        fReset();
        audioPlayer.pause();
}   

function fStart(){
        ++totalSeconds;
        var temp = totalSeconds;
        hours.innerHTML   = pad(parseInt(temp/3600));
        temp%=3600;
        minutes.innerHTML = pad(parseInt(temp/60));
        seconds.innerHTML = pad(temp%60);
        if((totalSeconds>0) && (totalSeconds%3000==0)){
            breakSound.play();
            btnPause.click();
        }
}

function pad(val){
    var valString = val + "";
    if(valString.length<2){
        return "0" + valString;
    }else{
        return valString;
    }
}

function fReset(){
    hours.innerHTML = "00";
    minutes.innerHTML = "00";
    seconds.innerHTML = "00";
    totalSeconds = 0;
}

function togCam(){
    ++countCam;
    let cam = document.getElementById("cam");
    if(countCam%2==1){ 
        cam.style.height="auto";
        cam.style.opacity="1";
    }else{
        cam.style.opacity="0";
    }
}
