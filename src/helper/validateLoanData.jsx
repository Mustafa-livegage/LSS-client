// function isNumeric(x) {
//   return parseFloat(x).toString() === x;
// }

// function validateLoanData(loanData) {
//   loanData.forEach((loan) => {
//     const errors = [];

//     // Validate required fields
//     if (!loan.loan_number) {
//       alert(`Loan number is missing for loan ${loan.loan_number}`);
//     } else if (parseInt(loan.loan_number).toString() !== loan.loan_number) {
//       alert(`Loan Number must be a number! not "${loan.loan_number}"`);
//       return errors;
//     } else if (!loan.note_date) {
//       alert(`Note date is missing for loan ${loan.loan_number}`);
//       return errors;
//     } else if (!loan.note_rate) {
//       alert(`Note rate is missing for loan ${loan.loan_number}`);
//       return errors;
//     } else if (!loan.boarding_date) {
//       alert(`Boarding date is missing for loan ${loan.loan_number}`);
//       return errors;
//     } else if (!loan.upb_amount) {
//       alert(`UPB amount is missing for loan ${loan.loan_number}`);
//       return errors;
//     } else if (!loan.current_rate) {
//       alert(`Current rate is missing for loan ${loan.loan_number}`);
//       return errors;
//     } else if (!loan.pmt_due_date) {
//       alert(`PMT due date is missing for loan ${loan.loan_number}`);
//       return errors;
//     } else if (!loan.name) {
//       alert(`Name is missing for loan ${loan.loan_number}`);
//       return errors;
//     } else if (!isNumeric(loan.note_rate)) {
//       alert(`Note rate must be a number for loan ${loan.loan_number}`);
//       return errors;
//     }

//     // Datatype checking.
//     else if (!isNumeric(loan.upb_amount)) {
//       alert(`UPB amount must be a number for loan ${loan.loan_number}`);
//       return errors;
//     } else if (!isNumeric(loan.current_rate)) {
//       alert(`Current rate must be a number for loan ${loan.loan_number}`);
//       return errors;
//     }
//     return errors;
//   });

//   return [];
// }

// export default validateLoanData;

import { isNumeric } from "./path/to/isNumeric";

function validateLoanData(loanData) {
  const errors = [];

  loanData.forEach((loan) => {
    const validateField = (fieldName, errorMessage) => {
      if (!loan[fieldName]) {
        errors.push(`${errorMessage} for loan ${loan.loan_number}`);
      } else if (!isNumeric(loan[fieldName])) {
        errors.push(`Invalid ${fieldName} for loan ${loan.loan_number}`);
      }
    };
    validateField("loan_number", "Loan number is missing");
    validateField("note_date", "Note Date is missing");

    // Additional field validations...
  });

  return errors;
}

export default validateLoanData;
