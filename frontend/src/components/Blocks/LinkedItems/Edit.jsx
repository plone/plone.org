import React from 'react';
import Body from './Body';
import { SidebarPortal } from '@plone/volto/components';
import Sidebar from './Sidebar';
import { useIntl, defineMessages } from 'react-intl';
import { Container, Input } from 'semantic-ui-react';
import cx from 'classnames';

const messages = defineMessages({
  titlePlaceholder: {
    id: 'Title placeholder',
    defaultMessage: 'Title...',
  },
});

const Edit = (props) => {
  const { data, selected, block, onChangeBlock } = props;
  const intl = useIntl();

  if (__SERVER__) {
    return <div />;
  }
  return (
    <div
      className={cx('block-linked-items', {
        'full-width': data?.fullwidth,
        'grey-bg': data?.background,
      })}
    >
      <Container>
        <div className="title">
          <Input
            fluid
            transparent
            placeholder={intl.formatMessage(messages.titlePlaceholder)}
            value={data?.title || ''}
            name="title"
            onChange={(e) =>
              onChangeBlock(block, {
                ...data,
                title: e.target.value,
              })
            }
          />
        </div>
        <Body {...props} isEditMode={true} />
      </Container>
      <SidebarPortal selected={selected}>
        <Sidebar {...props} />
      </SidebarPortal>
    </div>
  );
};

export default Edit;
