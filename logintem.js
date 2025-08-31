// login.js

const loginForm = document.getElementById("loginForm");
const loginStatus = document.getElementById("loginStatus");

// Replace with your deployed Apps Script Web App URL
const scriptURL = "https://script.google.com/macros/s/AKfycbx6Utko9J858o0em00Zb0c5MjXBTJdXoGII24JpJmn_UBrEyr3XZ9xxnsIBJb4WIuLrOQ/exec";

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  loginStatus.textContent = "⏳ Logging in...";
  loginStatus.style.color = "black";

  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      body: new URLSearchParams({
        action: "login",
        username,
        password
      })
    });

    const data = await response.json();
    console.log("Server response:", data);

    if (data.status === "success") {
      // Get batch year from server and convert to number
      const batchYear = data.batchYear ? data.batchYear : "0";
      const batchYearNumber = Number(batchYear); // converts "2022" → 2022

      loginStatus.textContent = `✅ Login successful! Welcome, ${data.username}. Your batch year: ${batchYearNumber}`;
      loginStatus.style.color = "green";

      // Store login info locally
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", data.username);
      localStorage.setItem("batchYear", batchYearNumber);

      // Redirect based on numeric batch year
      setTimeout(() => {
        if (batchYearNumber === 2022) window.location.href = "interface2022.html";
        else if (batchYearNumber === 2012) window.location.href = "interface2022.html";
        else if (batchYearNumber === 2024) window.location.href = "userinterface.html";
        else window.location.href = "temporary_note.html";
      }, 1500);

    } else {
      loginStatus.textContent = "❌ Invalid username or password!";
      loginStatus.style.color = "red";
      document.getElementById("password").value = "";
    }

  } catch (err) {
    loginStatus.textContent = "❌ Network/server error!";
    loginStatus.style.color = "red";
    console.error(err);
  }
});


