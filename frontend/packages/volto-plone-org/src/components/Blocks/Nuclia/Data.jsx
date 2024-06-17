import React from 'react';
import { useIntl } from 'react-intl';
import { BlockDataForm } from '@plone/volto/components';
import { Schema } from './Schema';

const Data = (props) => {
  const { block, data, onChangeBlock } = props;
  const intl = useIntl();

  const schema = Schema({ ...props, intl });

  return (
    <BlockDataForm
      schema={schema}
      title={schema.title}
      onChangeField={(id, value) => {
        onChangeBlock(block, {
          ...data,
          [id]: value,
        });
      }}
      formData={data}
      fieldIndex={data.index}
    />
  );
};

export default Data;
