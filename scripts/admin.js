// Funciones auxiliares para manejar el almacenamiento local
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

// Funciones CRUD para Médicos
document
	.getElementById("addMedicoForm")
	.addEventListener("submit", function (e) {
		e.preventDefault();
		const medico = {
			id: generarId(),
			rut: document.getElementById("medicoRUT").value,
			nombre: document.getElementById("medicoNombre").value,
			apellido: document.getElementById("medicoApellido").value,
			telefono: document.getElementById("medicoTelefono").value,
			ciudad: document.getElementById("medicoCiudad").value,
			fechaNacimiento: document.getElementById("medicoFechaNacimiento").value,
		};
		const medicos = obtenerDeLocalStorage("medicos");
		medicos.push(medico);
		guardarEnLocalStorage("medicos", medicos);
		alert("Médico añadido correctamente");
	});

document
	.getElementById("modifyMedicoForm")
	.addEventListener("submit", function (e) {
		e.preventDefault();
		const id = document.getElementById("selectMedicoModificar").value;
		const medico = encontrarPorId("medicos", id);
		if (medico) {
			medico.rut = document.getElementById("medicoRUTModificar").value;
			medico.nombre = document.getElementById("medicoNombreModificar").value;
			medico.apellido = document.getElementById(
				"medicoApellidoModificar"
			).value;
			medico.telefono = document.getElementById(
				"medicoTelefonoModificar"
			).value;
			medico.ciudad = document.getElementById("medicoCiudadModificar").value;
			medico.fechaNacimiento = document.getElementById(
				"medicoFechaNacimientoModificar"
			).value;
			const medicos = obtenerDeLocalStorage("medicos");
			const indice = medicos.findIndex((m) => m.id === id);
			medicos[indice] = medico;
			guardarEnLocalStorage("medicos", medicos);
			alert("Médico modificado correctamente");
		} else {
			alert("Error: Médico no encontrado");
		}
	});

function listarMedicos() {
	const medicos = obtenerDeLocalStorage("medicos");
	const lista = document.getElementById("listaMedicos");
	lista.innerHTML = "";
	medicos.forEach((medico) => {
		const item = document.createElement("li");
		item.classList.add("list-group-item");
		item.textContent = `${medico.nombre} ${medico.apellido} - ${medico.rut}`;
		lista.appendChild(item);
	});
}

function listarMedicosEliminar() {
	const medicos = obtenerDeLocalStorage("medicos");
	const lista = document.getElementById("listaMedicosEliminar");
	lista.innerHTML = "";
	medicos.forEach((medico) => {
		const item = document.createElement("li");
		item.classList.add(
			"list-group-item",
			"d-flex",
			"justify-content-between",
			"align-items-center"
		);
		item.textContent = `${medico.nombre} ${medico.apellido} - ${medico.rut}`;
		const botonEliminar = document.createElement("button");
		botonEliminar.classList.add("btn", "btn-danger");
		botonEliminar.textContent = "Eliminar";
		botonEliminar.addEventListener("click", function () {
			eliminarDeLocalStorage("medicos", medico.id);
			alert("Médico eliminado correctamente");
			listarMedicosEliminar();
		});
		item.appendChild(botonEliminar);
		lista.appendChild(item);
	});
}

// Inicialización de listas y formularios
document.addEventListener("DOMContentLoaded", function () {
	listarMedicos();
	listarMedicosEliminar();
	const medicos = obtenerDeLocalStorage("medicos");
	const selectMedicoModificar = document.getElementById(
		"selectMedicoModificar"
	);
	medicos.forEach((medico) => {
		const option = document.createElement("option");
		option.value = medico.id;
		option.textContent = `${medico.nombre} ${medico.apellido}`;
		selectMedicoModificar.appendChild(option);
	});
});

// Repetir para Medicamentos y Usuarios
// Funciones CRUD para Medicamentos
document
	.getElementById("addMedicamentoForm")
	.addEventListener("submit", function (e) {
		e.preventDefault();
		const medicamento = {
			id: generarId(),
			nombre: document.getElementById("medicamentoNombre").value,
			dosis: document.getElementById("medicamentoDosis").value,
			detalles: document.getElementById("medicamentoDetalles").value,
		};
		const medicamentos = obtenerDeLocalStorage("medicamentos");
		medicamentos.push(medicamento);
		guardarEnLocalStorage("medicamentos", medicamentos);
		alert("Medicamento añadido correctamente");
		listarMedicamentos();
		listarMedicamentosEliminar();
		listarMedicamentosModificar();
	});

document
	.getElementById("modifyMedicamentoForm")
	.addEventListener("submit", function (e) {
		e.preventDefault();
		const id = document.getElementById("selectMedicamentoModificar").value;
		const medicamento = encontrarPorId("medicamentos", id);
		if (medicamento) {
			medicamento.nombre = document.getElementById(
				"medicamentoNombreModificar"
			).value;
			medicamento.dosis = document.getElementById(
				"medicamentoDosisModificar"
			).value;
			medicamento.detalles = document.getElementById(
				"medicamentoDetallesModificar"
			).value;
			const medicamentos = obtenerDeLocalStorage("medicamentos");
			const indice = medicamentos.findIndex((m) => m.id === id);
			medicamentos[indice] = medicamento;
			guardarEnLocalStorage("medicamentos", medicamentos);
			alert("Medicamento modificado correctamente");
			listarMedicamentos();
			listarMedicamentosEliminar();
			listarMedicamentosModificar();
		} else {
			alert("Error: Medicamento no encontrado");
		}
	});

function listarMedicamentos() {
	const medicamentos = obtenerDeLocalStorage("medicamentos");
	const lista = document.getElementById("listaMedicamentos");
	lista.innerHTML = "";
	medicamentos.forEach((medicamento) => {
		const item = document.createElement("li");
		item.classList.add("list-group-item");
		item.textContent = `${medicamento.nombre} - ${medicamento.dosis}`;
		lista.appendChild(item);
	});
}

function listarMedicamentosEliminar() {
	const medicamentos = obtenerDeLocalStorage("medicamentos");
	const lista = document.getElementById("listaMedicamentosEliminar");
	lista.innerHTML = "";
	medicamentos.forEach((medicamento) => {
		const item = document.createElement("li");
		item.classList.add(
			"list-group-item",
			"d-flex",
			"justify-content-between",
			"align-items-center"
		);
		item.textContent = `${medicamento.nombre} - ${medicamento.dosis}`;
		const botonEliminar = document.createElement("button");
		botonEliminar.classList.add("btn", "btn-danger");
		botonEliminar.textContent = "Eliminar";
		botonEliminar.addEventListener("click", function () {
			eliminarDeLocalStorage("medicamentos", medicamento.id);
			alert("Medicamento eliminado correctamente");
			listarMedicamentosEliminar();
		});
		item.appendChild(botonEliminar);
		lista.appendChild(item);
	});
}

function listarMedicamentosModificar() {
	const medicamentos = obtenerDeLocalStorage("medicamentos");
	const select = document.getElementById("selectMedicamentoModificar");
	select.innerHTML = "";
	medicamentos.forEach((medicamento) => {
		const option = document.createElement("option");
		option.value = medicamento.id;
		option.textContent = `${medicamento.nombre}`;
		select.appendChild(option);
	});
}

// Inicialización de listas y formularios
document.addEventListener("DOMContentLoaded", function () {
	listarMedicamentos();
	listarMedicamentosEliminar();
	listarMedicamentosModificar();
});

// Funciones CRUD para Usuarios
document
	.getElementById("addUsuarioForm")
	.addEventListener("submit", function (e) {
		e.preventDefault();
		const usuario = {
			id: generarId(),
			email: document.getElementById("usuarioEmail").value,
			password: document.getElementById("usuarioPassword").value,
			rol: document.getElementById("usuarioRol").value,
		};
		const usuarios = obtenerDeLocalStorage("usuarios");
		usuarios.push(usuario);
		guardarEnLocalStorage("usuarios", usuarios);
		alert("Usuario añadido correctamente");
		listarUsuariosEliminar();
	});

function listarUsuariosEliminar() {
	const usuarios = obtenerDeLocalStorage("usuarios");
	const lista = document.getElementById("listaUsuariosEliminar");
	lista.innerHTML = "";
	usuarios.forEach((usuario) => {
		const item = document.createElement("li");
		item.classList.add(
			"list-group-item",
			"d-flex",
			"justify-content-between",
			"align-items-center"
		);
		item.textContent = `${usuario.email} - ${usuario.rol}`;
		const botonEliminar = document.createElement("button");
		botonEliminar.classList.add("btn", "btn-danger");
		botonEliminar.textContent = "Eliminar";
		botonEliminar.addEventListener("click", function () {
			eliminarDeLocalStorage("usuarios", usuario.id);
			alert("Usuario eliminado correctamente");
			listarUsuariosEliminar();
		});
		item.appendChild(botonEliminar);
		lista.appendChild(item);
	});
}

// Inicialización de listas y formularios
document.addEventListener("DOMContentLoaded", function () {
	listarUsuariosEliminar();
});
