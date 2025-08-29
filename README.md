# QR Code Generator

[![Deploy Status](https://github.com/marcostolosa/QRCode-Gen/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)](https://github.com/marcostolosa/QRCode-Gen/actions)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=flat&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A modern, feature-rich QR code generator web application built with React, TypeScript, and Vite. Create customizable QR codes with advanced styling options, logo integration, and multiple export formats.

![](/qrcode-generator/components/demo.png)

## Features

### Core Functionality
- **Real-time QR Code Generation**: Instant preview with live updates
- **Multiple Export Formats**: PNG, JPEG, and SVG support
- **Custom Data Input**: Support for URLs, text, and other data types
- **High-Resolution Output**: Scalable vector and raster formats

### Customization Options
- **Color Schemes**: Solid colors and gradient support (linear/radial)
- **Dot Patterns**: Six different dot styles (dots, rounded, classy, square, extra-rounded, classy-rounded)
- **Corner Customization**: Configurable corner squares and corner dots
- **Logo Integration**: Upload and embed custom logos with size, opacity, and margin controls
- **Error Correction Levels**: L, M, Q, H levels for different use cases

### User Experience
- **Dark/Light Theme**: Automatic system preference detection with manual toggle
- **Internationalization**: English and Portuguese language support
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Accessibility**: ARIA labels and keyboard navigation support

## Technology Stack

- **Frontend Framework**: React 18.3.1
- **Language**: TypeScript 5.2.2
- **Build Tool**: Vite 5.3.1
- **Styling**: Tailwind CSS 3.4.4
- **QR Code Library**: qr-code-styling 1.6.0
- **Deployment**: GitHub Pages with GitHub Actions

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/marcostolosa/QRCode-Gen.git
cd QRCode-Gen
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be available in the `dist` directory.

## Usage

### Basic QR Code Generation
1. Enter your data (URL, text, etc.) in the input field
2. Customize appearance using the control panels
3. Preview updates in real-time
4. Select export format and download

### Advanced Customization
- **Colors**: Choose between solid colors or gradients
- **Patterns**: Select from various dot and corner styles
- **Logo**: Upload an image and adjust size, opacity, and margins
- **Error Correction**: Higher levels provide better scanning reliability with logos

## API Reference

### QR Code Options

The application supports all options from the `qr-code-styling` library:

```typescript
interface QRCodeOptions {
  width: number;
  height: number;
  data: string;
  image?: string;
  margin: number;
  qrOptions: {
    errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  };
  dotsOptions: {
    type: DotType;
    color?: string;
    gradient?: GradientOptions;
  };
  backgroundOptions: {
    color: string;
  };
  imageOptions: {
    hideBackgroundDots: boolean;
    imageSize: number;
    margin: number;
    crossOrigin: string;
  };
  cornersSquareOptions: {
    type: CornerSquareType;
    color?: string;
    gradient?: GradientOptions;
  };
  cornersDotOptions: {
    type: CornerDotType;
    color: string;
  };
}
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Maintain component modularity
- Add appropriate type definitions
- Update documentation for new features
- Ensure responsive design compatibility

## Deployment

The application is automatically deployed to GitHub Pages using GitHub Actions. The workflow:

1. Runs on every push to the `main` branch
2. Builds the application using Vite
3. Deploys to GitHub Pages
4. Supports custom domain configuration

### Custom Domain Setup
1. Add CNAME file with your domain
2. Configure DNS CNAME record pointing to `username.github.io`
3. Enable HTTPS in GitHub Pages settings

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **Lighthouse Score**: 95+ for Performance, Accessibility, Best Practices, SEO
- **Bundle Size**: ~210KB JavaScript, ~16KB CSS (gzipped)
- **Load Time**: <2s on 3G networks

## Security

- No sensitive data collection or storage
- Client-side only processing
- HTTPS enforced in production
- No third-party analytics or tracking

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [qr-code-styling](https://github.com/kozakdenys/qr-code-styling) for the QR code generation library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Heroicons](https://heroicons.com/) for the icon set

## Support

For support, please open an issue in the GitHub repository or contact the maintainer.

---

**Live Demo**: [https://qrcode.mindsecurity.org](https://qrcode.mindsecurity.org)
