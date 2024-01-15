function isNumeric(x) {
  return parseFloat(x).toString() === x;
}

function validateLoanData(loanData) {
  loanData.forEach((loan) => {
    const errors = [];

    // Validate required fields
    if (!loan.loan_number) {
      alert(`Loan number is missing for loan ${loan.loan_number}`);
    } else if (parseInt(loan.loan_number).toString() !== loan.loan_number) {
      alert(`Loan Number must be a number! not "${loan.loan_number}"`);
      return errors;
    } else if (!loan.note_date) {
      alert(`Note date is missing for loan ${loan.loan_number}`);
      return errors;
    } else if (!loan.note_rate) {
      alert(`Note rate is missing for loan ${loan.loan_number}`);
      return errors;
    } else if (!loan.boarding_date) {
      alert(`Boarding date is missing for loan ${loan.loan_number}`);
      return errors;
    } else if (!loan.upb_amount) {
      alert(`UPB amount is missing for loan ${loan.loan_number}`);
      return errors;
    } else if (!loan.current_rate) {
      alert(`Current rate is missing for loan ${loan.loan_number}`);
      return errors;
    } else if (!loan.pmt_due_date) {
      alert(`PMT due date is missing for loan ${loan.loan_number}`);
      return errors;
    } else if (!loan.principal_intrest) {
      alert(`Principal interest is missing for loan ${loan.loan_number}`);
      return errors;
    } else if (!loan.tax_insurance) {
      alert(`Tax insurance is missing for loan ${loan.loan_number}`);
      return errors;
    } else if (!loan.pmt_amount) {
      alert(`PMT amount is missing for loan ${loan.loan_number}`);
      return errors;
    } else if (!loan.name) {
      alert(`Name is missing for loan ${loan.loan_number}`);
      return errors;
    } else if (!isNumeric(loan.note_rate)) {
      alert(`Note rate must be a number for loan ${loan.loan_number}`);
      return errors;
    }

    // Datatype checking.
    else if (!isNumeric(loan.upb_amount)) {
      alert(`UPB amount must be a number for loan ${loan.loan_number}`);
      return errors;
    } else if (!isNumeric(loan.current_rate)) {
      alert(`Current rate must be a number for loan ${loan.loan_number}`);
      return errors;
    } else if (!isNumeric(loan.principal_intrest)) {
      alert(`Principal interest must be a number for loan ${loan.loan_number}`);
      return errors;
    } else if (!isNumeric(loan.tax_insurance)) {
      alert(`Tax insurance must be a number for loan ${loan.loan_number}`);
      return errors;
    } else if (!isNumeric(loan.pmt_amount)) {
      alert(`PMT amount must be a number for loan ${loan.loan_number}`);
      return errors;
    }
    return errors;
  });

  return [];
}

export default validateLoanData;
