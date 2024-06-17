import cx from 'classnames';
import React from 'react';
import { Button, TextArea } from 'semantic-ui-react';

export default (props) => {
  const { handleTitleChange, handleTitleClick, uid, panel, active } = props;

  return (
    <Button
      className={cx('tab-title', {
        active: active,
      })}
      onClick={handleTitleClick}
    >
      <TextArea
        fluid
        className="input-tab-title"
        transparent
        placeholder="Insert title..."
        value={panel?.title || ''}
        onClick={(e) => {
          handleTitleClick();
          e.stopPropagation();
        }}
        rows="2"
        onChange={(e) => handleTitleChange(e, [uid, panel])}
      />
    </Button>
  );
};
