const loginForm = document.getElementById("loginForm");
const loginStatus = document.getElementById("loginStatus");

// ✅ Multiple users
const users = [
  { username: "Comittie", password: "1234" },
  { username: "accounts", password: "abcd" },
  { username: "user2", password: "pass" }
];

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  // Check if username/password matches any user
  const validUser = users.find(user => user.username === username && user.password === password);

  if (validUser) {
    loginStatus.textContent = `✅ Login successful! Welcome, ${username}`;
    loginStatus.style.color = "green";

    // Store login flag and username
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", username);

    // Redirect based on user
    setTimeout(() => {
    if (username === "Comittie") {
        window.location.href = "project.html"; // admin goes to project page
    } 
    else if (username === "accounts") {
        window.location.href = "file.html"; // manager goes to dashboard
    }
    else {
        window.location.href = "temporary_note.html"; // other users go to file page
    }
    }, 1000);

  } else {
    loginStatus.textContent = "❌ Invalid username or password!";
    loginStatus.style.color = "red";

    // Clear only password field, keep username
    document.getElementById("password").value = "";
  }
});

