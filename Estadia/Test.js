function testSetValue() {
  // Arrange
  const chave = 'Bernardo Francisco Almeida';
  const coluna = 'testColumn';
  const valor = 'testValue';
  
  // Act
  const result = setEstadiaComentarios(chave, valor);
  
  // Assert
  if (result) {
	Logger.log('testSetValue passed');
  } else {
	Logger.log('testSetValue failed');
  }
}
function tesGetValue() {
  // Arrange
  const chave = 'Bernardo Francisco Almeida';
  
  // Act
  const result = getEstdiaDisponibilidade(chave);
  
  // Assert
  if (isNaN(result)) {
	Logger.log('tesGetValue passed: ' + result);
  } else {
	Logger.log('tesGetValue failed');
  }
}