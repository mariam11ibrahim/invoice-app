export function validateInputs(inputsValidationData) {

    for (const key in inputsValidationData) {
      if (inputsValidationData[key] == false) return false;
    }
    return true;
  }