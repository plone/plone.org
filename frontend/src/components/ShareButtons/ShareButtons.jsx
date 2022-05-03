import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { toPublicURL } from '@plone/volto/helpers';
import { Icon } from '@plone/volto/components';
import { useSelector } from 'react-redux';

// icone social
import facebookSVG from '@package/icons/facebook-f-brands.svg';
import twitterSVG from '@package/icons/twitter-brands.svg';
import linkedinSVG from '@package/icons/linkedin-brands.svg';
import whatsappSVG from '@package/icons/whatsapp-brands.svg';
import telegramSVG from '@package/icons/telegram-brands.svg';

const messages = defineMessages({
  share_on: {
    id: 'share_on',
    defaultMessage: 'Share on',
  },
});

const ShareButtons = ({ url, title, showLabel }) => {
  const intl = useIntl();
  const content = useSelector((state) => state.content?.data);
  const shareTitle = title || content?.title || '';
  const shareUrl = url || content?.['@id'] || '';
  const publicUrl = toPublicURL(shareUrl);

  let socials = [
    {
      key: 'facebook',
      value: 'facebook',
      text: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${publicUrl}`,
      prefix: 'fa',
      icon: facebookSVG,
    },
    {
      key: 'twitter',
      value: 'twitter',
      text: 'Twitter',
      url: `https://twitter.com/intent/tweet?url=${publicUrl}`,
      icon: twitterSVG,
    },
    {
      key: 'linkedin',
      value: 'linkedin',
      text: 'LinkedIn',
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${publicUrl}&title=${publicUrl}`,
      icon: linkedinSVG,
    },
    {
      key: 'whatsapp',
      value: 'whatsapp',
      text: 'Whatsapp',
      url: `https://api.whatsapp.com/send?phone=&text=${publicUrl}`,
      icon: whatsappSVG,
    },
    {
      key: 'telegram',
      value: 'telegram',
      text: 'Telegram',
      url: `https://t.me/share/url?url=${publicUrl}&text=${shareTitle}`,
      icon: telegramSVG,
    },
  ];

  return (
    <div className="site--share-buttons">
      {socials.map((item, i) => (
        <a
          className="button"
          href={item.url}
          key={i}
          target="_blank"
          rel="noopener noreferrer"
          title={`${intl.formatMessage(messages.share_on)} ${item.text}`}
        >
          <Icon name={item.icon} size="24px" />
          {showLabel && <span className="button-label">{item.text}</span>}
        </a>
      ))}
    </div>
  );
};
export default ShareButtons;
