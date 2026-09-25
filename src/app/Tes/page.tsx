"use client";

import { useEffect, useState } from "react";
import mqtt from "mqtt";
import type { MqttClient } from "mqtt";

export default function DashboardIoT() {
  const [pingData, setPingData] = useState("Menunggu koneksi dari ESP32...");
  const [mqttClient, setMqttClient] = useState<MqttClient | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // --- KONFIGURASI HIVEMQ (WEBSOCKETS) ---
    // Gunakan wss:// dan tambahkan port 8884 serta path /mqtt di akhir URL
    const brokerUrl = process.env.NEXT_PUBLIC_BROKER_URL;
    const options = {
      username: process.env.NEXT_PUBLIC_BROKER_USERNAME,
      password: process.env.NEXT_PUBLIC_BROKER_PASSWORD,
      clientId: `NextJSClient_${Math.random().toString(16).slice(3)}`,
    };

    console.log("Mencoba terhubung ke broker...");
    const client = mqtt.connect(brokerUrl as any, options);

    client.on("connect", () => {
      console.log("Berhasil terhubung ke HiveMQ!");
      setIsConnected(true);
      // Subscribe ke topik yang di-publish oleh ESP32
      client.subscribe("esp32/ping");
    });

    client.on("message", (topic, message) => {
      // Menangkap pesan yang masuk
      if (topic === "esp32/ping") {
        setPingData(message.toString());
      }
    });

    client.on("error", (err) => {
      console.error("Koneksi Error: ", err);
      client.end();
    });

    setMqttClient(client);

    // Cleanup saat komponen ditutup/pindah halaman
    return () => {
      if (client) {
        client.end();
      }
    };
  }, []);

  // Fungsi untuk mengirim perintah ke ESP32
  const kirimPerintahRelay = (perintah: string) => {
    if (mqttClient && isConnected) {
      mqttClient.publish("esp32/relay", perintah);
      console.log(`Mengirim perintah: ${perintah}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center font-sans">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Dashboard IoT ESP32</h1>
      
      {/* Kartu Status Koneksi */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mb-6">
        <h2 className="text-xl font-semibold mb-2">Status Broker: </h2>
        <p className={isConnected ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
          {isConnected ? "Terhubung" : "Terputus"}
        </p>
      </div>

      {/* Kartu Monitor Data Ping */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mb-6">
        <h2 className="text-xl font-semibold mb-2">Pesan dari ESP32:</h2>
        <div className="p-4 bg-gray-800 text-green-400 font-mono rounded">
          {pingData}
        </div>
      </div>

      {/* Kartu Kontrol Relay */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-xl font-semibold mb-4">Kontrol Relay</h2>
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => kirimPerintahRelay("ON")}
            className="px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition"
          >
            Nyalakan (ON)
          </button>
          <button 
            onClick={() => kirimPerintahRelay("OFF")}
            className="px-6 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-600 transition"
          >
            Matikan (OFF)
          </button>
        </div>
      </div>
    </div>
  );
}