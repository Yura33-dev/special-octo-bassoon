export const formattedPackValue = (
  type: string,
  value: number,
  measureIn: string
) => {
  return `${type} ${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} ${measureIn} `;
};
