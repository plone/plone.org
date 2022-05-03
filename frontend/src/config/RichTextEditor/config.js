import React from 'react';
import { Map } from 'immutable';

import VoltoDraftButtons from '@plone/volto/config/RichTextEditor/Styles';

import Plugins from '@plone/volto/config/RichTextEditor/Plugins';
import Blocks from '@plone/volto/config/RichTextEditor/Blocks';

import ToHTMLRenderers from '@plone/volto/config/RichTextEditor/ToHTML';

import FromHTML from '@plone/volto/config/RichTextEditor/FromHTML';
import createLinkPlugin from '@plone/volto/components/manage/AnchorPlugin';
import UnderlineButton from '@package/config/RichTextEditor/ToolbarButtons/UnderlineButton';
import HeadingsButton from '@package/config/RichTextEditor/ToolbarButtons/HeadingsButton';
import AlignButton from '@package/config/RichTextEditor/ToolbarButtons/AlignButton';
//import CalloutsButton from '@package/config/RichTextEditor/ToolbarButtons/CalloutsButton';
import ButtonsButton from '@package/config/RichTextEditor/ToolbarButtons/ButtonsButton';
import ArrowLink from '@package/config/RichTextEditor/ToolbarButtons/ArrowLink';
import DownloadButton from '@package/config/RichTextEditor/ToolbarButtons/DownloadButton';
//import LightButton from '@package/config/RichTextEditor/ToolbarButtons/LightButton';

const siteBlockRenderMap = Map({
  'align-center': {
    element: 'p',
  },
  'align-right': {
    element: 'p',
  },
  'align-justify': {
    element: 'p',
  },
  'callout-bg': {
    element: 'p',
  },
  buttons: {
    element: 'p',
  },
  arrow: {
    element: 'p',
  },
  'download-button': {
    element: 'p',
  },
});

const renderHTMLBlock = (child) => {
  return child.map((subchild) => {
    if (Array.isArray(subchild)) {
      return subchild.map((subchildren) => {
        if (typeof subchildren === 'string') {
          const last = subchildren.split('\n').length - 1;
          return subchildren.split('\n').map((item, index) => (
            <React.Fragment key={index}>
              {item}
              {index !== last && <br />}
            </React.Fragment>
          ));
        } else {
          return subchildren;
        }
      });
    } else {
      return subchild;
    }
  });
};
const siteBlocksHtmlRenderers = {
  blockquote: (children, { keys }) =>
    children.map((child, i) => (
      <blockquote key={keys[i]}>{renderHTMLBlock(child)}</blockquote>
    )),
  'align-center': (children, { keys }) =>
    children.map((child, i) => (
      <p id={keys[i]} key={keys[i]} className="text-center">
        {renderHTMLBlock(child)}
      </p>
    )),
  'align-right': (children, { keys }) =>
    children.map((child, i) => (
      <p id={keys[i]} key={keys[i]} className="text-right">
        {renderHTMLBlock(child)}
      </p>
    )),
  'align-justify': (children, { keys }) =>
    children.map((child, i) => (
      <p id={keys[i]} key={keys[i]} className="text-justify">
        {renderHTMLBlock(child)}
      </p>
    )),
  callout: (children, { keys }) =>
    children.map((child, i) => (
      <p id={keys[i]} key={keys[i]} className="callout" role="note">
        {renderHTMLBlock(child)}
      </p>
    )),
  'callout-bg': (children, { keys }) =>
    children.map((child, i) => (
      <p id={keys[i]} key={keys[i]} className="callout-bg" role="note">
        {renderHTMLBlock(child)}
      </p>
    )),
  buttons: (children, { keys }) =>
    children.map((child, i) => (
      <p id={keys[i]} key={keys[i]} className="draftjs-buttons">
        {renderHTMLBlock(child)}
      </p>
    )),
  arrow: (children, { keys }) =>
    children.map((child, i) => (
      <p id={keys[i]} key={keys[i]} className="arrow-link">
        {renderHTMLBlock(child)}
      </p>
    )),
  'download-button': (children, { keys }) =>
    children.map((child, i) => (
      <p id={keys[i]} key={keys[i]} className="download-button">
        {renderHTMLBlock(child)}
      </p>
    )),
};

const siteInlineHtmlRenderers = {};

const siteFromHTMLCustomBlockFn = (element) => {
  let ret = FromHTML(element); //get default from plone/volto

  if (!ret) {
    if (element.className === 'callout-bg') {
      ret = {
        type: 'callout-bg',
      };
    } else if (element.className === 'draftjs-buttons') {
      ret = {
        type: 'buttons',
      };
    } else if (element.className === 'arrow-link') {
      ret = {
        type: 'arrow',
      };
    } else if (element.className === 'download-button') {
      ret = {
        type: 'download-button',
      };
    }
  }
  return ret;
};

export default function applyConfig(config) {
  const siteBlockStyleFn = (baseBlockStyleFn) => {
    return (contentBlock) => {
      const type = contentBlock.getType();
      let r = '';
      if (type) {
        r = baseBlockStyleFn(contentBlock) || '';
        r = r.length > 0 ? ' ' : r;

        const styles = {
          'align-center': 'text-center',
          'align-right': 'text-right',
          'align-justify': 'text-justify',
          callout: 'callout',
          'callout-bg': 'callout-bg',
          buttons: 'draftjs-buttons',
          arrow: 'arrow-link',
          'download-button': 'download-button',
        };

        r += styles[type] ?? '';
      }

      return r;
    };
  };

  config.settings.richtextEditorSettings = (props) => {
    const { plugins /*, inlineToolbarButtons*/ } = Plugins(props);
    const { extendedBlockRenderMap, blockStyleFn, listBlockTypes } = Blocks(
      props,
    );

    const { Separator } = props.draftJsInlineToolbarPlugin;
    let linkPlugin = createLinkPlugin({
      libraries: props,
    });

    const {
      BoldButton,
      ItalicButton,
      UnorderedListButton,
      OrderedListButton,
      BlockquoteButton,
    } = VoltoDraftButtons(props);

    const siteRichTextEditorInlineToolbarButtons = [
      AlignButton(props),
      Separator,
      BoldButton,
      ItalicButton,
      UnderlineButton(props),
      //LightButton(props),
      HeadingsButton(props),
      Separator,
      linkPlugin.LinkButton,
      ArrowLink(props),
      DownloadButton(props),
      ButtonsButton(props),
      Separator,
      UnorderedListButton,
      OrderedListButton,
      BlockquoteButton,
      //CalloutsButton(props),
    ];

    return {
      extendedBlockRenderMap: extendedBlockRenderMap
        .update('text-center', (element = 'p') => element)
        .merge(siteBlockRenderMap),
      blockStyleFn: siteBlockStyleFn(blockStyleFn),
      listBlockTypes: listBlockTypes, //.concat(siteListBlockTypes),
      richTextEditorPlugins: plugins,
      richTextEditorInlineToolbarButtons: siteRichTextEditorInlineToolbarButtons,
      FromHTMLCustomBlockFn: siteFromHTMLCustomBlockFn,
      customStyleMap: {},
    };
  };

  // TODO: remove this customization when fixing https://github.com/plone/volto/issues/1601
  config.settings.richtextViewSettings.ToHTMLRenderers = {
    ...config.settings.richtextViewSettings.ToHTMLRenderers,
    blocks: {
      ...ToHTMLRenderers.blocks,
      ...siteBlocksHtmlRenderers,
    },
    inline: { ...ToHTMLRenderers.inline, ...siteInlineHtmlRenderers },
  };

  return config;
}
