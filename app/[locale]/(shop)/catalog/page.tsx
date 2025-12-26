import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Container from '@/components/shared/Container';
import { getAllCategories, getPageDataByName } from '@/lib/api';
import { config } from '@/lib/config';
import { locale } from '@/types';

import BreadCrumbsWrapper from '../_components/shared/breadcrumbs/BreadCrumbsWrapper';
import CatalogGrid from '../_components/shared/catalogGrid/CatalogGrid';

export async function generateMetadata({
  params,
}: ICatalogPageProps): Promise<Metadata> {
  const catalogPageData = await getPageDataByName('CatalogPage');

  if (!catalogPageData) {
    return {
      title: 'ProGround | Купити насіння та засоби захисту рослин з доставкою',
      other: {
        title: 'Купити насіння оптом та в роздріб з доставкою по всій Україні',
        description:
          'Купити насіння та засоби захисту рослин з доставкою по Україні. Інтернет магазин продажу насіння та ЗЗР.✔️Гарантія якості ✔️Вигідні ціни ✔️Швидка доставка',
      },
    };
  }

  const currentUrl = `${config.NEXT_PUBLIC_APP_URL}/${params.locale}/catalog/`;

  return {
    title: catalogPageData.translatedData[params.locale].meta.title,
    metadataBase: new URL(config.NEXT_PUBLIC_APP_URL),

    alternates: {
      canonical: currentUrl,
      languages: {
        uk: `${config.NEXT_PUBLIC_APP_URL}/uk/catalog`,
        ru: `${config.NEXT_PUBLIC_APP_URL}/ru/catalog`,
        'x-default': `${config.NEXT_PUBLIC_APP_URL}/uk/catalog`,
      },
    },

    other: {
      title:
        catalogPageData.translatedData[params.locale].meta.title ??
        'Купити насіння оптом та в роздріб з доставкою по всій Україні',
      description:
        catalogPageData.translatedData[params.locale].meta.description ??
        'Купити насіння з доставкою по Україні. Інтернет магазин продажу насіння.✔️Гарантія якості ✔️Вигідні ціни ✔️Швидка доставка',
      keywords:
        catalogPageData.translatedData[params.locale].meta.keywords ?? '',
    },

    openGraph: {
      title:
        catalogPageData.translatedData[params.locale].meta.title ??
        'Купити насіння оптом та в роздріб з доставкою по всій Україні',
      description:
        catalogPageData.translatedData[params.locale].meta.description ??
        'Купити насіння з доставкою по Україні. Інтернет магазин продажу насіння.✔️Гарантія якості ✔️Вигідні ціни ✔️Швидка доставка',
      type: 'website',
      url: currentUrl,
      images: [
        {
          url:
            catalogPageData.translatedData[params.locale].meta.image ??
            `${config.NEXT_PUBLIC_APP_URL}/no-image.webp`,
          width: 1200,
          height: 630,
          alt: catalogPageData.translatedData[params.locale].h1,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title:
        catalogPageData.translatedData[params.locale].meta.title ??
        'Купити насіння оптом та в роздріб з доставкою по всій Україні',
      description:
        catalogPageData.translatedData[params.locale].meta.description ??
        'Купити насіння з доставкою по Україні. Інтернет магазин продажу насіння.✔️Гарантія якості ✔️Вигідні ціни ✔️Швидка доставка',
      images: [
        catalogPageData.translatedData[params.locale].meta.image ??
          `${config.NEXT_PUBLIC_APP_URL}/no-image.webp`,
      ],
    },
  };
}

interface ICatalogPageProps {
  params: {
    locale: locale;
  };
}

export default async function CatalogPage({ params }: ICatalogPageProps) {
  const catalogPageData = await getPageDataByName('CatalogPage');

  const categories = await getAllCategories({
    visible: true,
    main: true,
  });

  if (!catalogPageData || !categories) {
    notFound();
  }

  return (
    <BreadCrumbsWrapper
      breadcrumbLinks={['', 'catalog']}
      breadcrumbTitles={
        catalogPageData.translatedData[params.locale].breadcrumbTitles
      }
    >
      <section>
        <Container>
          <h1 className='text-center text-xl md:text-2xl mb-6 md:mb-8'>
            {catalogPageData.translatedData[params.locale].h1}
          </h1>

          <CatalogGrid categories={categories} locale={params.locale} />
        </Container>
      </section>

      {/* TODO: transfer text to DB */}
      {params.locale === 'uk' && (
        <section className='mt-12'>
          <Container>
            <h2 className='text-xl mb-4'>
              Каталог інтернет-магазину ProGround: усе для ефективного
              рослинництва
            </h2>
            <p>
              Інтернет-магазин ProGround пропонує професійний вибір продукції
              для овочівництва, аграрного виробництва та приватного городництва.
              Наш каталог охоплює насіння, добрива, засоби захисту рослин,
              вологоміри та супутню продукцію. Всі товари доступні з доставкою
              по Україні, в оптовому та роздрібному форматі.
            </p>
            <br />
            <h3 className='text-lg font-bold'>
              Насіння овочів для високих врожаїв
            </h3>
            <p className='mb-4'>
              ProGround пропонує насіння понад 20 культур, включаючи популярні
              та рідкісні овочі: буряк, баклажан, морква, томат, огірок, перець,
              кабачок та інші. Усі сорти проходять перевірку на схожість,
              сортову чистоту та пристосованість до умов України. Особливо
              популярні серед агрофірм:{' '}
            </p>
            <ul>
              <li> - Гібриди томатів для відкритого ґрунту та теплиць</li>
              <li> - Солодка кукурудза з підвищеною врожайністю</li>
              <li> - Морква та буряк для довготривалого зберігання</li>
            </ul>
            <p className='mt-4'>
              Наш каталог оновлюється щосезону, і ви завжди знайдете актуальні
              пропозиції для посіву.
            </p>
            {/*  */}
            <h3 className='text-lg font-bold mt-6'>
              Польові та кормові культури: рішення для агробізнесу
            </h3>
            <p className='mb-4'>
              Для аграріїв доступний широкий асортимент насіння кукурудзи,
              соняшнику та кормових трав. Усі позиції — від надійних виробників
              з адаптацією до українських ґрунтів і кліматичних зон. Такі
              культури вирізняються:
            </p>
            <ul>
              <li> - Стійкістю до посухи та хвороб</li>
              <li> - Підвищеною врожайністю при мінімальних затратах</li>
              <li>
                {' '}
                - Універсальністю застосування в годівлі тварин або переробці
              </li>
            </ul>
            <p className='mt-4'>
              ProGround забезпечує оптові поставки з гарантією якості та
              агрономічну підтримку для агропідприємств.
            </p>
            {/*  */}
            <h3 className='text-lg font-bold mt-6'>
              Зелені та пряні культури: свіжа зелень - це легко
            </h3>
            <p className='mb-4'>
              Ми пропонуємо насіння кропу, рукола, селери, шпинату, петрушки,
              базиліку, мангольду, коріандру та інших зелених культур. Вони
              мають швидкий термін дозрівання, дають врожаї навіть на обмежених
              площах і користуються попитом у ресторанах та на ринках.
              <br />
              Ви можете вирощувати зелень: У відкритому ґрунті, парниках,
              теплицях У контейнерах та навіть на підвіконні.
            </p>
            <p className='mt-4'>
              ProGround допоможе підібрати сорти з високою схожістю та хорошою
              транспортабельністю.
            </p>
            {/*  */}
            <h3 className='text-lg font-bold mt-6'>
              Засоби захисту рослин: контроль над шкідниками та хворобами
            </h3>
            <p className='mb-4'>
              Каталог включає фунгіциди, інсектициди, гербіциди, протруйники,
              прилипачі, десиканти та фуміганти. Ми ретельно відбираємо
              препарати, які працюють у польових умовах і забезпечують
              результат. Переваги:
            </p>
            <ul>
              <li> - Швидкий ефект та економне дозування </li>
              <li> - Безпечність для культур при дотриманні інструкцій </li>
              <li> - Сертифікати якості для кожного засобу</li>
            </ul>
            <p className='mt-4'>
              Наші консультанти допоможуть обрати комплексний захист залежно від
              фази росту та шкідників.
            </p>

            {/*  */}
            <h3 className='text-lg font-bold mt-6'>
              Добрива та стимулятори росту: поживна база для сильного старту
            </h3>
            <p className='mb-4'>
              Ми постачаємо продукцію, що активно використовується в
              агрохолдингах, тепличних господарствах і на малих ділянках.
              ProGround дбає про результат, тому в асортименті — лише перевірені
              бренди. У каталозі представлено:
            </p>
            <ul>
              <li> - Водорозчинні добрива для фертигації </li>
              <li> - Мікродобрива з цинком, бором, залізом</li>
              <li> - Регулятори росту та біостимулятори</li>
            </ul>
          </Container>
        </section>
      )}

      {/* ru */}
      {params.locale === 'ru' && (
        <section className='mt-12'>
          <Container>
            <h2 className='text-xl mb-4'>
              Каталог интернет-магазина ProGround: всё для аграрного успеха
            </h2>
            <p>
              Интернет-магазин ProGround предлагает комплексный каталог для
              сельского хозяйства и частного огородничества. Здесь вы найдёте
              качественные семена, средства защиты растений, удобрения,
              влагомеры и аксессуары. Мы поставляем продукцию как частным лицам,
              так и агропредприятиям по всей Украине.
            </p>
            <br />
            <h3 className='text-lg font-bold'>
              Семена овощей: от хобби до агропроизводства
            </h3>
            <p className='mb-4'>
              ProGround предлагает профессиональные сорта и гибриды овощей:
              томат, морковь, свёкла, баклажан, капуста, кабачок, лук, перец и
              другие. Все семена проходят проверку качества и подходят для
              открытого грунта, теплиц и контейнерного выращивания.
              Преимущества:
            </p>
            <ul>
              <li> - Широкий выбор культур и сроков вегетации</li>
              <li> - Высокая всхожесть и сортовая чистота</li>
              <li> - Наличие как розничных, так и оптовых упаковок</li>
            </ul>
            <p className='mt-4'>
              Каталог регулярно обновляется в зависимости от сезона и спроса.
            </p>
            {/*  */}
            <h3 className='text-lg font-bold mt-6'>
              Полевые и кормовые культуры: надёжные решения для бизнеса
            </h3>
            <p className='mb-4'>
              Мы предлагаем семена кукурузы, подсолнечника и кормовых трав,
              адаптированные к условиям украинского земледелия. Эти культуры
              незаменимы для фермерских хозяйств и животноводческих комплексов.
              Они обеспечивают:
            </p>
            <ul>
              <li> - Стабильную урожайность</li>
              <li> - Устойчивость к климатическим стрессам</li>
              <li> - Гибкость применения в силос, комбикорм или продажу</li>
            </ul>
            <p className='mt-4'>
              Наши консультанты с радостью помогут подобрать сорта и дадут
              рекомендации.
            </p>
            {/*  */}
            <h3 className='text-lg font-bold mt-6'>
              Зелень и пряные культуры: быстрое выращивание и сбыт
            </h3>
            <p className='mb-4'>
              Кроп, петрушка, рукола, шпинат, базилик, сельдерей и другие
              ароматные культуры активно выращиваются как в личных, так и в
              промышленных масштабах. Каталог содержит быстрорастущие и
              высокоурожайные сорта.
            </p>
            <p className='mt-4'>
              С ProGround вы получите зелень отличного качества и стабильный
              сбыт.
            </p>
            {/*  */}
            <h3 className='text-lg font-bold mt-6'>
              Средства защиты растений: контроль на всех этапах
            </h3>
            <p className='mb-4'>
              Фунгициды, инсектициды, гербициды, прилипатели, фумиганты,
              десиканты — все они представлены в каталоге. Подобранные с учётом
              климата, они показывают стабильные результаты при правильном
              применении. ProGround предлагает:
            </p>
            <ul>
              <li> - Сертифицированные препараты </li>
              <li> - Консультации по совместимости и дозировке </li>
              <li> - Варианты для всех типов культур</li>
            </ul>

            {/*  */}
            <h3 className='text-lg font-bold mt-6'>
              Удобрения и стимуляторы роста: питание под контроль
            </h3>
            <p className='mb-4'>
              Вы получаете готовые решения для любого сезона и цели: от
              активного роста до цветения и наливания плодов.У каталозі
              представлено:
            </p>
            <ul>
              <li> - Микроудобрения и комплексные смеси </li>
              <li> - Стимуляторы роста и антистрессовые препараты</li>
              <li> - Растворимые удобрения для фертигации</li>
            </ul>
          </Container>
        </section>
      )}
    </BreadCrumbsWrapper>
  );
}
