import React, { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';
import { initialDevices } from '@/data/devices';
import { Device, DeviceType } from '@/types';

type DeviceContextValue = {
  devices: Device[];
  toggleDevice: (id: string) => void;
  toggleAll: (type: DeviceType) => void;
  setDeviceActive: (id: string, active: boolean) => void;
  setAllActive: (type: DeviceType, active: boolean) => void;
  devicesByType: (type: DeviceType) => Device[];
};

const DeviceContext = createContext<DeviceContextValue | null>(null);

export function DeviceProvider({ children }: PropsWithChildren) {
  const [devices, setDevices] = useState<Device[]>(initialDevices);

  function toggleDevice(id: string) {
    setDevices((current) =>
      current.map((device) =>
        device.id === id ? { ...device, active: !device.active } : device,
      ),
    );
  }

  function setDeviceActive(id: string, active: boolean) {
    setDevices((current) =>
      current.map((device) =>
        device.id === id ? { ...device, active } : device,
      ),
    );
  }

  function setAllActive(type: DeviceType, active: boolean) {
    setDevices((current) =>
      current.map((device) =>
        device.type === type ? { ...device, active } : device,
      ),
    );
  }

  function toggleAll(type: DeviceType) {
    setDevices((current) => {
      const selected = current.filter((device) => device.type === type);
      const shouldActivate = selected.some((device) => !device.active);

      return current.map((device) =>
        device.type === type ? { ...device, active: shouldActivate } : device,
      );
    });
  }

  const value = useMemo(
    () => ({
      devices,
      toggleDevice,
      toggleAll,
      setDeviceActive,
      setAllActive,
      devicesByType: (type: DeviceType) => devices.filter((device) => device.type === type),
    }),
    [devices],
  );

  return <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>;
}

export function useDevices() {
  const context = useContext(DeviceContext);
  if (!context) throw new Error('useDevices deve ser usado dentro de DeviceProvider.');
  return context;
}
