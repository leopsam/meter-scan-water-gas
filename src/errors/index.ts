function doubleReport(message: string) {
  return {
    code: 'DOUBLE_REPORT',
    description: message,
  };
}

function invalidData(message: string) {
  return {
    code: 'INVALID_DATA',
    description: message,
  };
}

function NotFound(message: string) {
  return {
    code: 'MEASURE_NOT_FOUND',
    description: message,
  };
}

function confirmationDuplicate(message: string) {
  return {
    code: 'CONFIRMATION_DUPLICATE',
    description: message,
  };
}

function invalidType(message: string) {
  return {
    code: 'INVALID_TYPE',
    description: message,
  };
}

export default {
  doubleReport,
  invalidData,
  NotFound,
  confirmationDuplicate,
  invalidType,
};
