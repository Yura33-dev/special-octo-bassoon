interface IOrderDataProps {
  name: string;
  phone: string;
  email: string;
  surname: string | null;
  fatherName: string | null;
  deliveryTo: string;
  deliveryType: string;
  deliveryBy: string;
  postNumber: string | null;
  postCode: string | null;
  paymentType: string;
}

export default function OrderData({
  name,
  phone,
  email,
  surname,
  fatherName,
  deliveryTo,
  deliveryType,
  deliveryBy,
  postNumber,
  postCode,
  paymentType,
}: IOrderDataProps) {
  return (
    <div className='mt-4 px-4 grid grid-cols-2 '>
      <div>
        <h3 className='font-semibold'>Контактні дані</h3>

        <div className='flex gap-1 mt-2'>
          {surname && <span>{surname}</span>}
          <span>{name}</span>
          {fatherName && <span>{fatherName}</span>}
        </div>

        <div>{phone}</div>
        <div>{email}</div>
      </div>

      <div>
        <h3 className='font-semibold'>Доставка</h3>

        <div className='flex gap-1 mt-2'>
          <span>
            {deliveryTo}, {deliveryType}
          </span>
        </div>

        <div className='flex gap-1'>
          <span>
            {deliveryBy === 'np' ? 'Відділення:' : 'Поштовий індекс:'}
          </span>
          <span>{deliveryBy === 'np' ? postNumber : postCode}</span>
        </div>

        <div>Розрахунок: {paymentType}</div>
      </div>
    </div>
  );
}
