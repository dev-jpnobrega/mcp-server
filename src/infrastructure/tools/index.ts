import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import IFactory from '../factories/factory.interface.js';
import queryWeatherByCityTool from './queryWeatherByCity.tool.js';
import QueryWeatherByCityFactory from '../factories/queryWeatherByCity.factory.js';

export interface ITool {
  name: string;
  description?: string;
  schema: Record<string, any>;
}

const toolsAdapter =
  (server: McpServer) =>
  async (toolName: string, schema: any, factory: IFactory) => {
    const command = factory.create();

    server.tool(toolName, schema, command.execute.bind(command));
  };

export function createTools(server: McpServer): McpServer {
  toolsAdapter(server)(
    queryWeatherByCityTool.name,
    queryWeatherByCityTool.schema,
    new QueryWeatherByCityFactory()
  );

  server.tool('add', { a: z.number(), b: z.number() }, async ({ a, b }) => ({
    content: [{ type: 'text', text: String(a + b) }],
  }));

  return server;
}
