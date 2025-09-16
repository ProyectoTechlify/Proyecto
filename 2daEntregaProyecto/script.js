// Mobile Navigation
document.addEventListener("DOMContentLoaded", () => {
   const hamburger = document.getElementById("hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    })
  }

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
      hamburger.classList.remove("active")
    })
  })
})

// Register Form
document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm")
  const successModal = document.getElementById("successModal")

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(registerForm)
      const data = Object.fromEntries(formData)

      // Validate required fields
      const requiredFields = [
        "firstName",
        "lastName",
        "email",
        "phone",
        "documentType",
        "documentNumber",
        "address",
        "city",
        "emergencyContact",
        "emergencyPhone",
        "motivation",
      ]

      for (const field of requiredFields) {
        if (!data[field] || data[field].trim() === "") {
          alert(`Por favor completa el campo: ${field}`)
          return
        }
      }

      // Check terms acceptance
      if (!data.acceptTerms) {
        alert("Debes aceptar los términos y condiciones")
        return
      }

      // Simulate form submission
      console.log("Datos del registro:", data)

      // Show success modal
      if (successModal) {
        successModal.style.display = "block"
      }
    })
  }

  // Close modal when clicking outside
  if (successModal) {
    successModal.addEventListener("click", (e) => {
      if (e.target === successModal) {
        successModal.style.display = "none"
      }
    })
  }
})

// Login Form
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm")

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const email = document.getElementById("loginEmail").value
      const password = document.getElementById("loginPassword").value

      if (!email || !password) {
        alert("Por favor completa todos los campos")
        return
      }

      // Show loading state
      const submitBtn = loginForm.querySelector('button[type="submit"]')
      const btnText = submitBtn.querySelector(".btn-text")
      const btnLoading = submitBtn.querySelector(".btn-loading")

      btnText.style.display = "none"
      btnLoading.style.display = "flex"
      submitBtn.disabled = true

      // Simulate login process
      setTimeout(() => {
        btnText.style.display = "flex"
        btnLoading.style.display = "none"
        submitBtn.disabled = false

        // For demo purposes, redirect to dashboard
        if (email === "demo@tcl.com" && password === "demo123") {
          window.location.href = "dashboard.html"
        } else {
          alert("Credenciales incorrectas. Usa: demo@tcl.com / demo123")
        }
      }, 2000)
    })
  }
})

// Password Toggle
function togglePassword(inputId) {
  const input = document.getElementById(inputId)
  const toggle = input.nextElementSibling.querySelector("i")

  if (input.type === "password") {
    input.type = "text"
    toggle.classList.remove("fa-eye")
    toggle.classList.add("fa-eye-slash")
  } else {
    input.type = "password"
    toggle.classList.remove("fa-eye-slash")
    toggle.classList.add("fa-eye")
  }
}

// Dashboard Tabs
function showTab(tabName) {
  // Hide all tab contents
  const tabContents = document.querySelectorAll(".tab-content")
  tabContents.forEach((content) => {
    content.classList.remove("active")
  })

  // Remove active class from all tab buttons
  const tabButtons = document.querySelectorAll(".tab-button")
  tabButtons.forEach((button) => {
    button.classList.remove("active")
  })

  // Show selected tab content
  const selectedTab = document.getElementById(tabName + "Tab")
  if (selectedTab) {
    selectedTab.classList.add("active")
  }

  // Add active class to clicked button
  event.target.classList.add("active")
}

// Logout function
function logout() {
  if (confirm("¿Estás seguro que quieres cerrar sesión?")) {
    window.location.href = "index.html"
  }
}

// Smooth scrolling for anchor links
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href").substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
})

// Form validation helpers
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

function validatePhone(phone) {
  const re = /^[+]?[1-9][\d]{0,15}$/
  return re.test(phone.replace(/\s/g, ""))
}

// Add loading states to buttons
function addLoadingState(button, loadingText = "Cargando...") {
  const originalText = button.innerHTML
  button.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${loadingText}`
  button.disabled = true

  return function removeLoadingState() {
    button.innerHTML = originalText
    button.disabled = false
  }
}

// Notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : "info-circle"}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `

  document.body.appendChild(notification)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove()
    }
  }, 5000)
}

// Local storage helpers
function saveToLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
    return true
  } catch (error) {
    console.error("Error saving to localStorage:", error)
    return false
  }
}

function getFromLocalStorage(key) {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error("Error reading from localStorage:", error)
    return null
  }
}

// Initialize page-specific functionality
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html"

  switch (currentPage) {
    case "index.html":
    case "":
      initHomePage()
      break
    case "register.html":
      initRegisterPage()
      break
    case "login.html":
      initLoginPage()
      break
    case "dashboard.html":
      initDashboardPage()
      break
  }
})

function initHomePage() {
  // Add any home page specific functionality
  console.log("Home page initialized")
}

function initRegisterPage() {
  // Add any register page specific functionality
  console.log("Register page initialized")
}

function initLoginPage() {
  // Add any login page specific functionality
  console.log("Login page initialized")
}

function initDashboardPage() {
  // Add any dashboard page specific functionality
  console.log("Dashboard page initialized")

  // Update user info if available
  const userData = getFromLocalStorage("userData")
  if (userData) {
    const userNameElement = document.getElementById("userName")
    if (userNameElement) {
      userNameElement.textContent = userData.name || "Usuario"
    }
  }
}
