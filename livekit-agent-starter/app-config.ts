import type { AppConfig } from './lib/types';

export const APP_CONFIG_DEFAULTS: AppConfig = {
  companyName: 'SpeakSEA',
  pageTitle: 'SpeakSEA - PSLE Oral Practice',
  pageDescription: 'AI-powered PSLE oral examination practice with SEA-LION',

  supportsChatInput: true,
  supportsVideoInput: true,
  supportsScreenShare: true,
  isPreConnectBufferEnabled: true,

  logo: '/lk-logo.svg',
  accent: '#002cf2',
  logoDark: '/lk-logo-dark.svg',
  accentDark: '#1fd5f9',
  startButtonText: 'Start PSLE Practice',

  agentName: 'CA_i4JKDTZVkS2A',
};
