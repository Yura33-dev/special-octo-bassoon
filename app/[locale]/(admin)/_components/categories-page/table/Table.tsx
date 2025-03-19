interface ITableProps {
  children: React.ReactNode;
}

export default function Table({ children }: ITableProps) {
  return (
    <ul className='rounded-md flex flex-col gap-4' role='table'>
      {children}
    </ul>
  );
}
