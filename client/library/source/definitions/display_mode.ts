export enum DisplayMode {
  MOBILE,
  TABLET,
  DESKTOP
}

export function getDisplayMode(size: number): DisplayMode {
  if (size < 768) {
    return DisplayMode.MOBILE;
  }
  if (size > 767 && size < 1201) {
    return DisplayMode.TABLET;
  }
  return DisplayMode.DESKTOP;
}
