export interface LotteryPrizeType {
  id: any;
  name: string;
  icon: string;
  type: 'prize' | 'notWinning';
  background: string;
  description: string;
  qty?: number;
}
