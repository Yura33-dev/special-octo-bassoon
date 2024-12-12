import Image from 'next/image';

export default function About() {
  return (
    <div className='flex flex-col gap-6 md:flex-row md:items-start md:gap-12 xl:gap-28 mt-8'>
      <div className='basis-full md:basis-1/2 md:max-w-[500px] overflow-hidden'>
        <Image
          src='/about.jpg'
          alt='cover'
          width={600}
          height={400}
          className='w-full h-full object-cover rounded-md max-h-[300px] md:max-h-max md:min-h-[360px]'
        />
      </div>
      <div className='basis-full md:basis-1/2 '>
        <p className='text-justify'>
          <strong> GRAUND-A </strong> - магазин, який пропонує широкий вибір
          засобів захисту рослин, регуляторів росту, добрив, а також насіння
          овочевих, технічних та кормових культур. Клієнтами нашого магазину є:
          великі агропідприємства, невеликі фермерські господарства, торгові
          компанії, інтернет магазини. Надаємо можливість інтернет магазинам
          працювати за моделлю дропшипінгу. Для постійних клієнтів розроблено
          систему знижок та акційних пропозицій. Залишайте заявку на нашому
          сайті, отримуйте консультацію фахівця та чекайте на ваше замовлення.
        </p>
        <br />
        <h3>
          Засій своє майбутнє з <strong> GRAUND-A! </strong>{' '}
        </h3>
        <br />
        <p className='text-justify'>
          Наші партнери: Сингента, Нунемс, Енза Заден, Бейо, Рійк Цваан, Клоз,
          Хазера, Сакура, Юксел, Спарк Сідс, Lidea, Pioneer, NS SEME, КМК Агро,
          Басф, Байер, Кортева, Нертус, Хімагромаркетинг, Укравіт, ПЕСТ.ЮЕЙ,
          Ранголі, АLFA Smart Agro, Дефенда, Новакем, Самміт Агро, Вітера,
          Долина.
        </p>
      </div>
    </div>
  );
}
