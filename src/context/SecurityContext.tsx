import React, { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { useDevices } from '@/context/DeviceContext';
import { useSensors } from '@/context/SensorContext';

type SecurityContextValue = {
  securityEnabled: boolean;
  alarmActive: boolean;
  doorWarning: boolean;
  setSecurityEnabled: (enabled: boolean) => void;
  activateSecurity: () => void;
  deactivateSecurity: () => void;
};

const SecurityContext = createContext<SecurityContextValue | null>(null);

export function SecurityProvider({ children }: PropsWithChildren) {
  const { setAllActive, setDeviceActive } = useDevices();
  const { mainDoorOpen, motionDetected } = useSensors();
  const [securityEnabled, setSecurityEnabledState] = useState(false);
  const [alarmActive, setAlarmActive] = useState(false);

  const activateSecurity = () => {
    setAllActive('lights', false);
    setDeviceActive('garage-gate', false);
    setSecurityEnabledState(true);
  };

  const deactivateSecurity = () => {
    setSecurityEnabledState(false);
    setAlarmActive(false);
  };

  const setSecurityEnabled = (enabled: boolean) => {
    if (enabled) activateSecurity();
    else deactivateSecurity();
  };

  useEffect(() => {
    if (securityEnabled && motionDetected) {
      setAlarmActive(true);
    }

    if (!securityEnabled) {
      setAlarmActive(false);
    }
  }, [securityEnabled, motionDetected]);

  const value = useMemo(
    () => ({
      securityEnabled,
      alarmActive,
      doorWarning: securityEnabled && mainDoorOpen,
      setSecurityEnabled,
      activateSecurity,
      deactivateSecurity,
    }),
    [securityEnabled, alarmActive, mainDoorOpen],
  );

  return <SecurityContext.Provider value={value}>{children}</SecurityContext.Provider>;
}

export function useSecurity() {
  const context = useContext(SecurityContext);
  if (!context) throw new Error('useSecurity deve ser usado dentro de SecurityProvider.');
  return context;
}
