import Container from '@/components/shared/Container';
import { Link } from '@/i18n/routing';

interface IBreadCrumbsProps {
  breadcrumbLinks: Array<string>;
  breadcrumbTitles: Array<string>;
}

export default function BreadCrumbs({
  breadcrumbLinks,
  breadcrumbTitles,
}: IBreadCrumbsProps) {
  return (
    <Container>
      <div className='breadcrumbs text-base'>
        <ul>
          {breadcrumbTitles.map((title, index) => {
            return (
              <li key={index}>
                {index === breadcrumbLinks.length - 1 ? (
                  <span>{title}</span>
                ) : (
                  <Link href={`/${breadcrumbLinks[index]}`}>{title}</Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </Container>
  );
}
