import { DeviceType } from '@/types';

export function getControlCopy(type: DeviceType) {
  if (type === 'garage') {
    return {
      title: 'Garagem',
      subtitle: 'Controle o portão da garagem.',
      empty: 'Nenhum portão cadastrado.',
      active: 'Aberto',
      inactive: 'Fechado',
      all: 'Todos',
    };
  }

  return {
    title: 'Luzes',
    subtitle: 'Acenda ou apague as luzes da casa.',
    empty: 'Nenhuma luz cadastrada.',
    active: 'Ligada',
    inactive: 'Apagada',
    all: 'Todas',
  };
}
