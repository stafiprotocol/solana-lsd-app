export function isDev() {
  // return false;
  return process.env.NEXT_PUBLIC_ENV !== "production";
}
