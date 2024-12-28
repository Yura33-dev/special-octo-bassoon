export const formattedPrice = (price: number, withCurrency = true) => {
  return withCurrency
    ? (price / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') +
        ' ' +
        'грн'
    : (price / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};
