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
  loadSong(0);
});
