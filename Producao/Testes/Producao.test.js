if (typeof require !== 'undefined') {
	const Producao = require('../Producao')
	test('adds 1 + 2 to equal 3', () => {
  		expect(Informar.sum(1, 2)).toBe(3);
	});
	test('subtracts 5,4 to equal 1', () => {
  		expect(Informar.subtract(5, 4)).toBe(1);
	});
}