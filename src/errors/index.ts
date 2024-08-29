function doubleReport() {
  return {
    code: 'DOUBLE_REPORT',
    description: 'Leitura do mês já realizada',
  };
}

function invalidData() {
  return {
    code: 'INVALID_DATA',
    description: 'Os dados fornecidos no corpo da requisição são inválidos',
  };
}

export default {
  doubleReport,
  invalidData,
};
