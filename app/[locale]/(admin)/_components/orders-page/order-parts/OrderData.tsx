import { deliveryType } from '../orderData';

interface IOrderDataProps {
  name: string;
  phone: string;
  email: string;
  deliveryTo: string;
  deliveryBy: string;
  postNumber: string | null;
  paymentType: string;
}

export default function OrderData({
  name,
  phone,
  email,
  deliveryTo,
  deliveryBy,
  postNumber,
  paymentType,
}: IOrderDataProps) {
  return (
    <div className='mt-4 px-4 grid grid-cols-2 '>
      <div>
        <h3 className='font-semibold'>Контактні дані</h3>

        <div className='flex gap-1 mt-2'>{name}</div>
        <div>{phone}</div>
        <div>{email}</div>
      </div>

      <div>
        <h3 className='font-semibold'>Доставка</h3>

        <div className='flex gap-1 mt-2'>
          <span>
            {deliveryTo}, {deliveryType[deliveryBy]}
          </span>
        </div>

        <div className='flex gap-1'>
          <span>Відділення:</span>
          <span>{postNumber}</span>
        </div>

        <div>Розрахунок: {paymentType}</div>
      </div>
    </div>
  );
}
