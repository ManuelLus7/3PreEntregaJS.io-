function calcularCotizacion() {
	const usuario = document.getElementById("usuario").value;
	const obra = document.getElementById("obra").value;
	const tipoSeguro = document.getElementById("tipo_seguro").value;
	const sumaAsegurada = parseFloat(document.getElementById("suma_asegurada").value);

	if (!usuario || !obra || !tipoSeguro || isNaN(sumaAsegurada)) {
		alert("Por favor, complete todos los campos.");
		return;
	}

	const prima = Math.max(sumaAsegurada * 0.4 / 100, 2500);
	const iva = prima * 0.21;
	const total = prima + iva;

	const resultado = document.getElementById("resultado");
	resultado.innerHTML = `
		<h2>Resultados de la Cotización:</h2>
		<p><strong>Usuario:</strong> ${usuario}</p>
		<p><strong>Obra:</strong> ${obra}</p>
		<p><strong>Tipo de Seguro:</strong> ${tipoSeguro}</p>
		<p><strong>Suma Asegurada:</strong> $${sumaAsegurada.toFixed(2)}</p>
		<p><strong>Prima:</strong> $${prima.toFixed(2)}</p>
		<p><strong>IVA (21%):</strong> $${iva.toFixed(2)}</p>
		<p><strong>Total:</strong> $${total.toFixed(2)}</p>
	`;
	resultado.style.display = "block";

	guardarHistorial(usuario, obra, tipoSeguro, sumaAsegurada, total);
	}

	function guardarHistorial(usuario, obra, tipoSeguro, sumaAsegurada, total) {
	const historial = JSON.parse(localStorage.getItem("historial")) || [];

	historial.push({
		usuario,
		obra,
		tipoSeguro,
		sumaAsegurada,
		total
	});

	localStorage.setItem("historial", JSON.stringify(historial));
}

function mostrarHistorial() {
	const historial = JSON.parse(localStorage.getItem("historial")) || [];

	if (historial.length === 0) {
		alert("No hay historial disponible.");
		return;
	}

	const tabla = document.createElement("table");
	tabla.classList.add("historial-table");

	const encabezado = tabla.createTHead();
	const filaEncabezado = encabezado.insertRow();
	const encabezados = ["Usuario", "Obra", "Tipo de Seguro", "Suma Asegurada", "Total"];

	encabezados.forEach((texto) => {
		const encabezado = document.createElement("th");
		encabezado.textContent = texto;
		filaEncabezado.appendChild(encabezado);
	});

	const cuerpo = tabla.createTBody();

	historial.forEach((cotizacion) => {
        const fila = cuerpo.insertRow();
        const celdas = [
          cotizacion.usuario,
          cotizacion.obra,
          cotizacion.tipoSeguro,
          cotizacion.sumaAsegurada.toFixed(2),
          cotizacion.total.toFixed(2),
        ];
      
        celdas.forEach((texto) => {
          const celda = fila.insertCell();
          celda.textContent = texto;
        });
      });
      
      const historialDiv = document.getElementById("historial");
      historialDiv.innerHTML = "";
      historialDiv.appendChild(tabla);
      historialDiv.style.display = "block";
}
