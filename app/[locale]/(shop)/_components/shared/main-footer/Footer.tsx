import { getAllCategories, getAllSettings } from '@/lib/api';

import FooterClient from './FooterClient';

export default async function Footer() {
  const [settings, categories] = await Promise.all([
    getAllSettings(),
    getAllCategories({
      visible: true,
      main: true,
    }),
  ]);

  return <FooterClient settings={settings} categories={categories} />;
}
