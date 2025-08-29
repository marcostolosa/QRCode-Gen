/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
export type Translation = typeof en;

const en = {
    header: {
        title: 'QR Code Generator',
    },
    controls: {
        content: {
            title: 'Content',
            data: 'URL or Text',
            placeholder: 'Enter URL or text',
            margin: 'Margin',
        },
        colors: {
            title: 'Colors & Style',
            foreground: 'Foreground',
            background: 'Background',
            useGradient: 'Use Gradient',
            gradientStart: 'Gradient Start',
            gradientEnd: 'Gradient End',
            gradientType: 'Gradient Type',
            linear: 'Linear',
            radial: 'Radial',
        },
        design: {
            title: 'Design',
            dotStyle: 'Dot Style',
            cornerSquare: 'Corner Square Style',
            cornerDot: 'Corner Dot Style',
        },
        logo: {
            title: 'Logo',
            upload: 'Upload Logo',
            remove: 'Remove Logo',
            size: 'Logo Size',
            opacity: 'Logo Opacity',
            margin: 'Logo Margin',
            warning: "For best results, keep logo size reasonable and use a 'High (H)' error correction level.",
        },
        advanced: {
            title: 'Advanced',
            errorCorrection: 'Error Correction Level',
            low: 'Low (L) - up to 7% damage',
            medium: 'Medium (M) - up to 15% damage',
            quartile: 'Quartile (Q) - up to 25% damage',
            high: 'High (H) - up to 30% damage',
        }
    },
    preview: {
        format: 'Format',
        selectFormat: 'Select download format',
        download: 'Download',
    }
};

const pt: Translation = {
    header: {
        title: 'Gerador de Código QR',
    },
    controls: {
        content: {
            title: 'Conteúdo',
            data: 'URL ou Texto',
            placeholder: 'Digite a URL ou texto',
            margin: 'Margem',
        },
        colors: {
            title: 'Cores e Estilo',
            foreground: 'Cor Primária',
            background: 'Cor de Fundo',
            useGradient: 'Usar Gradiente',
            gradientStart: 'Início do Gradiente',
            gradientEnd: 'Fim do Gradiente',
            gradientType: 'Tipo de Gradiente',
            linear: 'Linear',
            radial: 'Radial',
        },
        design: {
            title: 'Design',
            dotStyle: 'Estilo dos Pontos',
            cornerSquare: 'Estilo do Canto (Quadrado)',
            cornerDot: 'Estilo do Canto (Ponto)',
        },
        logo: {
            title: 'Logo',
            upload: 'Carregar Logo',
            remove: 'Remover Logo',
            size: 'Tamanho do Logo',
            opacity: 'Opacidade do Logo',
            margin: 'Margem do Logo',
            warning: "Para melhores resultados, mantenha o tamanho do logo razoável e use o nível de correção de erros 'Alto (H)'.",
        },
        advanced: {
            title: 'Avançado',
            errorCorrection: 'Nível de Correção de Erros',
            low: 'Baixo (L) - até 7% de dano',
            medium: 'Médio (M) - até 15% de dano',
            quartile: 'Quartil (Q) - até 25% de dano',
            high: 'Alto (H) - até 30% de dano',
        }
    },
    preview: {
        format: 'Formato',
        selectFormat: 'Selecione o formato para download',
        download: 'Baixar',
    }
};


export const translations = { en, pt };