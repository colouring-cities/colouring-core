
export const ALL_MAP_MODES = ['basic', 'view', 'edit', 'multi-edit'] as const;
export type MapMode = typeof ALL_MAP_MODES[number];

export const EDIT_MAP_MODES: MapMode[] = ['edit', 'multi-edit'];

export const ALL_MAP_THEMES = ['night', 'light'] as const;
export type MapTheme = typeof ALL_MAP_THEMES[number];
