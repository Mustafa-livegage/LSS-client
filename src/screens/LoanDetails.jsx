// LoanDetails.js

import React from 'react';

const LoanDetails = ({ loan }) => {
  return (
    <div>
      <h5>Loan Details</h5>
      <p>Loan Number: {loan.loan_number}</p>
      <p>Borrower Name: {loan.name}</p>
      {/* Include other details as needed */}
    </div>
  );
};

export default LoanDetails;
