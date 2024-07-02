import { useEffect } from "react";
// Dark Mode Script
import { applyTheme } from "./utils/themeUtils";
// Visibility Script
import { onDOMReady } from "./utils/domUtils";
import './tailwind.css';
// Components
import Calculator from './components/Calculator';

export default function App() {
  useEffect(() => {
    applyTheme();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      onDOMReady(() => {
        document.body.style.visibility = "visible";
      });
    }, 200);
  }, []);
  
  return (
    <div className="App min-h-screen flex items-center justify-center bg-gray-100">
      <Calculator />
    </div>
  );
}
