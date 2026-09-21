const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const CATEGORIES = [
  "Website Experience",
  "Internship Program",
  "Product / Service",
  "Suggestion",
  "Other",
];

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

function sanitize(value) {
  if (typeof value !== "string") {
    return "";
  }
  return value.trim();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateFeedback(body) {
  const name = sanitize(body.name);
  const email = sanitize(body.email);
  const category = sanitize(body.category);
  const rating = sanitize(body.rating);
  const message = sanitize(body.message);
  const errors = {};

  if (!name) {
    errors.name = "Please enter your full name.";
  } else if (name.length < 2) {
    errors.name = "Name should be at least 2 characters.";
  }

  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!isValidEmail(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!category || !CATEGORIES.includes(category)) {
    errors.category = "Please select a feedback category.";
  }

  const ratingNumber = Number(rating);
  if (!rating || !Number.isInteger(ratingNumber) || ratingNumber < 1 || ratingNumber > 5) {
    errors.rating = "Please choose a rating from 1 to 5.";
  }

  if (!message) {
    errors.message = "Please share your feedback.";
  } else if (message.length < 10) {
    errors.message = "Feedback should be at least 10 characters.";
  }

  return {
    errors,
    values: {
      name,
      email,
      category,
      rating: rating || "",
      message,
    },
  };
}

app.get("/", (req, res) => {
  res.render("index", {
    errors: {},
    values: {
      name: "",
      email: "",
      category: "",
      rating: "",
      message: "",
    },
    categories: CATEGORIES,
  });
});

app.post("/submit", (req, res) => {
  try {
    const { errors, values } = validateFeedback(req.body);

    if (Object.keys(errors).length > 0) {
      return res.status(400).render("index", {
        errors,
        values,
        categories: CATEGORIES,
      });
    }

    console.log("New feedback submitted:");
    console.log({
      name: values.name,
      email: values.email,
      category: values.category,
      rating: values.rating,
      message: values.message,
      submittedAt: new Date().toISOString(),
    });

    return res.render("result", { feedback: values });
  } catch (error) {
    console.error("Error while processing feedback:", error);
    return res.status(500).render("index", {
      errors: {
        form: "Something went wrong while submitting your feedback. Please try again.",
      },
      values: {
        name: sanitize(req.body && req.body.name),
        email: sanitize(req.body && req.body.email),
        category: sanitize(req.body && req.body.category),
        rating: sanitize(req.body && req.body.rating),
        message: sanitize(req.body && req.body.message),
      },
      categories: CATEGORIES,
    });
  }
});

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(`Cognifyz Feedback app running at http://localhost:${PORT}`);
});
