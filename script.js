const API_URL = "http://localhost:5000";

const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const togglePassword = document.getElementById("togglePassword");

const loginMessage = document.getElementById("loginMessage");
const loginBtn = document.querySelector(".login-btn");

const loginText = document.getElementById("loginText");
const loginLoader = document.getElementById("loginLoader");


/* ==============================
   SHOW / HIDE PASSWORD
============================== */

togglePassword.addEventListener("click", () => {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";
        togglePassword.textContent = "Hide";

    } else {

        passwordInput.type = "password";
        togglePassword.textContent = "Show";

    }

});


/* ==============================
   LOGIN FORM
============================== */

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    loginMessage.textContent = "";
    loginMessage.className = "login-message";

    loginBtn.disabled = true;

    loginText.classList.add("hidden");
    loginLoader.classList.remove("hidden");

    try {

        const response = await fetch(`${API_URL}/api/admin/login`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const data = await response.json();

        if (!response.ok || !data.success) {

            throw new Error(
                data.message || "Invalid email or password."
            );

        }

        localStorage.setItem("adminToken", data.token);

        localStorage.setItem(
            "adminUser",
            JSON.stringify(data.user)
        );

        loginMessage.textContent = "Login successful!";
        loginMessage.classList.add("success");

        setTimeout(() => {

            window.location.href = "dashboard.html";

        }, 700);

    } catch (error) {

        loginMessage.textContent =
            error.message || "Something went wrong.";

        loginMessage.classList.add("error");

    } finally {

        loginBtn.disabled = false;

        loginText.classList.remove("hidden");
        loginLoader.classList.add("hidden");

    }

});