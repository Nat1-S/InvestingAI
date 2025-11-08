import React, { useState, useEffect } from 'react';
import { generatePodcast } from '../services/geminiService';
import { useAppContext } from '../hooks/useAppContext';
import { SpinnerIcon } from './icons/Icons';
import { decodeAudioData, decode } from '../utils/audioUtils';

interface PodcastPlayerProps {
  reportText: string;
  podcastAudio: string | null;
  setPodcastAudio: (audio: string | null) => void;
}

const PodcastPlayer: React.FC<PodcastPlayerProps> = ({ reportText, podcastAudio, setPodcastAudio }) => {
  const { t } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    // When a new report text is passed, it means a new report was generated.
    // We must reset the podcast player's state to allow for a new podcast to be created.
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioUrl(null);
    setError(null);
  }, [reportText]);


  useEffect(() => {
    // General cleanup effect for when the component unmounts
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const handleGeneratePodcast = async () => {
    if (!reportText) return;

    setIsLoading(true);
    setError(null);
    if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);
    }
    setPodcastAudio(null);

    try {
      const base64Audio = await generatePodcast(reportText);
      if (base64Audio) {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        const decodedBytes = decode(base64Audio);
        const audioBuffer = await decodeAudioData(decodedBytes, audioContext, 24000, 1);
        
        // Convert AudioBuffer to WAV blob
        const wavBlob = bufferToWav(audioBuffer);
        const url = URL.createObjectURL(wavBlob);

        setAudioUrl(url);
        setPodcastAudio(base64Audio); // cache for potential re-use
      } else {
        throw new Error("No audio data received.");
      }
    } catch (err) {
      setError(t('podcastError'));
    } finally {
      setIsLoading(false);
    }
  };

  const bufferToWav = (buffer: AudioBuffer): Blob => {
    const numOfChan = buffer.numberOfChannels,
          len = buffer.length * numOfChan * 2,
          view = new DataView(new ArrayBuffer(44 + len)),
          channels = [],
          sampleRate = buffer.sampleRate;
    
    let offset = 0,
        pos = 0;
  
    // write WAV container
    setUint32(0x46464952); // "RIFF"
    setUint32(36 + len);   // file length - 8
    setUint32(0x45564157); // "WAVE"
  
    // write "fmt " chunk
    setUint32(0x20746d66); // "fmt "
    setUint32(16);         // size
    setUint16(1);          // PCM
    setUint16(numOfChan);
    setUint32(sampleRate);
    setUint32(sampleRate * 2 * numOfChan); // byte rate
    setUint16(numOfChan * 2);              // block align
    setUint16(16);                         // bits per sample
  
    // write "data" chunk
    setUint32(0x61746164); // "data"
    setUint32(len);        // data length
  
    for (let i = 0; i < buffer.numberOfChannels; i++) {
        channels.push(buffer.getChannelData(i));
    }
  
    while (pos < buffer.length) {
        for (let i = 0; i < numOfChan; i++) {
            let sample = Math.max(-1, Math.min(1, channels[i][pos]));
            sample = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
            view.setInt16(offset, sample, true);
            offset += 2;
        }
        pos++;
    }

    function setUint16(data: number) {
      view.setUint16(offset, data, true);
      offset += 2;
    }
  
    function setUint32(data: number) {
      view.setUint32(offset, data, true);
      offset += 4;
    }

    return new Blob([view], { type: 'audio/wav' });
  };


  return (
    <div className="p-6 bg-light-surface dark:bg-dark-surface rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-4">{t('podcastTitle')}</h2>
      
      {reportText && !audioUrl && !isLoading && (
        <div className="text-center py-8">
            <button
              onClick={handleGeneratePodcast}
              disabled={isLoading}
              className="px-6 py-3 bg-brand-secondary text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary transition-all duration-200"
            >
              {t('generatePodcast')}
            </button>
        </div>
      )}

      {isLoading && (
        <div className="flex items-center justify-center py-8 space-x-2 rtl:space-x-reverse text-gray-500 dark:text-gray-400">
          <SpinnerIcon />
          <span>{t('generatingPodcast')}</span>
        </div>
      )}

      {error && <p className="text-red-500 text-center py-8">{error}</p>}
      
      {audioUrl && (
        <div className="mt-4">
          <audio controls className="w-full" src={audioUrl}>
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default PodcastPlayer;