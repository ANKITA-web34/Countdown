const inputContainer = document.getElementById("input-container");
const countdownFrom = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");

const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const timeElements = document.querySelectorAll("span");
const countdownBtn = document.getElementById('countdown-button');

let countdownTitle = "";
let countdownDate = "";
let countdownValue = Date;
let countdownActive;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;


//Set Data to days date
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

function updateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;
  
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor(distance % hour / minute);
    const seconds = Math.floor(distance % minute / second);
   
    // displaying countdown  Day Minute hour second! 
    countdownElTitle.textContent = `${countdownTitle}`;
    timeElements[0].textContent = `${days}`;
    timeElements[1].textContent = `${hours}`;
    timeElements[2].textContent = `${minutes}`;
    timeElements[3].textContent = `${seconds}`;
  
    //hide input & show
    inputContainer.hidden = true;
    countdownEl.hidden = false;
  }, second);
}

//Take value from input
function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;

  //check for valid Date
  if(countdownDate === '') {
      alert('Plaece')
  } else {
        //get the number version of current date
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
  }
}

//reset countdown!
function reset() {
    countdownEl.hidden = true;
    inputContainer.hidden = false;

    //stop countdown
    clearInterval((countdownActive));

    //reset value
    countdownTitle = "";
    countdownDate = "";
}

countdownFrom.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener('click', reset);
