import { solanaExplorer } from "config";
import { isDev } from "./env";

export function getSolanaScanTxUrl(txHash: string | undefined) {
  if (isDev()) {
    return `${solanaExplorer}/tx/${txHash}?cluster=custom&customUrl=https%3A%2F%2Fsolana-dev-rpc.stafi.io`;
  }
  return `${solanaExplorer}/tx/${txHash}`;
}

export function getSolanaScanAccountUrl(account: string | undefined) {
  if (isDev()) {
    return `${solanaExplorer}/address/${account}?cluster=custom&customUrl=https%3A%2F%2Fsolana-dev-rpc.stafi.io`;
  }
  return `${solanaExplorer}/address/${account}`;
}
