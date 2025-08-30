const FORGOT_URL = "https://script.google.com/macros/s/AKfycbyCv5fnkEC8p1iNeWE3kKFakxwZSoPMuh2a7dsyfdGfMMOaC5DSJVCpjWifbjo4BW7F/exec"; // replace with deployed Apps Script URL

const forgotForm = document.getElementById("forgotForm");
const otpForm = document.getElementById("otpForm");
const resetForm = document.getElementById("resetForm");

const forgotStatus = document.getElementById("forgotStatus");

let userEmail = "";
let verified = false;

// Step 1: Request OTP
forgotForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  userEmail = document.getElementById("email").value;

  forgotStatus.textContent = "⏳ Sending OTP...";
  try {
    const res = await fetch(FORGOT_URL, {
      method: "POST",
      body: new URLSearchParams({ action: "sendOtp", email: userEmail })
    });
    const data = await res.json();

    if (data.status === "success") {
      forgotStatus.textContent = "✅ OTP sent to your email!";
      forgotForm.style.display = "none";
      otpForm.style.display = "block";
    } else {
      forgotStatus.textContent = "❌ " + data.message;
    }
  } catch (err) {
    forgotStatus.textContent = "❌ Error sending OTP.";
  }
});

// Step 2: Verify OTP
otpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const otp = document.getElementById("otp").value;

  try {
    const res = await fetch(FORGOT_URL, {
      method: "POST",
      body: new URLSearchParams({ action: "verifyOtp", email: userEmail, otp })
    });
    const data = await res.json();

    if (data.status === "success") {
      forgotStatus.textContent = "✅ OTP verified!";
      otpForm.style.display = "none";
      resetForm.style.display = "block";
      verified = true;
    } else {
      forgotStatus.textContent = "❌ Invalid OTP.";
    }
  } catch (err) {
    forgotStatus.textContent = "❌ Error verifying OTP.";
  }
});

// Step 3: Reset Password
resetForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newPass = document.getElementById("newPassword").value;
  const confirmPass = document.getElementById("confirmPassword").value;

  if (newPass !== confirmPass) {
    forgotStatus.textContent = "❌ Passwords do not match!";
    return;
  }

  try {
    const res = await fetch(FORGOT_URL, {
      method: "POST",
      body: new URLSearchParams({ action: "resetPassword", email: userEmail, password: newPass })
    });
    const data = await res.json();

    if (data.status === "success") {
      forgotStatus.textContent = "✅ Password reset successfully!";
      setTimeout(() => window.location.href = "login.html", 2000);
    } else {
      forgotStatus.textContent = "❌ " + data.message;
    }
  } catch (err) {
    forgotStatus.textContent = "❌ Error resetting password.";
  }
});
