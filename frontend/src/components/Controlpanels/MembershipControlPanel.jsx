/**
 * Membership Control Panel
 * @module components/Controlpanels/MembershipControlPanel
 */

import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Link } from 'react-router-dom';
import { Portal } from 'react-portal';
import { useClient } from '../../hooks';
import {
  Accordion,
  Button,
  Container,
  Divider,
  Header,
  Segment,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
import circleBottomSVG from '@plone/volto/icons/circle-bottom.svg';
import circleTopSVG from '@plone/volto/icons/circle-top.svg';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import { Helmet } from '@plone/volto/helpers';
import backSVG from '@plone/volto/icons/back.svg';
import { Icon, Toolbar, Toast } from '@plone/volto/components';
import {
  getMembershipStats,
  openRenewalCycle,
  closeRenewalCycle,
  triggerReminderRenewalCycle,
} from '../../actions/membership/membership';
import { toast } from 'react-toastify';

const messages = defineMessages({
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  membership: {
    id: 'Plone Foundation Membership',
    defaultMessage: 'Plone Foundation Membership',
  },
  success: {
    id: 'Success',
    defaultMessage: 'Success',
  },
  error: {
    id: 'Error',
    defaultMessage: 'Error',
  },
});

const MembershipControlPanel = (props) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const pathname = props.location.pathname;
  const [activeIndex, setactiveIndex] = useState(-1);
  const isClient = useClient();
  const total_countries = useSelector(
    (state) => state.membership?.total_countries,
    shallowEqual,
  );
  const total_members = useSelector(
    (state) => state.membership?.total_members,
    shallowEqual,
  );
  const membershipStatsState = useSelector(
    (state) => state.membership?.stats_state,
    shallowEqual,
  );
  const membershipStatsCountry = useSelector(
    (state) => state.membership?.stats_country,
    shallowEqual,
  );
  const membershipStatsYear = useSelector(
    (state) => state.membership?.stats_year,
    shallowEqual,
  );
  const downloads = useSelector((state) => state.membership?.downloads);
  const actions = useSelector((state) => state.membership?.actions);
  const loadingMembership = useSelector((state) => state.membership?.loading);

  const onAccordionClick = (event, item) => {
    const newIndex = activeIndex === item.index ? -1 : item.index;
    setactiveIndex(newIndex);
  };

  useEffect(() => {
    dispatch(getMembershipStats());
  }, [dispatch]);

  const onAction = useCallback(
    (event, { value }) => {
      event.preventDefault();
      let action = undefined;
      if (value === 'open-renewal-cycle') {
        action = openRenewalCycle;
      } else if (value === 'reminder-renewal-cycle') {
        action = triggerReminderRenewalCycle;
      } else if (value === 'close-renewal-cycle') {
        action = closeRenewalCycle;
      }

      dispatch(action())
        .then((result) => {
          toast.success(
            <Toast
              success
              title={intl.formatMessage(messages.success)}
              content={result.msg}
            />,
          );
        })
        .catch((result) => {
          toast.error(
            <Toast
              error
              title={intl.formatMessage(messages.error)}
              content={result.msg}
            />,
          );
        })
        .finally(() => dispatch(getMembershipStats()));
    },
    [dispatch, intl],
  );

  return (
    <Container id="page-membership" className="controlpanel-membership">
      <Helmet title={intl.formatMessage(messages.membership)} />
      <Segment.Group raised>
        <Segment className="primary">
          <FormattedMessage
            id="Membership Management"
            defaultMessage="Membership Management"
          />
        </Segment>

        {loadingMembership ? (
          <Dimmer active>
            <Loader />
          </Dimmer>
        ) : (
          <>
            <Container className={'stats-numbers-wrapper'}>
              <Header as="h2">
                <FormattedMessage id="Stats" defaultMessage="Stats" />
              </Header>
              <h3>
                <FormattedMessage id="Overview" defaultMessage="Overview" />
              </h3>
              <Container
                key="overview"
                className={'stats-wrapper stats-states'}
              >
                <div key={'members'} className={'stat'}>
                  <div className={'stat-title'}>Current Members</div>
                  <div className={'stat-content'}>
                    <div className={'stat-number'}>{total_members}</div>
                  </div>
                </div>
                <div key={'countries'} className={'stat'}>
                  <div className={'stat-title'}>Countries</div>
                  <div className={'stat-content'}>
                    <div className={'stat-number'}>{total_countries}</div>
                  </div>
                </div>
              </Container>
              <h3>
                <FormattedMessage
                  id="Review State"
                  defaultMessage="Review State"
                />
              </h3>
              <Container key="states" className={'stats-wrapper stats-states'}>
                {membershipStatsState.map((item) => (
                  <div key={item.id} className={'stat'}>
                    <div className={'stat-title'}>{item.title}</div>
                    <div className={'stat-content'}>
                      <div className={'stat-number'}>{item.count}</div>
                    </div>
                  </div>
                ))}
              </Container>
              <h3>
                <FormattedMessage id="Countries" defaultMessage="Countries" />
              </h3>
              <Container
                key="countries"
                className={'stats-wrapper stats-countries'}
              >
                {membershipStatsCountry.map((item) => (
                  <div key={item.id} className={'stat'}>
                    <div className={'stat-title'}>{item.title}</div>
                    <div className={'stat-content'}>
                      <div className={'stat-number'}>{item.count}</div>
                    </div>
                  </div>
                ))}
              </Container>
              <h3>
                <FormattedMessage id="Years" defaultMessage="Years" />
              </h3>
              <Container key="year" className={'stats-wrapper stats-years'}>
                {membershipStatsYear.map((item) => (
                  <div key={item.id} className={'stat'}>
                    <div className={'stat-title'}>{item.title}</div>
                    <div className={'stat-content'}>
                      <div className={'stat-number'}>{item.count}</div>
                    </div>
                  </div>
                ))}
              </Container>
            </Container>
            <Container className={'downloads-wrapper'}>
              <Header as="h2">
                <FormattedMessage id="Downloads" defaultMessage="Downloads" />
              </Header>
              <Accordion key="downloads">
                <Divider />
                {downloads.map((item) => (
                  <div key={item.id}>
                    <Accordion.Title
                      active={activeIndex === item.id}
                      index={item.id}
                      onClick={onAccordionClick}
                    >
                      {item.title}
                      <Icon
                        name={
                          activeIndex === item.id
                            ? circleTopSVG
                            : circleBottomSVG
                        }
                        size="23px"
                        className={`accordionToggle ${item.title}`}
                      />
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === item.id}>
                      <div className="description">{item.description}</div>
                      <Button.Group floated="right">
                        <a href={item['@id']} className={'ui primary button'}>
                          <FormattedMessage
                            id="Download"
                            defaultMessage="Download"
                            className="button-label"
                          />
                        </a>
                      </Button.Group>
                    </Accordion.Content>
                    <Divider />
                  </div>
                ))}
              </Accordion>
            </Container>
            <Container className={'actions-wrapper'}>
              <Header as="h2">
                <FormattedMessage id="Actions" defaultMessage="Actions" />
              </Header>
              <Accordion key="actions">
                <Divider />
                {actions.map((item) => (
                  <div key={item.id}>
                    <Accordion.Title
                      active={activeIndex === item.id}
                      index={item.id}
                      onClick={onAccordionClick}
                    >
                      {item.title}
                      <Icon
                        name={
                          activeIndex === item.id
                            ? circleTopSVG
                            : circleBottomSVG
                        }
                        size="23px"
                        className={`accordionToggle ${item.title}`}
                      />
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === item.id}>
                      <div className="description">{item.description}</div>
                      <Button.Group floated="right">
                        <Button
                          onClick={onAction}
                          value={item.id}
                          className={`${item.className}`}
                        >
                          <FormattedMessage id="Run" defaultMessage="Run" />
                        </Button>
                      </Button.Group>
                    </Accordion.Content>
                    <Divider />
                  </div>
                ))}
              </Accordion>
            </Container>
          </>
        )}
      </Segment.Group>

      {isClient && (
        <Portal node={document.getElementById('toolbar')}>
          <Toolbar
            pathname={pathname}
            hideDefaultViewButtons
            inner={
              <>
                <Link to="/controlpanel" className="item">
                  <Icon
                    name={backSVG}
                    aria-label={intl.formatMessage(messages.back)}
                    className="contents circled"
                    size="30px"
                    title={intl.formatMessage(messages.back)}
                  />
                </Link>
              </>
            }
          />
        </Portal>
      )}
    </Container>
  );
};

export default MembershipControlPanel;
