/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useMemo, useEffect } from 'react';
import type { Options, DotType, CornerSquareType, CornerDotType, ErrorCorrectionLevel } from 'qr-code-styling';
import ControlsPanel from './components/ControlsPanel';
import QrCodePreview from './components/QrCodePreview';
import Header from './components/Header';

export type Theme = 'light' | 'dark';
export type Language = 'en' | 'pt';

export interface AppState {
  data: string;
  logo?: string;
  // Colors
  foregroundColor: string;
  backgroundColor: string;
  useGradient: boolean;
  gradientType: 'linear' | 'radial';
  gradientColor1: string;
  gradientColor2: string;
  // Dots
  dotType: DotType;
  // Corners
  cornerSquareType: CornerSquareType;
  cornerDotType: CornerDotType;
  // Logo
  logoSize: number;
  logoMargin: number;
  logoOpacity: number;
  // Misc
  margin: number;
  errorCorrectionLevel: ErrorCorrectionLevel;
}

const App: React.FC = () => {
    const [state, setState] = useState<AppState>({
        data: 'https://gemini.google.com/',
        // Colors
        foregroundColor: '#0b1226',
        backgroundColor: '#ffffff',
        useGradient: false,
        gradientType: 'linear',
        gradientColor1: '#6366f1',
        gradientColor2: '#ec4899',
        // Dots
        dotType: 'rounded',
        // Corners
        cornerSquareType: 'extra-rounded',
        cornerDotType: 'dot',
        // Misc
        margin: 10,
        errorCorrectionLevel: 'Q',
        // Logo
        logo: undefined,
        logoSize: 0.4,
        logoMargin: 6,
        logoOpacity: 1,
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
    
    const qrOptions: Options = useMemo(() => ({
      width: 500,
      height: 500,
      data: state.data,
      image: processedLogo,
      margin: state.margin,
      qrOptions: {
        errorCorrectionLevel: state.errorCorrectionLevel,
      },
      dotsOptions: {
        type: state.dotType,
        ...(state.useGradient ? {
            gradient: {
              type: state.gradientType,
              colorStops: [
                { offset: 0, color: state.gradientColor1 },
                { offset: 1, color: state.gradientColor2 }
              ]
            }
        } : {
            color: state.foregroundColor,
        })
      },
      backgroundOptions: {
        color: state.backgroundColor,
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: state.logoSize,
        margin: state.logoMargin,
        crossOrigin: "anonymous",
      },
      cornersSquareOptions: {
        type: state.cornerSquareType,
        ...(state.useGradient ? {
            gradient: {
              type: state.gradientType,
              colorStops: [
                { offset: 0, color: state.gradientColor1 },
                { offset: 1, color: state.gradientColor2 }
              ]
            }
        } : {
            color: state.foregroundColor,
        })
      },
      cornersDotOptions: {
        color: state.foregroundColor,
        type: state.cornerDotType,
      },
    }), [state, processedLogo]);


    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
            <Header theme={theme} setTheme={setTheme} />
            <main className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <ControlsPanel state={state} setState={setState} />
                    </div>
                    <div className="lg:col-span-2">
                        <QrCodePreview options={qrOptions} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;