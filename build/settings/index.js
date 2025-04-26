const env = process.env.NODE_ENV || 'development';
const configFile = `./options/${env}.js`;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = await import(configFile);
console.log('File ENV loaded', configFile, config.default);
export default config.default;
