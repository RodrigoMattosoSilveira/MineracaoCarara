const obterPeríodosTeste = () => {
	let periodos = obterPeríodos();
	let valid = periodos.length == 2;
	valid &= periodos.includes("Diurno")
	valid &= periodos.includes("Noturno"); 
	valid ? 
		console.info(" ✔︎ obterPeríodos") :
		console.info(" ✖︎  obterPeríodos")
}