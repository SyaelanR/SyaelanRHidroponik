"use client"
import React from 'react';

export type SensorRecord = {
  id: string;
  TDS: number | null;
  SuhuAir: number | null;
  pH: number | null;
  Cuaca: boolean | null;
  DateTime: string | null;
};

// Fungsi bantuan untuk memformat tanggal, bisa dipindah ke file utils
// const formatDateTime = (dateTimeString: string | null) => {
//     if (!dateTimeString) return '-';
//     try {
//         const date = new Date(dateTimeString);
//         // Cek apakah tanggal valid
//         if (isNaN(date.getTime())) {
//             return dateTimeString; // atau return '-' jika string tidak valid sering terjadi
//         }
//         return date.toLocaleString('id-ID', {
//             dateStyle: 'medium',
//             timeStyle: 'short',
//         });
//     } catch (error) {
//         console.error("Error formatting date:", error);
//         return dateTimeString; // Fallback ke string asli jika ada error
//     }
// };

export function TableDataRecord({ records }: { records: SensorRecord[] }) {
    if (!records || records.length === 0) {
        return (
            <tbody className="divide-y divide-slate-100">
                <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500">
                        Tidak ada data riwayat untuk ditampilkan.
                    </td>
                </tr>
            </tbody>
        );
    }

    return (
        <tbody className="divide-y divide-slate-100">
        {records.map((record) => {
            return (
            <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 text-sm text-slate-700 whitespace-nowrap">
                {/* {formatDateTime(record.DateTime)} */}
                {record.DateTime ?? '-'}
                </td>
                <td className="p-4 text-sm font-medium text-blue-600">{record.TDS ?? '-'}</td>
                <td className="p-4 text-sm font-medium text-indigo-600">{record.pH ?? '-'}</td>
                <td className="p-4 text-sm font-medium text-orange-600">{record.SuhuAir ?? '-'}</td>
                <td className="p-4 text-sm text-slate-600">
                {record.Cuaca === null ? '-' : record.Cuaca ? <span className="text-cyan-600 bg-cyan-50 px-2 py-1 rounded text-xs font-semibold">Hujan</span> : 'Cerah'}
                </td>
            </tr>
            );
        })}
        </tbody>
    );
}