function calcularSaldoContasCorrentesTest() {
	let nome = "Enzo Marcos Vinicius Ferreira";
	let estadia = dateToString("11/30/2025");
	let saldo = calcularSaldoContasCorrentes(nome, estadia);
	if (!saldo) {
		throw new Error(`calcularSaldoContasCorrentesTest Teste falhou: Nenhum saldo retornado para ${nome} em ${estadia}.`);
	}
	let expectedSaldo = { ganho: { real: 10.00, ouro: 0.00 }, futuro: { real: 0.00, ouro: 0 } };
	if (saldo.ganho.real !== expectedSaldo.ganho.real && saldo.ganho.ouro !== expectedSaldo.ganho.ouro &&
	    saldo.futuro.real !== expectedSaldo.futuro.real && saldo.futuro.ouro !== expectedSaldo.futuro.ouro	) {
		throw new Error(`calcularSaldoContasCorrentesTest Teste falhou: Saldo incorreto para ${nome} em ${estadia}. Esperado: { Real: ${expectedSaldo.ganho.real}, Ouro: ${expectedSaldo.ganho.ouro} }, Obtido: { Real: ${saldo.ganho.real}, Ouro: ${saldo.ganho.ouro} }`);
	}
	Logger.log("calcularSaldoContasCorrentesTest passes")
}