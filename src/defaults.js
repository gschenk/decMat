// defines default configuration and CLI arguments

const defaultCfg = {
  err: 0,
  stdin: false,
  file: './example.yaml',
  server: false,
  verbose: false,
};

// argument flags are mapped to these
// config settings
const configForArg = (arg) => ({
  stdin: { stdin: true, file: '' },
  file: { file: arg },
  server: { server: true, verbose: true },
  verbose: { verbose: true },
});

// dictionary of accepted argument patterns
const knownCliArguments = {
  '.yaml': 'file',
  '.yml': 'file',
  '-': 'stdin',
  '--stdin': 'stdin',
  '-s': 'server',
  '--server': 'server',
  '-v': 'verbose',
  '--verbose': 'verbose',
};

module.exports = {
  defaultCfg,
  knownCliArguments,
  configForArg,
};
