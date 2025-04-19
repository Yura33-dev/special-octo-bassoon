import { getAllCategories, getAllSettings } from '@/lib/api';

import MobileMenuClient from './MobileMenuClient';

export default async function MobileMenu() {
  const [categories, settings] = await Promise.all([
    getAllCategories({ main: true, visible: true }),
    getAllSettings(),
  ]);

  return <MobileMenuClient categories={categories} settings={settings} />;
}
