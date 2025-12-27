export const formattedPrice = (price: number, withCurrency = true) => {
  return withCurrency
    ? (price / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') +
        ' ' +
        'грн'
    : (price / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export const formattedDiscount = (oldPrice: number, newPrice: number) => {
  return (((oldPrice - newPrice) / oldPrice) * 100).toFixed(0) + '%';
};
