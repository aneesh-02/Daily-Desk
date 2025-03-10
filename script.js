//////////////////////////////// CODE FOR BACKGROUND IMAGE //////////////////////////////

const apiKeyForBackground = "pNjrrX52EYtzkIyfISoI5Q_1hSQSWzf01y4JA9Ixtf0"; // My Unsplashed Key
document.addEventListener("DOMContentLoaded", setBackground); // run the function as soon as DOM loads.
const changeInterval = 5 * 60 * 1000; // 5 minutes in milliseconds
setInterval(setBackground, changeInterval); // Change the background every 5 minutes

async function setBackground() {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${apiKeyForBackground}&query=nature,mountains,beach`
    );
    const data = await response.json(); // Fetch a random photo JSON

    const imageUrl = data.urls.full; // retrive the urls link and using .full for full image.
    console.log("Unsplash Image fetched successfully. Image URL:", imageUrl);

    // Set the BG image:
    document.body.style.backgroundImage = `url(${imageUrl})`;
  } catch (error) {
    console.log("Error fetching Unsplash BG image: ", error);
  }
}

//////////////////////////////// CODE FOR CLOCK //////////////////////////////
document.addEventListener("DOMContentLoaded", updateClock); // run the function as soon as DOM loads.
function updateClock() {
  // const clock = document.getElementsByClassName("time"); // getElementsByClassName returns an HTMLCollection even if there's only one element with the class time). We cannot directly set the textContent of an HTMLCollection.
  // const clock = document.querySelector(".time"); // EITHER Use querySelector for a single element
  const clock = document.getElementsByClassName("time")[0]; // OR Access the first element
  const now = new Date();
  console.log("now =  ", now);

  let nowH = now.getHours().toString();
  let nowM = now.getMinutes().toString();
  console.log("nowH =  ", nowH);
  console.log("nowM =  ", nowM);

  if (nowH < 10) nowH = "0" + nowH; // add a 0 in front if 1 to 9.
  if (nowM < 10) nowM = "0" + nowM;
  clock.textContent = nowH + ":" + nowM;
}

//////////////////////////////// CODE FOR GREETING //////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  const userNameInput = document.getElementById("user-name");
  const greetingDiv = document.getElementById("greeting");

  // Initially, show the input and hide the greeting
  // greetingDiv.style.display = "none";
  // userNameInput.style.display = "block";

  // Event listener for pressing Enter in the input field
  userNameInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const username = e.target.value.trim(); // Get input value

      if (!username) return; // Exit if input is empty

      // Display greeting and hide input
      userNameInput.style.display = "none";
      greetingDiv.style.display = "block";
      greetingDiv.innerHTML = `${timeGreeting()} ${username}.`;
    }
  });

  // Function to determine time-based greeting
  function timeGreeting() {
    const hours = new Date().getHours();
    if (hours < 12) {
      return "Good morning";
    } else if (hours < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  }
});

//////////////////////////////// CODE FOR QUOTES //////////////////////////////
document.addEventListener("DOMContentLoaded", randomQuote); // Run the function as soon as DOM loads.

async function randomQuote() {
  console.log("Fetching quote...");

  try {
    const response = await fetch("https://api.quotable.io/random"); // New API

    if (!response.ok) {
      throw new Error("Network response was not OK");
    }

    const data = await response.json(); // Fetch a random quote JSON

    console.log("Random Quote:", data);

    // Get elements
    const display = document.getElementById("Quotation");
    const authorDisplay = document.getElementById("Author");

    // Update Quote and Author
    display.textContent = `"${data.content}"`;
    authorDisplay.textContent = `- ${data.author}`;
  } catch (error) {
    console.error("Error fetching Random Quote:", error);
    document.getElementById("Quotation").textContent =
      "Could not fetch a quote. Please try again.";
  }
}

//////////////////////////////// CODE FOR GOOGLE SEARCH //////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  const searchIcon = document.getElementById("search-icon");
  const searchBar = document.getElementById("search-bar");

  // Add event listener for the search button click
  searchIcon.addEventListener("click", searchGoogle);

  // Add event listener for pressing Enter in the search bar
  searchBar.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      searchGoogle();
    }
  });

  function searchGoogle() {
    const query = searchBar.value.trim();
    if (query) {
      window.open(
        "https://www.google.com/search?q=" + encodeURIComponent(query),
        "_blank"
      );
    }
  }
});

//////////////////////////////// CODE FOR Weather widget //////////////////////////////
const apiKey = "d1c19d1321984081a2d205258250601"; // My WeatherAPI key

document.addEventListener("DOMContentLoaded", fetchWeatherForLocation);

async function fetchWeatherForLocation() {
  const cityElement = document.getElementById("city");
  const temperatureElement = document.getElementById("temperature");
  const descriptionElement = document.getElementById("description");
  const humidityElement = document.getElementById("humidity");
  const windElement = document.getElementById("wind");

  cityElement.textContent = "Fetching location...";

  // Use Geolocation API to get user's current position
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

        try {
          const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}&aqi=no`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch weather data.");
          }

          const data = await response.json();
          console.log(data);

          // Update the HTML with fetched data
          cityElement.textContent = `${data.location.name}, ${data.location.country}`;
          temperatureElement.textContent = `${data.current.temp_c}°C`;
          descriptionElement.textContent = data.current.condition.text;
          humidityElement.textContent = `Humidity: ${data.current.humidity}%`;
          windElement.textContent = `Wind: ${data.current.wind_kph} km/h`;
        } catch (error) {
          console.error("Error fetching weather data:", error);
          cityElement.textContent = "Error fetching data.";
          temperatureElement.textContent = "--°C";
          descriptionElement.textContent = "--";
          humidityElement.textContent = "Humidity: --%";
          windElement.textContent = "Wind: -- km/h";
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        cityElement.textContent = "Location access denied.";
        temperatureElement.textContent = "--°C";
        descriptionElement.textContent = "--";
        humidityElement.textContent = "Humidity: --%";
        windElement.textContent = "Wind: -- km/h";
      }
    );
  } else {
    cityElement.textContent = "Geolocation not supported.";
    temperatureElement.textContent = "--°C";
    descriptionElement.textContent = "--";
    humidityElement.textContent = "Humidity: --%";
    windElement.textContent = "Wind: -- km/h";
  }
}

//////////////////////////////// CODE FOR Todo list widget //////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
  const todoInput = document.getElementById("todo-input");
  const addTodoButton = document.getElementById("add-todo");
  const todoList = document.getElementById("todo-list");

  // Add a new task
  addTodoButton.addEventListener("click", addTask);
  todoInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      addTask();
    }
  });

  function addTask() {
    const taskText = todoInput.value.trim();

    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

    // Create a new list item
    const listItem = document.createElement("li");

    // Task text
    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    taskSpan.addEventListener("click", toggleTask); // Toggle completed status
    listItem.appendChild(taskSpan);

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Remove";
    deleteButton.addEventListener("click", deleteTask);
    listItem.appendChild(deleteButton);

    // Add the list item to the list
    todoList.appendChild(listItem);

    // Clear the input field
    todoInput.value = "";
  }

  // Delete a task
  function deleteTask(event) {
    const listItem = event.target.parentElement;
    todoList.removeChild(listItem);
  }

  // Toggle task completion
  function toggleTask(event) {
    const taskSpan = event.target;
    taskSpan.classList.toggle("completed");
  }
});
