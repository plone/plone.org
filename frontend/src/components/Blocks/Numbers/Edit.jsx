import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { flattenToAppURL } from '@plone/volto/helpers';
import { Container } from 'semantic-ui-react';
import { SidebarPortal } from '@plone/volto/components';
import EditNumberBlock from './Block/EditBlock';
import Sidebar from './Sidebar';

const Edit = (props) => {
  const { data, selected, block, onChangeBlock } = props;

  const [focusOn, setFocusOn] = useState('title');
  useEffect(() => {
    if (!data?.numbers || data?.numbers?.length === 0) {
      onChangeBlock(block, {
        ...data,
        numbers: [{}, {}, {}],
      });
    }
  }, [block]);

  if (__SERVER__) {
    return <div />;
  }
  return (
    <div className="block-numbers">
      <div
        className={cx('block-numbers-wrapper', {
          'has-background': data.backgroundImage,
          'full-width': data.fullWidth,
          ['variation-' + data.variation]: data.variation,
        })}
      >
        {data.backgroundImage && (
          <div
            className="background"
            style={{
              backgroundImage: `url(${flattenToAppURL(
                data.backgroundImage,
              )}/@@images/image)`,
            }}
          ></div>
        )}
        <Container>
          <div className="numbers-wrapper">
            {data?.numbers?.map((numberBlock, i) => (
              <EditNumberBlock
                data={numberBlock}
                index={i}
                focusOn={focusOn}
                setFocusOn={setFocusOn}
                onChange={(index, field, value) => {
                  let newNumbers = [...data.numbers];
                  newNumbers[index][field] = value;
                  onChangeBlock(block, {
                    ...data,
                    numbers: [...newNumbers],
                  });
                }}
                selected={selected}
                key={i}
              />
            ))}
          </div>
        </Container>
        <SidebarPortal selected={selected}>
          <Sidebar {...props} />
        </SidebarPortal>
      </div>
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
