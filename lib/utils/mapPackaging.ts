import {
  IPackagingMapped,
  IPackagingPopulated,
  IProductPackVariantsMapped,
  IProductPackVariantsPopulated,
} from '@/types';

export function mapPackaging(packaging: IPackagingPopulated): IPackagingMapped {
  return {
    id: packaging._id.toString(),
    translatedData: packaging.translatedData,
    showPricePerUnit: packaging.showPricePerUnit,
    updatedAt: packaging.updatedAt
      ? new Date(packaging.updatedAt).toISOString()
      : null,
    createdAt: packaging.createdAt
      ? new Date(packaging.createdAt).toISOString()
      : null,
  };
}

export function mapPackagingInProduct(
  packaging: IProductPackVariantsPopulated
): IProductPackVariantsMapped {
  return {
    default: {
      id: packaging.default._id.toString(),
      translatedData: packaging.default.translatedData,
      showPricePerUnit: packaging.default.showPricePerUnit,
      updatedAt: packaging.default.updatedAt
        ? new Date(packaging.default.updatedAt).toISOString()
        : null,
      createdAt: packaging.default.createdAt
        ? new Date(packaging.default.createdAt).toISOString()
        : null,
    },
    items: packaging.items.map(packItem => ({
      packId: {
        id: packItem.packId._id.toString(),
        translatedData: packItem.packId.translatedData,
        showPricePerUnit: packItem.packId.showPricePerUnit,
        updatedAt: packItem.packId.updatedAt
          ? new Date(packItem.packId.updatedAt).toISOString()
          : null,
        createdAt: packItem.packId.createdAt
          ? new Date(packItem.packId.createdAt).toISOString()
          : null,
      },
      quantity: packItem.quantity,
      price: packItem.price,
      oldPrice: packItem.oldPrice,
      inStock: packItem.inStock,
    })),
  };
}
