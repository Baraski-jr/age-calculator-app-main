const form = document.querySelector(".calculate");
const yearTaken = document.querySelector("#year");
const monthTaken = document.querySelector("#month");
const dayTaken = document.querySelector("#day");
const yearDisplay = document.querySelector(".year");
const monthDisplay = document.querySelector(".month");
const dayDisplay = document.querySelector(".day");
const btn = document.querySelector(".submit-btn");

DObjct = { Year: "- -", Month: "- -", Day: "- -" };

// Store the day, month, and year in variable
const date = new Date();
let currentYear = parseInt(date.getFullYear());
let currentMonth = parseInt(date.getMonth()) + 1;
let currentDay = parseInt(date.getDate());

let birthYear;
let birthMonth;
let birthDay;

let errDay;
let errMonth;
let errYear;

form.addEventListener("submit", calculation);
function calculation(e) {
  e.preventDefault();
  birthYear = parseInt(yearTaken.value);
  birthMonth = parseInt(monthTaken.value);
  birthDay = parseInt(dayTaken.value);

  if (currentDay < birthDay) {
    DObjct["Day"] = 31 - (birthDay - currentDay);
    yearCal();

    monthcal();
  } else {
    DObjct["Day"] = currentDay - birthDay;
    monthcal();
  }

  // Calculation of the month
  function monthcal() {
    // Check the condition of the month
    // Run if it's not yet birthMonth and birthMonth is valid
    if (currentMonth < birthMonth) {
      DObjct["Month"] = 12 - (birthMonth - currentMonth);
      yearCal();
    } else if (currentMonth == birthMonth && currentDay < birthDay) {
      yearCal();
      DObjct["Month"] = 12;
    } else {
      DObjct["Month"] = currentMonth - birthMonth;
      DObjct["Year"] = currentYear - birthYear;
    }
  }
  // Calculation of the year
  function yearCal() {
    if (currentYear == birthYear) {
      DObjct["Year"] = 0;
    } else {
      DObjct["Year"] = currentYear - birthYear - 1;
    }
  }
  Display();

  // Check add the error styling when if the condition is true to the month
  erstyl(monthTaken, 12, errMonth, "Month");
  erstyl(yearTaken, currentYear, errYear), "Year";
  erstyl(dayTaken, 31, errDay, "Day");
}

function erstyl(totest, testlimit, errtarget, data) {
  if (totest.value > testlimit || totest.value < 0) {
    // Reset all the Display if the
    const dis = document.querySelectorAll("h2 span");
    dis.forEach((obj) => {
      obj.textContent = "- -";
    });
    // Add the stylings to the input box, eyebrow, and display the error message
    totest.style.border = "2px solid var(--denger";
    totest.previousElementSibling.style.color = "var(--denger";
    errtarget = totest.nextElementSibling;
    errtarget.textContent = "Must be a valid day";
    errtarget.style.visibility = "visible";
  } else {
    errtarget = totest.nextElementSibling;
    totest.style.border = "2px solid var(--gray-clr-100)";
    totest.previousElementSibling.style.color = "var(--gray-clr-300)";
    errtarget.style.visibility = "hidden";
  }
}
function Display() {
  dayDisplay.textContent = DObjct["Day"];
  monthDisplay.textContent = DObjct["Month"];
  yearDisplay.textContent = DObjct["Year"];
}
