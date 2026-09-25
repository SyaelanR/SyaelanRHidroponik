"use client";
import React, { useState, useEffect, JSX } from 'react';
import {
  Activity,
  Droplets,
  Thermometer,
  CloudRain,
  CloudSun,
  Power,
  RefreshCcw,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import { useDataSensors } from '../lib/services/esp32';
import { LiveSensors } from './actions';

interface SensorData {
  tds: number;
  ph: number;
  temp: number;
}

interface Sensor_Cuaca {
  isRaining: boolean;
}

interface StatusInfo {
  isNormal: boolean;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  icon: JSX.Element;
}

interface SensorCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: JSX.Element;
  statusInfo: StatusInfo;
  range: string;
  progress: number;
  progressColor: string;
}

export function LastUpdate() {
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const { sensorData, isSystemOnline, lastOnlineStamp } = useDataSensors();

  let displayTime = "Menunggu data...";
  if (isSystemOnline && sensorData?.timeStamp) {
    displayTime = sensorData.timeStamp;
  } else if (!isSystemOnline && lastOnlineStamp) {
    displayTime = `${lastOnlineStamp} (Offline)`;
  } else if (!isSystemOnline) {
    displayTime = "Sistem Terputus";
  }

  return (
    <p className="font-medium text-slate-700">{displayTime}</p>
  )
}

export function SystemStatusHeader() {
  const { isSystemOnline, lastOnlineStamp } = useDataSensors();

  return (
    <p className="text-slate-500 mt-1 flex items-center gap-2 text-sm font-medium">
      <span className="relative flex h-3 w-3">
        {isSystemOnline ? (
          <>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </>
        ) : (
          <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
        )}
      </span>
      {isSystemOnline ? 'Sistem Online & Terhubung' : `Sistem Offline ${lastOnlineStamp ? '(Mati sejak ' + lastOnlineStamp + ')' : ''}`}
    </p>
  );
}

export function RealtimeSensors() {
  // Fungsi utilitas untuk menentukan status normal/peringatan
  const getStatusInfo = (type: string, value: number): StatusInfo => {
    let isNormal = true;
    switch (type) {
      case 'tds': isNormal = value >= 700 && value <= 1200; break;
      case 'ph': isNormal = value >= 5.5 && value <= 6.8; break;
      case 'temp': isNormal = value >= 18 && value <= 28; break;
      default: break;
    }
    return {
      isNormal,
      colorClass: isNormal ? 'text-emerald-500' : 'text-amber-500',
      bgClass: isNormal ? 'bg-emerald-50' : 'bg-amber-50',
      borderClass: isNormal ? 'border-emerald-200' : 'border-amber-200',
      icon: isNormal ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <AlertTriangle className="w-5 h-5 text-amber-500" />
    };
  };

  // Mengambil data langsung dari ESP32
  const { sensorData: realtimeData } = useDataSensors();

  // Menggunakan data asli jika tersedia, atau nilai default 0 agar UI tidak putus
  const displayData: SensorData = realtimeData ? {
    tds: realtimeData.TDS,
    ph: realtimeData.pH,
    temp: realtimeData.Temp
  } : {
    tds: 0,
    ph: 0,
    temp: 0
  };

  return (
    <>
      <SensorCard
        title="Sensor TDS (Nutrisi)"
        value={displayData.tds.toFixed(0)}
        unit="PPM"
        icon={<Activity className="w-8 h-8 text-blue-500" />}
        statusInfo={getStatusInfo('tds', displayData.tds)}
        range="Normal: 700 - 1200 PPM"
        progress={(displayData.tds / 1500) * 100}
        progressColor="bg-blue-500"
      />

      <SensorCard
        title="Kadar pH Air"
        value={displayData.ph.toFixed(2)}
        unit="pH"
        icon={<Droplets className="w-8 h-8 text-indigo-500" />}
        statusInfo={getStatusInfo('ph', displayData.ph)}
        range="Normal: 5.5 - 6.8 pH"
        progress={(displayData.ph / 14) * 100}
        progressColor="bg-indigo-500"
      />

      <SensorCard
        title="Suhu Air"
        value={displayData.temp.toFixed(1)}
        unit="°C"
        icon={<Thermometer className="w-8 h-8 text-orange-500" />}
        statusInfo={getStatusInfo('temp', displayData.temp)}
        range="Normal: 18°C - 28°C"
        progress={(displayData.temp / 50) * 100}
        progressColor="bg-orange-500"
      />
    </>
  )
}


function SensorCard({ title, value, unit, icon, statusInfo, range, progress, progressColor }: SensorCardProps) {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between transition-colors duration-300 ${statusInfo.isNormal ? '' : 'border-amber-300 bg-amber-50/10'}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
          {icon}
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${statusInfo.bgClass} ${statusInfo.borderClass}`}>
          {statusInfo.icon}
          <span className={`text-xs font-bold ${statusInfo.colorClass}`}>
            {statusInfo.isNormal ? 'Normal' : 'Warning'}
          </span>
        </div>
      </div>

      <div>
        <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-extrabold text-slate-800 tracking-tight">{value}</span>
          <span className="text-slate-500 font-semibold">{unit}</span>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex justify-between text-xs text-slate-400 mb-2 font-medium">
          <span>{range}</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
          <div
            className={`h-2.5 rounded-full transition-all duration-500 ease-in-out ${statusInfo.isNormal ? progressColor : 'bg-amber-500'}`}
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export function SensorCuaca() {
  const { sensorData: realtimeData } = useDataSensors();

  // Mengambil status cuaca/hujan dari data ESP32 (menggunakan default false jika null)
  // Properti 'Wheather' disesuaikan dengan ejaan di tipe data ESP32
  const isRaining = realtimeData ? realtimeData.Wheather : false;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${isRaining ? 'bg-cyan-100' : 'bg-slate-100'}`}>
          {isRaining ? (
            <CloudRain className="w-8 h-8 text-cyan-600" />
          ) : (
            <CloudSun className="w-8 h-8 text-slate-500" />
          )}
        </div>
        <div className="bg-slate-50 px-3 py-1 rounded-full text-xs font-semibold text-slate-500">
          Cuaca
        </div>
      </div>

      <div>
        <p className="text-slate-500 text-sm font-medium mb-1">Status Curah Hujan</p>
        <div className="flex items-end gap-2">
          <span className="text-3xl font-bold text-slate-800">
            {isRaining ? 'Hujan' : 'Cerah'}
          </span>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
        {isRaining ? (
          <span className="text-cyan-600 font-medium">Sistem sirkulasi air dihentikan sementara.</span>
        ) : (
          <span>Kondisi ideal untuk sirkulasi normal.</span>
        )}
      </div>
    </div>
  )
}

export function ValveSistem() {
  // Mengambil fungsi untuk mengirim perintah dari custom hook
  const { kirimPerintahRelay, sensorData } = useDataSensors();

  // Mengambil status cuaca/hujan dari data ESP32
  const isRaining = sensorData ? sensorData.Wheather : false;

  // State untuk aktuator
  const [valveOpen, setValveOpen] = useState<boolean>(false);

  // State untuk waktu dan loading UI
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Memaksa valve tertutup jika hujan
  useEffect(() => {
    if (isRaining && valveOpen) {
      setValveOpen(false);
      kirimPerintahRelay("OFF");
    }
  }, [isRaining, valveOpen, kirimPerintahRelay]);

  // Fungsi toggle aktuator selenoid valve dan mengirim perintah ke ESP32
  const handleValveToggle = () => {
    if (isRaining) return; // Mencegah klik saat hujan

    setIsSyncing(true);
    const newValveState = !valveOpen;
    const command = newValveState ? "ON" : "OFF";
    kirimPerintahRelay(command);

    // Simulasi delay untuk feedback UI, seolah-olah menunggu konfirmasi
    setTimeout(() => {
      setValveOpen(newValveState);
      setIsSyncing(false);
    }, 500);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 relative overflow-hidden">
      <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl opacity-20 ${valveOpen && !isRaining ? 'bg-emerald-500' : 'bg-slate-400'}`}></div>

      <div className="flex items-center gap-4 mb-6">
        <div className={`p-3 rounded-xl ${valveOpen && !isRaining ? 'bg-emerald-100' : 'bg-slate-100'}`}>
          <Power className={`w-6 h-6 ${valveOpen && !isRaining ? 'text-emerald-600' : 'text-slate-500'}`} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800">Selenoid Valve</h3>
          <p className="text-sm text-slate-500">Aktuator Kontrol Air/Nutrisi</p>
        </div>
      </div>

      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-600">Status Saat Ini</span>
          <span className={`text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider ${isRaining ? 'bg-rose-100 text-rose-700' : valveOpen ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
            {isRaining ? 'Tertutup (Hujan)' : valveOpen ? 'Terbuka (ON)' : 'Tertutup (OFF)'}
          </span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          {isRaining ? 'Valve dipaksa tertutup otomatis karena cuaca hujan terdeteksi.' : valveOpen ? 'Katup terbuka. Sirkulasi air atau nutrisi sedang berjalan ke sistem.' : 'Katup tertutup. Aliran sirkulasi dihentikan.'}
        </p>
      </div>

      <button
        onClick={handleValveToggle}
        disabled={isSyncing || isRaining}
        className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all duration-200 ease-in-out shadow-sm
                ${(isSyncing || isRaining) ? 'bg-slate-400 cursor-not-allowed opacity-80' :
            valveOpen ? 'bg-rose-500 hover:bg-rose-600 hover:shadow-rose-200 shadow-lg' : 'bg-emerald-500 hover:bg-emerald-600 hover:shadow-emerald-200 shadow-lg'
          }`}
      >
        {isSyncing ? (
          <>
            <RefreshCcw className="w-5 h-5 animate-spin" />
            Memproses...
          </>
        ) : isRaining ? (
          <>
            <CloudRain className="w-5 h-5" />
            Valve Terkunci (Hujan)
          </>
        ) : (
          <>
            <Power className="w-5 h-5" />
            {valveOpen ? 'Matikan Valve (Tutup)' : 'Nyalakan Valve (Buka)'}
          </>
        )}
      </button>
    </div>
  )
}