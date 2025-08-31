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
//  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
const obterPeriodosTeste = () => {
	let valid = true;
	let periodNames = ["Diurno", "Noturno"];

	let periodosMap = obterPeriodos();
	valid &= periodosMap.size == 2;

	valid &= periodosMap.has("Diurno");
	valid &= periodosMap.has("Noturno");

	valid &= periodosMap.get("Diurno")["ID"] == 1;
	valid &= 	valid &= periodosMap.get("Noturno")["ID"] == 2;

	valid ? 
		console.info(" ✔︎ obterPeriodos") :
		console.info(" ✖︎  obterPeriodos")
}