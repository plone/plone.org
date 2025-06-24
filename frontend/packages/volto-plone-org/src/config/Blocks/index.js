import SimpleCardListing from 'volto-plone-org/components/Blocks/Listing/variations/SimpleCardListing';
import SponsorCardListing from 'volto-plone-org/components/Blocks/Listing/variations/SponsorCardListing';
import MemberCardListing from 'volto-plone-org/components/Blocks/Listing/variations/MemberCardListing';
import NewsCardListing from 'volto-plone-org/components/Blocks/Listing/variations/NewsCardListing';
import DownloadListing from 'volto-plone-org/components/Blocks/Listing/variations/DownloadListing';
import SearchResults from 'volto-plone-org/components/Blocks/Listing/variations/SearchResults';

import getDefaultSchema from 'volto-plone-org/config/Blocks/schemas/listing-variations/default-schema';
import getSimpleCardVariationSchema from 'volto-plone-org/config/Blocks/schemas/listing-variations/simple-card-variation-schema';
import getSponsorCardVariationSchema from 'volto-plone-org/config/Blocks/schemas/listing-variations/sponsor-card-variation-schema';
import getNewsCardVariationSchema from 'volto-plone-org/config/Blocks/schemas/listing-variations/news-card-variation-schema';
import getDownloadVariationSchema from 'volto-plone-org/config/Blocks/schemas/listing-variations/download-list-variation-schema';
import getSearchResultsVariationSchema from 'volto-plone-org/config/Blocks/schemas/listing-variations/search-results-variation-schema';
import { removeListingVariation } from 'volto-plone-org/config/Blocks/schemas/utils';

import divideHorizontalSVG from '@plone/volto/icons/divide-horizontal.svg';
import BreakView from 'volto-plone-org/components/Blocks/Break/View';
import BreakEdit from 'volto-plone-org/components/Blocks/Break/Edit';

import userSVG from '@plone/volto/icons/user.svg';
import AuthorView from 'volto-plone-org/components/Blocks/Author/View';
import AuthorEdit from 'volto-plone-org/components/Blocks/Author/Edit';

import infoSVG from '@plone/volto/icons/info.svg';
import InfoboxView from 'volto-plone-org/components/Blocks/InfoBox/View';
import InfoboxEdit from 'volto-plone-org/components/Blocks/InfoBox/Edit';

// import text1SVG from 'volto-plone-org/icons/text1.svg';
// import Text1View from 'volto-plone-org/components/Blocks/Text1/View';
// import Text1Edit from 'volto-plone-org/components/Blocks/Text1/Edit';

// import text5SVG from 'volto-plone-org/icons/text5.svg';
// import Text5View from 'volto-plone-org/components/Blocks/Text5/View';
// import Text5Edit from 'volto-plone-org/components/Blocks/Text5/Edit';

// import text4SVG from 'volto-plone-org/icons/text4.svg';
// import Text4View from 'volto-plone-org/components/Blocks/Text4/View';
// import Text4Edit from 'volto-plone-org/components/Blocks/Text4/Edit';

// import text6SVG from 'volto-plone-org/icons/text6.svg';
// import Text6View from 'volto-plone-org/components/Blocks/Text6/View';
// import Text6Edit from 'volto-plone-org/components/Blocks/Text6/Edit';

// import text7SVG from 'volto-plone-org/icons/text7.svg';
// import Text7View from 'volto-plone-org/components/Blocks/Text7/View';
// import Text7Edit from 'volto-plone-org/components/Blocks/Text7/Edit';

// import sliderSVG from '@plone/volto/icons/slider.svg';
// import SliderView from 'volto-plone-org/components/Blocks/Slider/View';
// import SliderEdit from 'volto-plone-org/components/Blocks/Slider/Edit';

// import numbersSVG from 'volto-plone-org/icons/numbers_block.svg';
// import NumbersView from 'volto-plone-org/components/Blocks/Numbers/View';
// import NumbersEdit from 'volto-plone-org/components/Blocks/Numbers/Edit';

import moreSVG from '@plone/volto/icons/more.svg';
import BreadcrumbsView from 'volto-plone-org/components/Blocks/Breadcrumbs/View';
import BreadcrumbsEdit from 'volto-plone-org/components/Blocks/Breadcrumbs/Edit';

import ViewHTMLBlock from 'volto-plone-org/components/Blocks/HTML/View';
import EditHTMLBlock from 'volto-plone-org/components/Blocks/HTML/Edit';

// import iconsNumbersSVG from 'volto-plone-org/icons/icons_and_numbers.svg';
// import IconsAndNumbersView from 'volto-plone-org/components/Blocks/IconsAndNumbers/View';
// import IconsAndNumbersEdit from 'volto-plone-org/components/Blocks/IconsAndNumbers/Edit';

// import iconsAndTextSVG from 'volto-plone-org/icons/icons_and_text.svg';
// import IconsAndTextView from 'volto-plone-org/components/Blocks/IconsAndText/View';
// import IconsAndTextEdit from 'volto-plone-org/components/Blocks/IconsAndText/Edit';

// import imageColumnsSVG from 'volto-plone-org/icons/image_columns.svg';
// import ImageColumnsView from 'volto-plone-org/components/Blocks/ImageColumns/View';
// import ImageColumnsEdit from 'volto-plone-org/components/Blocks/ImageColumns/Edit';

import linkSVG from '@plone/volto/icons/link.svg';
import LinkedItemsView from 'volto-plone-org/components/Blocks/LinkedItems/View';
import LinkedItemsEdit from 'volto-plone-org/components/Blocks/LinkedItems/Edit';
// import TextEdit from 'volto-plone-org/components/Blocks/Text/Edit';
// import TextView from 'volto-plone-org/components/Blocks/Text/View';

import tabsSVG from 'volto-plone-org/icons/tabs.svg';
import TabsView from 'volto-plone-org/components/Blocks/Tabs/View';
import TabsEdit from 'volto-plone-org/components/Blocks/Tabs/Edit';

import calendarSVG from '@plone/volto/icons/calendar.svg';
import PageMetadataView from 'volto-plone-org/components/Blocks/PageMetadata/View';
import PageMetadataEdit from 'volto-plone-org/components/Blocks/PageMetadata/Edit';

import tagSVG from '@plone/volto/icons/tag.svg';
import PageTagView from 'volto-plone-org/components/Blocks/PageTag/View';
import PageTagEdit from 'volto-plone-org/components/Blocks/PageTag/Edit';

import RelatedItemsView from 'volto-plone-org/components/Blocks/RelatedItems/View';
import RelatedItemsEdit from 'volto-plone-org/components/Blocks/RelatedItems/Edit';

import downSVG from 'volto-plone-org/icons/arrow-down.svg';
import rightSVG from 'volto-plone-org/icons/arrow-right.svg';
import upSVG from 'volto-plone-org/icons/arrow-up.svg';

import zoomSVG from '@plone/volto/icons/zoom.svg';
import NucliaEdit from 'volto-plone-org/components/Blocks/Nuclia/Edit';
import NucliaView from 'volto-plone-org/components/Blocks/Nuclia/View';

export const SiteBlocks = (config) => {
  const defaultBlocksConfig = {
    restricted: false,
    mostUsed: false,
    security: {
      addPermission: [],
      view: [],
    },
    sidebarTab: 1,
  };

  config.blocks.blocksConfig = {
    ...config.blocks.blocksConfig,
    title: { ...config.blocks.blocksConfig.title, restricted: false }, //lo si può aggiungere sempre
    // text: {
    //   ...config.blocks.blocksConfig.text,
    //   edit: TextEdit,
    //   view: TextView,
    //   sidebarTab: 1,
    // },
    breadcrumbs: {
      ...defaultBlocksConfig,
      id: 'breadcrumbs',
      title: 'Breadcrumbs',
      icon: moreSVG,
      group: 'text',
      view: BreadcrumbsView,
      edit: BreadcrumbsEdit,
      restricted: true,
      sidebarTab: 1,
    },
    author: {
      id: 'author',
      title: 'Author',
      icon: userSVG,
      group: 'common',
      view: AuthorView,
      edit: AuthorEdit,
      restricted: true,
      mostUsed: false,
      blockHasOwnFocusManagement: false,
      security: {
        addPermission: [],
        view: [],
      },
      sidebarTab: 1,
    },
    related_items: {
      id: 'related_items',
      title: 'Related items',
      icon: moreSVG,
      group: 'common',
      view: RelatedItemsView,
      edit: RelatedItemsEdit,
      restricted: true,
      mostUsed: false,
      blockHasOwnFocusManagement: false,
      security: {
        addPermission: [],
        view: [],
      },
      sidebarTab: 1,
    },
    pagemetadata: {
      id: 'pagemetadata',
      title: 'Publication date',
      icon: calendarSVG,
      group: 'common',
      view: PageMetadataView,
      edit: PageMetadataEdit,
      restricted: false,
      mostUsed: false,
      blockHasOwnFocusManagement: false,
      security: {
        addPermission: [],
        view: [],
      },
      sidebarTab: 1,
    },
    pagetag: {
      id: 'pagetag',
      title: "Page's Tags",
      icon: tagSVG,
      group: 'common',
      view: PageTagView,
      edit: PageTagEdit,
      restricted: true,
      mostUsed: false,
      blockHasOwnFocusManagement: false,
      security: {
        addPermission: [],
        view: [],
      },
      sidebarTab: 1,
    },
    infobox: {
      id: 'infobox',
      title: 'Info Box',
      icon: infoSVG,
      group: 'common',
      view: InfoboxView,
      edit: InfoboxEdit,
      restricted: true,
      mostUsed: false,
      blockHasOwnFocusManagement: false,
      security: {
        addPermission: [],
        view: [],
      },
      sidebarTab: 1,
    },
    // slider: {
    //   ...defaultBlocksConfig,
    //   id: 'slider',
    //   title: 'Slider',
    //   icon: sliderSVG,
    //   group: 'media',
    //   view: SliderView,
    //   edit: SliderEdit,
    //   sidebarTab: 1,
    // },
    // image_columns: {
    //   ...defaultBlocksConfig,
    //   id: 'image_columns',
    //   title: 'Side by side images',
    //   icon: imageColumnsSVG,
    //   group: 'media',
    //   view: ImageColumnsView,
    //   edit: ImageColumnsEdit,
    //   sidebarTab: 1,
    // },
    tabs: {
      id: 'tabs',
      title: 'Tabs',
      icon: tabsSVG,
      group: 'text',
      view: TabsView,
      edit: TabsEdit,
      restricted: false,
      mostUsed: false,
      blockHasOwnFocusManagement: true,
      sidebarTab: 1,
      security: {
        addPermission: [],
        view: [],
      },
    },
    // text1: {
    //   ...defaultBlocksConfig,
    //   id: 'text1',
    //   title: 'Text 1',
    //   icon: text1SVG,
    //   group: 'text',
    //   view: Text1View,
    //   edit: Text1Edit,
    //   blockHasOwnFocusManagement: true,
    // },
    // text4: {
    //   ...defaultBlocksConfig,
    //   id: 'text4',
    //   title: 'Text 4',
    //   icon: text4SVG,
    //   group: 'text',
    //   view: Text4View,
    //   edit: Text4Edit,
    //   blockHasOwnFocusManagement: true,
    // },
    // text5: {
    //   ...defaultBlocksConfig,
    //   id: 'text5',
    //   title: 'Text 5',
    //   icon: text5SVG,
    //   group: 'text',
    //   view: Text5View,
    //   edit: Text5Edit,
    //   blockHasOwnFocusManagement: true,
    // },
    // text6: {
    //   ...defaultBlocksConfig,
    //   id: 'text6',
    //   title: 'Text 6',
    //   icon: text6SVG,
    //   group: 'text',
    //   view: Text6View,
    //   edit: Text6Edit,
    //   blockHasOwnFocusManagement: true,
    // },
    // text7: {
    //   ...defaultBlocksConfig,
    //   id: 'text7',
    //   title: 'Text 7',
    //   icon: text7SVG,
    //   group: 'text',
    //   view: Text7View,
    //   edit: Text7Edit,
    // },
    break: {
      ...defaultBlocksConfig,
      id: 'break',
      title: 'Page break',
      icon: divideHorizontalSVG,
      group: 'text',
      view: BreakView,
      edit: BreakEdit,
      sidebarTab: 0,
    },
    // numbers: {
    //   ...defaultBlocksConfig,
    //   id: 'numbers',
    //   title: 'Numbers',
    //   icon: numbersSVG,
    //   group: 'text',
    //   view: NumbersView,
    //   edit: NumbersEdit,
    //   sidebarTab: 1,
    // },
    // icons_and_numbers: {
    //   ...defaultBlocksConfig,
    //   id: 'icons_and_numbers',
    //   title: 'Icons and numbers',
    //   icon: iconsNumbersSVG,
    //   group: 'text',
    //   view: IconsAndNumbersView,
    //   edit: IconsAndNumbersEdit,
    //   sidebarTab: 1,
    // },
    // icons_and_text: {
    //   ...defaultBlocksConfig,
    //   id: 'icons_and_text',
    //   title: 'Icons and text',
    //   icon: iconsAndTextSVG,
    //   group: 'text',
    //   view: IconsAndTextView,
    //   edit: IconsAndTextEdit,
    //   sidebarTab: 1,
    // },
    html: {
      ...config.blocks.blocksConfig.html,
      view: ViewHTMLBlock,
      edit: EditHTMLBlock,
      sidebarTab: 1,
    },
    accordion: {
      ...config.blocks.blocksConfig.accordion,
      group: 'text',
      titleIcons: {
        closed: { leftPosition: rightSVG, rightPosition: downSVG },
        opened: { leftPosition: downSVG, rightPosition: upSVG },
      },
    },

    linked_items: {
      ...defaultBlocksConfig,
      id: 'linked_items',
      title: 'Linked items',
      icon: linkSVG,
      group: 'common',
      view: LinkedItemsView,
      edit: LinkedItemsEdit,
      sidebarTab: 1,
    },

    listing: {
      ...config.blocks.blocksConfig.listing,
      showLinkMore: true,
      getAsyncData: null, // questo disabilita il ssr dei listing perché rallenta vistosamente la pagina (per ora continuiamo con rendertron)
      variations: [
        ...config.blocks.blocksConfig.listing.variations,
        {
          id: 'simpleCardListing',
          template: SimpleCardListing,
          title: 'Simple Card',
          isDefault: true,
          schemaEnhancer: ({ schema, formData, intl }) => {
            let pos = getDefaultSchema(schema, formData, intl);
            getSimpleCardVariationSchema(schema, formData, intl, pos);
            return schema;
          },
        },
        {
          id: 'newsCardListing',
          isDefault: false,
          title: 'News Card',
          template: NewsCardListing,
          schemaEnhancer: ({ schema, formData, intl }) => {
            let pos = getDefaultSchema(schema, formData, intl);
            getNewsCardVariationSchema(schema, formData, intl, pos);
            return schema;
          },
        },
        {
          id: 'memberCardListing',
          isDefault: false,
          title: 'Foundation Member Card',
          template: MemberCardListing,
          schemaEnhancer: ({ schema, formData, intl }) => {
            let pos = getDefaultSchema(schema, formData, intl);
            getSimpleCardVariationSchema(schema, formData, intl, pos);
            return schema;
          },
        },
        {
          id: 'sponsorCardListing',
          isDefault: false,
          title: 'Foundation Sponsor Card',
          template: SponsorCardListing,
          schemaEnhancer: ({ schema, formData, intl }) => {
            let pos = getDefaultSchema(schema, formData, intl);
            getSponsorCardVariationSchema(schema, formData, intl, pos);
            return schema;
          },
        },
        {
          id: 'downloadListing',
          isDefault: false,
          title: 'Download',
          template: DownloadListing,
          schemaEnhancer: ({ schema, formData, intl }) => {
            let pos = getDefaultSchema(schema, formData, intl);
            getDownloadVariationSchema(schema, formData, intl, pos);
            return schema;
          },
        },
        {
          id: 'searchResults',
          isDefault: false,
          title: 'Search results',
          template: SearchResults,
          schemaEnhancer: ({ schema, formData, intl }) => {
            let pos = getDefaultSchema(schema, formData, intl);
            getSearchResultsVariationSchema(schema, formData, intl, pos);
            return schema;
          },
        },
        // {
        //   id: 'example-variation',
        //   isDefault: true,
        //   title: 'Example',
        //   template: ExampleVariation,
        //   schemaEnhancer: ({ schema, formData, intl }) => {
        //     let pos = getDefaultSchema(schema, formData, intl);
        //     getExampleVariationSchema(schema, formData, intl, pos);
        //     return schema;
        //   },
        // },
      ],
    },
    nuclia: {
      id: 'nuclia',
      title: 'Nuclia',
      icon: zoomSVG,
      group: 'common',
      view: NucliaView,
      edit: NucliaEdit,
      restricted: false,
      mostUsed: false,
      blockHasOwnFocusManagement: true,
      sidebarTab: 1,
      security: {
        addPermission: [],
        view: [],
      },
    },
  };

  removeListingVariation(config, 'default');
  removeListingVariation(config, 'imageGallery');
  removeListingVariation(config, 'summary');
  delete config.blocks.blocksConfig.toc; //remove block 'indice dei contenuti'

  config.blocks.requiredBlocks = ['author', 'infobox', 'pagetag']; //il blocco 'title' non è required perchè al suo posto possono mettere il blocco slider
  config.blocks.initialBlocks = {
    ...config.blocks.initialBlocks,
    Document: ['title', 'related_items', 'pagetag'],
    Event: ['title', 'infobox', 'related_items', 'pagetag'],
    Project: ['slider', 'title'],
    Story: ['slider', 'title', 'author', 'related_items'],
    'News Item': ['slider', 'title', 'related_items', 'pagetag'],
  };
  config.blocks.initialBlocksFocus = {
    ...config.blocks.initialBlocksFocus,
    Document: 'title',
    Event: 'title',
    'News Item': 'title',
  };
};
