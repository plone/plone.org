import React from 'react';
import cx from 'classnames';
import { RenderBlocks } from '@plone/volto/components';

import { getPanels, tabBlockHasValue } from './util';
import { Container, Button } from 'semantic-ui-react';
import { withBlockExtensions } from '@plone/volto/helpers';

import TabContent from './TabContent';
import './editor.less';

const View = (props) => {
  const { data } = props;
  const panels = getPanels(data.data);
  const metadata = props.metadata || props.properties;
  const [activeIndex, setActiveIndex] = React.useState(0);

  const keys = {
    end: 35,
    home: 36,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
  };

  const onKeyDown = (event, index) => {
    var key = event.keyCode;

    switch (key) {
      case keys.end:
        event.preventDefault();
        // Activate last tab
        setActiveIndex(panels.length - 1);
        break;
      case keys.home:
        event.preventDefault();
        // Activate first tab
        setActiveIndex(0);
        break;

      // Up and down are in keydown
      // because we need to prevent page scroll >:)
      case keys.up:
      case keys.down:
        event.preventDefault();
        break;
      default:
        break;
    }
  };

  // Handle keyup on tabs
  const onKeyUp = (event) => {
    var key = event.keyCode;

    switch (key) {
      case keys.left:
        if (activeIndex > 0) {
          setActiveIndex(activeIndex - 1);
        }
        break;
      case keys.right:
        if (activeIndex < panels.length - 1) {
          setActiveIndex(activeIndex + 1);
        }
        break;
      default:
        break;
    }
  };

  return panels?.length > 0 ? (
    <div className="tabs-block">
      <Container className="tabs-wrapper">
        <div className="tabs" role="tablist" arial-label={data.title ?? 'Tabs'}>
          {panels.map(([uid, panel], index) => {
            return tabBlockHasValue(panel) ? (
              <Button
                className={cx('tab-title', {
                  active: activeIndex === index,
                })}
                onClick={() => {
                  setActiveIndex(index);
                }}
                onKeyDown={(e) => onKeyDown(e, index)}
                onKeyUp={(e) => onKeyUp(e, index)}
                key={'button' + uid}
                role="tab"
                aria-selected={activeIndex === index ? true : false}
                aria-controls={'tabcontent-' + uid}
                id={'tab-' + uid}
              >
                {panel.title}
              </Button>
            ) : null;
          })}
        </div>
        {panels.map(([uid, panel], index) => {
          return tabBlockHasValue(panel) ? (
            <TabContent
              key={uid}
              active={activeIndex === index}
              tabindex="0"
              role="tabpanel"
              id={'tabcontent-' + uid}
              aria-labelledby={'tab-' + uid}
              aria-hidden={activeIndex !== index || null}
            >
              <RenderBlocks {...props} metadata={metadata} content={panel} />
            </TabContent>
          ) : null;
        })}
      </Container>
    </div>
  ) : (
    <></>
  );
};

export default withBlockExtensions(View);
