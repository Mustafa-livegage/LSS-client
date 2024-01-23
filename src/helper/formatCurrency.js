export function formatCurrency(amount) {
  const amountString = String(amount);

  const [dollars, cents] = amountString.split(".");

  const formattedDollars = dollars.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const formattedCents = cents ? `.${cents.slice(0, 2)}` : '';

  const formattedCurrency = `${formattedDollars}${formattedCents} USD`;

  return formattedCurrency;
}
