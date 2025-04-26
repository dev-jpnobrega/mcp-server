import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

import QueryWeatherByCityFactory from '../src/infrastructure/factories/queryWeatherByCity.factory.js';

async function mainTestMcp() {
  try {
    const transport = new StdioClientTransport({
      command: 'tsx',
      args: ['src/index.ts'],
    });

    const client = new Client({
      name: 'example-client',
      version: '1.0.0',
    });

    await client.connect(transport);

    const resultAdd = await client.callTool({
      name: 'add',
      arguments: {
        a: 1,
        b: 2,
      },
    });
    console.log('Result of add:', resultAdd);

    // Call a tool
    const result = await client.callTool({
      name: 'queryWeatherByCity',
      arguments: {
        city: 'Turmalina',
      },
    });

    console.log(result);
  } catch (error) {
    console.error('Error starting client:', error);
  } finally {
    process.exit(0);
  }
}

async function mainTestCommand() {
  const command = new QueryWeatherByCityFactory().create();

  const result = await command.execute({
    city: 'Turmalina',
  });
  console.log(result);
}
mainTestMcp();
