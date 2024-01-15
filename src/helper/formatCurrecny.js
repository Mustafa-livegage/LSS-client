export function formatCurrency(amount) {
    const amountString = String(amount);

    const [dollars, cents] = amountString.split(".");

    const formattedDollars = dollars.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    const formattedCurrency = cents
      ? `${formattedDollars}.${cents}`
      : formattedDollars;

    return formattedCurrency;
  }