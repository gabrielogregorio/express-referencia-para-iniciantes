import { DISABLE_LOGS } from '@/config/envs';

export const getActualMoment = (): string => {
  const date = new Date();

  return `${date.toLocaleDateString().replace(/\//g, '-')} ${date.toLocaleString('en-US', {
    timeStyle: 'medium',
    hourCycle: 'h24',
  })}`;
};

type levelsType = 'ERROR' | 'INFO ' | 'WARN ' | 'DEBUG';

const colors: { [key in levelsType]: string } = {
  'INFO ': '36',
  ERROR: '31;1',
  'WARN ': '33',
  DEBUG: '37;1',
};

/* eslint-disable no-console */

export class Log {
  private static baseStart(level: levelsType): string {
    return `[${this.applyColors(level, colors[level])}] ${getActualMoment()}`;
  }

  private static runningInTerminal = (): boolean => Boolean(process.stdout.isTTY);

  private static applyColors(level: string, color: string): string {
    if (this.runningInTerminal()) {
      return `\x1B[${color}m${level}\x1B[0m`.replace(' ', '');
    }
    return level;
  }

  public static info(message: unknown, ...extras: unknown[]): void {
    this.showLogs('info', `${this.baseStart('INFO ')}`, message, extras);
  }

  public static error(message: unknown, ...extras: unknown[]): void {
    this.showLogs('error', `${this.baseStart('ERROR')}`, message, extras);
  }

  public static debug(message: unknown, ...extras: unknown[]): void {
    this.showLogs('debug', `${this.baseStart('DEBUG')}`, message, extras);
  }

  public static warning(message: unknown, ...extras: unknown[]): void {
    this.showLogs('warn', `${this.baseStart('WARN ')}`, message, extras);
  }

  private static showLogs(
    level: 'warn' | 'debug' | 'error' | 'info',
    color: string,
    message: unknown,
    extras: unknown[],
  ) {
    if (DISABLE_LOGS) {
      return;
    }

    console[level](color, message, ...extras);
  }
}
