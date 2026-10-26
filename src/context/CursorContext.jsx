import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const CursorContext = createContext(null);

export function CursorProvider({ children }) {
  const [cursorVariant, setCursorVariant] = useState('default');
  const [cursorText, setCursorText] = useState('');
  const location = useLocation();

  const setCursor = useCallback((variant, text = '') => {
    setCursorVariant(variant);
    setCursorText(text);
  }, []);

  const resetCursor = useCallback(() => {
    setCursorVariant('default');
    setCursorText('');
  }, []);

  // Reset cursor on route change (T3-ROUTE-03 guarantee)
  useEffect(() => {
    resetCursor();
  }, [location.pathname, resetCursor]);

  return (
    <CursorContext.Provider
      value={{
        cursorVariant,
        cursorText,
        setCursorVariant,
        setCursorText,
        setCursor,
        resetCursor,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
}

export default CursorContext;
