import { Sun, Moon } from "lucide-react";
import { useDarkMode } from "../context/DarkModeContext";

export default function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      aria-label="Toggle theme"
      className="p-2 rounded-full border transition-colors duration-300 hover:bg-red-500 hover:text-white border-red-500 text-red-500"
    >
      {darkMode ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
}