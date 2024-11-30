import DefaultView from '@plone/volto/components/theme/View/DefaultView';
import {
  VulnerabilityView,
  HotfixView,
  PlonereleaseView,
  FoundationMemberView,
} from 'volto-plone-org/components';

export const SiteViews = (config) => {
  config.views.contentTypesViews = {
    ...config.views.contentTypesViews,
    'News Item': DefaultView,
    Event: DefaultView,
    hotfix: HotfixView,
    vulnerability: VulnerabilityView,
    plonerelease: PlonereleaseView,
    FoundationMember: FoundationMemberView,
  };
};
