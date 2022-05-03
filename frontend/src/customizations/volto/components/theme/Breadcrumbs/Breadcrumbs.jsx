/**
 * Breadcrumbs components.
 * @module components/theme/Breadcrumbs/Breadcrumbs
 *
 * CUSTOMIZATIONS:
 * - moved breadcrumbs inside a block
 */

import { useEffect } from 'react';
import { getBaseUrl, hasApiExpander } from '@plone/volto/helpers';
import { useDispatch } from 'react-redux';
import { getBreadcrumbs } from '@plone/volto/actions';

// export class BreadcrumbsComponent extends Component {
//   render() {
//     return null;
//   }
// }

const BreadcrumbsComponent = ({ pathname }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!hasApiExpander('breadcrumbs', getBaseUrl(pathname))) {
      dispatch(getBreadcrumbs(getBaseUrl(pathname)));
    }
  }, [dispatch, pathname]);
  // We keep the call to the get of the breadcrumbs here, because it also serves for the folderContents.
  return null;
};

export default BreadcrumbsComponent;
