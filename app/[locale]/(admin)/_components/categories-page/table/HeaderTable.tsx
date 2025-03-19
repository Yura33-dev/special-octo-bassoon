import clsx from 'clsx';

interface IHeaderTableProps {
  classNamePhotoCell?: string;
  classNameRegularCell?: string;
  classNameRow?: string;
  titles: Array<string>;
}

export default function HeaderTable({
  classNamePhotoCell,
  classNameRegularCell,
  classNameRow,
  titles,
}: IHeaderTableProps) {
  return (
    <li
      role='rowgroup'
      className={clsx(
        'font-medium border-b-[1px] border-gray-400 py-2 px-4 mb-4',
        classNameRow && classNameRow
      )}
    >
      <div role='row' className='flex gap-6'>
        <div
          role='columnheader'
          className={clsx(classNamePhotoCell && classNamePhotoCell)}
        ></div>
        {titles.map((title, index) => (
          <div
            key={index}
            role='columnheader'
            className={clsx(
              'flex-1',
              classNameRegularCell && classNameRegularCell
            )}
          >
            {title}
          </div>
        ))}
      </div>
    </li>
  );
}
