"use client"
import { useEffect, useState } from "react";
import mqtt from "mqtt";
import type { MqttClient } from "mqtt";

type DataSensors = {
  TDS: number;
  pH: number;
  Temp: number;
  Wheather: boolean;
  timeStamp: string;
  apikey: string;
};

// --- GLOBAL SHARED STATE ---
let globalMqttClient: MqttClient | null = null;
let globalIsConnected = false;
let globalSensorData: DataSensors | null = null;
let globalIsSystemOnline = false;
let globalLastOnlineStamp: string | null = null;
let isConnecting = false;
let timeoutId: NodeJS.Timeout | null = null;

const listeners: Set<() => void> = new Set();

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

export function useDataSensors() {
  const [state, setState] = useState({
    mqttClient: globalMqttClient,
    isConnected: globalIsConnected,
    sensorData: globalSensorData,
    isSystemOnline: globalIsSystemOnline,
    lastOnlineStamp: globalLastOnlineStamp,
  });

  useEffect(() => {
    // Daftarkan komponen ini sebagai listener
    const listener = () => {
      setState({
        mqttClient: globalMqttClient,
        isConnected: globalIsConnected,
        sensorData: globalSensorData,
        isSystemOnline: globalIsSystemOnline,
        lastOnlineStamp: globalLastOnlineStamp,
      });
    };
    listeners.add(listener);

    // Fetch initial offline log hanya sekali
    if (!globalLastOnlineStamp && !globalIsSystemOnline && !isConnecting) {
      fetch('/api/offline-log')
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.data && data.data.lastOnline) {
            globalLastOnlineStamp = data.data.lastOnline;
            notifyListeners();
          }
        })
        .catch((err) => console.error("Gagal mengambil data offline log awal:", err));
    }

    // Connect ke MQTT hanya sekali untuk seluruh aplikasi
    if (!globalMqttClient && !isConnecting) {
      isConnecting = true;
      const brokerUrl = process.env.NEXT_PUBLIC_BROKER_URL;
      const options = {
        username: process.env.NEXT_PUBLIC_BROKER_USERNAME,
        password: process.env.NEXT_PUBLIC_BROKER_PASSWORD,
        clientId: `NextJSClient_${Math.random().toString(16).slice(3)}`,
      };

      console.log("Mencoba terhubung ke broker secara global...", brokerUrl);
      globalMqttClient = mqtt.connect(brokerUrl as any, options);

      globalMqttClient.on("connect", () => {
        console.log("Berhasil terhubung ke HiveMQ secara global!");
        globalIsConnected = true;
        globalMqttClient?.subscribe("esp32/sensors");
        notifyListeners();
      });

      globalMqttClient.on("message", (topic, message) => {
        if (topic === "esp32/sensors") {
          const payloadString = message.toString();
          const parsedData: DataSensors = JSON.parse(payloadString);

          globalSensorData = parsedData;
          globalIsSystemOnline = true;
          globalLastOnlineStamp = parsedData.timeStamp;
          notifyListeners();

          if (timeoutId) clearTimeout(timeoutId);

          timeoutId = setTimeout(() => {
            console.log("Sistem offline, tidak ada data selama 5 detik.");
            globalIsSystemOnline = false;
            notifyListeners();

            if (parsedData.timeStamp) {
              fetch('/api/offline-log', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ timeStamp: parsedData.timeStamp }),
              }).catch((err) => console.error("Gagal mencatat offline log", err));
            }
          }, 5000);
        }
      });

      globalMqttClient.on("error", (err) => {
        console.error("Koneksi Error Global: ", err);
      });
    }

    return () => {
      listeners.delete(listener);
      // Client TIDAK didisconnect saat satu komponen unmount
      // karena digunakan oleh banyak komponen di Dashboard
    };
  }, []);

  const kirimPerintahRelay = (perintah: string) => {
    if (globalMqttClient && globalIsConnected) {
      globalMqttClient.publish("esp32/kontrol", perintah);
      console.log(`Perintah dikirim: ${perintah}`);
    } else {
      console.error("Gagal mengirim perintah: MQTT belum terhubung.");
    }
  };

  return {
    mqttClient: state.mqttClient,
    isConnected: state.isConnected,
    sensorData: state.sensorData,
    isSystemOnline: state.isSystemOnline,
    lastOnlineStamp: state.lastOnlineStamp,
    kirimPerintahRelay,
  };
}