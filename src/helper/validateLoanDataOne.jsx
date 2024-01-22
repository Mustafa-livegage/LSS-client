import { isNumeric } from "./isNumeric";

function validateLoanDataOne(loan) {
  const errors = [];

  const validateField = (fieldName, errorMessage) => {
    if (!loan[fieldName]) {
      if (fieldName === "loan_number") {
        errors.push(`${errorMessage} \nKindly Check your data.`);
      } else {
        errors.push(`${errorMessage} for Loan Number ${loan.loan_number}`);
      }
    } else if (!isNumeric(loan[fieldName])) {
      errors.push(`Invalid ${fieldName} for loan ${loan.loan_number}`);
    }
  };

  validateField("loan_number", "Loan number is missing");
  validateField("note_rate", "Note rate is missing");
  validateField("upb_amount", "upb Amount is missing");
  validateField("escrow_amount", "Escrow Amount is missing");
  validateField("current_rate", "Current Interest Rate is missing.");
  return errors;
}

export default validateLoanDataOne;
