// function isNumeric(x) {
//     return parseFloat(x).toString() === x
// }

// function validateLoanDataOne(loan) {
//     const errors = [];

//         // Validate required fields
//       if (!loan.loan_number) errors.push(`Loan number is missing for loan ${loan.loan_number}`);

//       else if (parseInt(loan.loan_number).toString() !== loan.loan_number) {
//         errors.push(`Loan Number must be a number for loan ${loan.loan_number}`);
//     }
//       else if(!loan.escrow_amount)  errors.push(`Escrow Amount is missing for loan ${loan.loan_number}`);
//       else if (!loan.note_date) errors.push(`Note date is missing for loan ${loan.loan_number}`);
//       else if (!loan.note_rate) errors.push(`Note rate is missing for loan ${loan.loan_number}`);
//       else if (!loan.boarding_date) errors.push(`Boarding date is missing for loan ${loan.loan_number}`);
//       else if (!loan.upb_amount) errors.push(`UPB amount is missing for loan ${loan.loan_number}`);
//       else if (!loan.current_rate) errors.push(`Current rate is missing for loan ${loan.loan_number}`);
//       else if (!loan.name) errors.push(`Name is missing for loan ${loan.loan_number}`);

//         else if (!isNumeric(loan.note_rate)) {
//             errors.push(`Note rate must be a number for loan ${loan.loan_number}`);
//         }
//         else if (!isNumeric(loan.upb_amount)) {
//             errors.push(`UPB amount must be a number for loan ${loan.loan_number}`);
//         }
//         else if (!isNumeric(loan.current_rate)) {
//             errors.push(`Current rate must be a number for loan ${loan.loan_number}`);
//         }

//     return errors;
//   }

//   export default validateLoanDataOne;

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
    validateField("current_rate", "Current Interest Rate is missing.")
  return errors;
}

export default validateLoanDataOne;
