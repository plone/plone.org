export default function applyConfig(config) {
    config.blocks.blocksConfig.__grid = {
      ...config.blocks.blocksConfig.__grid,
      gridAllowedBlocks: ['teaser', 'image', 'slate', 'html'],
      }
    return config;
  }
