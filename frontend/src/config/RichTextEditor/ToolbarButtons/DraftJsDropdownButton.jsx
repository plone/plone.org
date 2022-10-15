import React, { useState } from 'react';
import PropTypes from 'prop-types';
import unionClassNames from 'union-class-names';

/*
This is a utility component that is used to make pull-down menus in the draftjs toolbar.
Just pass it the prop of the component itself and in the prop optionsList the list of options
to show in the curtain.
*/
const DraftJsDropdownButton = (props) => {
  const { theme, optionsList } = props;
  const [open, setOpen] = useState(false);

  const getCurrentBlockType = () => {
    if (!props.getEditorState) {
      return false;
    }

    const editorState = props.getEditorState();
    const type = editorState
      .getCurrentContent()
      .getBlockForKey(editorState.getSelection().getStartKey())
      .getType();
    return type;
  };

  const hasBlockStyle = () => {
    const type = getCurrentBlockType();
    return props.optionsList.map((o) => o.block_type).indexOf(type) >= 0;
  };

  const getDropdownToggleContent = () => {
    const type = getCurrentBlockType();
    let contentWhenSelected = props.optionsList.filter(
      (o) => o.block_type === type,
    )?.[0]?.contentWhenSelected;

    return contentWhenSelected || props.content;
  };

  const className = hasBlockStyle()
    ? unionClassNames(theme.button, theme.active)
    : theme.button;

  const onMouseDown = (event) => {
    event.preventDefault();
  };

  const openDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(!open);
  };

  return (
    <div
      className={`${theme.buttonWrapper} draftJsToolbarDropdown`}
      onMouseDown={onMouseDown}
      role="presentation"
    >
      <button
        className={`${className} draftJsToolbarDropdown-toggle`}
        onClick={openDropdown}
        type="button"
      >
        {getDropdownToggleContent()}
        <span className={`caret ${open ? 'up' : 'down'}`}></span>
      </button>

      <ul
        className={`draftJsToolbarDropdown-optionswrapper ${
          open ? '' : 'hide'
        }`}
      >
        {optionsList.map((item) => {
          let OptionButton = item.value;

          return (
            <li
              key={item.block_type}
              className="draftJsToolbarDropdown-option"
              onClick={() => {
                setOpen(false);
              }}
            >
              <OptionButton {...props} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

DraftJsDropdownButton.propTypes = {
  onChange: PropTypes.func,
  editorState: PropTypes.object,
  placeholder: PropTypes.string,
  theme: PropTypes.shape({}).isRequired,
  ownTheme: PropTypes.shape({}),
  onOverrideContent: PropTypes.func.isRequired,
  optionsList: PropTypes.arrayOf(
    PropTypes.shape({ block_type: PropTypes.string, value: PropTypes.any }),
  ).isRequired,
};
export default React.memo(DraftJsDropdownButton);
