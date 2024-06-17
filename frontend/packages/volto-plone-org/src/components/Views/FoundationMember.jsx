/**
 * NewsItemView view component.
 * @module components/View/FoundationMemberView
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Table, Button } from 'semantic-ui-react';
import { flattenHTMLToAppURL, flattenToAppURL } from '@plone/volto/helpers';
import { useSelector, useDispatch } from 'react-redux';
import { getWorkflow, transitionWorkflow } from '@plone/volto/actions';

import './member.less';

/**
 * FoundationMemberView view component class.
 * @function FoundationMemberView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
const FoundationMemberView = (props) => {
  const pathname = props.location.pathname;
  const { content } = props;
  const dispatch = useDispatch();
  const transitionLoading = useSelector(
    (state) => state.workflow?.transition?.loading || false,
  );
  const transitions = useSelector((state) => state.workflow?.transitions);
  const currentState = useSelector((state) => state.workflow?.currentState);
  const [transition, setTransition] = useState('');
  const allowedTransitions = ['Renew'];

  useEffect(() => {
    if (transitionLoading === false) {
      dispatch(getWorkflow(pathname));
    }
  }, [dispatch, pathname, transitionLoading]);

  useEffect(() => {
    if (transition) {
      dispatch(transitionWorkflow(transition));
      setTransition('');
    }
  }, [dispatch, transition]);

  const handleTransition = (action) => {
    setTransition(flattenToAppURL(action));
  };

  const displayActions = currentState && transitions && transitions.length > 0;

  return (
    <Container className="view-wrapper">
      {content.title && (
        <h1 className="documentFirstHeading">{content.title}</h1>
      )}
      <p className="documentDescription">
        {content.organization && (
          <>
            <span className="organization">{content.organization}</span>{' '}
          </>
        )}
        {content.city && (
          <>
            <span className="city">{content.city}</span> (
            <span className="country">{content.country.title}</span>)
          </>
        )}
      </p>

      {displayActions && (
        <>
          <h2>Actions</h2>
          <Container className="memberActions">
            <Container className="actions">
              {transitions.map(function (transition, i) {
                return (
                  allowedTransitions.includes(transition.title) && (
                    <Button
                      key={i}
                      className={`transition transition-${transition.title}`}
                      onClick={() => handleTransition(transition['@id'])}
                    >
                      {transition.title}
                    </Button>
                  )
                );
              })}
            </Container>
          </Container>
        </>
      )}
      {content.email && (
        <>
          <h2>Contact Information</h2>
          <Container>
            <Table celled padded>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>E-mail</Table.Cell>
                  <Table.Cell singleLine>
                    {content.email ? (
                      <a href={`mailto: ${content.email}`}>{content.email}</a>
                    ) : (
                      ''
                    )}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Address</Table.Cell>
                  <Table.Cell singleLine>
                    {content.address ? content.address : '-'}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>City</Table.Cell>
                  <Table.Cell singleLine>
                    {content.city ? content.city : '-'}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>State</Table.Cell>
                  <Table.Cell singleLine>
                    {content.state ? content.state : '-'}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Postal Code</Table.Cell>
                  <Table.Cell singleLine>
                    {content.postal_code ? content.postal_code : '-'}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Country</Table.Cell>
                  <Table.Cell singleLine>
                    {content.country ? content.country.title : '-'}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Container>
        </>
      )}
      {content.merit && (
        <>
          <h2>Contributions</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: flattenHTMLToAppURL(content.merit.data),
            }}
          />
        </>
      )}
    </Container>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
FoundationMemberView.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    organization: PropTypes.string,
    github: PropTypes.string,
    twitter: PropTypes.string,
    linkedin: PropTypes.string,
    merit: PropTypes.shape({
      data: PropTypes.string,
    }),
  }).isRequired,
};

export default FoundationMemberView;
