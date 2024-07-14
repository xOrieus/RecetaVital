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
	if (!localStorage.getItem("pacientes")) {
		const pacientes = [
			{
				id: generarId(),
				rut: "12345678-9",
				nombre: "Carlos",
				apellido: "López",
				telefono: "123456789",
				fechaNacimiento: "1990-01-01",
				genero: "male",
			},
			{
				id: generarId(),
				rut: "98765432-1",
				nombre: "Ana",
				apellido: "Martínez",
				telefono: "987654321",
				fechaNacimiento: "1985-05-15",
				genero: "female",
			},
		];
		guardarEnLocalStorage("pacientes", pacientes);
	}

	if (!localStorage.getItem("tratamientos")) {
		const tratamientos = [
			{
				id: generarId(),
				pacienteId: "12345678-9",
				instrucciones: "Tomar Paracetamol cada 8 horas",
				receta: "Paracetamol 500mg",
				dosis: "500mg",
				notas: "Tomar después de las comidas",
			},
			{
				id: generarId(),
				pacienteId: "98765432-1",
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
			{id: generarId(), pacienteId: "12345678-9", diagnostico: "Gripe"},
			{
				id: generarId(),
				pacienteId: "98765432-1",
				diagnostico: "Dolor de cabeza",
			},
		];
		guardarEnLocalStorage("diagnosticos", diagnosticos);
	}

	if (!localStorage.getItem("examenes")) {
		const examenes = [
			{
				id: generarId(),
				pacienteId: "12345678-9",
				nombre: "Hemograma",
				procedimiento: "Análisis de sangre",
				preparacion: "Ayuno de 8 horas",
			},
			{
				id: generarId(),
				pacienteId: "98765432-1",
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
				medicoId: "Juan Pérez",
				pacienteId: "pac1",
				fecha: "2024-07-10",
				hora: "10:00",
			},
			{
				id: generarId(),
				medicoId: "Juan Pérez",
				pacienteId: "pac2",
				fecha: "2024-07-11",
				hora: "11:00",
			},
		];
		guardarEnLocalStorage("citas", citas);
	}
}


document
	.getElementById("addPacienteForm")
	.addEventListener("submit", function (e) {
		e.preventDefault();
		const paciente = {
			id: generarId(),
			rut: document.getElementById("pacienteRUT").value,
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
		listarPacientesEliminar();
		actualizarSelectsPacientes();
	});

document
	.getElementById("modifyPacienteForm")
	.addEventListener("submit", function (e) {
		e.preventDefault();
		const id = document.getElementById("selectPacienteModificar").value;
		const paciente = encontrarPorId("pacientes", id);
		if (paciente) {
			paciente.rut = document.getElementById("pacienteRUTModificar").value;
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
			listarPacientesEliminar();
			actualizarSelectsPacientes();
		} else {
			alert("Error: Paciente no encontrado");
		}
	});

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
		item.textContent = `${paciente.nombre} ${paciente.apellido}`;
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
	const selectPacienteModificar = document.getElementById("selectPacienteModificar");
	const selectPacienteFicha = document.getElementById("selectPacienteFicha");
	const examenPaciente = document.getElementById("examenPaciente");
	const tratamientoPaciente = document.getElementById("tratamientoPaciente");
	const diagnosticoPaciente = document.getElementById("diagnosticoPaciente");

	[
		selectPacienteModificar,
		selectPacienteFicha,
		examenPaciente,
		tratamientoPaciente,
		diagnosticoPaciente,
	].forEach((select) => {
		if (select) {
			select.innerHTML = "";
			pacientes.forEach((paciente) => {
				const option = document.createElement("option");
				option.value = paciente.id;
				option.textContent = `${paciente.nombre} ${paciente.apellido}`;
				select.appendChild(option);
			});
		} else {
			console.error("Elemento select no encontrado:", select);
		}
	});
}


document.addEventListener("DOMContentLoaded", function () {
	inicializarDatosPorDefecto();
	actualizarSelectsPacientes();
	listarPacientesEliminar();
	listarCitas();
	cancelarlistarCitas()
	listarTratamientosCancelar();
	listarExamenesEliminar();
	listarDiagnosticosEliminar();
	actualizarSelectsDiagnosticos();
	listarMedicamentosReceta();
});

document
	.getElementById("mostrarFichaMedicaModal")
	.addEventListener("show.bs.modal", mostrarFichaMedica);

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
		const botonDiagnostico = document.createElement("button");
		/*botonDiagnostico.classList.add("btn", "btn-success");
		botonDiagnostico.textContent = "Ingresar Paciente";
		botonDiagnostico.addEventListener("click", function () {
			document.getElementById("diagnosticoPaciente").value = cita.pacienteId;
			new bootstrap.Modal(
				document.getElementById("ingresarDiagnosticoModal")
			).show();
		});*/
		const botonCancelarCita = document.createElement("button");
		botonCancelarCita.classList.add("btn", "btn-danger");
		botonCancelarCita.textContent = "Cancelar Cita";
		botonCancelarCita.addEventListener("click", function () {
			eliminarDeLocalStorage("citas", cita.id);
			alert("Cita cancelada correctamente");
			listarCitas();
		});
		/*item.appendChild(botonDiagnostico);*/
		/*item.appendChild(botonCancelarCita);*/
		lista.appendChild(item);
	});
}

function cancelarlistarCitas() {
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
		const botonDiagnostico = document.createElement("button");
		/*botonDiagnostico.classList.add("btn", "btn-success");
		botonDiagnostico.textContent = "Ingresar Paciente";
		botonDiagnostico.addEventListener("click", function () {
			document.getElementById("diagnosticoPaciente").value = cita.pacienteId;
			new bootstrap.Modal(
				document.getElementById("ingresarDiagnosticoModal")
			).show();
		});*/
		const botonCancelarCita = document.createElement("button");
		botonCancelarCita.classList.add("btn", "btn-danger");
		botonCancelarCita.textContent = "Cancelar Cita";
		botonCancelarCita.addEventListener("click", function () {
			eliminarDeLocalStorage("citas", cita.id);
			alert("Cita cancelada correctamente");
			listarCitas();
		});
		/*item.appendChild(botonDiagnostico);*/
		item.appendChild(botonCancelarCita);
		lista.appendChild(item);
	});
}



document
	.getElementById("ingresarDiagnosticoForm")
	.addEventListener("submit", function (e) {
		e.preventDefault();
		const diagnostico = {
			id: generarId(),
			pacienteId: document.getElementById("diagnosticoPaciente").value,
			diagnostico: document.getElementById("diagnosticos").value,
		};
		const diagnosticoList = obtenerDeLocalStorage("diagnostico");
		diagnosticoList.push(diagnostico);
		guardarEnLocalStorage("diagnostico", diagnosticoList);
		alert("Diagnostico ingresada correctamente");
		listarDiagnosticosEliminar();
		actualizarSelectsDiagnosticos();
	});

document
	.getElementById("modifyDiagnosticoForm")
	.addEventListener("submit", function (e) {
		e.preventDefault();
		const id = document.getElementById("selectDiagnosticoModificar").value;
		const diagnosticoList = obtenerDeLocalStorage("diagnosticos");
		const diagnostico = encontrarPorId("diagnosticos", id);
		if (diagnostico) {
			diagnostico.diagnostico = document.getElementById(
				"diagnosticoTextoModificar"
			).value;
			const indice = diagnosticoList.findIndex((a) => a.id === id);
			diagnosticoList[indice] = diagnostico;
			guardarEnLocalStorage("diagnosticos", diagnosticoList);
			alert("Diagnóstico modificado correctamente");
			listarDiagnosticosEliminar();
			actualizarSelectsDiagnosticos();
		} else {
			alert("Error: Diagnóstico no encontrado");
		}
	});

function listarDiagnosticosEliminar() {
	const diagnosticoList = obtenerDeLocalStorage("diagnosticos");
	const lista = document.getElementById("listaDiagnosticosEliminar");
	lista.innerHTML = "";
	diagnosticoList.forEach((diagnostico) => {
		const item = document.createElement("li");
		item.classList.add(
			"list-group-item",
			"d-flex",
			"justify-content-between",
			"align-items-center"
		);
		item.textContent = `Paciente: ${diagnostico.pacienteId}, Diagnóstico: ${diagnostico.diagnostico}`;
		const botonEliminar = document.createElement("button");
		botonEliminar.classList.add("btn", "btn-danger");
		botonEliminar.textContent = "Eliminar";
		botonEliminar.addEventListener("click", function () {
			eliminarDeLocalStorage("diagnosticos", diagnostico.id);
			alert("Diagnóstico eliminado correctamente");
			listarDiagnosticosEliminar();
			actualizarSelectsDiagnosticos();
		});
		item.appendChild(botonEliminar);
		lista.appendChild(item);
	});
}

function actualizarSelectsDiagnosticos() {
	const diagnosticoList = obtenerDeLocalStorage("diagnosticos");
	const selectDiagnosticoModificar = document.getElementById(
		"selectDiagnosticoModificar"
	);

	selectDiagnosticoModificar.innerHTML = "";
	diagnosticoList.forEach((diagnosticos) => {
		const option = document.createElement("option");
		option.value = diagnosticos.id;
		option.textContent = `Paciente: ${diagnostico.pacienteId}, Diagnóstico: ${diagnosticos.diagnosticos}`;
		selectDiagnosticoModificar.appendChild(option);
	});
}

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
		listarTratamientosCancelar();
	});

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
		item.textContent = `Paciente: ${tratamiento.pacienteId}, Instrucciones: ${tratamiento.instrucciones}, Receta: ${tratamiento.receta}`;
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
		alert("Exámen recetado correctamente");
		listarExamenesEliminar();
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
			alert("Exámen modificado correctamente");
			listarExamenesEliminar();
		} else {
			alert("Error: Exámen no encontrado");
		}
	});

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
		item.textContent = `Paciente: ${examen.pacienteId}, Exámen: ${examen.nombre}`;
		const botonEliminar = document.createElement("button");
		botonEliminar.classList.add("btn", "btn-danger");
		botonEliminar.textContent = "Eliminar";
		botonEliminar.addEventListener("click", function () {
			eliminarDeLocalStorage("examenes", examen.id);
			alert("Exámen eliminado correctamente");
			listarExamenesEliminar();
		});
		item.appendChild(botonEliminar);
		lista.appendChild(item);
	});
}

function listarMedicamentosReceta() {
	const medicamentos = obtenerDeLocalStorage("medicamentos");
	const tratamientoReceta = document.getElementById("tratamientoReceta");
	tratamientoReceta.innerHTML = "";
	medicamentos.forEach((medicamento) => {
		const option = document.createElement("option");
		option.value = medicamento.id;
		option.textContent = `${medicamento.nombre} - ${medicamento.dosis}`;
		tratamientoReceta.appendChild(option);
	});
}

function mostrarFichaMedica() {
	const pacienteId = document.getElementById("selectPacienteFicha").value;
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

document.getElementById("selectPacienteFicha").addEventListener("change", mostrarFichaMedica);


document.getElementById("mostrarFichaMedicaModal").addEventListener("show.bs.modal", function () {
	mostrarFichaMedica();
});