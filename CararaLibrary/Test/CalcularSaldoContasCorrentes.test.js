function calcularSaldoContasCorrentesTest() {
	let nome = "Enzo Marcos Vinicius Ferreira";
	let estadia = dateToString("11/30/2025");
	let rendas = calcularSaldoContasCorrentes(nome, estadia);
	if (!rendas) {
		throw new Error(`calcularSaldoContasCorrentesTest Teste falhou: Nenhum saldo retornado para ${nome} em ${estadia}.`);
	}
	let expectedSaldo = { auferidas: { real: 10.00, ouro: 0.00 }, futuras: { real: 0.00, ouro: 0 } };
	if (rendas.auferidas.real !== expectedSaldo.auferidas.real && rendas.auferidas.ouro !== expectedSaldo.auferidas.ouro &&
	    rendas.futuras.real !== expectedSaldo.futuras.real && rendas.futuras.ouro !== expectedSaldo.futuras.ouro	) {
		throw new Error(`calcularSaldoContasCorrentesTest Teste falhou: Saldo incorreto para ${nome} em ${estadia}. Esperado: { Real: ${expectedSaldo.auferidas.real}, Ouro: ${expectedSaldo.auferidas.ouro} }, Obtido: { Real: ${rendas.auferidas.real}, Ouro: ${rendas.auferidas.ouro} }`);
	}
	Logger.log("calcularSaldoContasCorrentesTest passes")
}