// pages/api/most-frequently-bought.js
import { NextResponse } from 'next/server';
import { connectToDatabase, disconnectFromDatabase } from '@/app/lib/database';

export const GET = async (request, {params}) => {
  const product = params.item;
  try {
    const client = await connectToDatabase();
    const db = client.db('sweetshop');
    const mostFrequentlyBought = await db.collection(product).find().toArray()
    return NextResponse.json(mostFrequentlyBought);
  } catch (error) {
    console.error(error);
    return NextResponse.error(new Error('Failed to fetch data'));
  }
};
