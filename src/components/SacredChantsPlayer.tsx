import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles, Music, ChevronDown, ChevronUp, Info, Disc } from 'lucide-react';

interface ChantItem {
  id: string;
  title: string;
  subtitle: string;
  deity: string;
  duration: string;
  sanskrit: string;
  meaning: string;
  notes: number[]; // Frequencies for serene ambient drone resonance
}

const SACRED_CHANTS: ChantItem[] = [
  {
    id: 'maha-mrityunjaya',
    title: 'Maha Mrityunjaya Mantra',
    subtitle: 'Supreme Protection & Long Life Chant',
    deity: 'Lord Shiva / Mahakaal',
    duration: '3:20',
    sanskrit: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्।\nउर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात्॥',
    meaning: 'We worship the three-eyed Lord Shiva who is fragrant and who nourishes all beings. May He liberate us from death for the sake of immortality, just as a ripe cucumber is severed from its bondage to the vine.',
    notes: [136.1, 272.2, 408.3] // Om / Earth Frequency (136.1 Hz)
  },
  {
    id: 'om-namah-shivaya',
    title: 'Om Namah Shivaya Dhyana',
    subtitle: 'Panchakshara Mantra for Inner Peace',
    deity: 'Lord Shiva',
    duration: '4:15',
    sanskrit: 'ॐ नमः शिवाय\nॐ नमः शिवाय\nहर हर भोले नमः शिवाय॥',
    meaning: 'I bow to Lord Shiva, the auspicious, the benevolent, the supreme consciousness residing in every heart.',
    notes: [108.0, 216.0, 432.0] // 432 Hz Sacred Harmony
  },
  {
    id: 'shiva-tandava',
    title: 'Shiva Tandava Stotram',
    subtitle: 'Composed by Ravana at Mount Kailash',
    deity: 'Nataraja / Lord Shiva',
    duration: '5:40',
    sanskrit: 'जटाटवीगलज्जलप्रवाहपावितस्थले\nगलेऽवलम्ब्य लम्बितां भुजङ्गतुङ्गमालिकाम्।\nडमड्डमड्डमड्डमन्निनादवड्डमर्वयं\nचकार चण्डताण्डवं तनोतु नः शिवः शिवम्॥',
    meaning: 'With his neck consecrated by the flow of water that flows from his dense hair, and on his neck holding the serpent garland, playing his Damaru with the sound damat-damat, may that Shiva perform his fierce cosmic dance and bestow prosperity upon us.',
    notes: [144.0, 288.0, 432.0]
  },
  {
    id: 'karpura-gauram',
    title: 'Karpura Gauram Karunavataram',
    subtitle: 'Ancient Shaivite Mangalacharan Aarti',
    deity: 'Shiva & Bhavani',
    duration: '2:50',
    sanskrit: 'कर्पूरगौरं करुणावतारं संसारसारं भुजगेन्द्रहारम्।\nसदा वसन्तं हृदयारविन्दे भवं भवानीसहितं नमामि॥',
    meaning: 'I bow to Lord Shiva who is as pure and white as camphor, the embodiment of compassion, the essence of the world, wearing the king of serpents as a garland, ever dwelling in the lotus of my heart together with Goddess Bhavani.',
    notes: [130.8, 261.6, 392.4]
  }
];

export const SacredChantsPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeChantId, setActiveChantId] = useState<string>('maha-mrityunjaya');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.6);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  const activeChant = SACRED_CHANTS.find((c) => c.id === activeChantId) || SACRED_CHANTS[0];

  // Stop audio oscillators
  const stopAudio = () => {
    oscillatorsRef.current.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {}
    });
    oscillatorsRef.current = [];
  };

  // Start meditative ambient drone sound with harmonics
  const startAudio = (chant: ChantItem) => {
    try {
      stopAudio();

      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(isMuted ? 0 : volume * 0.15, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Create warm harmonic bell & tanpura drone oscillators
      const oscs: OscillatorNode[] = [];
      chant.notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        osc.type = idx === 0 ? 'sine' : idx === 1 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Gentle subtle modulation
        oscGain.gain.setValueAtTime(0.08 / (idx + 1), ctx.currentTime);

        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();
        oscs.push(osc);
      });

      oscillatorsRef.current = oscs;
      setIsPlaying(true);
    } catch (err) {
      console.warn("Audio Context init deferred:", err);
    }
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopAudio();
      setIsPlaying(false);
    } else {
      startAudio(activeChant);
    }
  };

  const handleSelectChant = (chant: ChantItem) => {
    setActiveChantId(chant.id);
    if (isPlaying) {
      startAudio(chant);
    }
  };

  const handleToggleMute = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      const nextMute = !isMuted;
      setIsMuted(nextMute);
      gainNodeRef.current.gain.setValueAtTime(
        nextMute ? 0 : volume * 0.15,
        audioCtxRef.current.currentTime
      );
    } else {
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    return () => {
      stopAudio();
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch (e) {}
      }
    };
  }, []);

  return (
    <section className="py-12 sm:py-16 bg-[#FDFBF7] border-b border-[#E6E2D3] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Card Container */}
        <div className="bg-white rounded-3xl border border-[#E6E2D3] p-6 sm:p-8 shadow-xs space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6E2D3] pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-[10px] font-bold uppercase tracking-[0.18em]">
                <Sparkles size={13} className="text-amber-700" />
                <span>Sacred Kailash Atmosphere</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#1E293B] flex items-center gap-2">
                <span>Spiritual Mantra & Dhyana Sanctuary</span>
              </h3>
              <p className="text-xs text-slate-500">
                Immerse your spirit in sacred mountain vibrations before the auspicious Adi Kailash Yatra.
              </p>
            </div>

            {/* Play / Pause Primary Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleToggleMute}
                className="p-3 rounded-full bg-[#F5F2ED] hover:bg-[#E6E2D3] border border-[#E6E2D3] text-slate-700 transition-all cursor-pointer"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>

              <button
                onClick={handleTogglePlay}
                className={`px-5 py-3 rounded-full font-bold text-xs uppercase tracking-wider flex items-center gap-2.5 transition-all shadow-xs cursor-pointer ${
                  isPlaying
                    ? "bg-amber-800 text-white hover:bg-amber-900 ring-4 ring-amber-100"
                    : "bg-[#1E293B] hover:bg-black text-white"
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause size={16} />
                    <span>Pause Meditation</span>
                  </>
                ) : (
                  <>
                    <Play size={16} className="fill-white" />
                    <span>Listen & Meditate</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Chant Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {SACRED_CHANTS.map((chant) => (
              <button
                key={chant.id}
                onClick={() => handleSelectChant(chant)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  activeChantId === chant.id
                    ? "bg-amber-50 border-amber-300 text-amber-950 font-bold shadow-2xs"
                    : "bg-[#FDFBF7] border-slate-200 hover:border-amber-300 text-slate-700"
                }`}
              >
                <div>
                  <div className="text-xs font-bold leading-tight">{chant.title}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{chant.subtitle}</div>
                </div>
                <div className="mt-2 flex items-center justify-between text-[10px] text-amber-800 font-mono">
                  <span>{chant.deity}</span>
                  {activeChantId === chant.id && isPlaying && (
                    <span className="flex gap-0.5 items-end h-3">
                      <span className="w-1 bg-amber-700 h-full animate-pulse"></span>
                      <span className="w-1 bg-amber-700 h-2/3 animate-pulse delay-75"></span>
                      <span className="w-1 bg-amber-700 h-4/5 animate-pulse delay-150"></span>
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Active Chant Lyrics & Spiritual Meaning Card */}
          <div className="bg-[#F5F2ED] border border-[#E6E2D3] rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-widest">Sanskrit Shloka</span>
                <h4 className="text-base font-serif font-bold text-[#1E293B]">{activeChant.title}</h4>
              </div>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs text-slate-600 hover:text-amber-800 font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>{isExpanded ? "Hide Meaning" : "Show Meaning"}</span>
                {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            </div>

            {/* Sanskrit Script */}
            <div className="font-serif text-slate-900 text-sm sm:text-base whitespace-pre-line leading-relaxed bg-white/70 p-4 rounded-xl border border-[#E6E2D3]">
              {activeChant.sanskrit}
            </div>

            {/* English / Hindi Meaning */}
            {isExpanded && (
              <div className="text-xs text-slate-700 bg-amber-50/70 p-4 rounded-xl border border-amber-200/60 leading-relaxed italic">
                <span className="font-bold text-amber-900 not-italic block mb-1">Spiritual Meaning:</span>
                "{activeChant.meaning}"
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
