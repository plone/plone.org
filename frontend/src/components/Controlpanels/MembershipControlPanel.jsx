/**
 * Membership Control Panel
 * @module components/Controlpanels/MembershipControlPanel
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Link } from 'react-router-dom';
import { Portal } from 'react-portal';
import { useClient } from '../../hooks';
import { Container, Header, Segment, Dimmer, Loader } from 'semantic-ui-react';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import { Helmet } from '@plone/volto/helpers';
import backSVG from '@plone/volto/icons/back.svg';
import { Icon, Toolbar } from '@plone/volto/components';
import { getMembershipStats } from '../../actions/membership/membership';

const messages = defineMessages({
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  membership: {
    id: 'Plone Foundation Membership',
    defaultMessage: 'Plone Foundation Membership',
  },
});

const MembershipControlPanel = (props) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const pathname = props.location.pathname;
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
  const loadingMembership = useSelector((state) => state.membership?.loading);

  useEffect(() => {
    dispatch(getMembershipStats());
  }, [dispatch]);

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
