function testSetRegistro() {
  // Arrange
  const chave = 'Bernardo Francisco Almeida';
  const coluna = 'testColumn';
  const valor = 'testValue';
  
  // Act
  const result = setEstadiaComentarios(chave, valor);
  
  // Assert
  if (result) {
	Logger.log('setRegistro passed');
  } else {
	Logger.error('setRegistro failed');
  }
}