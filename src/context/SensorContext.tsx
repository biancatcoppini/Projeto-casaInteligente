import React, { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';

type SensorContextValue = {
  mainDoorOpen: boolean;
  ambientDark: boolean;
  motionDetected: boolean;
  temperature: number;
  setMainDoorOpen: (open: boolean) => void;
  setAmbientDark: (dark: boolean) => void;
  setMotionDetected: (detected: boolean) => void;
  setTemperature: (value: number) => void;
};

const SensorContext = createContext<SensorContextValue | null>(null);

export function SensorProvider({ children }: PropsWithChildren) {
  const [mainDoorOpen, setMainDoorOpen] = useState(false);
  const [ambientDark, setAmbientDark] = useState(false);
  const [motionDetected, setMotionDetected] = useState(false);
  const [temperature, setTemperature] = useState(24);

  const value = useMemo(
    () => ({
      mainDoorOpen,
      ambientDark,
      motionDetected,
      temperature,
      setMainDoorOpen,
      setAmbientDark,
      setMotionDetected,
      setTemperature,
    }),
    [mainDoorOpen, ambientDark, motionDetected, temperature],
  );

  return <SensorContext.Provider value={value}>{children}</SensorContext.Provider>;
}

export function useSensors() {
  const context = useContext(SensorContext);
  if (!context) throw new Error('useSensors deve ser usado dentro de SensorProvider.');
  return context;
}
