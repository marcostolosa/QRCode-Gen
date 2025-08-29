/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import type { AppState } from '../App';
import { useLanguage } from '../context/LanguageContext';

const Card: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className = '' }) => (
    <div className={`bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200/80 dark:border-gray-700/50 shadow-sm ${className} transition-colors duration-300`}>
        <div className="p-4 border-b border-gray-200/80 dark:border-gray-700/50">
            <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200">{title}</h3>
        </div>
        <div className="p-4 space-y-4">
            {children}
        </div>
    </div>
);

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
    
    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const isCheckbox = type === 'checkbox';
        const checked = isCheckbox ? (e.target as HTMLInputElement).checked : undefined;
        setState(prevState => ({ ...prevState, [name]: isCheckbox ? checked : value }));
    };
    
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState(prevState => ({ ...prevState, [name]: Number(value) }));
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
            <Card title={t.content.title}>
                <div>
                    <Label htmlFor="data">{t.content.data}</Label>
                    <input type="text" id="data" name="data" value={state.data} onChange={handleValueChange} placeholder={t.content.placeholder} className={inputClasses} />
                </div>
                <div>
                    <Label htmlFor="margin" info={`${state.margin}px`}>{t.content.margin}</Label>
                    <input type="range" id="margin" name="margin" min="0" max="40" step="1" value={state.margin} onChange={handleSliderChange} className={rangeClasses} />
                </div>
            </Card>

            <Card title={t.colors.title}>
                <div className="grid grid-cols-2 gap-4">
                    {state.useGradient ? (
                        <>
                        <div>
                            <Label htmlFor="gradientColor1">{t.colors.gradientStart}</Label>
                            <input type="color" id="gradientColor1" name="gradientColor1" value={state.gradientColor1} onChange={handleValueChange} className="mt-1 block w-full h-10 p-1 bg-white border border-gray-300 rounded-md cursor-pointer" />
                        </div>
                        <div>
                            <Label htmlFor="gradientColor2">{t.colors.gradientEnd}</Label>
                            <input type="color" id="gradientColor2" name="gradientColor2" value={state.gradientColor2} onChange={handleValueChange} className="mt-1 block w-full h-10 p-1 bg-white border border-gray-300 rounded-md cursor-pointer" />
                        </div>
                        </>
                    ) : (
                         <div>
                            <Label htmlFor="foregroundColor">{t.colors.foreground}</Label>
                            <input type="color" id="foregroundColor" name="foregroundColor" value={state.foregroundColor} onChange={handleValueChange} className="mt-1 block w-full h-10 p-1 bg-white border border-gray-300 rounded-md cursor-pointer" />
                        </div>
                    )}
                     <div>
                        <Label htmlFor="backgroundColor">{t.colors.background}</Label>
                        <input type="color" id="backgroundColor" name="backgroundColor" value={state.backgroundColor} onChange={handleValueChange} className="mt-1 block w-full h-10 p-1 bg-white border border-gray-300 rounded-md cursor-pointer" />
                    </div>
                </div>
                <div className="pt-2 space-y-4">
                   <Checkbox id="useGradient" name="useGradient" checked={state.useGradient} onChange={handleValueChange}>{t.colors.useGradient}</Checkbox>
                   {state.useGradient && (
                     <div>
                        <Label htmlFor="gradientType">{t.colors.gradientType}</Label>
                        <select id="gradientType" name="gradientType" value={state.gradientType} onChange={handleValueChange} className={selectClasses}>
                            <option value="linear">{t.colors.linear}</option>
                            <option value="radial">{t.colors.radial}</option>
                        </select>
                    </div>
                   )}
                </div>
            </Card>

            <Card title={t.design.title}>
                <div>
                    <Label htmlFor="dotType">{t.design.dotStyle}</Label>
                    <select id="dotType" name="dotType" value={state.dotType} onChange={handleValueChange} className={selectClasses}>
                        <option value="dots">Dots</option>
                        <option value="rounded">Rounded</option>
                        <option value="classy">Classy</option>
                        <option value="classy-rounded">Classy Rounded</option>
                        <option value="square">Square</option>
                        <option value="extra-rounded">Extra Rounded</option>
                    </select>
                </div>
                <div>
                    <Label htmlFor="cornerSquareType">{t.design.cornerSquare}</Label>
                    <select id="cornerSquareType" name="cornerSquareType" value={state.cornerSquareType} onChange={handleValueChange} className={selectClasses}>
                        <option value="dot">Dot</option>
                        <option value="square">Square</option>
                        <option value="extra-rounded">Extra Rounded</option>
                    </select>
                </div>
                <div>
                    <Label htmlFor="cornerDotType">{t.design.cornerDot}</Label>
                    <select id="cornerDotType" name="cornerDotType" value={state.cornerDotType} onChange={handleValueChange} className={selectClasses}>
                        <option value="dot">Dot</option>
                        <option value="square">Square</option>
                    </select>
                </div>
            </Card>

            <Card title={t.logo.title}>
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
                        <Label htmlFor="logoSize" info={`${Math.round(state.logoSize * 100)}%`}>{t.logo.size}</Label>
                        <input type="range" id="logoSize" name="logoSize" min="0.1" max="1" step="0.05" value={state.logoSize} onChange={handleSliderChange} className={rangeClasses} />
                    </div>
                    <div>
                        <Label htmlFor="logoOpacity" info={`${Math.round(state.logoOpacity * 100)}%`}>{t.logo.opacity}</Label>
                        <input type="range" id="logoOpacity" name="logoOpacity" min="0.1" max="1" step="0.05" value={state.logoOpacity} onChange={handleSliderChange} className={rangeClasses} />
                    </div>
                    <div>
                        <Label htmlFor="logoMargin" info={`${state.logoMargin}px`}>{t.logo.margin}</Label>
                        <input type="range" id="logoMargin" name="logoMargin" min="0" max="20" step="1" value={state.logoMargin} onChange={handleSliderChange} className={rangeClasses} />
                    </div>
                  </div>
                )}
            </Card>

             <Card title={t.advanced.title}>
                <div>
                    <Label htmlFor="errorCorrectionLevel">{t.advanced.errorCorrection}</Label>
                    <select id="errorCorrectionLevel" name="errorCorrectionLevel" value={state.errorCorrectionLevel} onChange={handleValueChange} className={selectClasses}>
                        <option value="L">{t.advanced.low}</option>
                        <option value="M">{t.advanced.medium}</option>
                        <option value="Q">{t.advanced.quartile}</option>
                        <option value="H">{t.advanced.high}</option>
                    </select>
                </div>
            </Card>
        </div>
    );
};

export default ControlsPanel;