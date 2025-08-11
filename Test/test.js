const main = require('ContasCorrentes.js');
const assert = require('asert');

const it = (desc, fn) => {
	try {
		fun();
		console.log('\x1b[32m%s\x1b[0m', `\u2714 ${desc}`);
	} catch  (error) {
		console.log('\n');
		console.log('\x1b[31m%s\x1b[0m', `\u2718 ${desc}`);
		console.error(error)	
	}
};

it ('should retrun the creditsAndDebtsRealOuro object properly initialized', () => {
	var creditsAndDebtsRealOuro = {}
	var nome = ""
	var estadia = new Date.today()
	var transacoes = [
		[]
	]
	var creditsAndDebtsRealOuro = ContasCorrentes.calculateCreditsAndDebts()
})