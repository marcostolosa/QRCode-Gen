/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { useQrCode } from '../hooks/useQrCode';
import type { Options } from 'qr-code-styling';
import { useLanguage } from '../context/LanguageContext';

interface QrCodePreviewProps {
  options: Options;
}

const DownloadIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);

const QrCodePreview: React.FC<QrCodePreviewProps> = ({ options }) => {
  const [fileType, setFileType] = useState<'png' | 'jpeg' | 'svg'>('png');
  // FIX: The useQrCode hook only accepts one argument.
  const { ref, download } = useQrCode(options);
  const { translations } = useLanguage();
  const t = translations.preview;

  const handleDownload = () => {
    download({ name: 'qrcode', extension: fileType });
  };
  
  return (
    <div className="bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200/80 dark:border-gray-700/50 shadow-sm p-4 sm:p-6 sticky top-28 transition-colors duration-300">
      <div className="aspect-square w-full max-w-lg mx-auto bg-gray-100/50 dark:bg-gray-900/50 rounded-lg p-4 qr-code-container">
        <div ref={ref} />
      </div>

      <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
        <div className="flex-shrink-0">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.format}:</span>
          <select 
            value={fileType} 
            onChange={(e) => setFileType(e.target.value as 'png' | 'jpeg' | 'svg')}
            className="ml-2 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            aria-label={t.selectFormat}
          >
            <option value="png">PNG</option>
            <option value="jpeg">JPEG</option>
            <option value="svg">SVG</option>
          </select>
        </div>
        <button
          onClick={handleDownload}
          className="w-full sm:w-auto flex-grow flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          aria-label={t.download}
        >
          <DownloadIcon className="w-5 h-5" />
          {t.download}
        </button>
      </div>
    </div>
  );
};

export default QrCodePreview;