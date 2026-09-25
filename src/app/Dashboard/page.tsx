import { LastUpdate, RealtimeSensors, SensorCuaca, SystemStatusHeader, ValveSistem } from './components';
import {
  Clock,
  Settings
} from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* MAIN CONTENT AREA */}
      <main className="p-4 md:p-8">
        {/* TAMPILAN DASHBOARD */}
        <div className="animate-in fade-in duration-500">
          {/* Header Dashboard */}
          <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                Monitoring Nutrisi Hidroponik
              </h1>
              <SystemStatusHeader />
            </div>

            <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
              <Clock className="w-5 h-5 text-slate-400" />
              <div className="text-sm">
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Pembaruan Terakhir</p>
                <LastUpdate />
              </div>
            </div>
          </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <RealtimeSensors />
            <SensorCuaca />
          </div>

          <div className="space-y-6">

                <ValveSistem />

                <div className="bg-slate-800 rounded-2xl p-6 shadow-sm text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <Settings className="w-5 h-5 text-slate-400" />
                    <h3 className="font-semibold text-slate-100">Logik Sistem Otomatis</h3>
                  </div>
                  <ul className="space-y-3 text-sm text-slate-300">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5"></div>
                      <span>Jika TDS &lt; 600, pompa nutrisi AB Mix akan menyala perlahan.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5"></div>
                      <span>Jika pH &gt; 6.5, pompa pH down akan diteteskan.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5"></div>
                      <span>Valve otomatis tertutup saat hujan lebat.</span>
                    </li>
                  </ul>
                </div>
              </div>
          </div>
        </div>
      </main>
    </div>
  );
}
