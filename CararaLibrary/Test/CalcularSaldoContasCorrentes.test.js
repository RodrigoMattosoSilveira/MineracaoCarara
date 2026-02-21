function calcularSaldoContasCorrentesTeste() {
	let expectedRendas = {
    auferidas: {
      Ouro: 0,
      Real: 0
    },
    futuras: {
      Ouro: 0,
      Real: 0
    }
  };
  
  let nome = "Severino Severino Iago Rocha";
	let estadia = dateToString("12/19/2025");
	let rendas = calcularSaldoContasCorrentes(nome, estadia)

  typeof rendas !== 'undefined' ? 
		console.info(" ✔︎ rendas definidas") :
		console.error(" ✖︎  rendas indefinidas definidas"); 
}
function calcularRendasTeste() {
	// let expectedRendas = {
	// auferidas: {
	// 	Ouro: 0,
	// 	Real: 0
	// },
	// futuras: {
	// 	Ouro: 0,
	// 	Real: 0
	// }
	// };
  
	let nome = "Cabecinha - Thomas Elias Felipe Fernandes";
	let estadia = dateToString("11/30/2025");
	let rendas = calcularRendas(nome, estadia)

	typeof rendas !== 'undefined' ? 
		console.info(" ✔︎ rendas definidas") :
		console.error(" ✖︎  rendas indefinidas definidas");  

	if (typeof rendas.auferidas !== 'undefined') {
		if (rendas['auferidas']['Real'] !== 1934.35) {
			console.error(` ✖︎  renda auferida Real incorreta. Esperado: 1,934.35, Obtido: ${rendas.auferidas.Real}`);
		} else {
			console.info(" ✔︎ renda auferida Real correta");
		}
		if (rendas.auferidas.Ouro !== 1.79663616) {
			console.error(` ✖︎  renda auferida Ouro incorreta. Esperado: 0, Obtido: ${rendas.auferidas.Ouro}`);
		} else {
			console.info(" ✔︎ renda auferida Ouro correta");	
		}
	}	
}
function calcularSaldoContasCorrentesTest1() {
	let nome = "Enzo Marcos Vinicius Ferreira";
	let estadia = dateToString("11/30/2025");
	let rendas = calcularSaldoContasCorrentes(nome, estadia);
	if (!rendas) {
		throw new Error(`calcularSaldoContasCorrentesTest Teste falhou: Nenhum saldo retornado para ${nome} em ${estadia}.`);
	}
	let expectedSaldo = { auferidas: { Real: 10.00, Ouro: 0.00 }, futuras: { Real: 0.00, Ouro: 0 } };
	if (rendas.auferidas.Real !== expectedSaldo.auferidas.Real && rendas.auferidas.Ouro !== expectedSaldo.auferidas.Ouro &&
	    rendas.futuras.Real !== expectedSaldo.futuras.Real && rendas.futuras.Ouro !== expectedSaldo.futuras.Ouro	) {
		throw new Error(`calcularSaldoContasCorrentesTest Teste falhou: Saldo incorreto para ${nome} em ${estadia}. Esperado: { Real: ${expectedSaldo.auferidas.Real}, Ouro: ${expectedSaldo.auferidas.Ouro} }, Obtido: { Real: ${rendas.auferidas.Real}, Ouro: ${rendas.auferidas.Ouro} }`);
	}
	Logger.log("calcularSaldoContasCorrentesTest passes")
}