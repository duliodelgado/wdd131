const form = document.querySelector("#fsyForm");
const output = document.querySelector("#output");

const userType = document.querySelector("#userType");
const typeContainer = document.querySelector("#typeContainer");
const typeLabel = document.querySelector("#typeLabel");
const typeInput = document.querySelector("#typeInput");

// Show dynamic field
function updateTypeField() {
  if (userType.value === "student") {
    typeContainer.hidden = false;
    typeLabel.textContent = "Student I# (9 digits)";
    typeInput.required = true;
  } else if (userType.value === "guest") {
    typeContainer.hidden = false;
    typeLabel.textContent = "Access Code";
    typeInput.required = true;
  } else {
    typeContainer.hidden = true;
    typeInput.required = false;
  }
}

userType.addEventListener("change", updateTypeField);
updateTypeField();

// Validate future date
function isPastDate(value) {
  const today = new Date();
  const chosen = new Date(value);
  return chosen <= today;
}

// Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();
  output.textContent = "";

  const firstName = form.firstName.value.trim();
  const lastName = form.lastName.value.trim();
  const email = form.email.value.trim();
  const date = form.availableDate.value;
  const userTypeValue = form.userType.value;
  const typeValue = form.typeInput.value.trim();

  // Validate type
  if (!userTypeValue) {
    output.textContent = "Please select a type.";
    return;
  }

  // Validate date
  if (isPastDate(date)) {
    output.textContent = "Please choose a future date.";
    return;
  }

  // Validate student id
  if (userTypeValue === "student") {
    const valid = /^\d{9}$/.test(typeValue);
    if (!valid) {
      output.textContent = "Student I# must be exactly 9 digits.";
      return;
    }
  }

  // Validate guest code
  if (userTypeValue === "guest") {
    if (typeValue !== "EVENT131") {
      output.textContent = "Invalid access code.";
      return;
    }
  }

  // Show ticket
  output.innerHTML = `
✅ Ticket Confirmed

Name: ${firstName} ${lastName}
Email: ${email}
Date: ${date}
Type: ${userTypeValue}
`;

  form.reset();
  updateTypeField();
});