
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.b03562b828a84b49a9d2a5bd349fb3db',
  appName: 'future-feed-forecast',
  webDir: 'dist',
  server: {
    url: 'https://b03562b8-28a8-4b49-a9d2-a5bd349fb3db.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    }
  }
};

export default config;
