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
let intervalId = setInterval(randomPumpHumid, 1000);

// Lấy nút power-off (nút thứ 2 trong .controls)
const powerOffButton = document.querySelector(
  ".humidifier-widget .controls button:last-child"
);
powerOffButton.addEventListener("click", function () {
  clearInterval(intervalId);
  updateRandom("humidifier"); // Cập nhật gauge ngay lập tức
  const gauge = document.querySelector(".gauge.humidifier.neon");
  // Cập nhật CSS biến --value (ở đây có thể đặt 0)
  gauge.style.setProperty("--value", 0);
  // Hiển thị chữ "Off" thay vì số phần trăm
  gauge.querySelector(".value").textContent = "OFF";
});
const powerOffButton2 = document.querySelector(
  ".pump-widget .controls button:last-child"
);
powerOffButton2.addEventListener("click", function () {
  clearInterval(intervalId);
  updateRandom("humidifier"); // Cập nhật gauge ngay lập tức
  const gaugePump = document.querySelector(".pump-widget .gauge.pump.neon");
  gaugePump.style.setProperty("--value", 0);
  gaugePump.querySelector(".value").textContent = "OFF";
});

//============Active Button==============
const activeButtonPump = document.querySelector(
  ".pump-widget .controls .active"
);
const activeButtonHumidifier = document.querySelector(
  ".humidifier-widget .controls .active"
);

activeButtonPump.addEventListener("click", function () {
  clearInterval(intervalId);
  updateRandom("pump"); // Cập nhật gauge ngay lập tức
  intervalId = setInterval(() => updateRandom("pump"), 1000);
});

activeButtonHumidifier.addEventListener("click", function () {
  clearInterval(intervalId);
  updateRandom("humidifier"); // Cập nhật gauge ngay lập tức
  intervalId = setInterval(() => updateRandom("humidifier"), 1000);
});

function updateRandom(type) {
  if (type === "pump") {
    const randomValue = Math.floor(Math.random() * 101);
    updatePumpGauge(randomValue);
    updateChart(randomValue, null); // Giả sử bạn muốn cập nhật chart với giá trị pump
  } else if (type === "humidifier") {
    const randomHumiValue = Math.floor(Math.random() * 101);
    updateGauge(randomHumiValue);
    updateChart(null, randomHumiValue); // Giả sử bạn muốn cập nhật chart với giá trị humidifier
  }
}

function randomPumpHumid() {
  const randomValue = Math.floor(Math.random() * 101);
  const randomHumiValue = Math.floor(Math.random() * 101);
  updatePumpGauge(randomValue);
  updateGauge(randomHumiValue);
  updateChart(randomValue, randomHumiValue);
}

function updatePumpGauge(newVal) {
  // Lấy phần tử gauge có class ".gauge.pump.neon"
  const gauge = document.querySelector(".pump-widget .gauge.pump.neon");
  gauge.style.setProperty("--value", newVal);
  gauge.querySelector(".value").textContent = newVal + "%";
}

function updateGauge(newVal) {
  // Lấy phần tử gauge có class ".gauge.humidifier.neon"
  const gauge = document.querySelector(
    ".humidifier-widget .gauge.humidifier.neon"
  );
  gauge.style.setProperty("--value", newVal);
  gauge.querySelector(".value").textContent = newVal + "%";
}

//======Cleaning Widget=======
function updateCountdown() {
  const now = new Date();
  const target = new Date();
  target.setHours(target.getHours() + 16);

  const diff = target - now;

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  // Update hours
  const hoursElement = document.getElementById("hours");
  if (hoursElement.textContent !== hours.toString().padStart(2, "0")) {
    hoursElement.classList.add("flip");
    setTimeout(() => hoursElement.classList.remove("flip"), 600);
  }
  hoursElement.textContent = hours.toString().padStart(2, "0");

  // Update minutes
  const minutesElement = document.getElementById("minutes");
  if (minutesElement.textContent !== minutes.toString().padStart(2, "0")) {
    minutesElement.classList.add("flip");
    setTimeout(() => minutesElement.classList.remove("flip"), 600);
  }
  minutesElement.textContent = minutes.toString().padStart(2, "0");

  // Update seconds
  const secondsElement = document.getElementById("seconds");
  if (secondsElement.textContent !== seconds.toString().padStart(2, "0")) {
    secondsElement.classList.add("flip");
    setTimeout(() => secondsElement.classList.remove("flip"), 600);
  }
  secondsElement.textContent = seconds.toString().padStart(2, "0");
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// Modal functionality (giữ nguyên như cũ)
const modal = document.getElementById("serviceModal");
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");

function showModal(service) {
  const contents = {
    relax: {
      title: "Relax Time",
      content: "Take a moment to relax and recharge.",
    },
    cleaning: {
      title: "Cleaning Service",
      content: "Professional cleaning service at your convenience.",
    },
    laundry: {
      title: "Laundry Service",
      content: "Expert laundry service for your clothes and linens.",
    },
  };

  modalTitle.textContent = contents[service].title;
  modalContent.textContent = contents[service].content;
  modal.style.display = "block";
}

document.querySelector(".close").onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

//==============Music Widget============
const audioPlayer = document.getElementById("audioPlayer");
const playButton = document.querySelector(".playButton-musicWidget");
const stopButton = document.querySelector(".stopButton-musicWidget");
const progressBar = document.querySelector(".progress-musicWidget");
const durationDisplay = document.querySelector(".duration-musicWidget");
const albumArt = document.querySelector(".albumArt-musicWidget");
const vinylRecord = document.querySelector(".vinylRecord-musicWidget");
const previousButton = document.querySelector(".previousButton-musicWidget");
const nextButton = document.querySelector(".nextButton-musicWidget");
const songTitleElement = document.querySelector(".songTitle-musicWidget");
const artistNameElement = document.querySelector(".artistName-musicWidget");

playButton.addEventListener("click", () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playButton.innerHTML = '<i class="fas fa-pause"></i>';
    albumArt.classList.add("playing");
    vinylRecord.classList.add("rotate");
  } else {
    audioPlayer.pause();
    playButton.innerHTML = '<i class="fas fa-play"></i>';
    albumArt.classList.remove("playing");
    vinylRecord.classList.remove("rotate");
  }
});

// Stop functionality
stopButton.addEventListener("click", () => {
  audioPlayer.pause();
  audioPlayer.currentTime = 0;
  playButton.innerHTML = '<i class="fas fa-play"></i>';
  progressBar.style.width = "0%";
  albumArt.classList.remove("playing");
  vinylRecord.classList.remove("rotate");
  updateDurationDisplay();
});

// Update progress bar and duration
audioPlayer.addEventListener("timeupdate", () => {
  const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.style.width = `${progress}%`;
  updateDurationDisplay();
});
// Previous button functionality
previousButton.addEventListener("click", () => {
  let newIndex = currentSongIndex - 1;
  if (newIndex < 0) {
    newIndex = songs.length - 1; // Loop back to the last song
  }
  loadSong(newIndex);
});

// Next button functionality
nextButton.addEventListener("click", () => {
  let newIndex = currentSongIndex + 1;
  if (newIndex >= songs.length) {
    newIndex = 0; // Loop back to the first song
  }
  loadSong(newIndex);
});

// Add this to auto-play next song when current song ends
audioPlayer.addEventListener("ended", () => {
  let newIndex = currentSongIndex + 1;
  if (newIndex >= songs.length) {
    newIndex = 0;
  }
  loadSong(newIndex);
  audioPlayer.play();
  playButton.innerHTML = '<i class="fas fa-pause"></i>';
  albumArt.classList.add("playing");
  vinylRecord.classList.add("rotate");
});

// Helper function to format time (MM:SS)
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// Update duration display
function updateDurationDisplay() {
  const currentTime = formatTime(audioPlayer.currentTime);
  const duration = formatTime(audioPlayer.duration);
  durationDisplay.textContent = `${currentTime} / ${duration}`;
}

// Update the songs array to include title and artist information
// Add this at the beginning of your JS file
const songs = [
  {
    src: "assets/audio/1000_anhmat.mp3",
    title: "1000 Ánh Mắt",
    artist: "Shiki",
  },
  {
    src: "assets/audio/reeves.mp3",
    title: "Reeves",
    artist: "HIEUTHUHAI-Manbo",
  },
  {
    src: "assets/audio/thienlyoi.mp3",
    title: "Thiên Lý Ơi",
    artist: "Jack J97",
  },
];

let currentSongIndex = 0;

// Function to load and play a song
function loadSong(index) {
  if (index >= 0 && index < songs.length) {
    currentSongIndex = index;
    audioPlayer.src = songs[currentSongIndex].src;

    // Update song info
    songTitleElement.textContent = songs[currentSongIndex].title;
    artistNameElement.textContent = songs[currentSongIndex].artist;

    // Reset UI elements
    progressBar.style.width = "0%";
    playButton.innerHTML = '<i class="fas fa-play"></i>';
    albumArt.classList.remove("playing");
    vinylRecord.classList.remove("rotate");

    // If you want to auto-play when switching songs, uncomment these lines:
    // audioPlayer.play();
    // playButton.innerHTML = '<i class="fas fa-pause"></i>';
    // albumArt.classList.add("playing");
    // vinylRecord.classList.add("rotate");
    // updateDurationDisplay();
  }
}
document.addEventListener("DOMContentLoaded", () => {
  initChart();
  loadSong(0);
});

//============Air Conditioner Widget==============
document.addEventListener("DOMContentLoaded", () => {
  const temperatureValue = document.querySelector(".temperature-value");
  const gaugeFill = document.querySelector(".gauge-fill");
  const gaugeDot = document.querySelector(".gauge-dot");
  const decreaseButton = document.querySelector(".temp-button.decrease");
  const increaseButton = document.querySelector(".temp-button.increase");
  const airwaveButton = document.querySelector(".action-button:last-child");

  let temperature = 15;
  let isRandom = false;
  let randomInterval;

  // Calculate gauge percentage based on temperature
  const calculateGaugePercentage = (temp) => {
    const minTemp = 14;
    const maxTemp = 30;
    return ((temp - minTemp) / (maxTemp - minTemp)) * 100;
  };
  const updateDisplay = (temp) => {
    const minTemp = 14;
    const maxTemp = 30;
    const percentage = (temp - minTemp) / (maxTemp - minTemp);
    const rotation = percentage * 360;

    temperatureValue.textContent = temp;
    gaugeFill.style.setProperty("--fill-percentage", `${rotation}deg`); // Chỉ cập nhật fill
    gaugeDot.style.setProperty("--rotation", `${rotation}deg`); // Xoay dot
  };

  // Temperature adjustment function
  const adjustTemperature = (increment) => {
    const newTemp = temperature + increment;
    if (newTemp >= 14 && newTemp <= 30) {
      temperature = newTemp;
      updateDisplay(temperature);
    }
  };

  // Event listeners for temperature buttons
  decreaseButton.addEventListener("click", () => adjustTemperature(-1));
  increaseButton.addEventListener("click", () => adjustTemperature(1));

  // Random temperature mode
  airwaveButton.addEventListener("click", () => {
    isRandom = !isRandom;

    if (isRandom) {
      airwaveButton.classList.add("active");
      randomInterval = setInterval(() => {
        const change = Math.random() > 0.5 ? 1 : -1;
        adjustTemperature(change);
      }, 2000);
    } else {
      airwaveButton.classList.remove("active");
      clearInterval(randomInterval);
    }
  });

  // Initial display update
  updateDisplay(temperature);
});
//===========Realtime Chart===========
let myChart; // Biến lưu trữ đối tượng chart
const maxDataPoints = 20; // Số điểm dữ liệu tối đa hiển thị
let chartData = []; // Mảng lưu trữ dữ liệu theo thời gian

// Hàm khởi tạo chart
function initChart() {
  const ctx = document.getElementById("dataChart").getContext("2d");
  myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "Humidifier",
          data: [],
          borderColor: "#FF5500",
          backgroundColor: "rgba(255,85,0,0.1)",
          tension: 0.4,
          borderWidth: 2,
        },
        {
          label: "Pump",
          data: [],
          borderColor: "#2196F3",
          backgroundColor: "rgba(33,150,243,0.1)",
          tension: 0.4,
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: "#fff",
          },
        },
      },
      scales: {
        x: {
          grid: {
            color: "rgba(255,255,255,0.1)",
          },
          ticks: {
            color: "#fff",
          },
        },
        y: {
          grid: {
            color: "rgba(255,255,255,0.1)",
          },
          ticks: {
            color: "#fff",
          },
        },
      },
    },
  });
}

// Hàm cập nhật dữ liệu chart
function updateChart(humidifierVal, pumpVal) {
  const now = new Date();
  const timeLabel = `${now.getHours().toString().padStart(2, "0")}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;

  // Thêm dữ liệu mới
  chartData.push({
    time: timeLabel,
    humidifier: humidifierVal,
    pump: pumpVal,
  });

  // Giới hạn số lượng điểm dữ liệu
  if (chartData.length > maxDataPoints) {
    chartData.shift();
  }

  // Cập nhật chart
  myChart.data.labels = chartData.map((item) => item.time);
  myChart.data.datasets[0].data = chartData.map((item) => item.humidifier);
  myChart.data.datasets[1].data = chartData.map((item) => item.pump);
  myChart.update();
}
