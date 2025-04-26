import { z } from 'zod';
import queryWeatherByCityTool from './queryWeatherByCity.tool.js';
import QueryWeatherByCityFactory from '../factories/queryWeatherByCity.factory.js';
const toolsAdapter = (server) => async (toolName, schema, factory) => {
    const command = factory.create();
    server.tool(toolName, schema, command.execute.bind(command));
};
export function createTools(server) {
    toolsAdapter(server)(queryWeatherByCityTool.name, queryWeatherByCityTool.schema, new QueryWeatherByCityFactory());
    server.tool('add', { a: z.number(), b: z.number() }, async ({ a, b }) => ({
        content: [{ type: 'text', text: String(a + b) }],
    }));
    return server;
}
