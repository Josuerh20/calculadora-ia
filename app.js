// URL del webhook de n8n
const webhookURL = "https://josuerh20.app.n8n.cloud/webhook/operacion-ia2";

document.getElementById("calcForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const resultadoDiv = document.getElementById("resultado");
  const button = document.getElementById("submitBtn");

  resultadoDiv.style.display = "none";
  resultadoDiv.innerHTML = "";

  const operacion = document.getElementById("operacion").value;

  // Animación del botón
  button.disabled = true;
  button.textContent = "Procesando...";

  try {
    // Obtener IP pública
    const ipResponse = await fetch("https://api.ipify.org?format=json");
    const ipData = await ipResponse.json();

    // Enviar datos al webhook de n8n
    const response = await fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        operacion: operacion,
        ip_publica: ipData.ip
      })
    });

    if (!response.ok) throw new Error("No se pudo conectar con el servidor");

    const data = await response.json();

    // Mostrar resultado
    resultadoDiv.style.display = "block";
    resultadoDiv.innerHTML = `
      <div class="card2">
        <h1>Resultado</h1>
        <p><strong>Expresión:</strong> ${data.operacion}</p>
        <p><strong>Respuesta:</strong> ${data.resultado}</p>
      </div>
    `;

  } catch (err) {
    resultadoDiv.style.display = "block";
    resultadoDiv.innerHTML = `
      <div class="card2" style="border-left:4px solid #ff4d79; background:rgba(0,0,0,0.3);">
        <h2>Error</h2>
        <p>No se pudo procesar la operación.</p>
        <p><strong>Detalles:</strong> ${err.message}</p>
      </div>
    `;
  } finally {
    // Restaurar el botón
    button.disabled = false;
    button.textContent = "Procesar";
  }

  // Limpia el formulario
  e.target.reset();
});
