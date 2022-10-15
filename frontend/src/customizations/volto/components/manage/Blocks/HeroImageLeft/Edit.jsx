/**
 * Edit Hero block.
 * @module components/manage/Blocks/Image/Edit
 *
 *
 * CUSTOMIZATIONS:
 * - made the 'description' field formattable
 * - added wrapper to the image
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { readAsDataURL } from 'promise-file-reader';
import { Button, Dimmer, Loader, Message } from 'semantic-ui-react';
import { isEqual } from 'lodash';
import { defineMessages, injectIntl } from 'react-intl';
import cx from 'classnames';

import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import { flattenToAppURL, getBaseUrl } from '@plone/volto/helpers';
import { createContent } from '@plone/volto/actions';
import { Icon, SidebarPortal, LinkMore } from '@plone/volto/components';

import clearSVG from '@plone/volto/icons/clear.svg';

import Data from '@plone/volto/components/manage/Blocks/HeroImageLeft/Data';

import TextEditorWidget from '@package/components/Widgets/TextEditorWidget';

import config from '@plone/volto/registry';

const messages = defineMessages({
  title: {
    id: 'Title',
    defaultMessage: 'Titolo',
  },
  description: {
    id: 'Description',
    defaultMessage: 'Descrizione',
  },
  placeholder: {
    id: 'Upload a new image',
    defaultMessage: 'Upload a new image',
  },
  image: {
    id: 'Image',
    defaultMessage: 'Image',
  },
  browse: {
    id: 'Browse',
    defaultMessage: 'Browse',
  },
  uploading: {
    id: 'Uploading image',
    defaultMessage: 'Uploading image',
  },
});

/**
 * Edit image block class.
 * @class Edit
 * @extends Component
 */
class EditComponent extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    selected: PropTypes.bool.isRequired,
    block: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    data: PropTypes.objectOf(PropTypes.any).isRequired,
    content: PropTypes.objectOf(PropTypes.any).isRequired,
    request: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    pathname: PropTypes.string.isRequired,
    onChangeBlock: PropTypes.func.isRequired,
    onSelectBlock: PropTypes.func.isRequired,
    onDeleteBlock: PropTypes.func.isRequired,
    onFocusPreviousBlock: PropTypes.func.isRequired,
    onFocusNextBlock: PropTypes.func.isRequired,
    handleKeyDown: PropTypes.func.isRequired,
    createContent: PropTypes.func.isRequired,
    editable: PropTypes.bool,
  };

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    editable: true,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs WysiwygEditor
   */
  constructor(props) {
    super(props);

    this.draftConfig = config.settings.richtextEditorSettings(props);

    this.onUploadImage = this.onUploadImage.bind(this);
    this.state = {
      uploading: false,
    };

    const { Map } = this.props.immutableLib;

    if (!__SERVER__) {
      let titleEditorState;

      const { DefaultDraftBlockRenderMap, EditorState } = props.draftJs;
      const { stateFromHTML } = props.draftJsImportHtml;

      const blockTitleRenderMap = Map({
        unstyled: {
          element: 'h1',
        },
      });

      this.extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(
        blockTitleRenderMap,
      );

      if (props.data && props.data.title) {
        titleEditorState = EditorState.createWithContent(
          stateFromHTML(props.data.title),
        );
      } else {
        titleEditorState = EditorState.createEmpty();
      }

      this.state = {
        uploading: false,
        titleEditorState,

        currentFocused: 'title',
      };
    }

    this.onChangeTitle = this.onChangeTitle.bind(this);
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    if (this.props.selected) {
      this.titleEditor.focus();
    }
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      this.props.request.loading &&
      nextProps.request.loaded &&
      this.state.uploading
    ) {
      this.setState({
        uploading: false,
      });
      this.props.onChangeBlock(this.props.block, {
        ...this.props.data,
        url: nextProps.content['@id'],
      });
    }

    const { EditorState } = this.props.draftJs;
    const { stateFromHTML } = this.props.draftJsImportHtml;

    if (
      nextProps.data.title &&
      this.props.data.title !== nextProps.data.title &&
      !this.props.selected
    ) {
      const contentState = stateFromHTML(nextProps.data.title);
      this.setState({
        titleEditorState: nextProps.data.title
          ? EditorState.createWithContent(contentState)
          : EditorState.createEmpty(),
      });
    }

    if (nextProps.selected !== this.props.selected) {
      if (this.state.currentFocused === 'title') {
        this.titleEditor.focus();
      }
    }
  }

  /**
   * @param {*} nextProps
   * @param {*} nextState
   * @returns {boolean}
   * @memberof Edit
   */
  shouldComponentUpdate(nextProps) {
    return this.props.selected || !isEqual(this.props.data, nextProps.data);
  }

  /**
   * Change Title handler
   * @method onChangeTitle
   * @param {object} titleEditorState Editor state.
   * @returns {undefined}
   */
  onChangeTitle(titleEditorState) {
    this.setState({ titleEditorState }, () => {
      this.props.onChangeBlock(this.props.block, {
        ...this.props.data,
        title: titleEditorState.getCurrentContent().getPlainText(),
      });
    });
  }

  /**
   * Upload image handler
   * @method onUploadImage
   * @returns {undefined}
   */
  onUploadImage({ target }) {
    const file = target.files[0];
    this.setState({
      uploading: true,
    });
    readAsDataURL(file).then((data) => {
      const fields = data.match(/^data:(.*);(.*),(.*)$/);
      this.props.createContent(
        getBaseUrl(this.props.pathname),
        {
          '@type': 'Image',
          image: {
            data: fields[3],
            encoding: fields[2],
            'content-type': fields[1],
            filename: file.name,
          },
        },
        this.props.block,
      );
    });
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    if (__SERVER__) {
      return <div />;
    }

    const { Editor } = this.props.draftJs;
    const placeholder =
      this.props.data.placeholder ||
      this.props.intl.formatMessage(messages.placeholder);

    return (
      <div
        className={cx('block hero', {
          selected: this.props.selected,
        })}
      >
        {this.props.selected && this.props.editable && !!this.props.data.url && (
          <div className="toolbar">
            <Button.Group>
              <Button
                icon
                basic
                onClick={() =>
                  this.props.onChangeBlock(this.props.block, {
                    ...this.props.data,
                    url: '',
                  })
                }
              >
                <Icon name={clearSVG} size="24px" color="#e40166" />
              </Button>
            </Button.Group>
          </div>
        )}
        <div className="block-inner-wrapper">
          {this.props.data.url ? (
            <div className="image-wrapper">
              <img
                className="hero-image"
                src={`${flattenToAppURL(this.props.data.url)}/@@images/image`}
                alt=""
              />
            </div>
          ) : (
            <div className="image-add">
              <Message className="image-message">
                {this.state.uploading && (
                  <Dimmer active>
                    <Loader indeterminate>
                      {this.props.intl.formatMessage(messages.uploading)}
                    </Loader>
                  </Dimmer>
                )}
                <center>
                  <h4>{this.props.intl.formatMessage(messages.image)}</h4>
                  {this.props.editable && (
                    <>
                      <p>{placeholder}</p>
                      <p>
                        <label className="ui button file">
                          {this.props.intl.formatMessage(messages.browse)}
                          <input
                            type="file"
                            onChange={this.onUploadImage}
                            style={{ display: 'none' }}
                          />
                        </label>
                      </p>
                    </>
                  )}
                </center>
              </Message>
            </div>
          )}
          <div className="hero-body">
            <div className="hero-text">
              <Editor
                ref={(node) => {
                  this.titleEditor = node;
                }}
                readOnly={!this.props.editable}
                onChange={this.onChangeTitle}
                editorState={this.state.titleEditorState}
                blockRenderMap={this.extendedBlockRenderMap}
                handleReturn={() => true}
                placeholder={this.props.intl.formatMessage(messages.title)}
                blockStyleFn={() => 'title-editor'}
                onUpArrow={() => {
                  const selectionState = this.state.titleEditorState.getSelection();
                  const { titleEditorState } = this.state;
                  if (
                    titleEditorState
                      .getCurrentContent()
                      .getBlockMap()
                      .first()
                      .getKey() === selectionState.getFocusKey()
                  ) {
                    this.props.onFocusPreviousBlock(
                      this.props.block,
                      this.props.blockNode.current,
                    );
                  }
                }}
                onDownArrow={() => {
                  const selectionState = this.state.titleEditorState.getSelection();
                  const { titleEditorState } = this.state;
                  if (
                    titleEditorState
                      .getCurrentContent()
                      .getBlockMap()
                      .last()
                      .getKey() === selectionState.getFocusKey()
                  ) {
                    this.setState(() => ({ currentFocused: 'description' }));
                  }
                }}
              />

              <TextEditorWidget
                data={
                  typeof this.props.data.description === 'string'
                    ? { ...this.props.data, description: null }
                    : this.props.data
                }
                fieldName="description"
                selected={
                  this.props.selected &&
                  this.state.currentFocused === 'description'
                }
                onChangeBlock={(v) => {
                  this.props.onChangeBlock(this.props.block, {
                    ...this.props.data,
                    description: v.description,
                  });
                }}
                placeholder={this.props.intl.formatMessage(
                  messages.description,
                )}
                prevFocus="title"
                setFocus={(f) => {
                  this.setState(() => ({ currentFocused: f }));
                }}
                showToolbar={true}
                key="description"
              />
            </div>
            <LinkMore data={this.props.data} isEditMode={true} />
          </div>
        </div>
        <SidebarPortal selected={this.props.selected}>
          <Data {...this.props} />
        </SidebarPortal>
      </div>
    );
  }
}

const Edit = EditComponent;

export default compose(
  injectIntl,
  injectLazyLibs([
    'draftJs',
    'draftJsInlineToolbarPlugin',
    'draftJsLibIsSoftNewlineEvent',
    'draftJsFilters',
    'draftJsBlockBreakoutPlugin',
    'draftJsCreateInlineStyleButton',
    'draftJsCreateBlockStyleButton',
    'immutableLib',
    'draftJsImportHtml',
  ]),
  connect(
    (state, ownProps) => ({
      request: state.content.subrequests[ownProps.block] || {},
      content: state.content.subrequests[ownProps.block]?.data ?? {},
    }),
    { createContent },
  ),
)(Edit);
