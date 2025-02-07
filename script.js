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

//=============Power Off Button - humidifier widget
let intervalId = setInterval(updateRandomGauge, 1000);
// Lấy nút power-off (nút thứ 2 trong .controls)
const powerOffButton = document.querySelector(
  ".humidifier-widget .controls button:last-child"
);
// Xử lý sự kiện click cho nút power-off
powerOffButton.addEventListener("click", function () {
  // Dừng cập nhật random
  clearInterval(intervalId);
  // Lấy phần tử gauge
  const gauge = document.querySelector(".gauge.humidifier.neon");
  // Cập nhật CSS biến --value (ở đây có thể đặt 0)
  gauge.style.setProperty("--value", 0);
  // Hiển thị chữ "Off" thay vì số phần trăm
  gauge.querySelector(".value").textContent = "OFF";
});

//============= Hàm cập nhật gauge với giá trị mới
function updateGauge(newVal) {
  // Lấy phần tử gauge có class ".gauge.humidifier.neon"
  const gauge = document.querySelector(
    ".humidifier-widget .gauge.humidifier.neon"
  );
  // Cập nhật biến CSS --value của gauge
  gauge.style.setProperty("--value", newVal);
  // Cập nhật text hiển thị bên trong phần tử con có class ".value"
  gauge.querySelector(".value").textContent = newVal + "%";
}

// Hàm cập nhật gauge với giá trị ngẫu nhiên
function updateRandomGauge() {
  // Sinh số ngẫu nhiên từ 0 đến 100
  const randomValue = Math.floor(Math.random() * 101);
  // Gọi hàm cập nhật gauge với giá trị ngẫu nhiên
  updateGauge(randomValue);
}
//==========Active Button - Humidifier============
const activeButton = document.querySelector(
  ".humidifier-widget .controls .active"
);
activeButton.addEventListener("click", function () {
  clearInterval(intervalId);
  updateRandomGauge(); // Cập nhật gauge ngay lập tức
  intervalId = setInterval(updateRandomGauge, 1000);
});

//==========Power Off - Pump Widget=========
let intervalId2 = setInterval(updateRandomPumpGauge, 1000);
const powerOffButton2 = document.querySelector(
  ".pump-widget .controls button:last-child"
);
powerOffButton2.addEventListener("click", function () {
  clearInterval(intervalId2);
  const gaugePump = document.querySelector(".pump-widget .gauge.pump.neon");
  gaugePump.style.setProperty("--value", 0);
  gaugePump.querySelector(".value").textContent = "OFF";
});

function updatePumpGauge(newVal) {
  // Lấy phần tử gauge có class ".gauge.pump.neon"
  const gauge = document.querySelector(".pump-widget .gauge.pump.neon");
  // Cập nhật biến CSS --value của gauge
  gauge.style.setProperty("--value", newVal);
  // Cập nhật text hiển thị bên trong phần tử con có class ".value"
  gauge.querySelector(".value").textContent = newVal + "%";
}

// Hàm cập nhật gauge với giá trị ngẫu nhiên
function updateRandomPumpGauge() {
  // Sinh số ngẫu nhiên từ 0 đến 100
  const randomValue = Math.floor(Math.random() * 101);
  // Gọi hàm cập nhật gauge với giá trị ngẫu nhiên
  updatePumpGauge(randomValue);
}
//==========Active Button - Pump============
const activeButtonPump = document.querySelector(
  ".pump-widget .controls .active"
);
activeButtonPump.addEventListener("click", function () {
  clearInterval(intervalId);
  updateRandomPumpGauge(); // Cập nhật gauge ngay lập tức
  intervalId = setInterval(updateRandomPumpGauge, 1000);
});
