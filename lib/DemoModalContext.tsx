'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

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
  return (
    <DemoModalContext.Provider value={{
      openModal:  () => setIsOpen(true),
      closeModal: () => setIsOpen(false),
      isOpen,
    }}>
      {children}
    </DemoModalContext.Provider>
  );
}

export const useDemoModal = () => useContext(DemoModalContext);
