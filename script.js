document.getElementById("formOperacion").addEventListener("submit", async (e) => {
    e.preventDefault();

    const operacion = document.getElementById("operacion").value;

    const respuesta = await fetch("https://josuerh20.app.n8n.cloud/webhook/operacion-ia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ operacion })
    });

    const data = await respuesta.json();

    document.getElementById("resultado").classList.remove("d-none");

    document.getElementById("resultado").innerHTML = `
        <h5><strong>Resultado</strong></h5>
        <p><strong>Operación detectada:</strong> ${data.operacion}</p>
        <p><strong>Resultado:</strong> ${data.resultado}</p>
        <p><strong>IP:</strong> ${data.ip}</p>
        <p><strong>Ciudad:</strong> ${data.ciudad}</p>
        <p><strong>Fecha/Hora:</strong> ${data.fecha_hora}</p>
    `;
});

