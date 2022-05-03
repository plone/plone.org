import SimpleCardListing from '@package/components/Blocks/Listing/variations/SimpleCardListing';
import NewsCardListing from '@package/components/Blocks/Listing/variations/NewsCardListing';
import DownloadListing from '@package/components/Blocks/Listing/variations/DownloadListing';
import SearchResults from '@package/components/Blocks/Listing/variations/SearchResults';

import getDefaultSchema from '@package/config/Blocks/schemas/listing-variations/default-schema';
import getSimpleCardVariationSchema from '@package/config/Blocks/schemas/listing-variations/simple-card-variation-schema';
import getNewsCardVariationSchema from '@package/config/Blocks/schemas/listing-variations/news-card-variation-schema';
import getDownloadVariationSchema from '@package/config/Blocks/schemas/listing-variations/download-list-variation-schema';
import getSearchResultsVariationSchema from '@package/config/Blocks/schemas/listing-variations/search-results-variation-schema';
import { removeListingVariation } from '@package/config/Blocks/schemas/utils';

import divideHorizontalSVG from '@plone/volto/icons/divide-horizontal.svg';
import BreakView from '@package/components/Blocks/Break/View';
import BreakEdit from '@package/components/Blocks/Break/Edit';

import userSVG from '@plone/volto/icons/user.svg';
import AuthorView from '@package/components/Blocks/Author/View';
import AuthorEdit from '@package/components/Blocks/Author/Edit';

import infoSVG from '@plone/volto/icons/info.svg';
import InfoboxView from '@package/components/Blocks/InfoBox/View';
import InfoboxEdit from '@package/components/Blocks/InfoBox/Edit';

import text1SVG from '@package/icons/text1.svg';
import Text1View from '@package/components/Blocks/Text1/View';
import Text1Edit from '@package/components/Blocks/Text1/Edit';

import text5SVG from '@package/icons/text5.svg';
import Text5View from '@package/components/Blocks/Text5/View';
import Text5Edit from '@package/components/Blocks/Text5/Edit';

import text4SVG from '@package/icons/text4.svg';
import Text4View from '@package/components/Blocks/Text4/View';
import Text4Edit from '@package/components/Blocks/Text4/Edit';

import text6SVG from '@package/icons/text6.svg';
import Text6View from '@package/components/Blocks/Text6/View';
import Text6Edit from '@package/components/Blocks/Text6/Edit';

import text7SVG from '@package/icons/text7.svg';
import Text7View from '@package/components/Blocks/Text7/View';
import Text7Edit from '@package/components/Blocks/Text7/Edit';

import sliderSVG from '@plone/volto/icons/slider.svg';
import SliderView from '@package/components/Blocks/Slider/View';
import SliderEdit from '@package/components/Blocks/Slider/Edit';

import numbersSVG from '@package/icons/numbers_block.svg';
import NumbersView from '@package/components/Blocks/Numbers/View';
import NumbersEdit from '@package/components/Blocks/Numbers/Edit';

import moreSVG from '@plone/volto/icons/more.svg';
import BreadcrumbsView from '@package/components/Blocks/Breadcrumbs/View';
import BreadcrumbsEdit from '@package/components/Blocks/Breadcrumbs/Edit';

import ViewHTMLBlock from '@package/components/Blocks/HTML/View';
import EditHTMLBlock from '@package/components/Blocks/HTML/Edit';

import iconsNumbersSVG from '@package/icons/icons_and_numbers.svg';
import IconsAndNumbersView from '@package/components/Blocks/IconsAndNumbers/View';
import IconsAndNumbersEdit from '@package/components/Blocks/IconsAndNumbers/Edit';

import iconsAndTextSVG from '@package/icons/icons_and_text.svg';
import IconsAndTextView from '@package/components/Blocks/IconsAndText/View';
import IconsAndTextEdit from '@package/components/Blocks/IconsAndText/Edit';

import imageColumnsSVG from '@package/icons/image_columns.svg';
import ImageColumnsView from '@package/components/Blocks/ImageColumns/View';
import ImageColumnsEdit from '@package/components/Blocks/ImageColumns/Edit';

import linkSVG from '@plone/volto/icons/link.svg';
import LinkedItemsView from '@package/components/Blocks/LinkedItems/View';
import LinkedItemsEdit from '@package/components/Blocks/LinkedItems/Edit';
import TextEdit from '@package/components/Blocks/Text/Edit';
import TextView from '@package/components/Blocks/Text/View';

import tabsSVG from '@package/icons/tabs.svg';
import TabsView from '@package/components/Blocks/Tabs/View';
import TabsEdit from '@package/components/Blocks/Tabs/Edit';

import calendarSVG from '@plone/volto/icons/calendar.svg';
import PageMetadataView from '@package/components/Blocks/PageMetadata/View';
import PageMetadataEdit from '@package/components/Blocks/PageMetadata/Edit';

import tagSVG from '@plone/volto/icons/tag.svg';
import PageTagView from '@package/components/Blocks/PageTag/View';
import PageTagEdit from '@package/components/Blocks/PageTag/Edit';

import RelatedItemsView from '@package/components/Blocks/RelatedItems/View';
import RelatedItemsEdit from '@package/components/Blocks/RelatedItems/Edit';

import downSVG from '@package/icons/arrow-down.svg';
import rightSVG from '@package/icons/arrow-right.svg';
import upSVG from '@package/icons/arrow-up.svg';

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
    text: {
      ...config.blocks.blocksConfig.text,
      edit: TextEdit,
      view: TextView,
      sidebarTab: 1,
    },
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

    slider: {
      ...defaultBlocksConfig,
      id: 'slider',
      title: 'Slider',
      icon: sliderSVG,
      group: 'media',
      view: SliderView,
      edit: SliderEdit,
      sidebarTab: 1,
    },
    image_columns: {
      ...defaultBlocksConfig,
      id: 'image_columns',
      title: 'Side by side images',
      icon: imageColumnsSVG,
      group: 'media',
      view: ImageColumnsView,
      edit: ImageColumnsEdit,
      sidebarTab: 1,
    },
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
    text1: {
      ...defaultBlocksConfig,
      id: 'text1',
      title: 'Text 1',
      icon: text1SVG,
      group: 'text',
      view: Text1View,
      edit: Text1Edit,
      blockHasOwnFocusManagement: true,
    },
    text4: {
      ...defaultBlocksConfig,
      id: 'text4',
      title: 'Text 4',
      icon: text4SVG,
      group: 'text',
      view: Text4View,
      edit: Text4Edit,
      blockHasOwnFocusManagement: true,
    },
    text5: {
      ...defaultBlocksConfig,
      id: 'text5',
      title: 'Text 5',
      icon: text5SVG,
      group: 'text',
      view: Text5View,
      edit: Text5Edit,
      blockHasOwnFocusManagement: true,
    },
    text6: {
      ...defaultBlocksConfig,
      id: 'text6',
      title: 'Text 6',
      icon: text6SVG,
      group: 'text',
      view: Text6View,
      edit: Text6Edit,
      blockHasOwnFocusManagement: true,
    },
    text7: {
      ...defaultBlocksConfig,
      id: 'text7',
      title: 'Text 7',
      icon: text7SVG,
      group: 'text',
      view: Text7View,
      edit: Text7Edit,
    },
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
    numbers: {
      ...defaultBlocksConfig,
      id: 'numbers',
      title: 'Numbers',
      icon: numbersSVG,
      group: 'text',
      view: NumbersView,
      edit: NumbersEdit,
      sidebarTab: 1,
    },
    icons_and_numbers: {
      ...defaultBlocksConfig,
      id: 'icons_and_numbers',
      title: 'Icons and numbers',
      icon: iconsNumbersSVG,
      group: 'text',
      view: IconsAndNumbersView,
      edit: IconsAndNumbersEdit,
      sidebarTab: 1,
    },
    icons_and_text: {
      ...defaultBlocksConfig,
      id: 'icons_and_text',
      title: 'Icons and text',
      icon: iconsAndTextSVG,
      group: 'text',
      view: IconsAndTextView,
      edit: IconsAndTextEdit,
      sidebarTab: 1,
    },
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
  };

  removeListingVariation(config, 'default');
  removeListingVariation(config, 'imageGallery');
  removeListingVariation(config, 'summary');
  delete config.blocks.blocksConfig.toc; //remove block 'indice dei contenuti'

  config.blocks.requiredBlocks = [
    'breadcrumbs',
    'author',
    'infobox',
    'pagetag',
  ]; //il blocco 'title' non è required perchè al suo posto possono mettere il blocco slider
  config.blocks.initialBlocks = {
    ...config.blocks.initialBlocks,
    Document: ['breadcrumbs', 'title', 'related_items', 'pagetag'],
    Event: ['breadcrumbs', 'title', 'infobox', 'related_items', 'pagetag'],
    Project: ['slider', 'breadcrumbs', 'title'],
    Story: ['slider', 'breadcrumbs', 'title', 'author', 'related_items'],
    'News Item': ['slider', 'breadcrumbs', 'title', 'related_items', 'pagetag'],
  };
  config.blocks.initialBlocksFocus = {
    ...config.blocks.initialBlocksFocus,
    Document: 'title',
    Event: 'title',
    'News Item': 'title',
  };
};
