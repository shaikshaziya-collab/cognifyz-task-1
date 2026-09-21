(function () {
  const form = document.getElementById("feedback-form");

  if (!form) {
    return;
  }

  function showError(field, message) {
    const existing = field.parentElement.querySelector(".js-error");
    if (existing) {
      existing.remove();
    }

    const error = document.createElement("p");
    error.className = "field-error js-error";
    error.textContent = message;
    field.parentElement.appendChild(error);
    field.setAttribute("aria-invalid", "true");
  }

  function clearError(field) {
    const existing = field.parentElement.querySelector(".js-error");
    if (existing) {
      existing.remove();
    }
    field.removeAttribute("aria-invalid");
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener("submit", function (event) {
    const name = form.querySelector("#name");
    const email = form.querySelector("#email");
    const category = form.querySelector("#category");
    const message = form.querySelector("#message");
    const rating = form.querySelector("input[name='rating']:checked");
    const ratingGroup = form.querySelector(".rating-field");

    [name, email, category, message].forEach(clearError);
    const ratingError = ratingGroup.querySelector(".js-error");
    if (ratingError) {
      ratingError.remove();
    }

    let isValid = true;

    if (!name.value.trim() || name.value.trim().length < 2) {
      showError(name, "Please enter your full name.");
      isValid = false;
    }

    if (!email.value.trim()) {
      showError(email, "Please enter your email address.");
      isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
      showError(email, "Please enter a valid email address.");
      isValid = false;
    }

    if (!category.value) {
      showError(category, "Please select a feedback category.");
      isValid = false;
    }

    if (!rating) {
      const error = document.createElement("p");
      error.className = "field-error js-error";
      error.textContent = "Please choose a rating from 1 to 5.";
      ratingGroup.appendChild(error);
      isValid = false;
    }

    if (!message.value.trim()) {
      showError(message, "Please share your feedback.");
      isValid = false;
    } else if (message.value.trim().length < 10) {
      showError(message, "Feedback should be at least 10 characters.");
      isValid = false;
    }

    if (!isValid) {
      event.preventDefault();
    }
  });
})();
