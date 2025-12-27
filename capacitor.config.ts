import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'es.sanantoniodebenageber.adopta',
  appName: 'SAB Adopta',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1976d2',
      showSpinner: false
    }
  }
};

export default config;
