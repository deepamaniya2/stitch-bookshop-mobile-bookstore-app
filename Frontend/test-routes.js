const http = require('http');

const routes = [
  '/',
  '/onboarding',
  '/home',
  '/categories',
  '/book/midnight-library',
  '/cart',
  '/checkout',
  '/profile'
];

async function checkRoute(route) {
  return new Promise((resolve) => {
    http.get(`http://127.0.0.1:3000${route}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          route,
          statusCode: res.statusCode,
          hasRoot: data.includes('<div id="root"></div>'),
          hasScripts: data.includes('/src/main.jsx')
        });
      });
    }).on('error', (err) => {
      resolve({ route, error: err.message });
    });
  });
}

async function run() {
  console.log('Testing React routes on Vite server:');
  for (const route of routes) {
    const result = await checkRoute(route);
    console.log(`Route: ${result.route.padEnd(25)} Status: ${result.statusCode} Root element: ${result.hasRoot} Main script: ${result.hasScripts}`);
  }
}

run();
