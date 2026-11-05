let currentState = "CLOSED";
let currentPercent = 0;
let isMoving = false;

function handleModeChange() {
  const dayNightEl = document.getElementById('autoDayNight');
  const rainEl = document.getElementById('autoRain');
  const manualEl = document.getElementById('manualOverride');
  
  const btnOpen = document.getElementById('btnOpen');
  const btnClose = document.getElementById('btnClose');
  
  if (manualEl.checked) {
    dayNightEl.checked = false;
    rainEl.checked = false;
    dayNightEl.disabled = true;
    rainEl.disabled = true;
    
    btnOpen.disabled = false;
    btnClose.disabled = false;
  } else {
    dayNightEl.checked = true;
    rainEl.checked = true;
    dayNightEl.disabled = false;
    rainEl.disabled = false;
    
    btnOpen.disabled = true;
    btnClose.disabled = true;
  }
}

function controlWindow(action) {
  if (isMoving) return;

  const windowStateEl = document.getElementById("windowState");
  const windowPercentEl = document.getElementById("windowPercent");
  const progressBarEl = document.getElementById("progressBar");

  if (action === "OPEN") {
    if (currentPercent === 100) return;
    isMoving = true;
    windowStateEl.innerText = "OPENING...";

    let interval = setInterval(() => {
      if (currentPercent < 100) {
        currentPercent += 20;
        windowPercentEl.innerText = currentPercent + "% Open";
        progressBarEl.style.width = currentPercent + "%";
      } else {
        clearInterval(interval);
        currentState = "OPEN";
        windowStateEl.innerText = "OPEN";
        isMoving = false;
      }
    }, 300);

  } else if (action === "CLOSE") {
    if (currentPercent === 0) return;
    isMoving = true;
    windowStateEl.innerText = "CLOSING...";

    let interval = setInterval(() => {
      if (currentPercent > 0) {
        currentPercent -= 20;
        windowPercentEl.innerText = currentPercent + "% Open";
        progressBarEl.style.width = currentPercent + "%";
      } else {
        clearInterval(interval);
        currentState = "CLOSED";
        windowStateEl.innerText = "CLOSED";
        isMoving = false;
      }
    }, 300);
  }
}

window.onload = function() {
  document.getElementById('autoDayNight').addEventListener('change', handleModeChange);
  document.getElementById('autoRain').addEventListener('change', handleModeChange);
  document.getElementById('manualOverride').addEventListener('change', handleModeChange);
  handleModeChange();
  
  // Tatawagin nito ang function mula sa weatherApi.js
  fetchLiveWeather();
  setInterval(fetchLiveWeather, 300000); 
};