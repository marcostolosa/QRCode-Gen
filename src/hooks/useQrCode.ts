/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import type { Options, FileExtension } from 'qr-code-styling';

export const useQrCode = (options: Options) => {
  const ref = useRef<HTMLDivElement>(null);
  const qrCodeInstance = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    if (ref.current) {
        if (!qrCodeInstance.current) {
            qrCodeInstance.current = new QRCodeStyling(options);
            qrCodeInstance.current.append(ref.current);
        } else {
            qrCodeInstance.current.update(options);
        }
    }
  }, [options, ref]);

  const download = (downloadOptions: { name: string; extension: FileExtension }) => {
    if (qrCodeInstance.current) {
      qrCodeInstance.current.download(downloadOptions);
    }
  };

  return { ref, download };
};