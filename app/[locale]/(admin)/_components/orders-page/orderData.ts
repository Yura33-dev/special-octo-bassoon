export const orderStatuses = {
  new: 'новий',
  processing: 'в обробці',
  delivery: 'доставляється',
  done: 'успішний',
  canceled: 'відміненний',
};

export const deliveryType: Record<string, string> = {
  np: 'Нова пошта',
  ukr: 'Укр.пошта',
};

export const paymentType: Record<string, string> = {
  bank: 'банківський переказ',
  afterpayment: 'післяплата',
};
