import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import { useIntl, defineMessages } from 'react-intl';
import { Container, Input } from 'semantic-ui-react';

import { SidebarPortal } from '@plone/volto/components';
import { ListingLinkMore } from '@package/components';
import { TextEditorWidget } from '@package/components/Widgets';
import EditColumnBlock from './Block/EditBlock';
import Sidebar from './Sidebar';

const messages = defineMessages({
  titlePlaceholder: {
    id: 'Title placeholder',
    defaultMessage: 'Title...',
  },
  textPlaceholder: {
    id: 'Text placeholder',
    defaultMessage: 'Type text...',
  },
});

const Edit = (props) => {
  const { data, selected, block, onChangeBlock } = props;
  const [focusOn, setFocusOn] = useState('title');
  const intl = useIntl();

  useEffect(() => {
    if (!data?.columns || data?.columns?.length === 0) {
      onChangeBlock(block, {
        ...data,
        columns: [{ '@id': uuid() }, { '@id': uuid() }, { '@id': uuid() }],
      });
    }
  }, [block]);

  if (__SERVER__) {
    return <div />;
  }
  return (
    <div
      className={cx('block-icons-numbers-wrapper', {
        'full-width': data.fullWidth,
        ['bg-' + data.background_color]: data.background_color,
      })}
    >
      <Container>
        <div className="content-wrapper">
          <div className="title">
            <Input
              fluid
              transparent
              placeholder={intl.formatMessage(messages.titlePlaceholder)}
              value={data.title || ''}
              name="title"
              onChange={(e) =>
                onChangeBlock(block, {
                  ...data,
                  title: e.target.value,
                })
              }
            />
          </div>

          <TextEditorWidget
            data={data}
            fieldName="description"
            onChangeBlock={(v) => {
              onChangeBlock(block, {
                ...data,
                description: v.description,
              });
            }}
            selected={focusOn === 'description'}
            placeholder={intl.formatMessage(messages.textPlaceholder)}
            setFocus={(f) => setFocusOn(f)}
            showToolbar={true}
          />

          <div className="columns-wrapper">
            {data?.columns?.map((column, i) => (
              <EditColumnBlock
                data={column}
                index={i}
                focusOn={focusOn}
                setFocusOn={setFocusOn}
                onChange={(index, field, value) => {
                  let newColumns = [...data.columns];
                  newColumns[index][field] = value;
                  onChangeBlock(block, {
                    ...data,
                    columns: [...newColumns],
                  });
                }}
                selected={selected}
                key={i}
              />
            ))}
          </div>

          <ListingLinkMore
            linkTitle={data.href_title}
            linkHref={data.href}
            buttonClassName={
              data.background_color === 'blue'
                ? 'site--button-white'
                : 'site--button-blue'
            }
          />
        </div>
      </Container>
      <SidebarPortal selected={selected}>
        <Sidebar {...props} />
      </SidebarPortal>
    </div>
  );
};

Edit.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.object,
    greyBg: PropTypes.bool,
    alignLeft: PropTypes.bool,
  }),
  selected: PropTypes.bool.isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
};

export default Edit;
