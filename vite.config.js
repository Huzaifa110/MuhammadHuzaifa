import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
  plugins: [react()],
  base: '/MuhammadHuzaifa/',
  assetsInclude: ['**/*.png', '**/*.PNG', '**/*.mp4']
});
