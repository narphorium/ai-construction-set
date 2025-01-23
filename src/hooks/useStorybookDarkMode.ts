import {
  useEffect,
  useGlobals,
  useState,
} from "storybook/internal/preview-api";

export const useStorybookDarkMode = () => {
  const [{ theme }] = useGlobals();
  const [darkMode, setDarkMode] = useState(theme === "dark");

  useEffect(() => {
    setDarkMode(theme === "dark");
  }, [theme]);

  return { darkMode, setDarkMode };
};
