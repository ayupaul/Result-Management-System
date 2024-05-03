function validateStudent() {
    const rollNumberContent = parseInt(document.getElementById("rollNumber").value);
    const dobContent = document.getElementById("dob").value;
    const nameContent = document.getElementById("name").value;
    const scoreContent = parseInt(document.getElementById("score").value);
    const rollNumberError = document.getElementById("rollNumberError");
    const dobError = document.getElementById("dobError");
    const nameError = document.getElementById("nameError");
    const scoreError = document.getElementById("scoreError");
    rollNumberError.textContent = "";
    dobError.textContent = "";
    nameError.textContent = "";
    scoreError.textContent = "";
    let isValid = true;
    if (rollNumberContent <= 0 || rollNumberContent > 1000) {
      isValid = false;
      rollNumberError.textContent = "Roll number should be in between 1-1000";
    }
    const dobDate = new Date(dobContent);
    if (dobDate.getFullYear() < 1973 || dobDate.getFullYear() > 2003) {
      isValid = false;
      dobError.textContent = "Dob should be in between 1973-2003";
    }
    if (nameContent === "") {
      isValid = false;
      nameError.textContent = "Name cannot be empty";
    }
    if (scoreContent <= 0 || scoreContent > 100) {
      isValid = false;
      scoreError.textContent = "Score cannot be greater than 100 nor less than 0";
    }
    return isValid;
  };