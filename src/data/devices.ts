import { Device } from '@/types';

export const initialDevices: Device[] = [
  { id: 'light-sala', name: 'Luz da Sala', room: 'Sala', type: 'lights', active: false },
  { id: 'light-quarto', name: 'Luz do Quarto', room: 'Quarto', type: 'lights', active: false },
  { id: 'light-externa', name: 'Luz Externa', room: 'Área Externa', type: 'lights', active: false },
  { id: 'garage-gate', name: 'Portão da Garagem', room: 'Garagem', type: 'garage', active: false },
];

export const rooms = [
  'Sala',
  'Quarto',
  'Cozinha',
  'Banheiro',
  'Garagem',
  'Entrada',
  'Área Externa',
];
