function isNumeric(x) {
    return parseFloat(x).toString() === x
}

function validateLoanDataOne(loan) {
    const errors = [];
  
        // Validate required fields
      if (!loan.loan_number) errors.push(`Loan number is missing for loan ${loan.loan_number}`);

      else if (parseInt(loan.loan_number).toString() !== loan.loan_number) {
        errors.push(`Loan Number must be a number for loan ${loan.loan_number}`);
    }
      else if(!loan.escrow_amount)  errors.push(`Escrow Amount is missing for loan ${loan.loan_number}`);
      else if (!loan.note_date) errors.push(`Note date is missing for loan ${loan.loan_number}`);
      else if (!loan.note_rate) errors.push(`Note rate is missing for loan ${loan.loan_number}`);
      else if (!loan.boarding_date) errors.push(`Boarding date is missing for loan ${loan.loan_number}`);
      else if (!loan.upb_amount) errors.push(`UPB amount is missing for loan ${loan.loan_number}`);
      else if (!loan.current_rate) errors.push(`Current rate is missing for loan ${loan.loan_number}`);
      else if (!loan.name) errors.push(`Name is missing for loan ${loan.loan_number}`);
  
  
        
        else if (!isNumeric(loan.note_rate)) {
            errors.push(`Note rate must be a number for loan ${loan.loan_number}`);
        }
        else if (!isNumeric(loan.upb_amount)) {
            errors.push(`UPB amount must be a number for loan ${loan.loan_number}`);
        }
        else if (!isNumeric(loan.current_rate)) {
            errors.push(`Current rate must be a number for loan ${loan.loan_number}`);
        }
        
  
    return errors;
  }
  
  export default validateLoanDataOne;