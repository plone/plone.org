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
  const intl = useIntl();
  const { data, selected, block, onChangeBlock } = props;
  const [focusOn, setFocusOn] = useState('title');

  useEffect(() => {
    if (!data?.columns || data?.columns?.length === 0) {
      onChangeBlock(block, {
        ...data,
        columns: [{ '@id': uuid() }, { '@id': uuid() }, { '@id': uuid() }],
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
        <div
          className={cx('title', {
            'hide-decoration': data.showTitleDecoration === false,
          })}
        >
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
  return (
    <>
      <div
        className={cx('block-image-columns', {
          ['columns-' + [data.n_columns ?? 4]]: data.n_columns ?? 4,
          'multi-rows': data.columns?.length > data.n_columns ?? 4,
          'full-width': data.fullWidth,
          'grey-bg': data.bg_color === 'light-grey',
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
    content: PropTypes.object,
    greyBg: PropTypes.bool,
    alignLeft: PropTypes.bool,
  }),
  selected: PropTypes.bool.isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
};

export default Edit;
