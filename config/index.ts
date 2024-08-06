import devConfig from "./appConf/dev.json";
import { isDev } from "./env";
import prodConfig from "./appConf/prod.json";

export const solanaPrograms = isDev()
  ? devConfig.programs
  : prodConfig.programs;

export const solanaRestEndpoint = isDev()
  ? devConfig.restEndpoint
  : prodConfig.restEndpoint;

export const solanaWsEndpoint = isDev()
  ? devConfig.wsEndpoint
  : prodConfig.wsEndpoint;

export const solanaExplorer = isDev()
  ? devConfig.explorer
  : prodConfig.explorer;
