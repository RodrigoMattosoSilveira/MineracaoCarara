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
	let rendas = calcularRendas(nome, estadia)

  typeof rendas !== 'undefined' ? 
		console.info(" ✔︎ rendas definidas") :
		console.error(" ✖︎  rendas indefinidas definidas");  

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