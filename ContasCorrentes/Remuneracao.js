const remuneracaoId = "1vg3ba2eV6pJh_yfwGP-AQ0BjIY9A8Uf4UdupU_3sRIk";
const remuneracaoRange = "Dados!A:D";
const remuneracaoMetodoCol = 0;
const remuneracaoTarefaCol = 1;
const remuneracaoValorCol = 2; 
const remuneracaoComentárioCol = 3; 
const remuneracaoObj = buildRemuneracaoObj()

function buildRemuneracaoObj() {
  const remuneracaoIDSS = SpreadsheetApp.openById(remuneracaoId);
  const remuneracaoRng = remuneracaoIDSS.getRange(remuneracaoRange)
  const remuneracaoVals = remuneracaoRng.getValues();
  var metodo = "";
  var tarefa = "";
  var valor = "";
  var remuneracaoObj = {};
  remuneracaoVals.forEach (function (remuneracaoRegistro) {
    metodo = remuneracaoRegistro[remuneracaoMetodoCol]
    tarefa = remuneracaoRegistro[remuneracaoTarefaCol]
    valor = remuneracaoRegistro[remuneracaoValorCol]
    if (metodo != "" && metodo != "Metodo") {
      if (!(metodo in remuneracaoObj)) {
        remuneracaoObj[metodo] = {};
        var simplesObj = {};
        simplesObj[tarefa] = valor
        remuneracaoObj[metodo] = {};
        remuneracaoObj[metodo] = simplesObj
      }
      else {
        if (!(tarefa in remuneracaoObj[metodo]))   {
          // var simplesObj = {};
          // simplesObj[tarefa] = valor
          remuneracaoObj[metodo][tarefa]= valor
        } else {
          var message = ""
          message += "Remuneracao: " + method + "." + tarefa + " duplicados";
        } 
      }  
    }
  }) 
  
  // Logger.log(remuneracaoObj);
  return remuneracaoObj;
}

function obtenhaRemuneracao (metodo, tarefa) {
  var remuneracao;
  var simpleObj = remuneracaoObj[metodo];  
  remuneracao = simpleObj[tarefa];
  return remuneracao;
}
