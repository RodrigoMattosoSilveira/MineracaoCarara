function calcularSaldoContasCorrentesTest() {
	let nome = "Enzo Marcos Vinicius Ferreira";
	let estadia = dateToString("11/30/2025");
	let saldo = calcularSaldoContasCorrentes(nome, estadia);
	if (!saldo) {
		throw new Error(`calcularSaldoContasCorrentesTest Teste falhou: Nenhum saldo retornado para ${nome} em ${estadia}.`);
	}
	let expectedSaldo = { Real: 10.00, Ouro: 0.00 };
	if (saldo.Real !== expectedSaldo.Real && saldo.Ouro !== expectedSaldo.Ouro) {
		throw new Error(`calcularSaldoContasCorrentesTest Teste falhou: Saldo incorreto para ${nome} em ${estadia}. Esperado: { Real: ${expectedSaldo.Real}, Ouro: ${expectedSaldo.Ouro} }, Obtido: { Real: ${saldo.Real}, Ouro: ${saldo.Ouro} }`);
	}
	Logger.log("calcularSaldoContasCorrentesTest passes")
}