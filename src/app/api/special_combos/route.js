// pages/api/most-frequently-bought.js
import { NextResponse } from 'next/server';
import { connectToDatabase, disconnectFromDatabase } from '@/app/lib/database';

export const GET = async () => {
  try {
    const client = await connectToDatabase();
    const db = client.db('sweetshop');
    const combos = await db.collection('special_combos').find().toArray()
    return NextResponse.json(combos);
  } catch (error) {
    console.error(error);
    return NextResponse.error(new Error('Failed to fetch data'));
  }
};