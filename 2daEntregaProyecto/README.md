
# Frontkit (Usuario + Backoffice)

Este paquete incluye **dos páginas listas** para que le pases a tu amigo que conecta la base de datos:

- `usuario.html`: dashboard al que se redirige **después de iniciar sesión** (panel del usuario).
- `admin.html`: **backoffice** para administración.

Ambas comparten:
- `styles.css` (estilos modernos, responsive)
- `app.js` (datos mock + funciones para renderizar)

## Cómo probar
1. Abre `usuario.html` y `admin.html` en el navegador (doble click).
2. Todo funciona con **datos de ejemplo** (no requiere servidor ni DB).

## Dónde integrar backend
Busca en `app.js` los comentarios. Reemplazá el `state` y los `render*` con `fetch` a tus endpoints.

- Autenticación: al completar el login de tu landing, redireccioná a `usuario.html`.
- Si el usuario tiene rol admin, podés enviarle a `admin.html`.
- Acciones de botones muestran `alert()` como demo: reemplazá por POST a tu API.

## Estructura
```
frontkit/
 ├── admin.html
 ├── usuario.html
 ├── styles.css
 ├── app.js
 └── assets/
     └── logo.svg
```
