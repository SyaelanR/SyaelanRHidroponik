"use client"

type DataSensors = {
    TDS: number;
    pH: number;
    Temp: number;
    Wheather: boolean;
    timeStamp: string;
  };

export async function LiveSensors() {
    // Fungsi ini tidak lagi relevan digunakan karena pengambilan data realtime 
    // sebaiknya di-handle langsung pada komponen UI menggunakan Custom Hook (useDataSensors)
    return null;
}