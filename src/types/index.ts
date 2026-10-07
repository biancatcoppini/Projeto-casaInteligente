export type DeviceType = 'lights' | 'garage';

export type Device = {
  id: string;
  name: string;
  room: string;
  type: DeviceType;
  active: boolean;
};

export type ControlCard = {
  id: DeviceType | 'access';
  title: string;
  subtitle: string;
  icon: string;
};
