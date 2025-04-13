import { createGlobalStyle } from 'styled-components';

const FuturisticGlobalStyles = createGlobalStyle`
  :root {
    --primary-color: ${({ theme }) => theme.colors.primary};
    --secondary-color: ${({ theme }) => theme.colors.secondary};
    --tertiary-color: ${({ theme }) => theme.colors.tertiary};
    --quaternary-color: ${({ theme }) => theme.colors.quaternary};
    
    --background-color: ${({ theme }) => theme.colors.background};
    --background-alt-color: ${({ theme }) => theme.colors.backgroundAlt};
    --background-glow: ${({ theme }) => theme.colors.backgroundGlow};
    
    --text-color: ${({ theme }) => theme.colors.text};
    --text-secondary-color: ${({ theme }) => theme.colors.textSecondary};
    --text-accent-color: ${({ theme }) => theme.colors.textAccent};
    
    --card-color: ${({ theme }) => theme.colors.card};
    --border-color: ${({ theme }) => theme.colors.border};
    --border-glow: ${({ theme }) => theme.colors.borderGlow};
    
    --gradient-1: ${({ theme }) => theme.colors.gradient1};
    --gradient-2: ${({ theme }) => theme.colors.gradient2};
    --gradient-3: ${({ theme }) => theme.colors.gradient3};
    
    --success-color: ${({ theme }) => theme.colors.success};
    --warning-color: ${({ theme }) => theme.colors.warning};
    --error-color: ${({ theme }) => theme.colors.error};
    --info-color: ${({ theme }) => theme.colors.info};
    
    --font-main: ${({ theme }) => theme.fonts.main};
    --font-secondary: ${({ theme }) => theme.fonts.secondary};
    --font-mono: ${({ theme }) => theme.fonts.mono};
    
    --text-shadow: ${({ theme }) => theme.shadows.text};
    --box-shadow: ${({ theme }) => theme.shadows.box};
    --neon-shadow: ${({ theme }) => theme.shadows.neon};
    --neon-strong-shadow: ${({ theme }) => theme.shadows.neonStrong};
    --neon-pink-shadow: ${({ theme }) => theme.shadows.neonPink};
    --neon-purple-shadow: ${({ theme }) => theme.shadows.neonPurple};
    --neon-green-shadow: ${({ theme }) => theme.shadows.neonGreen};
    
    --animation-fast: ${({ theme }) => theme.animations.fast};
    --animation-medium: ${({ theme }) => theme.animations.medium};
    --animation-slow: ${({ theme }) => theme.animations.slow};
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scrollbar-width: thin;
    scrollbar-color: var(--primary-color) var(--background-color);
  }

  *::-webkit-scrollbar {
    width: 6px;
  }

  *::-webkit-scrollbar-track {
    background: var(--background-color);
  }

  *::-webkit-scrollbar-thumb {
    background-color: var(--primary-color);
    border-radius: 10px;
    box-shadow: var(--neon-shadow);
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: var(--font-main);
    background-color: var(--background-color);
    color: var(--text-color);
    overflow-x: hidden;
    line-height: 1.6;
    background-image: 
      radial-gradient(circle at 20% 30%, rgba(0, 240, 255, 0.05) 0%, transparent 20%),
      radial-gradient(circle at 80% 70%, rgba(119, 0, 255, 0.05) 0%, transparent 20%),
      radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
    background-attachment: fixed;
  }

  a {
    color: var(--primary-color);
    text-decoration: none;
    transition: all 0.3s ease;
    position: relative;
    
    &:hover {
      color: var(--secondary-color);
      text-shadow: var(--neon-pink-shadow);
    }
  }

  button {
    font-family: var(--font-main);
    cursor: pointer;
    border: none;
    outline: none;
    background: transparent;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
    color: var(--text-color);
  }

  h1 {
    font-size: clamp(2.5rem, 8vw, 5rem);
    text-shadow: var(--text-shadow);
    letter-spacing: 2px;
  }

  h2 {
    font-size: clamp(2rem, 6vw, 3.5rem);
    text-shadow: var(--text-shadow);
    letter-spacing: 1.5px;
  }

  h3 {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    letter-spacing: 1px;
  }

  p {
    margin-bottom: 1rem;
    font-family: var(--font-secondary);
  }

  .container {
    width: 100%;
    max-width: ${({ theme }) => theme.sizes.maxWidth};
    margin: 0 auto;
    padding: 0 2rem;
  }

  .section-padding {
    padding: 100px 0;
  }

  /* Futuristic UI Classes */
  .neon-text {
    text-shadow: var(--neon-shadow);
  }

  .neon-text-strong {
    text-shadow: var(--neon-strong-shadow);
  }

  .neon-text-pink {
    text-shadow: var(--neon-pink-shadow);
  }

  .neon-text-purple {
    text-shadow: var(--neon-purple-shadow);
  }

  .neon-text-green {
    text-shadow: var(--neon-green-shadow);
  }

  .neon-border {
    border: 1px solid var(--primary-color);
    box-shadow: var(--neon-shadow);
  }

  .neon-border-pink {
    border: 1px solid var(--secondary-color);
    box-shadow: var(--neon-pink-shadow);
  }

  .neon-border-purple {
    border: 1px solid var(--tertiary-color);
    box-shadow: var(--neon-purple-shadow);
  }

  .neon-border-green {
    border: 1px solid var(--quaternary-color);
    box-shadow: var(--neon-green-shadow);
  }

  .glass-panel {
    background: var(--card-color);
    backdrop-filter: blur(10px);
    border: 1px solid var(--border-color);
    border-radius: ${({ theme }) => theme.sizes.borderRadius.medium};
    box-shadow: var(--box-shadow);
  }

  .glass-panel-strong {
    background: var(--card-color);
    backdrop-filter: blur(15px);
    border: 2px solid var(--primary-color);
    border-radius: ${({ theme }) => theme.sizes.borderRadius.medium};
    box-shadow: var(--neon-shadow), var(--box-shadow);
  }

  .gradient-text-1 {
    background: var(--gradient-1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }

  .gradient-text-2 {
    background: var(--gradient-2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }

  .gradient-text-3 {
    background: var(--gradient-3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }

  .gradient-border {
    position: relative;
    
    &:before {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: var(--gradient-1);
      border-radius: inherit;
      z-index: -1;
    }
    
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: var(--background-color);
      border-radius: inherit;
      z-index: -1;
    }
  }

  /* Animations */
  @keyframes pulse {
    0% {
      opacity: 0.8;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.05);
    }
    100% {
      opacity: 0.8;
      transform: scale(1);
    }
  }

  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  @keyframes glow {
    0% {
      box-shadow: 0 0 5px var(--primary-color);
    }
    50% {
      box-shadow: 0 0 20px var(--primary-color), 0 0 30px var(--primary-color);
    }
    100% {
      box-shadow: 0 0 5px var(--primary-color);
    }
  }

  @keyframes glitch {
    0% {
      transform: translate(0);
    }
    20% {
      transform: translate(-2px, 2px);
    }
    40% {
      transform: translate(-2px, -2px);
    }
    60% {
      transform: translate(2px, 2px);
    }
    80% {
      transform: translate(2px, -2px);
    }
    100% {
      transform: translate(0);
    }
  }

  @keyframes scanline {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(100%);
    }
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .animate-pulse {
    animation: pulse 2s infinite ease-in-out;
  }

  .animate-float {
    animation: float 6s infinite ease-in-out;
  }

  .animate-glow {
    animation: glow 2s infinite ease-in-out;
  }

  .animate-glitch {
    animation: glitch 0.5s infinite ease-in-out alternate;
  }

  .animate-rotate {
    animation: rotate 10s infinite linear;
  }

  /* Responsive utilities */
  .hide-on-mobile {
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      display: none !important;
    }
  }

  .show-on-mobile {
    display: none !important;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      display: block !important;
    }
  }
`;

export default FuturisticGlobalStyles;
