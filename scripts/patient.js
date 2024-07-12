function showSection(sectionId) {
	document
		.querySelectorAll(".section")
		.forEach((section) => section.classList.add("d-none"));
	document.getElementById(sectionId).classList.remove("d-none");
}

function guardarEnLocalStorage(clave, valor) {
	localStorage.setItem(clave, JSON.stringify(valor));
}

function obtenerDeLocalStorage(clave) {
	const datos = localStorage.getItem(clave);
	return datos ? JSON.parse(datos) : [];
}

function generarId() {
	return "_" + Math.random().toString(36).substr(2, 9);
}

// Funciones para manejar el formulario de agendar citas
document
	.getElementById("agendarCitaForm")
	.addEventListener("submit", function (e) {
		e.preventDefault();
		const cita = {
			id: generarId(),
			medicoId: document.getElementById("citaMedico").value,
			fecha: document.getElementById("citaFecha").value,
			hora: document.getElementById("citaHora").value,
		};
		const citas = obtenerDeLocalStorage("citas");
		citas.push(cita);
		guardarEnLocalStorage("citas", citas);
		alert("Cita agendada correctamente");
	});

// Función para listar médicos en el select de agendar cita
function listarMedicos() {
	const medicos = obtenerDeLocalStorage("medicos");
	const selectMedico = document.getElementById("citaMedico");
	medicos.forEach((medico) => {
		const option = document.createElement("option");
		option.value = medico.id;
		option.textContent = `${medico.nombre} ${medico.apellido}`;
		selectMedico.appendChild(option);
	});
}

// Inicialización de listas y formularios
document.addEventListener("DOMContentLoaded", function () {
	listarMedicos();
});

// Función para manejar el formulario de ver ficha médica
document
	.getElementById("verFichaMedicaForm")
	.addEventListener("submit", function (e) {
		e.preventDefault();
		const pacienteId = document.getElementById("selectPacienteFicha").value;
		const paciente = encontrarPorId("pacientes", pacienteId);
		if (paciente) {
			const examenes = obtenerDeLocalStorage("examenes").filter(
				(examen) => examen.pacienteId === pacienteId
			);
			const tratamientos = obtenerDeLocalStorage("tratamientos").filter(
				(tratamiento) => tratamiento.pacienteId === pacienteId
			);

			const listaExamenes = document.getElementById("listaExamenes");
			listaExamenes.innerHTML = "";
			examenes.forEach((examen) => {
				const item = document.createElement("li");
				item.classList.add("list-group-item");
				item.textContent = `${examen.nombre} - ${examen.procedimiento}`;
				listaExamenes.appendChild(item);
			});

			const listaTratamientos = document.getElementById("listaTratamientos");
			listaTratamientos.innerHTML = "";
			tratamientos.forEach((tratamiento) => {
				const item = document.createElement("li");
				item.classList.add("list-group-item");
				item.textContent = `${tratamiento.instrucciones} - ${tratamiento.receta}`;
				listaTratamientos.appendChild(item);
			});

			document.getElementById("fichaMedicaDetalles").classList.remove("d-none");
		} else {
			alert("Error: Paciente no encontrado");
		}
	});

function encontrarPorId(clave, id) {
	const datos = obtenerDeLocalStorage(clave);
	return datos.find((item) => item.id === id);
}

// Inicialización de listas y formularios
document.addEventListener("DOMContentLoaded", function () {
	const pacientes = obtenerDeLocalStorage("pacientes");
	const selectPacienteFicha = document.getElementById("selectPacienteFicha");
	pacientes.forEach((paciente) => {
		const option = document.createElement("option");
		option.value = paciente.id;
		option.textContent = `${paciente.nombre} ${paciente.apellido}`;
		selectPacienteFicha.appendChild(option);
	});
});
