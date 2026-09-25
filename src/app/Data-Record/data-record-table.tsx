"use client";

import React, { useState, useTransition } from 'react';
import { TableDataRecord, type SensorRecord } from './components';
import { getRecords } from './actions';

const PAGE_SIZE = 10;

export function DataRecordTable({ initialRecords }: { initialRecords: SensorRecord[] }) {
    const [records, setRecords] = useState<SensorRecord[]>(initialRecords);
    const [page, setPage] = useState(1); // Halaman 0 sudah dimuat, halaman berikutnya adalah 1
    const [hasMore, setHasMore] = useState(initialRecords.length === PAGE_SIZE);
    const [isPending, startTransition] = useTransition();

    const loadMoreRecords = () => {
        startTransition(async () => {
            const newRecords = await getRecords({ page });
            if (newRecords.length > 0) {
                setRecords(prev => [...prev, ...newRecords]);
                setPage(prev => prev + 1);
            }
            if (newRecords.length < PAGE_SIZE) {
                setHasMore(false);
            }
        });
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="p-4 font-semibold text-slate-600 text-sm">Waktu</th>
                            <th className="p-4 font-semibold text-slate-600 text-sm">TDS (PPM)</th>
                            <th className="p-4 font-semibold text-slate-600 text-sm">pH Air</th>
                            <th className="p-4 font-semibold text-slate-600 text-sm">Suhu (°C)</th>
                            <th className="p-4 font-semibold text-slate-600 text-sm">Status Hujan</th>
                        </tr>
                    </thead>
                    <TableDataRecord records={records} />
                </table>
            </div>
            {hasMore && (
                <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-center">
                    <button
                        onClick={loadMoreRecords}
                        disabled={isPending}
                        className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPending ? 'Memuat...' : 'Muat Lebih Banyak Data'}
                    </button>
                </div>
            )}
        </div>
    );
}