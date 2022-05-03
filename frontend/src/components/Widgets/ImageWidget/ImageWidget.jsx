/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { readAsDataURL } from 'promise-file-reader';
import { Button, Dimmer, Input, Loader } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import loadable from '@loadable/component';

import { Icon, FormFieldWrapper } from '@plone/volto/components';
import { createContent } from '@plone/volto/actions';
import { flattenToAppURL, getBaseUrl } from '@plone/volto/helpers';

import imageBlockSVG from '@plone/volto/components/manage/Blocks/Image/block-image.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import navTreeSVG from '@plone/volto/icons/nav.svg';
import uploadSVG from '@plone/volto/icons/upload.svg';

const Dropzone = loadable(() => import('react-dropzone'));

const messages = defineMessages({
  ImageBlockInputPlaceholder: {
    id: 'Browse the site, drop an image, or type an URL',
    defaultMessage: 'Browse the site, drop an image, or type an URL',
  },
});

const ImageWidget = (props) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const {
    openObjectBrowser,
    id,
    value,
    onChange,
    imagePlaceholder = true,
    showInput = true,
  } = props;
  const location = useLocation();
  const pathname = location.pathname;
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState(value ? flattenToAppURL(value) : '');
  const [dragging, setDragging] = useState(false);
  const request = useSelector((state) => state.content.subrequests[id] || {});
  const content = useSelector(
    (state) => state.content.subrequests[id]?.data || {},
  );

  useEffect(() => {
    if (!request.loading && request.loaded && uploading) {
      let imageUrl = flattenToAppURL(content['@id']);
      setUploading(false);
      setUrl(imageUrl);
    }
  }, [content]);

  useEffect(() => {
    onChange(id, url === '' ? null : url);
  }, [url]);

  /**
   * Upload image handler (not used), but useful in case that we want a button
   * not powered by react-dropzone
   * @method onUploadImage
   * @returns {undefined}
   */
  const onUploadImage = (e) => {
    e.stopPropagation();
    const file = e.target.files[0];
    setUploading(true);
    readAsDataURL(file).then((data) => {
      const fields = data.match(/^data:(.*);(.*),(.*)$/);
      dispatch(
        createContent(
          getBaseUrl(pathname),
          {
            '@type': 'Image',
            title: file.name,
            image: {
              data: fields[3],
              encoding: fields[2],
              'content-type': fields[1],
              filename: file.name,
            },
          },
          id,
        ),
      );
    });
  };

  const onChangeUrl = ({ target }) => {
    setUrl(target.value);
  };

  const onDrop = (file) => {
    setUploading(true);

    readAsDataURL(file[0]).then((data) => {
      const fields = data.match(/^data:(.*);(.*),(.*)$/);
      dispatch(
        createContent(
          getBaseUrl(pathname),
          {
            '@type': 'Image',
            title: file[0].name,
            image: {
              data: fields[3],
              encoding: fields[2],
              'content-type': fields[1],
              filename: file[0].name,
            },
          },
          id,
        ),
      );
    });
  };

  /**
   * Keydown handler on Variant Menu Form
   * This is required since the ENTER key is already mapped to a onKeyDown
   * event and needs to be overriden with a child onKeyDown.
   * @method onKeyDownVariantMenuForm
   * @param {Object} e Event object
   * @returns {undefined}
   */
  const onKeyDownVariantMenuForm = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      // TODO: Do something on ESC key
    }
  };

  const onDragEnter = () => {
    setDragging(true);
  };

  const onDragLeave = () => {
    setDragging(false);
  };

  const placeholder = intl.formatMessage(messages.ImageBlockInputPlaceholder);

  return (
    <FormFieldWrapper {...props} className="image-widget">
      <Dropzone
        noClick
        onDrop={onDrop}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        className="dropzone"
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            {dragging && <Dimmer active></Dimmer>}
            {uploading && (
              <Dimmer active>
                <Loader indeterminate>Uploading image</Loader>
              </Dimmer>
            )}
            <div className={cx('no-image-wrapper', { 'no-input': !showInput })}>
              {imagePlaceholder && (
                <div className="preview-wrapper">
                  <img
                    src={
                      value?.length > 0
                        ? `${value}/@@images/image/mini`
                        : imageBlockSVG
                    }
                    alt=""
                  />
                </div>
              )}
              <div className="toolbar-inner">
                {!url && (
                  <Button.Group>
                    <label className="ui button basic icon">
                      <Icon name={uploadSVG} size="24px" />

                      <input
                        {...getInputProps({
                          type: 'file',
                          onChange: onUploadImage,
                          style: { display: 'none' },
                        })}
                      />
                    </label>
                  </Button.Group>
                )}
                <FormFieldWrapper columns={1} className="url-wrapper">
                  {showInput && (
                    <Input
                      id={`field-${id}`}
                      onKeyDown={onKeyDownVariantMenuForm}
                      onChange={onChangeUrl}
                      placeholder={placeholder}
                      value={url}
                      className="icon"
                      // Prevents propagation to the Dropzone and the opening
                      // of the upload browser dialog
                      onClick={(e) => e.stopPropagation()}
                    />
                  )}
                  {url && showInput ? (
                    <button
                      className={`cancel field-${id}-action-button image-widget-button`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setUrl('');
                      }}
                    >
                      <Icon name={clearSVG} size="18px" />
                    </button>
                  ) : (
                    <button
                      className={`field-${id}-action-button image-widget-button`}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        openObjectBrowser({
                          mode: 'link',
                          onSelectItem: (url) => {
                            setUrl(url);
                          },
                        });
                      }}
                    >
                      <Icon name={navTreeSVG} size="18px" />
                    </button>
                  )}
                </FormFieldWrapper>
              </div>
            </div>
          </div>
        )}
      </Dropzone>
    </FormFieldWrapper>
  );
};

ImageWidget.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  openObjectBrowser: PropTypes.func.isRequired,
};

export default ImageWidget;
