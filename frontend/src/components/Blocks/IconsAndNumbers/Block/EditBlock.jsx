/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { flattenToAppURL } from '@plone/volto/helpers';
import { useIntl, defineMessages } from 'react-intl';
import { Input } from 'semantic-ui-react';
import { TextEditorWidget } from '@package/components/Widgets';

const messages = defineMessages({
  titlePlaceholder: {
    id: 'Title placeholder',
    defaultMessage: 'Title...',
  },
  numberPlaceholder: {
    id: 'Number placeholder',
    defaultMessage: '0.00',
  },
  textPlaceholder: {
    id: 'Text placeholder',
    defaultMessage: 'Type text...',
  },
});

const EditBlock = ({
  data,
  index,
  focusOn,
  setFocusOn,
  onChange,
  selected,
}) => {
  const intl = useIntl();
  const icon = data.iconImage; //data.icon
  return __SERVER__ ? (
    <div />
  ) : (
    <div className="column-block">
      {!icon ? (
        <div className="number">
          <Input
            fluid
            transparent
            placeholder={intl.formatMessage(messages.numberPlaceholder)}
            value={data.number || ''}
            name={'number' + index}
            onClick={(e) => {
              setFocusOn('number' + index);
              e.stopPropagation();
            }}
            onChange={(e) => onChange(index, 'number', e.target.value)}
          />
        </div>
      ) : (
        <div className="icon">

          <img
            src={flattenToAppURL(icon) + '/@@images/image/teaser'}
            alt=""
            role="presentation"
            aria-hidden="true"
          />
        </div>
      )}
      <div className="column-title">
        <Input
          fluid
          transparent
          placeholder={intl.formatMessage(messages.titlePlaceholder)}
          value={data.title || ''}
          name={'title' + index}
          onClick={(e) => {
            setFocusOn('title' + index);
            e.stopPropagation();
          }}
          onChange={(e) => onChange(index, 'title', e.target.value)}
        />
      </div>
      <div className="column-text">
        <div
          onClick={(e) => setFocusOn('text' + index)}
          onKeyDown={() => setFocusOn('text' + index)}
        >
          <TextEditorWidget
            data={data}
            fieldName={'text'}
            selected={selected && focusOn === 'text' + index}
            onChangeBlock={(v) => {
              onChange(index, 'text', v.text);
            }}
            placeholder={intl.formatMessage(messages.textPlaceholder)}
            prevFocus={'number' + index}
            setFocus={(f) => setFocusOn(f)}
            showToolbar={true}
            key={'text' + index}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(EditBlock);
