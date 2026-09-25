import Link from "next/link";
import { ArrowRight, Leaf, Activity, Database } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white text-slate-800 font-sans selection:bg-emerald-500/30">
      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-white">
          {/* Subtle gradient background */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-50 via-slate-50 to-white"></div>
          
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium mb-8 border border-emerald-100 shadow-sm">
              <span className="relative flex w-2 h-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Sistem Pemantauan Cerdas
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-slate-900">
              Masa Depan <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 pb-2">
                Pertanian Hidroponik
              </span>
            </h1>
            
            <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Tingkatkan hasil panen Anda dengan sistem pemantauan dan kendali cerdas Dewaponik. 
              Pantau nutrisi, pH, dan lingkungan secara real-time dari genggaman Anda.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/Dashboard" 
                className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-full transition-all shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
              >
                Mulai Pantau Sekarang
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="#fitur" 
                className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-all flex items-center justify-center"
              >
                Pelajari Lebih Lanjut
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="fitur" className="py-24 bg-slate-50/50 border-t border-slate-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-slate-900">Fitur Utama</h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                Dua pilar utama Dewaponik untuk mempermudah pemantauan kualitas kebun hidroponik Anda secara efisien.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col items-start">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                  <Activity className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">Monitoring Real-time</h3>
                <p className="text-slate-600 leading-relaxed">
                  Pantau kondisi nutrisi (TDS), tingkat pH, serta suhu air secara langsung (real-time) melalui dashboard interaktif kapan saja dan di mana saja.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col items-start">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <Database className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">Log Data Sensor</h3>
                <p className="text-slate-600 leading-relaxed">
                  Rekam dan simpan riwayat data sensor secara berkala. Analisis grafik perkembangan parameter air untuk mendeteksi anomali lebih awal.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-500 p-1.5 rounded-lg">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800 tracking-tight">DEWAPONIK</span>
            </div>
            <p className="text-slate-500 text-sm">
              &copy; {new Date().getFullYear()} Hidroponik Dewaponik. Hak cipta dilindungi.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-slate-400 hover:text-emerald-600 transition-colors text-sm">Privasi</Link>
              <Link href="#" className="text-slate-400 hover:text-emerald-600 transition-colors text-sm">Ketentuan</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
