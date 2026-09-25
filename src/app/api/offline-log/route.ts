import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

export const dynamic = 'force-dynamic'; // Prevent caching so we always get the latest log

export async function GET() {
  try {
    const lastLog = await prisma.offline_log.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(
      { success: true, data: lastLog },
      { status: 200 }
    );
  } catch (error) {
    console.error('Gagal mengambil log offline:', error);
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { timeStamp } = body;

    if (!timeStamp) {
      return NextResponse.json(
        { success: false, message: 'Timestamp tidak ditemukan' },
        { status: 400 }
      );
    }

    // Simpan ke tabel offline_log
    await prisma.offline_log.create({
      data: {
        lastOnline: timeStamp,
      },
    });

    return NextResponse.json(
      { success: true, message: 'Log offline berhasil disimpan' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Gagal menyimpan log offline:', error);
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan pada server', error },
      { status: 500 }
    );
  }
}
