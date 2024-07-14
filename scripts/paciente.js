function guardarEnLocalStorage(clave, valor) {
	localStorage.setItem(clave, JSON.stringify(valor));
}

function obtenerDeLocalStorage(clave) {
	const datos = localStorage.getItem(clave);
	return datos ? JSON.parse(datos) : [];
}

function eliminarDeLocalStorage(clave, id) {
	const datos = obtenerDeLocalStorage(clave);
	const nuevosDatos = datos.filter((item) => item.id !== id);
	guardarEnLocalStorage(clave, nuevosDatos);
}

function encontrarPorId(clave, id) {
	const datos = obtenerDeLocalStorage(clave);
	return datos.find((item) => item.id === id);
}

function generarId() {
	return "_" + Math.random().toString(36).substr(2, 9);
}


function inicializarDatosPorDefecto() {
	if (!localStorage.getItem("medicos")) {
		const medicos = [
			{
				id: generarId(),
				nombre: "Juan",
				apellido: "Pérez",
			},
			{
				id: generarId(),
				nombre: "María",
				apellido: "González",
			},
		];
		guardarEnLocalStorage("medicos", medicos);
	}

	if (!localStorage.getItem("tratamientos")) {
		const tratamientos = [
			{
				id: generarId(),
				pacienteId: "pac1",
				instrucciones: "Tomar Paracetamol cada 8 horas",
				receta: "Paracetamol 500mg",
				dosis: "500mg",
				notas: "Tomar después de las comidas",
			},
			{
				id: generarId(),
				pacienteId: "pac2",
				instrucciones: "Tomar Ibuprofeno cada 6 horas",
				receta: "Ibuprofeno 200mg",
				dosis: "200mg",
				notas: "Tomar con mucha agua",
			},
		];
		guardarEnLocalStorage("tratamientos", tratamientos);
	}

	if (!localStorage.getItem("diagnosticos")) {
		const diagnosticos = [
			{id: generarId(), pacienteId: "pac1", diagnostico: "Gripe"},
			{id: generarId(), pacienteId: "pac2", diagnostico: "Dolor de cabeza"},
		];
		guardarEnLocalStorage("diagnosticos", diagnosticos);
	}

	if (!localStorage.getItem("examenes")) {
		const examenes = [
			{
				id: generarId(),
				pacienteId: "pac1",
				nombre: "Hemograma",
				procedimiento: "Análisis de sangre",
				preparacion: "Ayuno de 8 horas",
			},
			{
				id: generarId(),
				pacienteId: "pac2",
				nombre: "Radiografía",
				procedimiento: "Radiografía de tórax",
				preparacion: "Ninguna",
			},
		];
		guardarEnLocalStorage("examenes", examenes);
	}

	if (!localStorage.getItem("citas")) {
		const citas = [
			{
				id: generarId(),
				medicoId: "med1",
				pacienteId: "pac1",
				fecha: "2024-07-10",
				hora: "10:00",
			},
			{
				id: generarId(),
				medicoId: "med2",
				pacienteId: "pac2",
				fecha: "2024-07-11",
				hora: "11:00",
			},
		];
		guardarEnLocalStorage("citas", citas);
	}
}

// Función para listar médicos y actualizar select
function actualizarSelectsMedicos() {
	const medicos = obtenerDeLocalStorage("medicos");
	const selectMedicoCita = document.getElementById("medicoCita");

	if (selectMedicoCita) {
		selectMedicoCita.innerHTML = "";
		medicos.forEach((medico) => {
			const option = document.createElement("option");
			option.value = medico.id;
			option.textContent = `${medico.nombre} ${medico.apellido}`;
			selectMedicoCita.appendChild(option);
		});
	} else {
		console.error("Elemento selectMedicoCita no encontrado.");
	}
}

// Función para listar fichas médicas
function mostrarFichaMedica() {
	const pacienteId = "pac1"; // Cambiar esto según el ID del paciente actual
	const diagnosticos = obtenerDeLocalStorage("diagnosticos").filter(
		(d) => d.pacienteId === pacienteId
	);
	const tratamientos = obtenerDeLocalStorage("tratamientos").filter(
		(t) => t.pacienteId === pacienteId
	);
	const examenes = obtenerDeLocalStorage("examenes").filter(
		(e) => e.pacienteId === pacienteId
	);

	const fichaMedicaDetalles = document.getElementById("fichaMedicaDetalles");
	fichaMedicaDetalles.classList.remove("d-none");

	const listaDiagnosticosFicha = document.getElementById("listaDiagnosticosFicha");
	listaDiagnosticosFicha.innerHTML = "";
	diagnosticos.forEach((diagnostico) => {
		const item = document.createElement("li");
		item.classList.add("list-group-item");
		item.textContent = `Diagnóstico: ${diagnostico.diagnostico}`;
		listaDiagnosticosFicha.appendChild(item);
	});

	const listaTratamientosFicha = document.getElementById("listaTratamientosFicha");
	listaTratamientosFicha.innerHTML = "";
	tratamientos.forEach((tratamiento) => {
		const item = document.createElement("li");
		item.classList.add("list-group-item");
		item.textContent = `Tratamiento: ${tratamiento.instrucciones}, Receta: ${tratamiento.receta}, Dosis: ${tratamiento.dosis}, Notas: ${tratamiento.notas}`;
		listaTratamientosFicha.appendChild(item);
	});

	const listaExamenesFicha = document.getElementById("listaExamenesFicha");
	listaExamenesFicha.innerHTML = "";
	examenes.forEach((examen) => {
		const item = document.createElement("li");
		item.classList.add("list-group-item");
		item.textContent = `Examen: ${examen.nombre}, Procedimiento: ${examen.procedimiento}, Preparación: ${examen.preparacion}`;
		listaExamenesFicha.appendChild(item);
	});
}

// Inicialización de datos y eventos
document.addEventListener("DOMContentLoaded", function () {
	inicializarDatosPorDefecto();
	actualizarSelectsMedicos();
});

document.getElementById("mostrarFichaMedicaModal").addEventListener("show.bs.modal", mostrarFichaMedica);
