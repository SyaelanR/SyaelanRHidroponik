"use server";

import prisma from '../lib/prisma';
import { SensorRecord } from './components';

const PAGE_SIZE = 10;

export async function getRecords(options: { page?: number } = {}): Promise<SensorRecord[]> {
  const { page = 0 } = options;
  try {
    const records = await prisma.sensors.findMany({
      orderBy: { id: 'desc' },
      take: PAGE_SIZE,
      skip: page * PAGE_SIZE,
    });
    
    // Konversi BigInt ke string agar aman untuk serialisasi JSON
    return records.map((record) => ({
      ...record,
      id: record.id.toString(),
      TDS: record.TDS !== null ? Number(record.TDS) : null,
      SuhuAir: record.SuhuAir ?? null,
      pH: record.pH ?? null,
      Cuaca: record.Cuaca ?? null,
      DateTime: record.DateTime ?? null,
    }));
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
}