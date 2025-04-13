const futuristicTheme = {
  colors: {
    // Primary colors
    primary: '#00f0ff', // Bright cyan
    secondary: '#ff0055', // Neon pink
    tertiary: '#7700ff', // Electric purple
    quaternary: '#00ff66', // Neon green
    
    // Background colors
    background: '#050510', // Deep space blue
    backgroundAlt: '#0a0a20', // Slightly lighter blue
    backgroundGlow: 'rgba(0, 240, 255, 0.1)', // Cyan glow
    
    // Text colors
    text: '#ffffff', // Pure white
    textSecondary: 'rgba(255, 255, 255, 0.8)', // Slightly transparent white
    textAccent: '#00f0ff', // Cyan accent
    
    // UI elements
    card: 'rgba(10, 10, 30, 0.6)', // Semi-transparent card
    border: 'rgba(0, 240, 255, 0.3)', // Cyan border
    borderGlow: '0 0 20px rgba(0, 240, 255, 0.5)', // Cyan glow
    
    // Gradients
    gradient1: 'linear-gradient(45deg, #00f0ff, #7700ff)', // Cyan to purple
    gradient2: 'linear-gradient(45deg, #ff0055, #7700ff)', // Pink to purple
    gradient3: 'linear-gradient(45deg, #00ff66, #00f0ff)', // Green to cyan
    
    // Status colors
    success: '#00ff66', // Neon green
    warning: '#ffaa00', // Amber
    error: '#ff0055', // Neon pink
    info: '#00f0ff', // Cyan
  },
  
  fonts: {
    main: "'Orbitron', sans-serif",
    secondary: "'Rajdhani', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  
  sizes: {
    maxWidth: '1400px',
    headerHeight: '80px',
    borderRadius: {
      small: '5px',
      medium: '10px',
      large: '20px',
      pill: '50px',
    },
  },
  
  shadows: {
    text: '0 0 10px rgba(0, 240, 255, 0.7)',
    box: '0 10px 30px rgba(0, 0, 0, 0.5)',
    neon: '0 0 20px rgba(0, 240, 255, 0.7)',
    neonStrong: '0 0 30px rgba(0, 240, 255, 1)',
    neonPink: '0 0 20px rgba(255, 0, 85, 0.7)',
    neonPurple: '0 0 20px rgba(119, 0, 255, 0.7)',
    neonGreen: '0 0 20px rgba(0, 255, 102, 0.7)',
  },
  
  animations: {
    fast: '0.2s',
    medium: '0.5s',
    slow: '1s',
  },
  
  breakpoints: {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1400px',
  },
  
  zIndex: {
    background: -1,
    base: 0,
    content: 10,
    overlay: 20,
    modal: 30,
    tooltip: 40,
    header: 50,
  },
};

export default futuristicTheme;
