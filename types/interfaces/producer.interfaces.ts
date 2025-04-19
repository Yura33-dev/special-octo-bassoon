import { Document, ObjectId } from 'mongoose';

export interface IProducerApi extends Document {
  _id: ObjectId;
  translatedData: Map<string, { title: string }>;
  currency: string | null;
  exchangeRate: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProducerPopulated {
  _id: ObjectId;
  translatedData: Record<string, { title: string }>;
  currency: string | null;
  exchangeRate: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProducerMapped {
  id: string;
  translatedData: Record<string, { title: string }>;
  currency: string | null;
  exchangeRate: number | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface IProducerForm {
  translatedData: Record<string, { title: string }>;
  currency: string | null;
  exchangeRate: number | null;
}
