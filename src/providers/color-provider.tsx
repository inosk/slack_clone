'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

type Colors = 'blue' | 'green' | '';

type ColorPreferencesContext = {
  color: Colors;
  selectColor: (color: Colors) => void;
};

const ColorPreferencesContext = createContext<
  ColorPreferencesContext | undefined
>(undefined);

export const useColorPreferences = () => {
  const context = useContext(ColorPreferencesContext);
  if (!context) {
    throw new Error(
      'useColorPreferences must be used within a ColorPreferencesProvider',
    );
  }
  return context;
};

export const ColorPreferencesProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  // テーマカラーの初期値
  // localstorageに設定があればそれをセットする
  const [color, setColor] = useState<Colors>(() => {
    const storedColor =
      typeof localStorage !== 'undefined'
        ? localStorage.getItem('selectedColor')
        : null;
    return (storedColor as Colors) || '';
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    localStorage.setItem('selectedColor', color);
    setIsMounted(true);
  }, [color]);

  const selectColor = (selectedColor: Colors) => setColor(selectedColor);

  const value: ColorPreferencesContext = {
    color,
    selectColor,
  };

  if (!isMounted) null;

  return (
    <ColorPreferencesContext.Provider value={value}>
      {children}
    </ColorPreferencesContext.Provider>
  );
};
