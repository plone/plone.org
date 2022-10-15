import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import { useIntl, defineMessages } from 'react-intl';
import { Input, Container } from 'semantic-ui-react';
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
        columns: [
          { '@id': uuid(), dividerPosition: 'before_title', iconSize: 's' },
          { '@id': uuid(), dividerPosition: 'before_title', iconSize: 's' },
          { '@id': uuid(), dividerPosition: 'before_title', iconSize: 's' },
        ],
      });
    }
  }, [block]);

  const focusField = (field) => {
    setFocusOn(field);

    if (!selected) {
      props.onSelectBlock(block);
    }
  };

  if (__SERVER__) {
    return <div />;
  }

  const content = (
    <>
      <div className="block-content-header">
        <div className={cx('title')}>
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
          placeholder={intl.formatMessage(messages.textPlaceholder)}
          setFocus={(f) => focusField(f)}
          selected={focusOn === 'description'}
          showToolbar={true}
        />
      </div>
      <div className="columns-wrapper">
        {data?.columns?.map((column, i) => (
          <EditColumnBlock
            data={column}
            index={i}
            focusOn={focusOn}
            setFocusOn={focusField}
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
            bg_color={data.bg_color}
          />
        ))}
      </div>
      <ListingLinkMore
        linkTitle={data.href_title}
        linkHref={data.href}
        buttonClassName="site--button-blue"
      />
    </>
  );

  const ncolumns = data.n_columns ?? 4;
  return (
    <>
      <div
        className={cx('block-icons-text', {
          'multi-rows': data.columns?.length > ncolumns,
          'grey-bg': data.bg_color === 'light-grey',
          'full-width': data.fullWidth,
          'no-adapt-columns': data.noAdaptColumns,
          ['title-' + data.title_color]: data.title_color,
          ['header-align-' + data.header_align]: data.header_align ?? 'center',
          ['columns-' + [ncolumns]]: ncolumns,
        })}
      >
        {data.fullWidth ? <Container>{content}</Container> : content}
      </div>

      <SidebarPortal selected={selected}>
        <Sidebar {...props} />
      </SidebarPortal>
    </>
  );
};

Edit.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    header_align: PropTypes.string,
    content: PropTypes.object,
    greyBg: PropTypes.bool,
    alignLeft: PropTypes.bool,
  }),
  selected: PropTypes.bool.isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
};

export default Edit;
