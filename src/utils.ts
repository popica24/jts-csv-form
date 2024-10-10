export function convertCurrencyToNumber(currencyString: string | undefined) {
    if (!currencyString) return 0;
    // Remove all non-numeric characters except the decimal separator
    const match = currencyString.match(/\d+/g);

    // Convert the cleaned string to a number
    return match ? parseInt(match.join(""), 10) : 0;
  }

export function convertPowerToNumber(pwr: string | undefined){
    if (!pwr) return 0;

    // Match the first occurrence of a number, which can include decimals (e.g., 3.48)
    const match = pwr.match(/[\d,.]+/);
  
    // Replace commas with periods to handle decimal format correctly, then convert to a float
    return match ? parseFloat(match[0].replace(',', '.')) : 0;
}