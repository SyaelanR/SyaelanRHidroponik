import React from 'react';
import { getRecords } from './actions';
import { DataRecordTable } from './data-record-table';

export const dynamic = 'force-dynamic';

export default async function DataRecord() {
    const initialRecords = await getRecords({ page: 0 });

    return(
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
        <main className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                Riwayat Data Sensor
              </h1>
              <p className="text-slate-500 mt-1 text-sm">
                Rekaman historis nilai nutrisi, pH, dan suhu sistem hidroponik.
              </p>
            </div>
            <DataRecordTable initialRecords={initialRecords} />
          </div>
        </main>
    </div>);
}