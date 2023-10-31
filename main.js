
const clients = [];

function addClient() {
	const firstName = prompt("Nombre: ");
	const lastName = prompt("Apellido: ");
	const IDNumber = prompt("DNI: ");
	const addressType = prompt("Tipo de domicilio (Residencial/Comercial): ");
	const KWConsumption = parseFloat(prompt("Consumo (KW): "));
	const debt = parseFloat(prompt("Deuda: "));

	const totalToPay = calcTotalToPay(addressType, KWConsumption, debt);

	const client = [firstName, lastName, IDNumber, addressType, KWConsumption, debt, totalToPay];
	clients.push(client);
}

function calcTotalToPay(addressType, KWConsumption, debt) {
	const KWCost = addressType.toLowerCase() === "residencial" ? 2.25 : 4.5;

	let discount = 0;
	if (addressType.toLowerCase() === "residencial") {
		if (KWConsumption > 7000) {
			discount = 0.15;
		} else if (KWConsumption > 5000) {
			discount = 0.10;
		}
	} else {
		if (KWConsumption > 7000) {
			discount = 0.15;
		} else if (KWConsumption > 5000) {
			discount = 0.10;
		}
	}

	const totalWithoutDiscount = KWConsumption * KWCost;
	const totalWithDiscount = totalWithoutDiscount - (totalWithoutDiscount * discount);

	const totalToPay = totalWithDiscount + debt;

	return totalToPay;
}

function searchClient(IDNumber) {
	return clients.find(client => client[2] === IDNumber);
}

function showClientsList(list) {
	let table = document.getElementById("table");
	let parsed = "<table><thead><tr><th>Nombre</th><th>Apellido</th><th>DNI</th><th>Tipo de Domicilio</th><th>Consumo de KW</th><th>Deuda</th><th>Monto a pagar</th></tr></thead><tbody>";
	list.forEach(client => {
		parsed += "<tr>";
		client.forEach(data => {
			parsed += "<td>" + data + "</td>";
		})
		parsed += "</tr>";
	})
	parsed += "</tbody></table>";
	table.innerHTML = parsed;
}

function sortClientsList() {
	const filteredClients = [...clients]
	return filteredClients.sort((a, b) => a[0].localeCompare(b[0]));
}

function deleteClient(IDNumber) {
	const clientIndex = clients.findIndex(client => client[2] === IDNumber);
	if (clientIndex !== -1) {
		clients.splice(clientIndex, 1);
		alert(`Cliente con DNI ${IDNumber} eliminado.`);
	} else {
		alert(`No se encontró ningún cliente con el DNI ${IDNumber}.`);
	}
}

function clientsWithDebt() {
	return clients.filter(client => client[5] > 0);
}

let addClientButton = document.getElementById("addClient");
let searchClientButton = document.getElementById("searchClient");
let sortClientsButton = document.getElementById("sortClients");
let deleteClientButton = document.getElementById("deleteClient");
let clientWithDebtButton = document.getElementById("clientsWithDebt");
let refreshButton = document.getElementById("refresh");

addClientButton.onclick = function() {
	addClient();
	showClientsList(clients);
}
searchClientButton.onclick = function() {
	const IDNumber = prompt("Ingrese el DNI del cliente a buscar: ");
	const client = searchClient(IDNumber);
	if (client) {
		const filteredClients = [client]
		showClientsList(filteredClients)
	} else {
		alert("Cliente no encontrado.");
	}
}
sortClientsButton.onclick = function() {
	showClientsList(sortClientsList());
}
deleteClientButton.onclick = function() {
	const IDNumberToDelete = prompt("Ingrese el DNI del cliente a eliminar: ");
	deleteClient(IDNumberToDelete);
	showClientsList(clients);
}
clientWithDebtButton.onclick = function() {
	const filteredClients = clientsWithDebt();
	if (!filteredClients.length) alert("No hay clientes deudores.");
	showClientsList(filteredClients);
}
refreshButton.onclick = function() {
	showClientsList(clients);
}
