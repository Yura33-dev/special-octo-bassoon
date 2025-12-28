/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from 'mongoose';

export type locale = 'uk' | 'ru';

export interface queryType {
  [key: string]:
    | string
    | boolean
    | Types.ObjectId
    | { $in: Types.ObjectId[] | string[] }
    | { $elemMatch: Record<string, any> }
    | { $gt?: number; $gte?: number; $lt?: number; $lte?: number; $ne?: any }
    | { $and?: Array<Record<string, any>> }
    | { $or?: Array<Record<string, any>> }
    | Array<Record<string, unknown> | null>
    | undefined;
}
