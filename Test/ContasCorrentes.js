const obj = {};
obj.calculateCreditsAndDebts = (trasactions) => {
	const nomeCol = 0;
	const estadiaCol = 1;
	const transactionType = 2; // Diaria, Salario, Porcentagem, Cantina, PIX, Diversos
	const creditDebitCol = 3;
	const itemCol = 4;
	const precoUnidadeCol = 4;
	const qtdCol = 6;
	const moedaCol = 7;
	const realValorCol = 8;
	const OuroValorCol = 9;
	const comentarioCol = 10;
	var creditsAndDebtsRealOuro = {
		Credit: {
			Real: 0,
			Ouro: 0
		},
		Debit: {
			Real: 0,
			Ouro: 0
		},
	}
	if (trasactions.lenght == 0) {
		var message = "";
		message += "Nao ha nehuma trasacao a ser processada";
		return null;
	}

	for (i=0; i < trasactions.lenght; i++) {
		switch (trasactions[i][creditDebitCol]) {
			case "Credito":
				switch (trasactions[i][moedaCol]) {
						case "Real":
						creditsAndDebtsRealOuro["Credito"]["Real"] += trasactions[i][realValorCol];
						break;
					case "Ouro":
						creditsAndDebtsRealOuro["Credito"]["Ouro"] += trasactions[i][OuroValorCol];
						break;
					default:
						var message = "";
						message += "Valor do atributo Moeda invalido (";
						message += trasactions[i][moedaCol];
						message += ") na linha #"
						message += i;
						message += " na matrix de transacoes";
						return null;
						break;
				}
			case "Debito":
				switch (trasactions[i][moedaCol]) {
						case "Real":
						creditsAndDebtsRealOuro["Debito"]["Real"] += trasactions[i][realValorCol];
						break;
					case "Ouro":
						creditsAndDebtsRealOuro["Debito"]["Ouro"] += trasactions[i][OuroValorCol];
						break;
					default:
						var message = "";
						message += "Valor do atributo Moeda invalido (";
						message += trasactions[i][moedaCol];
						message += ") na linha #"
						message += i;
						message += " na matrix de transacoes";
						return null;
						break;
				}
			default:
				var message = "";
				message += "Valor do atributo Credito/Debito invalido (";
				message += trasactions[i][moedaCol];
				message += ") na linha #"
				message += i;
				message += " na matrix de transacoes"
				console.error(message)
				return null;
		}
	}
	return creditsAndDebtsRealOuro;
}

modedule.exports = obj;