import React, { ReactNode, useEffect } from "react";

interface StorybookThemeProviderProps {
  theme: string;
  darkMode: boolean;
  children: ReactNode;
}

export const StorybookThemeProvider = ({
  theme,
  darkMode,
  children,
}: StorybookThemeProviderProps): JSX.Element => {
  useEffect(() => {
    const el = document.querySelector("body");
    if (el != null) {
      // Remove all classes that start with 'prefix-'
      el.classList.forEach((className) => {
        if (className.startsWith("aics-") && className.endsWith("-theme")) {
          el.classList.remove(className);
        }
      });
      el.classList.add(`aics-${theme}-theme`);
      if (darkMode) {
        el.classList.add("dark");
      } else {
        el.classList.remove("dark");
      }
    }
  }, [theme, darkMode]);

  return <>{children}</>;
};
