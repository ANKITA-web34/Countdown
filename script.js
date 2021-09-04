const inputContainer = document.getElementById("input-container");
const countdownFrom = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");

const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const timeElements = document.querySelectorAll("span");
const countdownBtn = document.getElementById('countdown-button');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeButton = document.getElementById('complete-button');
/////////////////////////////////////////////////////////////////////

let countdownTitle = "";
let countdownDate = "";
let countdownValue = Date;
let countdownActive;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
/////////////////////////////

//Set Data to days date
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

//UPDATE THE DOM
function updateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;
    console.log(distance)
  
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor(distance % hour / minute);
    const seconds = Math.floor(distance % minute / second);

    //hide input
    inputContainer.hidden = true;

    //If countdown has ended, show coplete!
    if(distance < 0) {
      countdownEl.hidden = true;
      clearInterval(countdownActive);
      completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
      completeEl.hidden = false;
    } else {      
      // displaying countdown  Day Minute hour second! 
      countdownElTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;
      completeEl.hidden = true;
      
      //show input
      countdownEl.hidden = false;
    }  
    console.log(days, hours, minutes, seconds);
  }, second);
}

//TAKE VALUE FROM INPUTBOX
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

//RSET COUNTDOWN!
function reset() {
    countdownEl.hidden = true;
    inputContainer.hidden = false;

    //stop countdown
    clearInterval((countdownActive));
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;    

    //reset value
    countdownTitle = "";
    countdownDate = "";
}


countdownFrom.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeButton.addEventListener('click', reset)