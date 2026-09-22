# Cognifyz Internship Task 1 — User Feedback Website

A Node.js web application that collects user feedback through a structured form, validates submissions on both the client and the server, and displays a confirmation page with a summary of the response.

This project was built for the Cognifyz Technologies internship (Task 1).

## 🚀 Live Demo

🌐 **Live Website:** https://cognifyz-task-1-h7th.onrender.com

💻 **GitHub Repository:** https://github.com/shaikshaziya-collab/cognifyz-task-1

## Project overview

Visitors land on a branded feedback page, fill in their name, email, category, rating, and comments, then submit the form with `POST /submit`. Valid submissions are logged in the server console and shown on a thank-you page. Invalid submissions return the form with field-level error messages. Unknown routes render a custom 404 page.

No database is required. Feedback is processed in memory for this task and printed to the terminal.

## Features

- Responsive feedback form with name, email, category, 1–5 rating, and message
- Client-side validation in `public/js/script.js`
- Server-side validation in `server.js` (required fields, email format, category allow-list, rating range, message length)
- Confirmation page that echoes the submitted values
- Custom 404 page for unknown routes
- Static CSS and JavaScript served from the `public` folder
- EJS templates for the home, result, and 404 views

## Technologies used

- Node.js (18 or newer)
- Express.js
- EJS (Embedded JavaScript templates)
- HTML5, CSS3, and vanilla JavaScript

## Project structure

```text
cognifyz-task-1/
├── public/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
├── views/
│   ├── index.ejs
│   ├── result.ejs
│   └── 404.ejs
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

| Path | Purpose |
| --- | --- |
| `server.js` | Express app, routes, and validation |
| `views/index.ejs` | Feedback form page |
| `views/result.ejs` | Thank-you / summary page |
| `views/404.ejs` | Not found page |
| `public/css/style.css` | Site styles |
| `public/js/script.js` | Client-side form validation |

## Installation steps

1. Install [Node.js](https://nodejs.org/) 18 or later.
2. Clone or download this repository.
3. Open a terminal in the project root:

```bash
cd cognifyz-task-1
```

4. Install dependencies:

```bash
npm install
```

## How to run locally

Start the server:

```bash
npm start
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

The app uses port `3000` by default. To use another port:

```bash
# Windows PowerShell
$env:PORT=4000; npm start

# macOS / Linux
PORT=4000 npm start
```

## How to test the feedback form

### In the browser

1. Start the app with `npm start`.
2. Open [http://localhost:3000](http://localhost:3000).
3. Click **Give Feedback** or scroll to the form.
4. Fill in all fields, for example:
   - Full name: `Alex Rivera`
   - Email: `alex@example.com`
   - Category: `Website Experience`
   - Rating: `5`
   - Message: `The form is clear and easy to use.`
5. Click **Submit Feedback**.
6. Confirm you are taken to the thank-you page and that the summary matches what you entered.
7. Click **Submit another response** to return to the form.

### Validation checks

- Submit the form empty: client-side errors should appear, and the request should not be sent.
- Use an invalid email such as `not-an-email`: an email error should appear.
- Use a message shorter than 10 characters: a length error should appear.
- If client validation is bypassed, the server still rejects invalid data with HTTP `400` and re-renders the form with errors.

### Command-line check for `POST /submit`

With the server running:

```bash
curl -i -X POST http://localhost:3000/submit ^
  -H "Content-Type: application/x-www-form-urlencoded" ^
  -d "name=Alex Rivera&email=alex@example.com&category=Website Experience&rating=5&message=The form is clear and easy to use."
```

On macOS or Linux, replace `^` with `\`.

A successful request returns HTML from `result.ejs` (thank-you page) and the server logs the submission in the terminal. Visiting an unknown path such as [http://localhost:3000/missing](http://localhost:3000/missing) should show the 404 page.

## License

MIT
