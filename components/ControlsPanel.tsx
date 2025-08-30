/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useState } from 'react';
import type { AppState } from '../App';
import { useLanguage } from '../context/LanguageContext';

const CollapsibleCard: React.FC<{ 
  title: string; 
  children: React.ReactNode; 
  className?: string; 
  defaultExpanded?: boolean;
  expandedState?: boolean;
  onToggle?: () => void;
}> = ({ title, children, className = '', defaultExpanded = true, expandedState, onToggle }) => {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const isExpanded = expandedState !== undefined ? expandedState : internalExpanded;
  
  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalExpanded(!internalExpanded);
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200/80 dark:border-gray-700/50 shadow-sm ${className} transition-colors duration-300`}>
      <div className="p-4 border-b border-gray-200/80 dark:border-gray-700/50">
        <button
          onClick={handleToggle}
          className="flex items-center justify-between w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
        >
          <h3 className={`text-md font-semibold transition-colors duration-200 ${isExpanded ? 'text-blue-600 dark:text-blue-400' : 'text-gray-800 dark:text-gray-200'}`}>{title}</h3>
          <div className="block sm:hidden">
            <svg
              className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''} ${isExpanded ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>
      </div>
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 sm:max-h-screen sm:opacity-100'}`}>
        <div className="p-4 space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};


const Label: React.FC<{ htmlFor: string; children: React.ReactNode; info?: string }> = ({ htmlFor, children, info }) => (
    <label htmlFor={htmlFor} className="flex justify-between items-center text-sm font-medium text-gray-700 dark:text-gray-300">
        <span>{children}</span>
        {info && <span className="text-gray-400 dark:text-gray-500">{info}</span>}
    </label>
);

const Checkbox: React.FC<{ id: string; name: string; checked: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; children: React.ReactNode }> = ({ id, name, checked, onChange, children }) => (
    <div className="flex items-center">
        <input
            id={id}
            name={name}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        />
        <label htmlFor={id} className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            {children}
        </label>
    </div>
);


const ControlsPanel: React.FC<{ state: AppState; setState: React.Dispatch<React.SetStateAction<AppState>> }> = ({ state, setState }) => {
    const logoInputRef = useRef<HTMLInputElement>(null);
    const { translations } = useLanguage();
    const t = translations.controls;
    
    // Mobile accordion state management - only one section expanded at a time
    const [activeSection, setActiveSection] = useState<keyof typeof sections | null>('content');
    
    const sections = {
        content: true,
        colors: true,
        design: true,
        eyes: true,
        logo: true,
        advanced: true
    };
    
    const toggleSection = (section: keyof typeof sections) => {
        // If clicking the same section, close it; otherwise, open the new one
        setActiveSection(prev => prev === section ? null : section);
    };
    
    const isSectionExpanded = (section: keyof typeof sections) => {
        return activeSection === section;
    };
    
    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const isCheckbox = type === 'checkbox';
        const checked = isCheckbox ? (e.target as HTMLInputElement).checked : undefined;
        setState(prevState => ({ ...prevState, [name]: isCheckbox ? checked : value }));
    };
    
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const numValue = parseFloat(value);
        setState(prevState => ({ ...prevState, [name]: numValue }));
    };

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Set a high error correction level automatically when a logo is added for better scannability
                setState(prevState => ({ ...prevState, logo: reader.result as string, errorCorrectionLevel: 'H' }));
            };
            reader.readAsDataURL(file);
        }
    };
    
    const removeLogo = () => {
      setState(prevState => ({...prevState, logo: undefined }));
      if(logoInputRef.current) {
        logoInputRef.current.value = "";
      }
    }
    
    const inputClasses = "mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:text-gray-200";
    const selectClasses = "mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md";
    const rangeClasses = "mt-1 w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer";

    return (
        <div className="space-y-6">
            <CollapsibleCard 
                title={t.content.title}
                expandedState={isSectionExpanded('content')}
                onToggle={() => toggleSection('content')}
            >
                <div>
                    <Label htmlFor="data">{t.content.data}</Label>
                    <input type="text" id="data" name="data" value={state.data} onChange={handleValueChange} placeholder={t.content.placeholder} className={inputClasses} />
                </div>
                <div>
                    <Label htmlFor="quietZone" info={`${state.quietZone}px`}>{t.content.margin}</Label>
                    <input type="range" id="quietZone" name="quietZone" min="0" max="40" step="1" value={state.quietZone} onChange={handleSliderChange} onInput={handleSliderChange} className={rangeClasses} />
                </div>
            </CollapsibleCard>

            <CollapsibleCard 
                title={t.colors.title}
                expandedState={isSectionExpanded('colors')}
                onToggle={() => toggleSection('colors')}
            >
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="foregroundColor">{t.colors.foreground}</Label>
                        <input type="color" id="foregroundColor" name="foregroundColor" value={state.foregroundColor} onChange={handleValueChange} className="mt-1 block w-full h-10 p-1 bg-white border border-gray-300 rounded-md cursor-pointer" />
                    </div>
                    <div>
                        <Label htmlFor="backgroundColor">{t.colors.background}</Label>
                        <input type="color" id="backgroundColor" name="backgroundColor" value={state.backgroundColor} onChange={handleValueChange} className="mt-1 block w-full h-10 p-1 bg-white border border-gray-300 rounded-md cursor-pointer" />
                    </div>
                </div>
            </CollapsibleCard>

            <CollapsibleCard 
                title={t.design.title}
                expandedState={isSectionExpanded('design')}
                onToggle={() => toggleSection('design')}
            >
                <div>
                    <Label htmlFor="qrStyle">{t.design.qrStyle || 'QR Style'}</Label>
                    <select id="qrStyle" name="qrStyle" value={state.qrStyle} onChange={handleValueChange} className={selectClasses}>
                        <option value="squares">Squares</option>
                        <option value="dots">Dots</option>
                        <option value="fluid">Fluid</option>
                    </select>
                </div>
            </CollapsibleCard>

            <CollapsibleCard 
                title={t.eyes?.title || 'Eye Customization'}
                expandedState={isSectionExpanded('eyes')}
                onToggle={() => toggleSection('eyes')}
            >
                <div className="space-y-4">
                    <Checkbox id="useAdvancedEyeColors" name="useAdvancedEyeColors" checked={state.useAdvancedEyeColors} onChange={handleValueChange}>
                        {t.eyes?.useAdvanced || 'Advanced Eye Colors'}
                    </Checkbox>
                    {state.useAdvancedEyeColors ? (
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="eyeColorOuter">{t.eyes?.outerColor || 'Outer Eye Color'}</Label>
                                <input type="color" id="eyeColorOuter" name="eyeColorOuter" value={state.eyeColorOuter} onChange={handleValueChange} className="mt-1 block w-full h-10 p-1 bg-white border border-gray-300 rounded-md cursor-pointer" />
                            </div>
                            <div>
                                <Label htmlFor="eyeColorInner">{t.eyes?.innerColor || 'Inner Eye Color'}</Label>
                                <input type="color" id="eyeColorInner" name="eyeColorInner" value={state.eyeColorInner} onChange={handleValueChange} className="mt-1 block w-full h-10 p-1 bg-white border border-gray-300 rounded-md cursor-pointer" />
                            </div>
                        </div>
                    ) : (
                        <div>
                            <Label htmlFor="eyeColor">{t.eyes?.color || 'Eye Color'}</Label>
                            <input type="color" id="eyeColor" name="eyeColor" value={state.eyeColor} onChange={handleValueChange} className="mt-1 block w-full h-10 p-1 bg-white border border-gray-300 rounded-md cursor-pointer" />
                        </div>
                    )}
                </div>
                <div className="pt-4 space-y-4">
                    <Checkbox id="useAdvancedEyeRadius" name="useAdvancedEyeRadius" checked={state.useAdvancedEyeRadius} onChange={handleValueChange}>
                        {t.eyes?.useAdvancedRadius || 'Advanced Eye Radius'}
                    </Checkbox>
                    {state.useAdvancedEyeRadius ? (
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="eyeRadiusOuter" info={`${state.eyeRadiusOuter}px`}>{t.eyes?.outerRadius || 'Outer Eye Radius'}</Label>
                                <input type="range" id="eyeRadiusOuter" name="eyeRadiusOuter" min="0" max="50" step="1" value={state.eyeRadiusOuter} onChange={handleSliderChange} onInput={handleSliderChange} className={rangeClasses} />
                            </div>
                            <div>
                                <Label htmlFor="eyeRadiusInner" info={`${state.eyeRadiusInner}px`}>{t.eyes?.innerRadius || 'Inner Eye Radius'}</Label>
                                <input type="range" id="eyeRadiusInner" name="eyeRadiusInner" min="0" max="50" step="1" value={state.eyeRadiusInner} onChange={handleSliderChange} onInput={handleSliderChange} className={rangeClasses} />
                            </div>
                        </div>
                    ) : (
                        <div>
                            <Label htmlFor="eyeRadius" info={`${state.eyeRadius}px`}>{t.eyes?.radius || 'Eye Radius'}</Label>
                            <input type="range" id="eyeRadius" name="eyeRadius" min="0" max="50" step="1" value={state.eyeRadius} onChange={handleSliderChange} onInput={handleSliderChange} className={rangeClasses} />
                        </div>
                    )}
                </div>
            </CollapsibleCard>

            <CollapsibleCard 
                title={t.logo.title}
                expandedState={isSectionExpanded('logo')}
                onToggle={() => toggleSection('logo')}
            >
                <div>
                  <Label htmlFor="logo">{t.logo.upload}</Label>
                  <input ref={logoInputRef} type="file" id="logo" name="logo" accept="image/png, image/jpeg, image/svg+xml" onChange={handleLogoUpload} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/50 dark:file:text-blue-300 dark:hover:file:bg-blue-900" />
                  {state.logo && (
                    <button onClick={removeLogo} className="mt-2 text-sm text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400">
                      {t.logo.remove}
                    </button>
                  )}
                </div>
                {state.logo && (
                  <div className="space-y-4 pt-4 border-t border-gray-200/80 dark:border-gray-700/50">
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 dark:border-yellow-600 rounded-r-lg" role="alert">
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">
                            {t.logo.warning}
                        </p>
                    </div>
                    <div>
                        <Label htmlFor="logoSize" info={`${state.logoSize}px`}>{t.logo.size}</Label>
                        <input type="range" id="logoSize" name="logoSize" min="20" max="200" step="5" value={state.logoSize} onChange={handleSliderChange} onInput={handleSliderChange} className={rangeClasses} />
                    </div>
                    <div>
                        <Label htmlFor="logoOpacity" info={`${Math.round(state.logoOpacity * 100)}%`}>{t.logo.opacity}</Label>
                        <input type="range" id="logoOpacity" name="logoOpacity" min="0.1" max="1" step="0.05" value={state.logoOpacity} onChange={handleSliderChange} onInput={handleSliderChange} className={rangeClasses} />
                    </div>
                    <div>
                        <Label htmlFor="logoPadding" info={`${state.logoPadding}px`}>{t.logo?.padding || 'Logo Padding'}</Label>
                        <input type="range" id="logoPadding" name="logoPadding" min="0" max="50" step="1" value={state.logoPadding} onChange={handleSliderChange} onInput={handleSliderChange} className={rangeClasses} />
                    </div>
                    <div>
                        <Label htmlFor="logoPaddingStyle">{t.logo?.paddingStyle || 'Padding Style'}</Label>
                        <select id="logoPaddingStyle" name="logoPaddingStyle" value={state.logoPaddingStyle} onChange={handleValueChange} className={selectClasses}>
                            <option value="square">Square</option>
                            <option value="circle">Circle</option>
                        </select>
                    </div>
                    {state.logoPaddingStyle === 'square' && (
                        <div>
                            <Label htmlFor="logoPaddingRadius" info={`${state.logoPaddingRadius}px`}>{t.logo?.paddingRadius || 'Border Radius'}</Label>
                            <input type="range" id="logoPaddingRadius" name="logoPaddingRadius" min="0" max="25" step="1" value={state.logoPaddingRadius} onChange={handleSliderChange} onInput={handleSliderChange} className={rangeClasses} />
                        </div>
                    )}
                    <div>
                        <Checkbox id="logoBackground" name="logoBackground" checked={state.logoBackground} onChange={handleValueChange}>
                            {t.logo?.background || 'Logo Background'}
                        </Checkbox>
                        {state.logoBackground && (
                            <div className="mt-2">
                                <Label htmlFor="logoBackgroundColor">{t.logo?.backgroundColor || 'Background Color'}</Label>
                                <input type="color" id="logoBackgroundColor" name="logoBackgroundColor" value={state.logoBackgroundColor} onChange={handleValueChange} className="mt-1 block w-full h-10 p-1 bg-white border border-gray-300 rounded-md cursor-pointer" />
                            </div>
                        )}
                    </div>
                  </div>
                )}
            </CollapsibleCard>

            <CollapsibleCard 
                title={t.advanced.title}
                expandedState={isSectionExpanded('advanced')}
                onToggle={() => toggleSection('advanced')}
            >
                <div>
                    <Label htmlFor="errorCorrectionLevel">{t.advanced.errorCorrection}</Label>
                    <select id="errorCorrectionLevel" name="errorCorrectionLevel" value={state.errorCorrectionLevel} onChange={handleValueChange} className={selectClasses}>
                        <option value="L">{t.advanced.low}</option>
                        <option value="M">{t.advanced.medium}</option>
                        <option value="Q">{t.advanced.quartile}</option>
                        <option value="H">{t.advanced.high}</option>
                    </select>
                </div>
            </CollapsibleCard>
        </div>
    );
};

export default ControlsPanel;