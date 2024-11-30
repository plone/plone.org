import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { TextWidget } from '@plone/volto/components';

const messages = defineMessages({
  faIconWidgetDesc: {
    id: 'faIconWidgetDesc',
    defaultMessage:
      'Icon that is going to be used. You can also type the code of any free FontAwesome icon. You can pick one at',
  },
});

const FontAwesomeIconWidget = (props) => {
  const intl = useIntl();

  const iconDescription = (
    <>
      {intl.formatMessage(messages.faIconWidgetDesc)}
      &nbsp;
      {/* Icona che verrà mostrata a fianco del numero. E' possibile inserire il
      codice di un'icona di FontAwesome scegliendone una fra quelle disponibili
      su{' '} */}
      <a
        href="https://fontawesome.com/v5.15/icons?d=gallery&p=2"
        target="_blank"
        rel="noreferrer"
      >
        fontawesome.com
      </a>
    </>
  );
  return (
    <TextWidget
      {...props}
      description={iconDescription}
      // onChange={onChange}
    />
  );
};
export default FontAwesomeIconWidget;
