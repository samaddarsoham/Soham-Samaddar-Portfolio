import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #ff0033;
    --secondary-color: #00aaff;
    --background-color: #050510;
    --text-color: #ffffff;
    --accent-color: #7700ff;
    --glass-bg: rgba(10, 10, 30, 0.25);
    --glass-border: rgba(255, 255, 255, 0.1);
    --font-main: 'Orbitron', sans-serif;
    --font-secondary: 'Rajdhani', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
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
  }

  body {
    font-family: var(--font-main);
    background-color: var(--background-color);
    color: var(--text-color);
    overflow-x: hidden;
    line-height: 1.6;
  }

  a {
    color: var(--secondary-color);
    text-decoration: none;
    transition: all 0.3s ease;
    position: relative;
    
    &:hover {
      color: var(--primary-color);
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
  }

  p {
    margin-bottom: 1rem;
  }

  .container {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .glass-panel {
    background: var(--glass-bg);
    backdrop-filter: blur(10px);
    border: 1px solid var(--glass-border);
    border-radius: 10px;
  }

  .neon-text {
    text-shadow: 0 0 5px var(--secondary-color), 0 0 10px var(--secondary-color), 0 0 20px var(--secondary-color);
  }

  .neon-border {
    box-shadow: 0 0 5px var(--primary-color), 0 0 10px var(--primary-color);
  }

  .section-padding {
    padding: 100px 0;
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

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
`;

export default GlobalStyles;
