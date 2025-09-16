
// Minimal client-side helpers (mocked data and hooks for future API integration)
// IMPORTANT: Replace fetch* with real API calls once backend is ready.

const state = {
  user: {
    id: 1,
    nombre: "Milena R.",
    email: "mile@example.com",
    rol: "usuario", // "admin" en backoffice
    avatar: "https://ui-avatars.com/api/?name=Milena+R&background=0b0f1a&color=e6e9ef"
  },
  dashboard: {
    saldo: 12450,
    pedidos: 8,
    pendientes: 2,
    mensajes: 3,
    actividad: [
      { id: 101, tipo: "Pedido", detalle: "Compra #101 entregada", fecha: "2025-08-10" },
      { id: 102, tipo: "Mensaje", detalle: "Soporte respondió tu consulta", fecha: "2025-08-09" },
      { id: 103, tipo: "Pedido", detalle: "Compra #103 en preparación", fecha: "2025-08-07" },
    ],
    pedidosRecientes: [
      { id: 103, estado: "Preparación", total: 3290, fecha: "2025-08-07" },
      { id: 102, estado: "Entregado", total: 1990, fecha: "2025-08-03" },
      { id: 101, estado: "Entregado", total: 4590, fecha: "2025-08-01" },
    ]
  },
  admin: {
    usuarios: [
      { id: 1, nombre: "Milena R.", email: "mile@example.com", rol: "usuario", activo: true },
      { id: 2, nombre: "Cris H.", email: "cris@example.com", rol: "admin", activo: true },
      { id: 3, nombre: "Jesi G.", email: "jesi@example.com", rol: "usuario", activo: false },
    ],
    productos: [
      { id: 11, nombre: "Zapatillas Nova", precio: 3290, stock: 12 },
      { id: 12, nombre: "Remera Flow", precio: 1590, stock: 0 },
      { id: 13, nombre: "Campera Wind", precio: 5990, stock: 4 },
    ],
    resumen: {
      ingresosHoy: 7840,
      pedidosHoy: 12,
      ticketsAbiertos: 4,
      conversion: 3.8
    },
    ventasSem: [8, 12, 9, 14, 7, 10, 15] // datos para grafico
  }
};

// ------- Utils
function formatoMoneda(n) {
  return new Intl.NumberFormat('es-UY', { style: 'currency', currency: 'UYU' }).format(n);
}

function byId(id){ return document.getElementById(id); }

// ------- Render Usuario (dashboard)
function renderUsuario(){
  if(!byId("user-name")) return;
  byId("user-name").textContent = state.user.nombre;
  byId("user-email").textContent = state.user.email;
  byId("kpi-saldo").textContent = formatoMoneda(state.dashboard.saldo);
  byId("kpi-pedidos").textContent = state.dashboard.pedidos;
  byId("kpi-pendientes").textContent = state.dashboard.pendientes;
  byId("kpi-mensajes").textContent = state.dashboard.mensajes;

  // actividad timeline
  const tbody = byId("tbody-actividad");
  tbody.innerHTML = state.dashboard.actividad.map(a => `
    <tr>
      <td>${a.id}</td>
      <td>${a.tipo}</td>
      <td>${a.detalle}</td>
      <td>${a.fecha}</td>
    </tr>
  `).join("");

  // pedidos recientes
  const tbodyP = byId("tbody-pedidos");
  tbodyP.innerHTML = state.dashboard.pedidosRecientes.map(p => `
    <tr>
      <td>#${p.id}</td>
      <td>${p.estado}</td>
      <td>${p.fecha}</td>
      <td>${formatoMoneda(p.total)}</td>
    </tr>
  `).join("");
}

// ------- Render Admin (backoffice)
function renderAdmin(){
  if(!byId("kpi-ingresos")) return;

  const r = state.admin.resumen;
  byId("kpi-ingresos").textContent = formatoMoneda(r.ingresosHoy);
  byId("kpi-pedidos-hoy").textContent = r.pedidosHoy;
  byId("kpi-tickets").textContent = r.ticketsAbiertos;
  byId("kpi-conversion").textContent = r.conversion + "%";

  // tabla usuarios
  const tU = byId("tbody-usuarios");
  tU.innerHTML = state.admin.usuarios.map(u => `
    <tr>
      <td>${u.id}</td>
      <td>${u.nombre}</td>
      <td>${u.email}</td>
      <td>${u.rol}</td>
      <td>${u.activo ? "Activo" : "Inactivo"}</td>
      <td>
        <button class="btn" data-action="toggle" data-id="${u.id}">${u.activo?"Desactivar":"Activar"}</button>
      </td>
    </tr>
  `).join("");

  // tabla productos
  const tP = byId("tbody-productos");
  tP.innerHTML = state.admin.productos.map(p => `
    <tr>
      <td>${p.id}</td>
      <td>${p.nombre}</td>
      <td>${formatoMoneda(p.precio)}</td>
      <td>${p.stock}</td>
      <td>
        <button class="btn" data-action="edit" data-id="${p.id}">Editar</button>
      </td>
    </tr>
  `).join("");

  // acciones demo (sin backend)
  byId("tabla-usuarios").addEventListener("click", (e)=>{
    const btn = e.target.closest("button[data-action='toggle']");
    if(!btn) return;
    const id = Number(btn.dataset.id);
    const u = state.admin.usuarios.find(x => x.id===id);
    u.activo = !u.activo;
    renderAdmin();
  });

  // grafico ventas (vanilla canvas)
  const c = byId("grafico-ventas");
  const ctx = c.getContext("2d");
  ctx.clearRect(0,0,c.width,c.height);
  const data = state.admin.ventasSem;
  const max = Math.max(...data) * 1.2;
  const w = c.width, h = c.height;
  const padding = 28;
  const barW = (w - padding*2) / data.length * 0.6;
  data.forEach((v, i)=>{
    const x = padding + i * ((w - padding*2) / data.length) + ((w - padding*2) / data.length - barW)/2;
    const y = h - padding;
    const bh = (v/max) * (h - padding*2);
    ctx.fillRect(x, y - bh, barW, bh);
  });
  // eje x
  ctx.font = "12px system-ui";
  ctx.globalAlpha = .8;
  ["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"].forEach((d,i)=>{
    const x = padding + i * ((w - padding*2)/data.length) + ((w - padding*2)/data.length)/2;
    ctx.textAlign = "center";
    ctx.fillText(d, x, h - 6);
  });
  ctx.globalAlpha = 1;
}

// ------- Navigation helpers (front only)
function goTo(url){ window.location.href = url; }

// Auto init per page
document.addEventListener("DOMContentLoaded", ()=>{
  renderUsuario();
  renderAdmin();
});
