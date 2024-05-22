export interface GrowCardItem {
  icon: string;
  title: string;
  value: number;
  total: number;
  color: string;
  action: string;
}

export const growCardList: GrowCardItem[] = [
  {
    title: '设备',
    icon: 'station|svg',
    value: 2000,
    total: 120000,
    color: 'green',
    action: '总',
  },
  {
    title: '历史评估记录',
    icon: 'prediction|svg',
    value: 20000,
    total: 500000,
    color: 'blue',
    action: '总',
  },
  {
    title: '异常设备',
    icon: 'error-station|svg',
    value: 8000,
    total: 120000,
    color: 'orange',
    action: '总',
  },
  {
    title: '用户',
    icon: 'user-count|svg',
    value: 5000,
    total: 50000,
    color: 'purple',
    action: '总',
  },
];
