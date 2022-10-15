import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';
import { CheckboxWidget } from '@plone/volto/components';
import {
  ImageWidget,
  ColorListWidget,
  //FontAwesomeIconWidget,
} from '@package/components/Widgets';

const messages = defineMessages({
  BackgroundImage: {
    id: 'BackgroundImage',
    defaultMessage: 'Background image',
  },
  variation: {
    id: 'Background color',
    defaultMessage: 'Background color',
  },
});

const Sidebar = (props) => {
  const { data, onChangeBlock, block, openObjectBrowser, intl } = props;
  useEffect(() => {
    if (!data || !data.numbers) {
      onChangeBlock(block, { ...data, numbers: [] });
    }
  }, []);

  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>
          <FormattedMessage id="NumbersBlock" defaultMessage="Numbers block" />:
        </h2>
      </header>
      <Segment className="form">
        <ImageWidget
          id={'backgroundImage' + block}
          title={intl.formatMessage(messages.BackgroundImage)}
          value={props.data.backgroundImage}
          onChange={(id, value) => {
            onChangeBlock(block, { ...data, backgroundImage: value });
          }}
          openObjectBrowser={openObjectBrowser}
        />

        <ColorListWidget
          id="variation"
          title={intl.formatMessage(messages.variation)}
          colors={[
            { name: 'white', label: 'Light' },
            { name: 'blue', label: 'Blue' },
            { name: 'light-grey', label: 'Grey' },
          ]}
          value={data.variation ?? 'blue'}
          onChange={(name, value) =>
            onChangeBlock(block, { ...data, [name]: value })
          }
        />
        <CheckboxWidget
          id="fullWidth"
          title="Full width"
          value={data.fullWidth ? data.fullWidth : false}
          onChange={(name, value) => {
            onChangeBlock(block, { ...data, [name]: value });
          }}
        />
      </Segment>
      <Segment className="form">
        {[0, 1, 2].map((i) => (
          // <FontAwesomeIconWidget
          //   id={'icon' + i}
          //   title={'Icona del ' + (i + 1) + '° numero'}
          //   value={data.numbers?.[i].icon ?? ''}
          //   onChange={(name, value) => {
          //     let newNumbers = [...data.numbers];
          //     newNumbers[i].icon = value;
          //     onChangeBlock(block, {
          //       ...data,
          //       numbers: [...newNumbers],
          //     });
          //   }}
          // />

          <ImageWidget
            id={'icon' + i + '_' + block}
            title={'Icon of ' + (i + 1) + '° number'}
            description="The image must be a PNG of at least 64x64px."
            value={data?.numbers?.[i].iconImage}
            onChange={(id, value) => {
              if (data?.numbers?.length > 0) {
                let newNumbers = [...(data?.numbers ?? [])];
                newNumbers[i].iconImage = value;
                onChangeBlock(block, {
                  ...data,
                  numbers: [...newNumbers],
                });
              }
            }}
            openObjectBrowser={props.openObjectBrowser}
          />
        ))}
      </Segment>
    </Segment.Group>
  );
};

Sidebar.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  openObjectBrowser: PropTypes.func.isRequired,
};

export default injectIntl(Sidebar);
