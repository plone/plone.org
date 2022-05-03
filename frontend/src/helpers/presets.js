import { addSchemaField } from '@package/config/Blocks/schemas/utils';
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  bg_color: {
    id: 'bgColor',
    defaultMessage: 'Block background colorr',
  },
  item_bg_color: {
    id: 'ItemBgColor',
    defaultMessage: 'Item background color',
  },
  title_color: {
    id: 'TitleColor',
    defaultMessage: 'Title color',
  },
  text_color: {
    id: 'TextColor',
    defaultMessage: 'Text color',
  },
  button_color: {
    id: 'ButtonColor',
    defaultMessage: 'Button color',
  },
  bgFullWidth: {
    id: 'bgFullWidth',
    defaultMessage: 'Set full-width background',
  },
});

export const ITEM_BG_COLORS = [
  { name: 'dark-blue', label: 'Dark blue' },
  { name: 'blue', label: 'Blue' },
  { name: 'grey', label: 'Grey' },
  { name: 'light-grey', label: 'Light grey' },
  { name: 'white', label: 'White' },
  { name: 'transparent', label: 'Transparent' },
];

export const BG_COLORS = [
  { name: 'outline-white', label: 'Transparent' },
  { name: 'light-grey', label: 'Light grey' },
  { name: 'light-blue', label: 'Light blue' },
  { name: 'dark-blue', label: 'Dark Blue' },
];

export const TITLE_COLORS = [
  { name: 'blue', label: 'Blue' },
  { name: 'grey', label: 'Grey' },
  { name: 'white', label: 'White' },
];

export const TEXT_COLORS = [
  { name: 'blue', label: 'Blue' },
  { name: 'grey', label: 'Grey' },
  { name: 'white', label: 'White' },
];

export const BUTTON_COLORS = [
  { name: 'blue', label: 'Blue' },
  { name: 'white', label: 'White' },
  { name: 'outline-blue', label: 'Outline blue' },
  { name: 'outline-white', label: 'Outline white' },
];

export const addPresetFields = (schema, intl, pos, fieldset, fields) => {
  // The 'fields' field should be used in this way. If empty, it puts all the fields with their defaults.
  // fields={
  //   item_bg_color: {
  //     colors:['white','blue'],
  //     default:'blue',
  //   },
  //   title_color: {}, // if no colors are passed, all possible options are shown
  //   text_color: {},
  //   button_color: {},
  // }
  const fieldNames = fields
    ? Object.keys(fields)
    : ['item_bg_color', 'title_color', 'text_color', 'button_color'];

  if (fieldNames.indexOf('bg_color') >= 0) {
    const fieldConfig = fields?.['bg_color'];

    let colors = BG_COLORS.filter((c) =>
      fieldConfig?.colors?.length > 0
        ? fieldConfig.colors.indexOf(c.name) >= 0
        : true,
    );

    addSchemaField(
      schema,
      'bg_color',
      intl.formatMessage(messages.bg_color),
      null,
      {
        widget: 'color_list',
        intl: intl,
        colors: colors,
        defaultValue: fieldConfig?.default ?? colors[0].name,
      },
      pos,
      fieldset,
    );
    pos++;

    addSchemaField(
      schema,
      'fullWidth',
      intl.formatMessage(messages.bgFullWidth),
      null,
      { type: 'boolean', default: false },
      pos,
      fieldset,
    );
    pos++;
  }

  if (fieldNames.indexOf('item_bg_color') >= 0) {
    const fieldConfig = fields?.['item_bg_color'];

    let colors = ITEM_BG_COLORS.filter((c) =>
      fieldConfig?.colors?.length > 0
        ? fieldConfig.colors.indexOf(c.name) >= 0
        : true,
    );

    addSchemaField(
      schema,
      'item_bg_color',
      intl.formatMessage(messages.item_bg_color),
      null,
      {
        widget: 'color_list',
        intl: intl,
        colors: colors,
        defaultValue: fieldConfig?.default ?? colors[0].name,
      },
      pos,
      fieldset,
    );
    pos++;
  }

  if (fieldNames.indexOf('title_color') >= 0) {
    const fieldConfig = fields?.['title_color'];
    let colors = TITLE_COLORS.filter((c) =>
      fieldConfig?.colors?.length > 0
        ? fieldConfig.colors.indexOf(c.name) >= 0
        : true,
    );
    addSchemaField(
      schema,
      'title_color',
      intl.formatMessage(messages.title_color),
      null,
      {
        widget: 'color_list',
        intl: intl,
        colors: colors,
        defaultValue: fieldConfig?.default ?? colors[0].name,
      },
      pos,
      fieldset,
    );
    pos++;
  }

  if (fieldNames.indexOf('text_color') >= 0) {
    const fieldConfig = fields?.['text_color'];
    let colors = TEXT_COLORS.filter((c) =>
      fieldConfig?.colors?.length > 0
        ? fieldConfig?.colors.indexOf(c.name) >= 0
        : true,
    );
    addSchemaField(
      schema,
      'text_color',
      intl.formatMessage(messages.text_color),
      null,
      {
        widget: 'color_list',
        intl: intl,
        colors: colors,
        defaultValue: fieldConfig?.default ?? colors[0].name,
      },
      pos,
      fieldset,
    );
    pos++;
  }

  if (fieldNames.indexOf('button_color') >= 0) {
    const fieldConfig = fields?.['button_color'];
    let colors = BUTTON_COLORS.filter((c) =>
      fieldConfig?.colors?.length > 0
        ? fieldConfig.colors.indexOf(c.name) >= 0
        : true,
    );

    addSchemaField(
      schema,
      'button_color',
      intl.formatMessage(messages.button_color),
      null,
      {
        widget: 'color_list',
        intl: intl,
        colors: colors,
        defaultValue: fieldConfig?.default ?? colors[0].name,
      },
      pos,
      fieldset,
    );
    pos++;
  }
  return pos;
};

export const getPresetClasses = ({
  bg_color,
  item_bg_color,
  title_color,
  text_color,
  button_color,
  djsButtonsAlignCenter,

  fullWidth = false,
  className = '',
  usePresetDefaults = true,
  header_align,
}) => {
  let defaults = {
    item_bg_color: 'white',
    title_color: 'grey',
    text_color: 'grey',
    button_color: 'outline-blue',
  };

  let values = {
    'site--preset-bg-':
      bg_color ?? (usePresetDefaults ? defaults.bg_color : null),
    'site--preset-item-': item_bg_color ?? (usePresetDefaults ? 'white' : null),
    'site--preset-title-': title_color ?? (usePresetDefaults ? 'grey' : null),
    'site--preset-header-align-': header_align,
    'site--preset-text-': text_color ?? (usePresetDefaults ? 'grey' : null),
    'site--preset-button-':
      button_color ?? (usePresetDefaults ? 'outline-blue' : null),
    'site--preset-draftjs-buttons-align-': djsButtonsAlignCenter
      ? 'center'
      : null,
  };

  let classes = [className, 'site--preset-wrapper'];

  Object.keys(values).forEach((k) => {
    if (values[k]) {
      classes.push(k + values[k]);
    }
  });

  if (fullWidth) {
    classes.push('full-width');
  }

  return classes.join(' ');
};
