// Navegación en celular (menú hamburguesa)
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.querySelector(".nav-menu");

  // Al hacer clic en el ícono de menú, muestra u oculta el menú
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  // Cierra el menú cuando se hace clic en un enlace
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });
});

// Registro de usuarios
document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const successModal = document.getElementById("successModal");

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Obtener los datos del formulario
      const formData = new FormData(registerForm);
      const data = Object.fromEntries(formData);

      // Validar que todos los campos obligatorios estén completos
      const requiredFields = [
        "firstName", "lastName", "email", "phone", "documentType",
        "documentNumber", "address", "city", "emergencyContact",
        "emergencyPhone", "motivation",
      ];

      for (const field of requiredFields) {
        if (!data[field] || data[field].trim() === "") {
          alert(`Por favor completa el campo: ${field}`);
          return;
        }
      }

      // Validar aceptación de términos y condiciones
      if (!data.acceptTerms) {
        alert("Debes aceptar los términos y condiciones");
        return;
      }

      // Mostrar los datos en consola (para pruebas)
      console.log("Datos del registro:", data);

      // Mostrar el modal de éxito si existe
      if (successModal) {
        successModal.style.display = "block";
      }
    });
  }

  // Cierra el modal si se hace clic fuera del contenido
  if (successModal) {
    successModal.addEventListener("click", (e) => {
      if (e.target === successModal) {
        successModal.style.display = "none";
      }
    });
  }
});

// Login de usuarios
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      if (!email || !password) {
        alert("Por favor completa todos los campos");
        return;
      }

      // Mostrar estado de carga en el botón
      const submitBtn = loginForm.querySelector('button[type="submit"]');
      const btnText = submitBtn.querySelector(".btn-text");
      const btnLoading = submitBtn.querySelector(".btn-loading");

      btnText.style.display = "none";
      btnLoading.style.display = "flex";
      submitBtn.disabled = true;

      // Simular proceso de login
      setTimeout(() => {
        btnText.style.display = "flex";
        btnLoading.style.display = "none";
        submitBtn.disabled = false;

        // Redirige si las credenciales son válidas
        if (email === "demo@tcl.com" && password === "demo123") {
          window.location.href = "dashboard.html";
        } else {
          alert("Credenciales incorrectas. Usa: demo@tcl.com / demo123");
        }
      }, 2000);
    });
  }
});

// Mostrar/ocultar contraseña
function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  const toggle = input.nextElementSibling.querySelector("i");

  if (input.type === "password") {
    input.type = "text";
    toggle.classList.remove("fa-eye");
    toggle.classList.add("fa-eye-slash");
  } else {
    input.type = "password";
    toggle.classList.remove("fa-eye-slash");
    toggle.classList.add("fa-eye");
  }
}

// Tabs del dashboard
function showTab(tabName) {
  // Ocultar todos los contenidos
  const tabContents = document.querySelectorAll(".tab-content");
  tabContents.forEach((content) => content.classList.remove("active"));

  // Desactivar todos los botones
  const tabButtons = document.querySelectorAll(".tab-button");
  tabButtons.forEach((button) => button.classList.remove("active"));

  // Mostrar contenido del tab seleccionado
  const selectedTab = document.getElementById(tabName + "Tab");
  if (selectedTab) selectedTab.classList.add("active");

  // Activar el botón clicado
  event.target.classList.add("active");
}

// Cerrar sesión
function logout() {
  if (confirm("¿Estás seguro que quieres cerrar sesión?")) {
    window.location.href = "index.html";
  }
}

// Scroll suave al hacer clic en enlaces internos
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});

// Validar email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Validar número de teléfono
function validatePhone(phone) {
  const re = /^[+]?[1-9][\d]{0,15}$/;
  return re.test(phone.replace(/\s/g, ""));
}

// Estado de carga en botones
function addLoadingState(button, loadingText = "Cargando...") {
  const originalText = button.innerHTML;
  button.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${loadingText}`;
  button.disabled = true;

  // Devuelve función para restaurar el estado original
  return function removeLoadingState() {
    button.innerHTML = originalText;
    button.disabled = false;
  };
}

// Notificaciones
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : "info-circle"}"></i>
    <span>${message}</span>
    <button onclick="this.parentElement.remove()" class="notification-close">
      <i class="fas fa-times"></i>
    </button>
  `;
  document.body.appendChild(notification);

  // Se borra automáticamente a los 5 segundos
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 5000);
}

// Guardar en localStorage
function saveToLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error("Error guardando en localStorage:", error);
    return false;
  }
}

// Leer de localStorage
function getFromLocalStorage(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error leyendo localStorage:", error);
    return null;
  }
}

// Funcionalidad según la página actual
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  switch (currentPage) {
    case "index.html":
    case "":
      initHomePage();
      break;
    case "register.html":
      initRegisterPage();
      break;
    case "login.html":
      initLoginPage();
      break;
    case "dashboard.html":
      initDashboardPage();
      break;
  }
});

// Funciones específicas para cada página
function initHomePage() {
  console.log("Página de inicio cargada");
}

function initRegisterPage() {
  console.log("Página de registro cargada");
}

function initLoginPage() {
  console.log("Página de login cargada");
}

function initDashboardPage() {
  console.log("Dashboard cargado");

  // Mostrar nombre de usuario si está guardado
  const userData = getFromLocalStorage("userData");
  if (userData) {
    const userNameElement = document.getElementById("userName");
    if (userNameElement) {
      userNameElement.textContent = userData.name || "Usuario";
    }
  }
}
