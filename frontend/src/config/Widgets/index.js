import React from 'react';
import TokenWidget from '@plone/volto/components/manage/Widgets/TokenWidget';
//import { MultilingualWidget } from 'volto-multilingual-widget';
import {
  ColorListWidget,
  ImageWidget,
  AlignWidget,
  FontAwesomeIconWidget,
} from '@package/components/Widgets';
import { GoogleReCaptchaWidget } from 'volto-form-block';

export const SiteWidgets = (config) => {
  //   config.widgets.id.cookie_consent_configuration = MultilingualWidget();
  //   config.widgets.id.thematic_areas = MultilingualWidget(
  //     (props) => <ArrayWidget {...props} wrapped={false} />,
  //     [],
  //   );
  config.widgets.id.typology = TokenWidget;
  config.widgets.id.background = (props) => (
    <ColorListWidget
      {...props}
      colors={[
        { name: 'white', label: 'Chiaro' },
        { name: 'blue', label: 'Blu' },
        { name: 'image', label: 'Immagine di anteprima' },
      ]}
    />
  );
  config.widgets.id.alternative_color = (props) => (
    <ColorListWidget
      {...props}
      colors={[
        { name: 'blue', label: 'Blu' },
        { name: 'orange', label: 'Arancio' },
        { name: 'yellow', label: 'Giallo' },
        { name: 'green', label: 'Verde' },
      ]}
    />
  );
  config.widgets.id.captcha = GoogleReCaptchaWidget;
  config.widgets.widget.color_list = ColorListWidget;
  config.widgets.widget.sitealign = AlignWidget;
  config.widgets.widget.fontawesome_icon = FontAwesomeIconWidget;
  config.widgets.widget.image_upload_widget = ImageWidget;
};
