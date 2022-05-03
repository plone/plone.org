import accordionSVG from '@plone/volto/icons/list-arrows.svg';
import {
  AccordionBlockEdit,
  AccordionBlockView,
  AccordionLayoutSchema,
} from '@eeacms/volto-accordion-block/components';
import { PanelsWidget } from '@eeacms/volto-accordion-block/components';
import downSVG from '@plone/volto/icons/down.svg';
import upSVG from '@plone/volto/icons/up.svg';

const extendedSchema = (config) => {
  const choices = Object.keys(config.blocks.blocksConfig)
    .map((key) => {
      if (config.blocks.blocksConfig[key]?.restricted) {
        return false;
      } else {
        const title = config.blocks.blocksConfig[key]?.title || key;
        return [key, title];
      }
    })
    .filter((val) => !!val);

  choices.push(['accordion', 'Accordion']);

  return {
    ...AccordionLayoutSchema,
    properties: {
      ...AccordionLayoutSchema.properties,
      allowedBlocks: {
        ...AccordionLayoutSchema.properties.allowedBlocks,
        items: {
          choices: choices,
        },
      },
    },
  };
};

const applyConfig = (config) => {
  config.blocks.blocksConfig.accordion = {
    id: 'accordion',
    title: 'Accordion',
    icon: accordionSVG,
    group: 'common',
    titleIcons: {
      closed: { leftPosition: downSVG, rightPosition: downSVG },
      opened: { leftPosition: upSVG, rightPosition: upSVG },
    },
    view: AccordionBlockView,
    edit: AccordionBlockEdit,
    restricted: false,
    mostUsed: false,
    blockHasOwnFocusManagement: true,
    sidebarTab: 1,
    schema: extendedSchema(config),
    security: {
      addPermission: [],
      view: [],
    },
  };
  config.widgets.type.panels = PanelsWidget;
  return config;
};

export default applyConfig;
