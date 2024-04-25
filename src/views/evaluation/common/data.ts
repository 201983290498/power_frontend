import { Device } from '/#/baseClass';

export const deviceDemo: Partial<Device> = {
  equipNo: 'ut commodo',
  organization: 'laborum fugiat eiusmod in minim',
  substationName: '照通小关者圆',
  runNo: 'in minim',
  operationTime: '1993-07-18 09:37:19',
  systemNominalVoltage: 5,
};

export class OptionPair {
  label: string;
  value: string | number;

  constructor(label: string, value: string | number) {
    this.label = label;
    this.value = value;
  }

  getConstantValue() {
    return { label: this.label, value: this.value };
  }
}
