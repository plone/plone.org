const plugins = (defaultPlugins) => {
  return defaultPlugins;
};
const modify = (config, { target, dev }, webpack) => {
  const themeConfigPath = `${__dirname}/src/theme/theme.config`;
  config.resolve.alias['../../theme.config$'] = themeConfigPath;
  config.resolve.alias['../../theme.config'] = themeConfigPath;

  // Make sure files in public/.well-known are copied
  const copyPlugin = config.plugins.find(
    (plugin) => plugin.constructor.name === 'CopyPlugin',
  );
  if (copyPlugin !== undefined) {
    copyPlugin.patterns.push({
      ...copyPlugin.patterns[0],
      from: copyPlugin.patterns[0].from.replace('/**/', '/.well-known/'),
    });
  }
  return config;
};

module.exports = {
  plugins,
  modify,
};
