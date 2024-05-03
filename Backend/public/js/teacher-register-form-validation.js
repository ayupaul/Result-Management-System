function validateForm() {
  const nameContent = document.getElementById("name").value;
  const emailContent = document.getElementById("email").value;
  const passwordContent = document.getElementById("password");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  nameError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";
  let isValid = true;
  if (nameContent === "") {
    nameError.textContent = "Name field cannot be empty";
    isValid = false;
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailContent)) {
    emailError.textContent = "Invalid email format";
  }
  const passwordPattern =
    /^(?=.*Ayutech)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{8,}$/;
  if (!passwordPattern.test(passwordContent.value)) {
    console.log('hi');
    passwordError.textContent =
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.";
    isValid = false;
  }
  return isValid;
}
