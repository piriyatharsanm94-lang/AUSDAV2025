window.addEventListener("DOMContentLoaded", () => {
  // Get batch year from localStorage
  const batchYear = Number(localStorage.getItem("batchYear"));
  console.log("Batch year from localStorage:", batchYear); // Debug

  // Get the admin card element
  const adminCard = document.getElementById("adminCard");

  // Show card only if batch year is 2010
  if (batchYear === 2012 && adminCard) {
    adminCard.classList.add("show");
    console.log("Admin card is now visible");
  }
    if (batchYear === 2012 && adminCard2) {
    adminCard.classList.add("show");
    console.log("Admin card is now visible");
  }
    if (batchYear === 2012 && adminCard3) {
    adminCard.classList.add("show");
    console.log("Admin card is now visible");
  }
});



