import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';
import { env } from 'process';


// Fungsi POST ini hanya akan tereksekusi ketika ESP32 melakukan HTTP POST ke URL ini
export async function POST(request: Request) {
  try {
    // 1. Ambil data JSON yang dikirim oleh ESP32
    const body = await request.json();
    const { TDS, Temp, pH, Wheather, timeStamp, apikey } = body;

    // 2. Validasi API Key
    if (String(apikey) !== process.env.API_KEY) {
      return NextResponse.json(
        { success: false, message: 'Invalid API key' },
        { status: 401 }
      );
    }

    // 3. Validasi tipe data dan keberadaan field
    // Pastikan semua field yang dibutuhkan ada dan memiliki tipe data yang benar.
    if (typeof TDS != 'number' || typeof Temp != 'number' || typeof pH != 'number' || typeof Wheather != 'boolean' || typeof timeStamp != 'string') {
      console.log('Data tidak lengkap atau tipe salah:', body);
      return NextResponse.json(
        { success: false, message: 'Data tidak lengkap atau tipe data salah.' },
        { status: 400 }
      );
    }

      // 4. Simpan data ke database
      await prisma.sensors.create({
        data: {
          TDS: TDS,
          SuhuAir: Temp,
          pH: pH,
          Cuaca: Wheather,
          DateTime: timeStamp
        },
      });


    console.log('Data sensor berhasil disimpan pada:', new Date().toLocaleString());

    // 5. Beri respon sukses ke ESP32
    return NextResponse.json(
      { success: true, message: 'Data berhasil disimpan ke database' },
      { status: 201 }
    );

  } catch (error) {
    console.error('Gagal menyimpan data:', error);
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan pada server', error },
      { status: 500 }
    );
  }
}