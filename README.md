# Online Course Registration System

A client-side web application developed as part of a practical exercise in **Object-Oriented Software Engineering (OOSE)** during the third year of undergraduate study. The project demonstrates the application of structured software design principles to a real-world administrative use case — managing candidate registrations for an online course.

---

## Overview

The system provides two distinct user-facing interfaces: a **Candidate Registration Form** and an **Admin Dashboard**. Candidates submit their personal, academic, and medical details through a validated form. An administrator can log in to a protected dashboard to review all submitted registrations in a structured tabular format.

The application is entirely front-end based, requiring no server infrastructure, and persists data across browser sessions using the Web Storage API.

---

## Tech Stack & How It Works

| Layer | Technology |
|---|---|
| Structure | HTML5 |
| Styling | CSS3 (custom, no framework) |
| Logic | Vanilla JavaScript (ES6+) |
| Data Persistence | `localStorage` / `sessionStorage` (Web Storage API) |

### Architecture

The application is organised into three logical views, toggled dynamically without any page reload:

**1. Candidate Registration View**
Form inputs are validated at the browser level using HTML5 constraint attributes (`required`, `pattern`). On submission, the candidate object is serialised to JSON and appended to an array stored in `localStorage` under a fixed key (`courseRegistrationCandidates`). The form resets after a successful write, and a transient success message is displayed to the user.

**2. Admin Login View**
A credential check is performed client-side against hardcoded values. On successful authentication, a flag is written to `sessionStorage` so the admin session persists across tab navigation but does not survive a browser close.

**3. Admin Dashboard View**
On load, the application reads the full candidates array from `localStorage`, iterates over each record, and programmatically constructs table rows using the DOM API. The dashboard is only reachable after a valid admin session is active.

---

## Academic Context

This project was built as a practical demonstration of OOSE concepts including separation of concerns, modular view management, and event-driven programming patterns — applied within the constraints of a purely client-side environment.

> **Note:** This is an academic prototype. Authentication is intentionally simplified (credentials are hardcoded in client-side JavaScript) and data is stored locally in the browser. It is not intended for production deployment.

---

## How to Run

No build tools or dependencies are required.

1. Clone or download the repository.
2. Open `index.html` directly in any modern browser.
3. To access the Admin Dashboard, use the credentials visible in `script.js`.
