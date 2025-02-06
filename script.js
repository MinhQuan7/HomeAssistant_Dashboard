const slider = document.querySelector(".brightness-slider");
const sliderFill = document.querySelector(".slider-fill");
const valueDisplay = document.querySelector(".widget-value");

slider.addEventListener("input", function () {
  const value = this.value;
  sliderFill.style.width = value + "%";
  valueDisplay.textContent = value + "%";
});

const sliderLivingRoom = document.querySelector(".brightness-sliderLivingRom");
const valueLivingRoom = document.querySelector(".widget-valueLivingRoom");
const sliderFillLivingRoom = document.querySelector(".slider-fill-livingRoom");
sliderLivingRoom.addEventListener("input", function () {
  const value = this.value;
  sliderFillLivingRoom.style.width = value + "%";
  valueLivingRoom.textContent = value + "%";
});

// Widget Bed Light
const widget = document.querySelector(".light-icon");
const icon = document.querySelector(".light-icon");
const status = document.querySelector(".status");
let isOn = false;

widget.addEventListener("click", () => {
  isOn = !isOn;
  if (isOn) {
    icon.classList.add("active");
    status.textContent = "On";
  } else {
    icon.classList.remove("active");
    status.textContent = "Off";
  }
});
