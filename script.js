// ===========================================================
// Online Course Registration — app logic
// Data is persisted in localStorage so candidates survive reloads.
// ===========================================================

const STORAGE_KEY = "courseRegistrationCandidates";

// admin login.
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin123"
};

let isAdminLoggedIn = sessionStorage.getItem("isAdminLoggedIn") === "true";

// ----------------- View switching -----------------

function showView(view) {
  const registerView = document.getElementById("registerView");
  const adminView = document.getElementById("adminView");
  const dashboardView = document.getElementById("dashboardView");
  const tabRegister = document.getElementById("tabRegister");
  const tabAdmin = document.getElementById("tabAdmin");

  registerView.classList.add("hidden");
  adminView.classList.add("hidden");
  dashboardView.classList.add("hidden");
  tabRegister.classList.remove("active");
  tabAdmin.classList.remove("active");

  if (view === "register") {
    registerView.classList.remove("hidden");
    tabRegister.classList.add("active");
  } else if (view === "admin") {
    tabAdmin.classList.add("active");
    if (isAdminLoggedIn) {
      dashboardView.classList.remove("hidden");
      renderCandidatesTable();
    } else {
      adminView.classList.remove("hidden");
    }
  }
}

// ----------------- Candidate Registration -----------------

function getCandidates() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCandidates(candidates) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(candidates));
}

document.getElementById("registrationForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const candidate = {
    fullName: document.getElementById("fullName").value.trim(),
    dob: document.getElementById("dob").value,
    gender: document.getElementById("gender").value,
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    address: document.getElementById("address").value.trim(),
    qualification: document.getElementById("qualification").value.trim(),
    university: document.getElementById("university").value.trim(),
    passingYear: document.getElementById("passingYear").value.trim(),
    grade: document.getElementById("grade").value.trim(),
    medical: document.getElementById("medical").value.trim(),
    emergencyName: document.getElementById("emergencyName").value.trim(),
    emergencyPhone: document.getElementById("emergencyPhone").value.trim()
  };

  const candidates = getCandidates();
  candidates.push(candidate);
  saveCandidates(candidates);

  const msg = document.getElementById("regMessage");
  msg.textContent = "Registration successful!";
  msg.className = "message success";

  this.reset();

  setTimeout(() => {
    msg.textContent = "";
    msg.className = "message";
  }, 3500);
});

// ----------------- Admin Login -----------------

document.getElementById("adminLoginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("adminUsername").value.trim();
  const password = document.getElementById("adminPassword").value;
  const errorEl = document.getElementById("loginError");

  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    isAdminLoggedIn = true;
    sessionStorage.setItem("isAdminLoggedIn", "true");
    errorEl.textContent = "";
    this.reset();
    document.getElementById("adminView").classList.add("hidden");
    document.getElementById("dashboardView").classList.remove("hidden");
    renderCandidatesTable();
  } else {
    errorEl.textContent = "Invalid username or password.";
  }
});

function logout() {
  isAdminLoggedIn = false;
  sessionStorage.removeItem("isAdminLoggedIn");
  document.getElementById("loginError").textContent = "";
  showView("admin");
}

// ----------------- Admin Dashboard -----------------

function renderCandidatesTable() {
  const candidates = getCandidates();
  const tbody = document.getElementById("candidatesTableBody");
  const noCandidatesMsg = document.getElementById("noCandidatesMsg");
  const tableWrapper = document.querySelector(".table-wrapper");

  tbody.innerHTML = "";

  if (candidates.length === 0) {
    tableWrapper.classList.add("hidden");
    noCandidatesMsg.classList.remove("hidden");
    return;
  }

  tableWrapper.classList.remove("hidden");
  noCandidatesMsg.classList.add("hidden");

  candidates.forEach((c) => {
    const tr = document.createElement("tr");
    const emergency = [c.emergencyName, c.emergencyPhone ? `(${c.emergencyPhone})` : ""]
      .filter(Boolean)
      .join(" ");

    const cells = [
      c.fullName, c.dob, c.gender, c.email, c.phone, c.address,
      c.qualification, c.university, c.passingYear, c.grade,
      c.medical, emergency
    ];

    cells.forEach((value) => {
      const td = document.createElement("td");
      td.textContent = value || "";
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });
}

// ----------------- Init -----------------

showView("register");