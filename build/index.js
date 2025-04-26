import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { RestServerTransport } from '@chatmcp/sdk/server/rest.js';
import settings from './settings/index.js';
import { createTools } from './infrastructure/tools/index.js';
const server = new McpServer({
    name: settings.mcpServerName,
    version: settings.mcpServerVersion,
    capabilities: {
        tools: {},
    },
});
async function main() {
    createTools(server);
    if (process.env.NODE_ENV === 'development') {
        const transport = new RestServerTransport({
            port: 4000,
            endpoint: '/mcp',
        });
        await server.connect(transport);
        await transport.startServer();
        return;
    }
    const transport = new StdioServerTransport();
    transport.onmessage = async (message) => console.log('Received message:', message);
    transport.onerror = (error) => console.error('onerror:', error);
    transport.onclose = () => console.log('Connection closed');
    await server
        .connect(transport)
        .then(() => console.log('Server ', server.isConnected()))
        .catch(() => new McpError(ErrorCode.InternalError, 'Failed to connect to transport'));
}
main();
