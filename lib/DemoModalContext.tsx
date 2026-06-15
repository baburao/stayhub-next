'use client';
import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';

interface DemoModalContextType {
  openModal:  () => void;
  closeModal: () => void;
  isOpen:     boolean;
}

const DemoModalContext = createContext<DemoModalContextType>({
  openModal:  () => {},
  closeModal: () => {},
  isOpen:     false,
});

export function DemoModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const openModal  = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const value = useMemo(() => ({ openModal, closeModal, isOpen }), [openModal, closeModal, isOpen]);
  return (
    <DemoModalContext.Provider value={value}>
      {children}
    </DemoModalContext.Provider>
  );
}

export const useDemoModal = () => useContext(DemoModalContext);
