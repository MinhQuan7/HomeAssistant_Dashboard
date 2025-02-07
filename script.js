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

//============= Hàm cập nhật gauge với giá trị mới
function updateGauge(newVal) {
  // Lấy phần tử gauge có class ".gauge.humidifier.neon"
  const gauge = document.querySelector(".gauge.humidifier.neon");
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

// Sử dụng setInterval để gọi hàm updateRandomGauge mỗi 1 giây
setInterval(updateRandomGauge, 1000);

//==========Pump
function updatePumpGauge(newVal) {
  // Lấy phần tử gauge có class ".gauge.pump.neon"
  const gauge = document.querySelector(".gauge.pump.neon");
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

// Sử dụng setInterval để gọi hàm updateRandomGauge mỗi 1 giây
setInterval(updateRandomPumpGauge, 1000);
