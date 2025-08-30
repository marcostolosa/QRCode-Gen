/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useMemo, useEffect } from 'react';
// Remove old import since we're switching to react-qrcode-logo
import ControlsPanel from './components/ControlsPanel';
import QrCodePreview from './components/QrCodePreview';
import Header from './components/Header';

export type Theme = 'light' | 'dark';
export type Language = 'en' | 'pt';

export interface AppState {
  data: string;
  // Colors  
  foregroundColor: string;
  backgroundColor: string;
  // QR Style
  qrStyle: 'squares' | 'dots' | 'fluid';
  // Eye customization (advanced)
  eyeColor: string;
  eyeColorOuter: string;
  eyeColorInner: string;
  useAdvancedEyeColors: boolean;
  eyeRadius: number;
  eyeRadiusOuter: number;
  eyeRadiusInner: number;
  useAdvancedEyeRadius: boolean;
  // Logo
  logo?: string;
  logoSize: number;
  logoOpacity: number;
  logoPadding: number;
  logoPaddingStyle: 'square' | 'circle';
  logoPaddingRadius: number;
  logoBackground: boolean;
  logoBackgroundColor: string;
  // Misc
  quietZone: number;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
}

const App: React.FC = () => {
    const [state, setState] = useState<AppState>({
        data: 'https://mindsecurity.org/',
        // Colors
        foregroundColor: '#0b1226',
        backgroundColor: '#ffffff',
        // QR Style
        qrStyle: 'squares',
        // Eye customization (advanced)
        eyeColor: '#0b1226',
        eyeColorOuter: '#0b1226',
        eyeColorInner: '#0b1226',
        useAdvancedEyeColors: false,
        eyeRadius: 0,
        eyeRadiusOuter: 0,
        eyeRadiusInner: 0,
        useAdvancedEyeRadius: false,
        // Logo
        logo: undefined,
        logoSize: 80, // pixels instead of ratio
        logoOpacity: 1,
        logoPadding: 0,
        logoPaddingStyle: 'square',
        logoPaddingRadius: 0,
        logoBackground: false,
        logoBackgroundColor: '#ffffff',
        // Misc
        quietZone: 10,
        errorCorrectionLevel: 'Q',
    });

    const [processedLogo, setProcessedLogo] = useState<string | undefined>();
    const [theme, setTheme] = useState<Theme>('light');

    // Effect for handling theme changes
    useEffect(() => {
        const root = window.document.documentElement;
        const isDark = theme === 'dark';
        root.classList.remove(isDark ? 'light' : 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Effect for initializing theme from system preference
    useEffect(() => {
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (savedTheme) {
        setTheme(savedTheme);
      } else {
        setTheme(prefersDark ? 'dark' : 'light');
      }
    }, []);

    // Effect for processing logo with opacity
    useEffect(() => {
        if (!state.logo) {
            setProcessedLogo(undefined);
            return;
        }

        const img = new Image();
        img.src = state.logo;
        img.crossOrigin = "anonymous";
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.globalAlpha = state.logoOpacity;
                ctx.drawImage(img, 0, 0);
                setProcessedLogo(canvas.toDataURL());
            } else {
                setProcessedLogo(state.logo);
            }
        };
        img.onerror = () => {
            // Fallback to original logo if canvas processing fails
            setProcessedLogo(state.logo);
        }
    }, [state.logo, state.logoOpacity]);
    
    const qrProps = useMemo(() => {
        // Build eye color configuration
        const eyeColor = state.useAdvancedEyeColors 
            ? { outer: state.eyeColorOuter, inner: state.eyeColorInner }
            : state.eyeColor;
            
        // Build eye radius configuration  
        const eyeRadius = state.useAdvancedEyeRadius
            ? { outer: state.eyeRadiusOuter, inner: state.eyeRadiusInner }
            : state.eyeRadius;
            
        return {
            value: state.data,
            size: 400,
            fgColor: state.foregroundColor,
            bgColor: state.backgroundColor,
            logoImage: processedLogo,
            logoWidth: state.logoSize,
            logoHeight: state.logoSize,
            logoOpacity: state.logoOpacity,
            logoPadding: state.logoPadding,
            logoPaddingStyle: state.logoPaddingStyle,
            logoPaddingRadius: state.logoPaddingRadius,
            qrStyle: state.qrStyle,
            eyeColor: eyeColor,
            eyeRadius: eyeRadius,
            ecLevel: state.errorCorrectionLevel,
            quietZone: state.quietZone,
        };
    }, [state, processedLogo]);


    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
            <Header theme={theme} setTheme={setTheme} />
            <main className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
                <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8">
                    {/* QR Code Preview - Always visible on top for mobile */}
                    <div className="order-1 lg:order-2 lg:col-span-2">
                        <QrCodePreview qrProps={qrProps} />
                    </div>
                    {/* Controls Panel - Collapsible on mobile */}
                    <div className="order-2 lg:order-1 lg:col-span-1">
                        <ControlsPanel state={state} setState={setState} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;