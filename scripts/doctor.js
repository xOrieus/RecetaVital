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

function eliminarDeLocalStorage(clave, id) {
	const datos = obtenerDeLocalStorage(clave);
	const nuevosDatos = datos.filter((item) => item.id !== id);
	guardarEnLocalStorage(clave, nuevosDatos);
}

function encontrarPorId(clave, id) {
	const datos = obtenerDeLocalStorage(clave);
	return datos ? JSON.parse(datos).find((item) => item.id === id) : null;
}

function generarId() {
	return "_" + Math.random().toString(36).substr(2, 9);
}

// Funciones CRUD para Pacientes
document
	.getElementById("addPacienteForm")
	.addEventListener("submit", function (e) {
		e.preventDefault();
		const paciente = {
			id: generarId(),
            rut: document.getElementById("pacienteRut").value,
			nombre: document.getElementById("pacienteNombre").value,
			apellido: document.getElementById("pacienteApellido").value,
			fechaNacimiento: document.getElementById("pacienteFechaNacimiento").value,
			telefono: document.getElementById("pacienteTelefono").value,
			genero: document.getElementById("pacienteGenero").value,
		};
		const pacientes = obtenerDeLocalStorage("pacientes");
		pacientes.push(paciente);
		guardarEnLocalStorage("pacientes", pacientes);
		alert("Paciente añadido correctamente");
		actualizarSelectsPacientes();
	});

document
	.getElementById("modifyPacienteForm")
	.addEventListener("submit", function (e) {
		e.preventDefault();
		const id = document.getElementById("selectPacienteModificar").value;
		const paciente = encontrarPorId("pacientes", id);
		if (paciente) {
            paciente.rut = document.getElementById(
				"pacienteCiudadModificar"
			).value;
			paciente.nombre = document.getElementById(
				"pacienteNombreModificar"
			).value;
			paciente.apellido = document.getElementById(
				"pacienteApellidoModificar"
			).value;
			paciente.fechaNacimiento = document.getElementById(
				"pacienteFechaNacimientoModificar"
			).value;
			paciente.telefono = document.getElementById(
				"pacienteTelefonoModificar"
			).value;
			paciente.genero = document.getElementById(
				"pacienteGeneroModificar"
			).value;
			const pacientes = obtenerDeLocalStorage("pacientes");
			const indice = pacientes.findIndex((p) => p.id === id);
			pacientes[indice] = paciente;
			guardarEnLocalStorage("pacientes", pacientes);
			alert("Paciente modificado correctamente");
		} else {
			alert("Error: Paciente no encontrado");
		}
	});

function listarPacientes() {
	const pacientes = obtenerDeLocalStorage("pacientes");
	const lista = document.getElementById("listaPacientes");
	lista.innerHTML = "";
	pacientes.forEach((paciente) => {
		const item = document.createElement("li");
		item.classList.add("list-group-item");
		item.textContent = `${paciente.nombre} ${paciente.apellido} - ${paciente.rut}`;
		lista.appendChild(item);
	});
}

function listarPacientesEliminar() {
	const pacientes = obtenerDeLocalStorage("pacientes");
	const lista = document.getElementById("listaPacientesEliminar");
	lista.innerHTML = "";
	pacientes.forEach((paciente) => {
		const item = document.createElement("li");
		item.classList.add(
			"list-group-item",
			"d-flex",
			"justify-content-between",
			"align-items-center"
		);
		item.textContent = `${paciente.nombre} ${paciente.apellido} - ${paciente.rut}`;
		const botonEliminar = document.createElement("button");
		botonEliminar.classList.add("btn", "btn-danger");
		botonEliminar.textContent = "Eliminar";
		botonEliminar.addEventListener("click", function () {
			eliminarDeLocalStorage("pacientes", paciente.id);
			alert("Paciente eliminado correctamente");
			listarPacientesEliminar();
			actualizarSelectsPacientes();
		});
		item.appendChild(botonEliminar);
		lista.appendChild(item);
	});
}

function actualizarSelectsPacientes() {
	const pacientes = obtenerDeLocalStorage("pacientes");
	const selectPacienteModificar = document.getElementById(
		"selectPacienteModificar"
	);
	const selectPacienteFicha = document.getElementById("selectPacienteFicha");
	const examenPaciente = document.getElementById("examenPaciente");
	const tratamientoPaciente = document.getElementById("tratamientoPaciente");
	const anamnesisPaciente = document.getElementById("anamnesisPaciente");

	[
		selectPacienteModificar,
		selectPacienteFicha,
		examenPaciente,
		tratamientoPaciente,
		anamnesisPaciente,
	].forEach((select) => {
		select.innerHTML = "";
		pacientes.forEach((paciente) => {
			const option = document.createElement("option");
			option.value = paciente.id;
			option.textContent = `${paciente.nombre} ${paciente.apellido}`;
			select.appendChild(option);
		});
	});
}

// Funciones CRUD para Exámenes
document
	.getElementById("recetarExamenForm")
	.addEventListener("submit", function (e) {
		e.preventDefault();
		const examen = {
			id: generarId(),
			pacienteId: document.getElementById("examenPaciente").value,
			nombre: document.getElementById("examenNombre").value,
			procedimiento: document.getElementById("examenProcedimiento").value,
			preparacion: document.getElementById("examenPreparacion").value,
		};
		const examenes = obtenerDeLocalStorage("examenes");
		examenes.push(examen);
		guardarEnLocalStorage("examenes", examenes);
		alert("Examen recetado correctamente");
		listarExamenes();
	});

document
	.getElementById("modifyExamenForm")
	.addEventListener("submit", function (e) {
		e.preventDefault();
		const id = document.getElementById("selectExamenModificar").value;
		const examen = encontrarPorId("examenes", id);
		if (examen) {
			examen.nombre = document.getElementById("examenNombreModificar").value;
			examen.procedimiento = document.getElementById(
				"examenProcedimientoModificar"
			).value;
			examen.preparacion = document.getElementById(
				"examenPreparacionModificar"
			).value;
			const examenes = obtenerDeLocalStorage("examenes");
			const indice = examenes.findIndex((e) => e.id === id);
			examenes[indice] = examen;
			guardarEnLocalStorage("examenes", examenes);
			alert("Examen modificado correctamente");
		} else {
			alert("Error: Examen no encontrado");
		}
	});

function listarExamenes() {
	const examenes = obtenerDeLocalStorage("examenes");
	const lista = document.getElementById("listaExamenes");
	lista.innerHTML = "";
	examenes.forEach((examen) => {
		const item = document.createElement("li");
		item.classList.add("list-group-item");
		item.textContent = `${examen.nombre} - ${examen.procedimiento}`;
		lista.appendChild(item);
	});
}

function listarExamenesEliminar() {
	const examenes = obtenerDeLocalStorage("examenes");
	const lista = document.getElementById("listaExamenesEliminar");
	lista.innerHTML = "";
	examenes.forEach((examen) => {
		const item = document.createElement("li");
		item.classList.add(
			"list-group-item",
			"d-flex",
			"justify-content-between",
			"align-items-center"
		);
		item.textContent = `${examen.nombre} - ${examen.procedimiento}`;
		const botonEliminar = document.createElement("button");
		botonEliminar.classList.add("btn", "btn-danger");
		botonEliminar.textContent = "Eliminar";
		botonEliminar.addEventListener("click", function () {
			eliminarDeLocalStorage("examenes", examen.id);
			alert("Examen eliminado correctamente");
			listarExamenesEliminar();
		});
		item.appendChild(botonEliminar);
		lista.appendChild(item);
	});
}

// Funciones CRUD para Tratamientos
document
	.getElementById("ingresarTratamientoForm")
	.addEventListener("submit", function (e) {
		e.preventDefault();
		const tratamiento = {
			id: generarId(),
			pacienteId: document.getElementById("tratamientoPaciente").value,
			instrucciones: document.getElementById("tratamientoInstrucciones").value,
			receta: document.getElementById("tratamientoReceta").value,
		};
		const tratamientos = obtenerDeLocalStorage("tratamientos");
		tratamientos.push(tratamiento);
		guardarEnLocalStorage("tratamientos", tratamientos);
		alert("Tratamiento ingresado correctamente");
		listarTratamientos();
	});

function listarTratamientos() {
	const tratamientos = obtenerDeLocalStorage("tratamientos");
	const lista = document.getElementById("listaTratamientos");
	lista.innerHTML = "";
	tratamientos.forEach((tratamiento) => {
		const item = document.createElement("li");
		item.classList.add("list-group-item");
		item.textContent = `${tratamiento.instrucciones} - ${tratamiento.receta}`;
		lista.appendChild(item);
	});
}

// Función para listar medicamentos en el select de recetar tratamiento
function listarMedicamentosReceta() {
	const medicamentos = obtenerDeLocalStorage("medicamentos");
	const selectMedicamento = document.getElementById("tratamientoReceta");
	selectMedicamento.innerHTML = "";
	medicamentos.forEach((medicamento) => {
		const option = document.createElement("option");
		option.value = medicamento.id;
		option.textContent = `${medicamento.nombre} - ${medicamento.dosis}`;
		selectMedicamento.appendChild(option);
	});
}

function listarTratamientosCancelar() {
	const tratamientos = obtenerDeLocalStorage("tratamientos");
	const lista = document.getElementById("listaTratamientosCancelar");
	lista.innerHTML = "";
	tratamientos.forEach((tratamiento) => {
		const item = document.createElement("li");
		item.classList.add(
			"list-group-item",
			"d-flex",
			"justify-content-between",
			"align-items-center"
		);
		item.textContent = `${tratamiento.instrucciones} - ${tratamiento.receta}`;
		const botonCancelar = document.createElement("button");
		botonCancelar.classList.add("btn", "btn-danger");
		botonCancelar.textContent = "Cancelar";
		botonCancelar.addEventListener("click", function () {
			eliminarDeLocalStorage("tratamientos", tratamiento.id);
			alert("Tratamiento cancelado correctamente");
			listarTratamientosCancelar();
		});
		item.appendChild(botonCancelar);
		lista.appendChild(item);
	});
}

// Funciones para cargar datos al iniciar el documento
document.addEventListener("DOMContentLoaded", function () {
	listarPacientes();
	listarPacientesEliminar();
	actualizarSelectsPacientes();
	listarExamenes();
	listarExamenesEliminar();
	listarTratamientos();
	listarTratamientosCancelar();
	listarMedicamentosReceta();
	listarCitas(); // Agregada esta línea

	const pacientes = obtenerDeLocalStorage("pacientes");
	const selectPacienteModificar = document.getElementById(
		"selectPacienteModificar"
	);
	const selectPacienteFicha = document.getElementById("selectPacienteFicha");
	const examenPaciente = document.getElementById("examenPaciente");
	const tratamientoPaciente = document.getElementById("tratamientoPaciente");
	const anamnesisPaciente = document.getElementById("anamnesisPaciente");

	[
		selectPacienteModificar,
		selectPacienteFicha,
		examenPaciente,
		tratamientoPaciente,
		anamnesisPaciente,
	].forEach((select) => {
		select.innerHTML = "";
		pacientes.forEach((paciente) => {
			const option = document.createElement("option");
			option.value = paciente.id;
			option.textContent = `${paciente.nombre} ${paciente.apellido}`;
			select.appendChild(option);
		});
	});

	const examenes = obtenerDeLocalStorage("examenes");
	const selectExamenModificar = document.getElementById(
		"selectExamenModificar"
	);
	examenes.forEach((examen) => {
		const option = document.createElement("option");
		option.value = examen.id;
		option.textContent = examen.nombre;
		selectExamenModificar.appendChild(option);
	});

	const medicamentos = obtenerDeLocalStorage("medicamentos");
	const selectMedicamentoModificar = document.getElementById(
		"selectMedicamentoModificar"
	);
	medicamentos.forEach((medicamento) => {
		const option = document.createElement("option");
		option.value = medicamento.id;
		option.textContent = medicamento.nombre;
		selectMedicamentoModificar.appendChild(option);
	});
});

// Función para listar citas agendadas
function listarCitas() {
	const citas = obtenerDeLocalStorage("citas");
	const lista = document.getElementById("listaCitas");
	lista.innerHTML = "";
	citas.forEach((cita) => {
		const item = document.createElement("li");
		item.classList.add(
			"list-group-item",
			"d-flex",
			"justify-content-between",
			"align-items-center"
		);
		item.textContent = `Médico: ${cita.medicoId}, Fecha: ${cita.fecha}, Hora: ${cita.hora}`;
		lista.appendChild(item);
	});
}

// Función para agregar una cita de ejemplo
function agregarCitaDeEjemplo() {
	const citas = obtenerDeLocalStorage("citas");
	if (citas.length === 0) {
		const citaEjemplo = {
			id: generarId(),
			medicoId: "12345", // ID de ejemplo del médico
			fecha: "2024-01-01", // Fecha de ejemplo
			hora: "09:00", // Hora de ejemplo
		};
		citas.push(citaEjemplo);
		guardarEnLocalStorage("citas", citas);
	}
}

// Funciones para Ingresar Anamnesis
document
	.getElementById("ingresarAnamnesisForm")
	.addEventListener("submit", function (e) {
		e.preventDefault();
		const anamnesis = {
			id: generarId(),
			pacienteId: document.getElementById("anamnesisPaciente").value,
			diagnostico: document.getElementById("anamnesisDiagnostico").value,
		};
		const anamnesisList = obtenerDeLocalStorage("anamnesis");
		anamnesisList.push(anamnesis);
		guardarEnLocalStorage("anamnesis", anamnesisList);
		alert("Anamnesis ingresada correctamente");
	});

// Función para listar citas y añadir funcionalidad de cancelar cita
function listarCitasCancelar() {
	const citas = obtenerDeLocalStorage("citas");
	const lista = document.getElementById("listaCitasCancelar");
	lista.innerHTML = "";
	citas.forEach((cita) => {
		const item = document.createElement("li");
		item.classList.add(
			"list-group-item",
			"d-flex",
			"justify-content-between",
			"align-items-center"
		);
		item.textContent = `Médico: ${cita.medicoId}, Fecha: ${cita.fecha}, Hora: ${cita.hora}`;
		const botonCancelarCita = document.createElement("button");
		botonCancelarCita.classList.add("btn", "btn-danger");
		botonCancelarCita.textContent = "Cancelar Cita";
		botonCancelarCita.addEventListener("click", function () {
			eliminarDeLocalStorage("citas", cita.id);
			alert("Cita cancelada correctamente");
			listarCitasCancelar();
		});
		item.appendChild(botonCancelarCita);
		lista.appendChild(item);
	});
}

// Funciones para Modificar y Eliminar Diagnóstico
document.getElementById('modifyDiagnosticoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('selectDiagnosticoModificar').value;
    const anamnesis = encontrarPorId('anamnesis', id);
    if (anamnesis) {
        anamnesis.diagnostico = document.getElementById('diagnosticoTextoModificar').value;
        const anamnesisList = obtenerDeLocalStorage('anamnesis');
        const indice = anamnesisList.findIndex(a => a.id === id);
        anamnesisList[indice] = anamnesis;
        guardarEnLocalStorage('anamnesis', anamnesisList);
        alert('Diagnóstico modificado correctamente');
    } else {
        alert('Error: Diagnóstico no encontrado');
    }
});

function listarDiagnosticosEliminar() {
    const anamnesisList = obtenerDeLocalStorage('anamnesis');
    const lista = document.getElementById('listaDiagnosticosEliminar');
    lista.innerHTML = '';
    anamnesisList.forEach(anamnesis => {
        const item = document.createElement('li');
        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = `${anamnesis.diagnostico}`;
        const botonEliminar = document.createElement('button');
        botonEliminar.classList.add('btn', 'btn-danger');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', function() {
            eliminarDeLocalStorage('anamnesis', anamnesis.id);
            alert('Diagnóstico eliminado correctamente');
            listarDiagnosticosEliminar();
        });
        item.appendChild(botonEliminar);
        lista.appendChild(item);
    });
}

// Mostrar Ficha Médica
document
	.getElementById("mostrarFichaMedicaForm")
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

			const listaExamenes = document.getElementById("listaExamenesFicha");
			listaExamenes.innerHTML = "";
			examenes.forEach((examen) => {
				const item = document.createElement("li");
				item.classList.add("list-group-item");
				item.textContent = `${examen.nombre} - ${examen.procedimiento}`;
				listaExamenes.appendChild(item);
			});

			const listaTratamientos = document.getElementById(
				"listaTratamientosFicha"
			);
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
