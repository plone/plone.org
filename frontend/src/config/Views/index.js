import DefaultView from '@plone/volto/components/theme/View/DefaultView';
import { VulnerabilityView, HotfixView } from '@package/components';


export const SiteViews = (config) => {
  config.views.contentTypesViews = {
    ...config.views.contentTypesViews,
    'News Item': DefaultView,
    Event: DefaultView,
    hotfix: HotfixView,
    vulnerability: VulnerabilityView,
  };
};
