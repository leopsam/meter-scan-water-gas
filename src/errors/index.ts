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

function NotFound() {
  return {
    code: 'MEASURE_NOT_FOUND',
    description: 'Leitura não encontrada',
  };
}

function confirmationDuplicate() {
  return {
    code: 'CONFIRMATION_DUPLICATE',
    description: 'Leitura do mês já realizada',
  };
}

export default {
  doubleReport,
  invalidData,
  NotFound,
  confirmationDuplicate,
};
