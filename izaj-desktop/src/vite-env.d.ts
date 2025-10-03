/// <reference types="vite/client" />

// Temporary ambient types for @tauri-apps/plugin-deep-link until installed
declare module '@tauri-apps/plugin-deep-link' {
  export type UnlistenFn = () => void;
  export function onOpenUrl(
    handler: (payload: string | { url: string }) => void
  ): Promise<UnlistenFn>;
}