'use client';

import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import {
  Upload, AlertCircle, CheckCircle, Activity, ShieldAlert, Radio,
  Cpu, Camera, Layers, Play, Terminal, Globe, X, ArrowRight
} from 'lucide-react';

// Use the environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface Violation {
  violation: string;
  severity: string;
  class_detected: string;
}

interface DetectionResponse {
  message: string;
  violations_found: Violation[];
  original_image: string;
  annotated_image: string;
  object_count: number;
  class_counts: { [key: string]: number };
}

export default function TrafficSentry() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [data, setData] = useState<DetectionResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file));
      setData(null);
    }
  };

  const runInference = async () => {
    if (!selectedFile) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const res = await axios.post<DetectionResponse>(`${API_BASE_URL}/api/v1/detect`, formData);
      setData(res.data);
    } catch (err) {
      alert("INTERFACE ERROR: Neural Engine Offline. Check connection to " + API_BASE_URL);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070a] text-slate-300 font-mono selection:bg-blue-500/30 overflow-x-hidden">

      {/* --- LANDING PAGE SECTION --- */}
      <div className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden">

        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/traffic_image.jpg"
            alt="Traffic Background"
            className="w-full h-full object-cover opacity-50 transition-all duration-1000"
          
          />

          
          <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/10 via-[#05070a]/60 to-[#05070a]"></div>

         
          <div className="absolute inset-0 bg-blue-900/10 pointer-events-none"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl animate-in fade-in zoom-in duration-1000">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600/20 p-4 rounded-2xl border border-blue-500/30 animate-pulse">
              <ShieldAlert className="text-blue-500" size={48} />
            </div>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase italic mb-4">
            TRAFFIC<span className="text-blue-500">SENTRY</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-lg uppercase tracking-[0.3em] mb-10 font-light">
            Next-Gen Neural Violation Enforcement System
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="group relative px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-[0.4em] text-xs rounded-full transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] flex items-center gap-4 mx-auto"
          >
            Initiate System <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        {/* Floating Telemetry Stats */}
        <div className="absolute bottom-10 left-10 hidden lg:block border-l border-blue-500/30 pl-4">
          <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">Active Node</p>
          <p className="text-xs text-slate-400 font-mono">{API_BASE_URL}</p>
        </div>
      </div>

      {/* --- DETECTION MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-10 backdrop-blur-xl bg-black/80 animate-in fade-in duration-300">
          <div className="bg-[#0b0e14] w-full max-w-[1600px] h-full max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-800 shadow-2xl relative">

            {/* Modal Header */}
            <div className="sticky top-0 z-30 bg-[#0b0e14]/90 backdrop-blur-md border-b border-slate-800 p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Cpu size={20} className="text-white" />
                </div>
                <h2 className="text-xl font-black text-white uppercase italic tracking-tighter">
                  Detection<span className="text-blue-500 ml-1">Terminal</span>
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-500 hover:text-white"
              >
                <X size={28} />
              </button>
            </div>

            {/* Existing Dashboard Grid */}
            <div className="p-6 lg:p-10 grid grid-cols-1 md:grid-cols-12 gap-8">

              {/* INPUT STAGE */}
              <div className="col-span-12 md:col-span-4 space-y-6">
                <section className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                  <h3 className="text-[11px] font-black text-blue-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Camera size={14} /> Source Ingestion
                  </h3>
                  {!filePreview ? (
                    <label className="flex flex-col items-center justify-center w-full h-[300px] border border-dashed border-slate-800 rounded-xl cursor-pointer hover:bg-blue-600/5 transition-all">
                      <Upload className="text-slate-700 mb-4" size={32} />
                      <span className="text-[9px] text-slate-500 font-bold uppercase text-center px-4">Upload traffic frame</span>
                      <input type="file" className="hidden" onChange={handleFileSelect} />
                    </label>
                  ) : (
                    <div className="space-y-4">
                      <div className="relative rounded-xl border border-slate-800 overflow-hidden bg-black aspect-video flex items-center justify-center">
                        <img src={filePreview} className="max-w-full max-h-full object-contain" alt="Preview" />
                        <button onClick={() => { setFilePreview(null); setSelectedFile(null); setData(null); }} className="absolute top-2 right-2 bg-red-600 p-1.5 rounded-lg">
                          <AlertCircle size={14} />
                        </button>
                      </div>
                      <button onClick={runInference} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-black uppercase text-xs flex items-center justify-center gap-3">
                        {loading ? <span className="animate-pulse">Analyzing...</span> : <><Play size={16} /> Run Neural Scan</>}
                      </button>
                    </div>
                  )}
                </section>

                {data && (
                  <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-bottom">
                    <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                      <p className="text-[9px] text-slate-500 uppercase mb-1">Objects</p>
                      <p className="text-xl font-black text-white">{data.object_count}</p>
                    </div>
                    <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                      <p className="text-[9px] text-slate-500 uppercase mb-1">Violations</p>
                      <p className={`text-xl font-black ${data.violations_found.length > 0 ? 'text-red-500' : 'text-green-500'}`}>{data.violations_found.length}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* VIEWPORT */}
              <div className="col-span-12 md:col-span-8">
                <section className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 min-h-[500px]">
                  {!data && !loading ? (
                    <div className="h-[400px] flex flex-col items-center justify-center opacity-20">
                      <Terminal size={48} className="mb-4" />
                      <p className="text-[10px] uppercase tracking-[0.4em]">Awaiting Data Input</p>
                    </div>
                  ) : loading ? (
                    <div className="h-[400px] flex flex-col items-center justify-center">
                      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    </div>
                  ) : data && (
                    <div className="space-y-6">
                      <img src={`${API_BASE_URL}${data.annotated_image}`} className="w-full rounded-xl border border-blue-500/20 shadow-2xl" alt="Annotated" />
                      <div className="space-y-3">
                        {data.violations_found.map((v, i) => (
                          <div key={i} className="bg-red-500/10 border-l-4 border-red-500 p-4 rounded-r-xl flex justify-between items-center">
                            <div>
                              <p className="text-xs font-black text-red-200 uppercase">{v.violation}</p>
                              <p className="text-[9px] text-slate-500 uppercase">{v.class_detected}</p>
                            </div>
                            <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded italic font-black">{v.severity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}