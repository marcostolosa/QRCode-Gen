# QR Code Generator

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=flat&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

🔗 **Live Demo**: [qrcode.mindsecurity.org](https://qrcode.mindsecurity.org)

A modern, feature-rich QR code generator built with React and TypeScript. Create highly customizable QR codes with advanced styling options, logo embedding, and multiple export formats. Optimized for both desktop and mobile with responsive accordion design.

## ✨ Features

### 🎯 Core Functionality
- **Real-time QR Code Generation**: Instant preview with live updates as you type
- **Multiple Export Formats**: PNG, JPEG, and SVG support with high-resolution output
- **Custom Data Input**: Support for URLs, text, and any data type
- **Download Integration**: One-click download with format selection

### 🎨 Advanced Customization
- **Color Controls**: Foreground and background color customization
- **QR Styles**: Choose from squares, dots, or fluid styles
- **Advanced Eye Customization**: 
  - Basic mode: Single color and radius for all eyes
  - Advanced mode: Separate outer/inner colors and radius control
- **Logo Integration**: Upload custom logos with advanced controls:
  - Size adjustment (20-200px)
  - Opacity control (10-100%)
  - Padding with square/circle style
  - Border radius for square padding
  - Optional background color
- **Error Correction Levels**: L, M, Q, H levels for different reliability needs
- **Quiet Zone**: Adjustable margin around QR code (0-40px)

### 📱 Mobile-First Design
- **Responsive Layout**: QR code always prioritized and visible
- **Accordion Controls**: Space-efficient collapsible sections
- **One Section Open**: Only one control panel open at a time to maximize QR code visibility
- **Touch Optimized**: Smooth animations and mobile-friendly interactions
- **Cross-Device**: Optimized for mobile, tablet, and desktop

### 🌐 User Experience
- **Dark/Light Theme**: System preference detection with manual toggle
- **Internationalization**: Multi-language support (English/Portuguese)
- **Real-time Updates**: See changes instantly as you adjust controls
- **Accessibility**: ARIA labels and keyboard navigation
- **Performance**: Optimized bundle size and fast loading

## 🚀 Technology Stack

- **Frontend**: React 18.3.1 with TypeScript 5.2.2
- **Build Tool**: Vite 5.3.1 for fast development and optimal bundling
- **Styling**: Tailwind CSS 3.4.4 for responsive design
- **QR Generation**: react-qrcode-logo 4.0.0 for advanced QR customization
- **Deployment**: GitHub Pages with custom domain via GitHub Actions
- **Domain**: Custom subdomain qrcode.mindsecurity.org

## 🏁 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Development Setup

```bash
# Clone the repository
git clone https://github.com/marcostolosa/QRCode-Gen.git
cd QRCode-Gen/qrcode-generator

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the application.

### Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

## 📖 Usage Guide

### Basic QR Generation
1. **Enter Data**: Type URL, text, or any content in the input field
2. **Instant Preview**: QR code updates in real-time
3. **Choose Format**: Select PNG, JPEG, or SVG
4. **Download**: Click download button

### Advanced Customization

#### Colors & Style
- Adjust foreground and background colors
- Choose between squares, dots, or fluid QR styles

#### Eye Customization
- **Basic Mode**: Single color and radius for all corner eyes
- **Advanced Mode**: 
  - Separate outer and inner eye colors
  - Individual outer and inner radius control
  - Toggle between modes easily

#### Logo Integration
- Upload PNG, JPEG, or SVG logos
- Adjust size from 20-200 pixels
- Control opacity from 10-100%
- Add padding with square or circular style
- Customize border radius for square padding
- Optional background color for logo area

#### Mobile Experience
- **Accordion Navigation**: Tap section headers to expand/collapse
- **One Section Rule**: Only one section opens at a time for space efficiency
- **QR Code Priority**: Always visible at the top on mobile
- **Smooth Transitions**: Animated expand/collapse with visual feedback

## 🔧 Configuration Options

### QR Code Properties
```typescript
interface QRCodeProps {
  value: string;              // QR code data
  size: number;               // QR code size (400px)
  fgColor: string;            // Foreground color
  bgColor: string;            // Background color
  qrStyle: 'squares' | 'dots' | 'fluid';
  ecLevel: 'L' | 'M' | 'Q' | 'H';  // Error correction
  quietZone: number;          // Margin in pixels
  logoImage?: string;         // Base64 logo image
  logoWidth: number;          // Logo width in pixels
  logoHeight: number;         // Logo height in pixels
  logoOpacity: number;        // Logo opacity (0-1)
  logoPadding: number;        // Logo padding
  logoPaddingStyle: 'square' | 'circle';
  logoPaddingRadius: number;  // Border radius for square padding
  eyeColor: string | { outer: string; inner: string };
  eyeRadius: number | { outer: number; inner: number };
}
```

## 🚀 Deployment

The application is automatically deployed to GitHub Pages using GitHub Actions:

- **Production URL**: [qrcode.mindsecurity.org](https://qrcode.mindsecurity.org)
- **GitHub Pages**: [marcostolosa.github.io/QRCode-Gen](https://marcostolosa.github.io/QRCode-Gen/)
- **Auto Deploy**: Pushes to main branch trigger automatic deployment
- **Custom Domain**: Configured with DNS CNAME to qrcode.mindsecurity.org

### Manual Deployment
```bash
npm run build     # Build production bundle
npm run deploy    # Deploy to GitHub Pages
```

## 📱 Browser Support

- **Desktop**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile**: iOS Safari, Chrome Mobile, Samsung Internet
- **Progressive**: Graceful degradation for older browsers

## ⚡ Performance

- **Bundle Size**: ~192KB JavaScript, ~17KB CSS (gzipped)
- **Load Time**: <2s on 3G networks
- **Lighthouse Score**: 95+ across all metrics
- **Mobile Optimized**: First-class mobile experience

## 🔒 Security & Privacy

- **Client-Side Only**: All processing happens in your browser
- **No Data Collection**: No analytics, tracking, or data storage
- **HTTPS Enforced**: Secure connection for all requests
- **No External APIs**: Completely self-contained application

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Maintain responsive design principles
- Test on multiple screen sizes
- Update documentation for new features

## 📄 License

Apache License 2.0 - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[react-qrcode-logo](https://github.com/gcoro/react-qrcode-logo)** - Advanced QR code generation
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Heroicons](https://heroicons.com/)** - Beautiful SVG icons
- **[Vite](https://vitejs.dev/)** - Fast build tool and dev server

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/marcostolosa/QRCode-Gen/issues)
- **Discussions**: [GitHub Discussions](https://github.com/marcostolosa/QRCode-Gen/discussions)
- **Live Demo**: [qrcode.mindsecurity.org](https://qrcode.mindsecurity.org)

---

**Built with ❤️ using React, TypeScript, and modern web technologies**