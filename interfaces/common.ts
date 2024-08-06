export interface NavigationItem {
  name: string;
  path?: string;
}

export interface WithdrawInfo {
  overallAmount: string;
  claimableAmount: string;
  remainingTime: number;
}
