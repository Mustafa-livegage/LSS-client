// function isNumeric(x) {
//     return parseFloat(x).toString() === x
// }


// function validateLoanDataOne(loanData) {
//     const errors = [];
  
//         // Validate required fields
//       if (!loan.loan_number) errors.push(`Loan number is missing for loan ${loan.loan_number}`);

//       if (parseInt(loan.loan_number).toString() !== loan.loan_number) {
//         errors.push(`Loan Number must be a number for loan ${loan.loan_number}`);
//     }

//       if (!loan.note_date) errors.push(`Note date is missing for loan ${loan.loan_number}`);
//       if (!loan.note_rate) errors.push(`Note rate is missing for loan ${loan.loan_number}`);
//       if (!loan.boarding_date) errors.push(`Boarding date is missing for loan ${loan.loan_number}`);
//       if (!loan.upb_amount) errors.push(`UPB amount is missing for loan ${loan.loan_number}`);
//       if (!loan.current_rate) errors.push(`Current rate is missing for loan ${loan.loan_number}`);
//       if (!loan.pmt_due_date) errors.push(`PMT due date is missing for loan ${loan.loan_number}`);
//       if (!loan.principal_intrest) errors.push(`Principal interest is missing for loan ${loan.loan_number}`);
//       if (!loan.tax_insurance) errors.push(`Tax insurance is missing for loan ${loan.loan_number}`);
//       if (!loan.pmt_amount) errors.push(`PMT amount is missing for loan ${loan.loan_number}`);
//       if (!loan.name) errors.push(`Name is missing for loan ${loan.loan_number}`);
  
//       // Validate date constraints
//       if (loan.note_date >= loan.boarding_date) {
//         errors.push(`Note date must be earlier than Loan Boarding Date for loan Number: ${loan.loan_number}`);
//       }
//       if (loan.note_date >= loan.pmt_due_date) {
//         errors.push(`Note date must be earlier than Next Payment Due Date for loan Number: ${loan.loan_number}`);
//       }

//       // Validate data types
        
//         if (!isNumeric(loan.note_rate)) {
//             errors.push(`Note rate must be a number for loan ${loan.loan_number}`);
//         }
//         if (!isNumeric(loan.upb_amount)) {
//             errors.push(`UPB amount must be a number for loan ${loan.loan_number}`);
//         }
//         if (!isNumeric(loan.current_rate)) {
//             errors.push(`Current rate must be a number for loan ${loan.loan_number}`);
//         }
//         if (!isNumeric(loan.principal_intrest)) {
//             errors.push(`Principal interest must be a number for loan ${loan.loan_number}`);
//         }
//         if (!isNumeric(loan.tax_insurance)) {
//             errors.push(`Tax insurance must be a number for loan ${loan.loan_number}`);
//         }
//         if (!isNumeric(loan.pmt_amount)) {
//             errors.push(`PMT amount must be a number for loan ${loan.loan_number}`);
//         }
  
//     return errors;
//   }
  
//   export default validateLoanDataOne;

function isNumeric(x) {
    return parseFloat(x).toString() === x;
  }
  
  function validateLoanData(loanData) {
    loanData.forEach((loan) => {
      const errors = [];
  
      // Validate required fields
      if (!loan.loan_number) {
        alert(`Loan number is missing for loan ${loan.loan_number}`);
      }
  
      else if (parseInt(loan.loan_number).toString() !== loan.loan_number) {
        alert(`Loan Number must be a number! "${loan.loan_number}"`);
        return errors;
      }
  
      else if (!loan.note_date) {
        alert(`Note date is missing for loan ${loan.loan_number}`);
        return errors;
      }
  
      else if (!loan.note_rate) {
        alert(`Note rate is missing for loan ${loan.loan_number}`);
        return errors;
      }

      else if (!loan.boarding_date) {
        alert(`Boarding date is missing for loan ${loan.loan_number}`);
        return errors;
      }
      
      else if (!loan.upb_amount) {
        alert(`UPB amount is missing for loan ${loan.loan_number}`);
        return errors;
      }
      
      else if (!loan.current_rate) {
        alert(`Current rate is missing for loan ${loan.loan_number}`);
        return errors;
      }
      
      else if (!loan.pmt_due_date) {
        alert(`PMT due date is missing for loan ${loan.loan_number}`);
        return errors;
      }
      
      else if (!loan.principle_intrest) {
        alert(`Principal interest is missing for loan ${loan.loan_number}`);
        return errors;
      }
      
      else if (!loan.tax_insurance) {
        alert(`Tax insurance is missing for loan ${loan.loan_number}`);
        return errors;
      }
      
      else if (!loan.pmt_amount) {
        alert(`PMT amount is missing for loan ${loan.loan_number}`);
        return errors;
      }
      
      else if (!loan.name) {
        alert(`Name is missing for loan ${loan.loan_number}`);
        return errors;
      }
  
      else if (!isNumeric(loan.note_rate)) {
        alert(`Note rate must be a number for loan ${loan.loan_number}`);
        return errors;
      }

      // Validate date constraints
    //   else if (loan.note_date >= loan.boarding_date) {
    //     alert(`Note date must be earlier than Loan Boarding Date for loan Number: ${loan.loan_number}`);
    //     return errors;
    //   }
  
    //   else if (loan.note_date >= loan.pmt_due_date) {
    //     alert(`Note date must be earlier than Next Payment Due Date for loan Number: ${loan.loan_number}`);
    //     return errors;
    //   }
  
      // Datatype checking.
      else if (!isNumeric(loan.upb_amount)) {
        alert(`UPB amount must be a number for loan ${loan.loan_number}`);
        return errors;
      }
      
      else if (!isNumeric(loan.current_rate)) {
        alert(`Current rate must be a number for loan ${loan.loan_number}`);
        return errors;
      }
      
      else if (!isNumeric(loan.principle_intrest)) {
        alert(`Principal interest must be a number for loan ${loan.loan_number}`);
        return errors;
      }
      
      else if (!isNumeric(loan.tax_insurance)) {
        alert(`Tax insurance must be a number for loan ${loan.loan_number}`);
        return errors;
      }
      
      else if (!isNumeric(loan.pmt_amount)) {
        alert(`PMT amount must be a number for loan ${loan.loan_number}`);
        return errors;
      }
      return errors;
    });
  
    return [];
  }
  
  export default validateLoanData;
  
  