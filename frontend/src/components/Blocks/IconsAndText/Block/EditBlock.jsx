/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import cx from 'classnames';
import { flattenToAppURL } from '@plone/volto/helpers';
import { UniversalLink } from '@plone/volto/components';
import { useIntl, defineMessages } from 'react-intl';
import { Input, TextArea } from 'semantic-ui-react';
import { TextEditorWidget } from '@package/components/Widgets';
import { Button } from '@package/components';

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
  bg_color,
}) => {
  const intl = useIntl();
  const icon = data.iconImage;

  return __SERVER__ ? (
    <div />
  ) : (
    <div
      className={cx('column-block', {
        ['divider_' + data.dividerPosition]: data.dividerPosition,
        ['header-text-' + data.headerTextPosition]: data.headerTextPosition,
      })}
    >
      <div className="column-head">
        {icon && (
          <div className={'icon size_' + data.iconSize}>
            <img
              src={flattenToAppURL(icon) + '/@@images/image/teaser'}
              alt=""
              role="presentation"
              aria-hidden="true"
            />
          </div>
        )}

        {data.headerTextPosition && (
          <div className="header-text">
            <Input
              fluid
              transparent
              placeholder={intl.formatMessage(messages.textPlaceholder)}
              value={data.headerText || ''}
              name={'headerText' + index}
              onClick={(e) => {
                setFocusOn('headerText' + index);
                e.stopPropagation();
              }}
              onChange={(e) => onChange(index, 'headerText', e.target.value)}
            />
          </div>
        )}
      </div>
      <div className="column-title">
        <TextArea
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

      {data.href_title && data.href?.length > 0 && (
        <div className="column-footer">
          <Button
            as={UniversalLink}
            color={bg_color === 'light-grey' ? 'outline-blue' : 'blue'}
            size="small"
            item={data.href[0]}
            arrow={true}
          >
            {data.href_title}
          </Button>
        </div>
      )}
    </div>
  );
};

export default React.memo(EditBlock);
