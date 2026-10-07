import { Device, DeviceType } from '@/types';

export type AllDevicesState = 'all' | 'none' | 'mixed';

export function useControlStatus(devices: Device[], type: DeviceType) {
  const selected = devices.filter((device) => device.type === type);
  const activeCount = selected.filter((device) => device.active).length;
  const allActive = selected.length > 0 && activeCount === selected.length;
  const allInactive = selected.length > 0 && activeCount === 0;

  let allState: AllDevicesState = 'mixed';
  if (allActive) allState = 'all';
  if (allInactive) allState = 'none';

  if (type === 'garage') {
    return {
      allActive,
      allInactive,
      allState,
      anyActive: activeCount > 0,
      activeText: 'Aberto',
      inactiveText: 'Fechado',
      allActionText: allActive ? 'Fechar garagem' : 'Abrir garagem',
    };
  }

  return {
    allActive,
    allInactive,
    allState,
    anyActive: activeCount > 0,
    activeText: 'Ligada',
    inactiveText: 'Apagada',
    allActionText: allActive ? 'Apagar todas' : 'Acender todas',
  };
}
