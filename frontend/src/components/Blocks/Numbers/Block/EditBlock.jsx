/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { flattenToAppURL } from '@plone/volto/helpers';
import { useIntl, defineMessages } from 'react-intl';
import { Input } from 'semantic-ui-react';
import { DetachedTextBlockEditor } from '@plone/volto-slate/blocks/Text/DetachedTextBlockEditor';

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
    defaultMessage: 'Insert text...',
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

  return __SERVER__ ? (
    <div />
  ) : (
    <div className="number-block">
      <div className="number-title">
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
      <div className="number-content">
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
          {data.icon && ( //fontawesome icon
            <span className="icon">
              <FontAwesomeIcon icon={['fas', data.icon]} />
            </span>
          )}
          {data.iconImage && (
            <span className="icon">
              <img
                src={flattenToAppURL(data.iconImage) + '/@@images/image/tile'}
                alt=""
                role="presentation"
                aria-hidden="true"
              />
            </span>
          )}
        </div>
        <div className="number-text">
          <div
            onClick={(e) => setFocusOn('text' + index)}
            onKeyDown={() => setFocusOn('text' + index)}
          >
            <DetachedTextBlockEditor
              data={{ value: data.text }}
              onChangeBlock={(block, { value }) =>
                onChange(index, 'text', value)
              }
              selected={selected && focusOn === 'text' + index}
              readOnly={false}
              placeholder={intl.formatMessage(messages.textPlaceholder)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(EditBlock);
