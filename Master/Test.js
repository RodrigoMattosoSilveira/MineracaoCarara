//  Validate that we retrive the correct period names
const obterPeriodosNomesTeste = () => {
	let periodos = obterPeriodosNomes();
	let valid = periodos.length == 2;
	valid &= periodos[0].localeCompare("Diurno") == 0;
	valid &= periodos[1].localeCompare("Noturno") == 0; 
	valid ? 
		console.info(" ✔︎ obterPeríodosNomes") :
		console.info(" ✖︎  obterPeríodosNomes")
}

//  Validate that we retrive the correct period ids
const obterPeriodoIdsTeste = () => {
	let periodos = obterPeriodosIds();
	let valid = periodos.length == 2;
	valid &= periodos[0] == 1;
	valid &= periodos[1] == 2; 
	valid ? 
		console.info(" ✔︎ obterPeríodosNomes") :
		console.info(" ✖︎  obterPeríodosNomes")
}

//  Validate that we retrive the correct periods
const obterPeriodosTeste = () => {
	let periodos = {...obterPeriodos()};
	let objectKeys = Object.keys(periodos);
	let valid = objectKeys.length == 2;
	valid &= objectKeys[0].localeCompare("Diurno") == 0;
	valid &= periodos["Diurno"]["ID"] == 1;
	valid &= objectKeys[1].localeCompare("Noturno") == 0;
	valid &= periodos["Noturno"]["ID"] == 2;
	valid ? 
		console.info(" ✔︎ obterPeriodos") :
		console.info(" ✖︎  obterPeriodos")
}