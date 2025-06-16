'use server';

import { ORDERS_FETCH_FAILED } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { calculatePaginationData, mapOrder } from '@/lib/utils';
import { Order } from '@/models';
import { IOrderPopulated } from '@/types';

export async function getAllOrders(
  page: number,
  limit: number,
  filter: Record<string, string> | object = {}
) {
  try {
    await dbConnect();

    const skip = (page - 1) * limit;

    const parsedFilter = Object.fromEntries(
      Object.entries(filter).filter(
        ([key]) => key !== 'limit' && key !== 'page'
      )
    );

    const query: Record<string, string> = parsedFilter;

    const [filteredOrdersCount, orders, totalOrdersCount] = await Promise.all([
      Order.countDocuments(query),
      Order.find(query)
        .sort({ createdAt: -1, _id: -1 })
        .skip(skip)
        .limit(limit)
        .populate({
          path: 'products.productId',
          populate: {
            path: 'producer',
          },
        })
        .populate('products.packId')
        .lean<Array<IOrderPopulated>>()
        .exec(),
      Order.countDocuments(),
    ]);

    const paginationData = calculatePaginationData(
      filteredOrdersCount,
      limit,
      page
    );

    const mappedOrders = orders
      .map(order => mapOrder(order))
      .toSorted((a, b) => {
        if (!a.createdAt) return 1;
        if (!b.createdAt) return -1;
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

    return {
      orders: mappedOrders,
      paginationData,
      totalProducts: totalOrdersCount,
    };
  } catch (error) {
    console.error(`Error: ${ORDERS_FETCH_FAILED}. ${error}`);
    return {
      orders: [],
      paginationData: {
        page: 0,
        perPage: 0,
        totalItems: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  }
}
