// Accordion functionality
const accordions = document.querySelectorAll(".accordion");

accordions.forEach(acc => {
  acc.addEventListener("click", () => {
    acc.classList.toggle("active");

    const panel = acc.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
});

// Auto logout after 5 minutes of inactivity
let logoutTimer;
const logoutTime = 5 * 60 * 1000; // 5 minutes in milliseconds

function resetLogoutTimer() {
  clearTimeout(logoutTimer);
  logoutTimer = setTimeout(() => {
    alert("You have been logged out due to inactivity.");
    // Clear login info from localStorage (optional)
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("batchYear");
    // Redirect to login page
    window.location.href = "login.html";
  }, logoutTime);
}

// Reset timer on user activity
["mousemove", "mousedown", "keypress", "scroll", "touchstart"].forEach(evt => {
  document.addEventListener(evt, resetLogoutTimer);
});

// Start the timer initially
resetLogoutTimer();

