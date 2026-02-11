const ObterNumeroDeDiasNesseMesTeste = () => {
  let numeroDeDiasNesseMes = ObterNumeroDeDiasNesseMes();
  let dataAtual = new Date();
  let anoAtual = dataAtual.getFullYear();
  let mesAtual = dataAtual.getMonth() + 1;
  let ultimoDiaDoMes = new Date(anoAtual, mesAtual, 0).getDate();
  let valido = numeroDeDiasNesseMes === ultimoDiaDoMes;		
  valido ?
	console.info(" ✔︎ ObterNumeroDeDiasNesseMesTeste") :
	console.error(" ✖︎  ObterNumeroDeDiasNesseMesTeste: " + numeroDeDiasNesseMes + " != " + ultimoDiaDoMes);
  return valido;
}