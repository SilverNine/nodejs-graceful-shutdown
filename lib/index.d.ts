// Type definitions for nodejs-graceful-shutdown 1.0
// Project: https://github.com/silvernine/nodejs-graceful-shutdown
// Definitions by: silvernine <https://github.com/silvernine>

/// <reference types="node" />

declare function GracefulShutdown(
  server: any,
  options?: GracefulShutdown.Options
): () => Promise<void>

declare namespace GracefulShutdown {
  interface Options {
    signals?: string
    timeout?: number
    development?: boolean
    onShutdown?: (signal: string) => Promise<void>
    finally?: () => void
  }
}

export = GracefulShutdown
