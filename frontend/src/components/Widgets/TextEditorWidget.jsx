/**
 * Widget for editing Text inside blocks.
 * @module components/Widgets/TextEditorWidget
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { defineMessages, injectIntl } from 'react-intl';
import { isEqual } from 'lodash';
import loadable from '@loadable/component';

import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

import config from '@plone/volto/registry';

const Editor = loadable(() => import('draft-js-plugins-editor'));

const messages = defineMessages({
  text: {
    id: 'Type text…',
    defaultMessage: 'Type text…',
  },
});

/**
 * TextEditorWidget class.
 * @class Edit
 * @extends Component
 */
class TextEditorWidgetComponent extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    data: PropTypes.objectOf(PropTypes.any).isRequired,
    fieldName: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    onChangeBlock: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    focusOn: PropTypes.func,
    nextFocus: PropTypes.any,
    prevFocus: PropTypes.any,
    showToolbar: PropTypes.bool,
    onSelectBlock: PropTypes.func,
    onAddBlock: PropTypes.func,
    disableMoveToNearest: PropTypes.bool,
  };

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    showToolbar: true,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs WysiwygEditor
   */
  constructor(props) {
    super(props);

    if (!__SERVER__) {
      const { EditorState, convertFromRaw, convertToRaw } = props.draftJs;

      this.EditorState = EditorState;
      this.convertToRaw = convertToRaw;

      let editorState;
      this.draftConfig = config.settings.richtextEditorSettings(props);

      const createInlineToolbarPlugin =
        props.draftJsInlineToolbarPlugin.default;

      if (props.data && props.data[props.fieldName]) {
        editorState = this.EditorState.createWithContent(
          convertFromRaw(props.data[props.fieldName]),
        );
      } else {
        editorState = this.EditorState.createEmpty();
      }

      const inlineToolbarPlugin = createInlineToolbarPlugin({
        structure: this.draftConfig.richTextEditorInlineToolbarButtons,
      });

      this.state = {
        editorState,
        inlineToolbarPlugin,
        addNewBlockOpened: false,
      };
    }
  }

  /**
   * Component will receive props
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    if (this.props.selected) {
      setTimeout(this.node.focus, 0);
    }
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!this.props.selected && nextProps.selected) {
      // See https://github.com/draft-js-plugins/draft-js-plugins/issues/800
      setTimeout(this.node.focus, 0);
      this.setState({
        editorState: this.EditorState.moveFocusToEnd(this.state.editorState),
      });
    }
  }

  /**
   * Change handler
   * @method onChange
   * @param {object} editorState Editor state.
   * @returns {undefined}
   */
  onChange = (editorState) => {
    if (
      !isEqual(
        this.convertToRaw(editorState.getCurrentContent()),
        this.convertToRaw(this.state.editorState.getCurrentContent()),
      )
    ) {
      this.props.onChangeBlock({
        ...this.props.data,
        [this.props.fieldName]: this.convertToRaw(
          editorState.getCurrentContent(),
        ),
      });
    }
    this.setState({ editorState });
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    if (__SERVER__) {
      return <div />;
    }

    const { InlineToolbar } = this.state.inlineToolbarPlugin;
    let placeholder = this.props.placeholder
      ? this.props.placeholder
      : this.props.intl.formatMessage(messages.text);

    const { RichUtils } = this.props.draftJs;
    const isSoftNewlineEvent = this.props.draftJsLibIsSoftNewlineEvent.default;

    return (
      <>
        <div className={[this.props.fieldName]}>
          <Editor
            onChange={this.onChange}
            editorState={this.state.editorState}
            plugins={[
              this.state.inlineToolbarPlugin,
              ...this.draftConfig.richTextEditorPlugins,
            ]}
            blockRenderMap={this.draftConfig.extendedBlockRenderMap}
            blockStyleFn={this.draftConfig.blockStyleFn}
            customStyleMap={this.draftConfig.customStyleMap}
            placeholder={placeholder}
            ref={(node) => {
              this.node = node;
            }}
            onFocus={() => {
              this.props.setFocus(this.props.fieldName);
            }}
            handleReturn={(e) => {
              if (this.props.disableMoveToNearest) {
                e.stopPropagation();
              }
              if (isSoftNewlineEvent(e)) {
                this.onChange(
                  RichUtils.insertSoftNewline(this.state.editorState),
                );
                return 'handled';
              }

              if (this.props.onSelectBlock && this.props.onAddBlock) {
                this.props.onSelectBlock(
                  this.props.onAddBlock('text', this.props.index + 1),
                );
                return 'handled';
              }

              return {};
            }}
            onUpArrow={(e) => {
              if (this.props.prevFocus) {
                this.props.setFocus(this.props.prevFocus);
                e.stopPropagation();
              } else {
                if (this.props.disableMoveToNearest) {
                  e.stopPropagation();
                }
              }
            }}
            onDownArrow={(e) => {
              if (this.props.nextFocus) {
                this.props.setFocus(this.props.nextFocus);
                e.stopPropagation();
              } else {
                if (this.props.disableMoveToNearest) {
                  e.stopPropagation();
                }
              }
            }}
          />
          {this.props.showToolbar && <InlineToolbar />}
        </div>
      </>
    );
  }
}

export const TextEditorWidget = compose(
  injectIntl,
  injectLazyLibs([
    'draftJs',
    'draftJsLibIsSoftNewlineEvent',
    'draftJsFilters',
    'draftJsInlineToolbarPlugin',
    'draftJsBlockBreakoutPlugin',
    'draftJsCreateInlineStyleButton',
    'draftJsCreateBlockStyleButton',
    'immutableLib',
    // TODO: add all plugin dependencies, also in Wysiwyg and Cell
  ]),
)(TextEditorWidgetComponent);

const Preloader = (props) => {
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    Editor.load().then(() => setLoaded(true));
  }, []);
  return loaded ? <TextEditorWidget {...props} /> : null;
};

export default React.memo(Preloader);
