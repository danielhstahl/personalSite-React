import { createServer } from 'vite';

async function run() {
  const server = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });
  
  try {
    const transformed = await server.transformRequest('/src/components/Flip.test.tsx');
    console.log("Flip.test.tsx\n", transformed?.code);
  } catch (e) {
    console.error("Error transforming Flip.test", e);
  }

  try {
    const transformed = await server.transformRequest('/src/components/Flip.tsx');
    console.log("Flip.tsx\n", transformed?.code);
  } catch (e) {
    console.error("Error transforming Flip", e);
  }

  await server.close();
}

run();
