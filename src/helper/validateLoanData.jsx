import { isNumeric } from "./isNumeric";
import { isValidDate } from "./isValidDate";

function validateLoanData(loanData) {
  const errors = [];

  loanData.forEach((loan) => {
    const validateField = (fieldName, errorMessage) => {
      if (!loan[fieldName]) { //Missing fields check
        if (fieldName === "loan_number") {
          errors.push(`${errorMessage} \nKindly Check your data.`); 
        } else {
          errors.push(`${errorMessage} for Loan Number ${loan.loan_number}`);
        }
      } else if (fieldName.includes("date")) {  //Checks on Date.
        const dateString = loan[fieldName];
        if (!isValidDate(dateString)) { 
          errors.push(`Invalid ${fieldName} for Loan Number ${loan.loan_number}`);
        }
      } else if (!isNumeric(loan[fieldName])) { // Checks on Datatype.
        errors.push(`Invalid ${fieldName} for Loan Number ${loan.loan_number}`);
      }
    };
    // Date checking is required.
    validateField("loan_number", "Loan number is missing");
    validateField("note_rate", "Note rate is missing");
    validateField("upb_amount", "upb Amount is missing");
    validateField("escrow_amount", "Escrow Amount is missing");
    validateField("current_rate", "Current Interest Rate is missing")
    validateField("note_date", "Note Date is missing")
    validateField("boarding_date", "Loan Barding Date is missing")
    validateField("pmt_due_date", "Next Payment Due Date is missing")
  });

  return errors;
}

export default validateLoanData;
