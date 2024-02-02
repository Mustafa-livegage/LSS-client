export function isValidDate(dateString) {
    const formatRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!formatRegex.test(dateString) || dateString.length !== 10) {
      return false;
    }
  
    const [year, month, day] = dateString.split("-");
  
    if (month < 1 || month > 12 || day < 1 || day > 31) {
      return false;
    }
  
    return true; 
}
  