if (typeof require !== 'undefined') {
	const cl = require('../Code')
	test('the number 1 returns A', () => {
  		expect(cl.numeroParaLetra(1)).toBe('A');
	});
	test('the number 100 returns null', () => {
  		expect(cl.numeroParaLetra(100)).toBe(null);
	});
}