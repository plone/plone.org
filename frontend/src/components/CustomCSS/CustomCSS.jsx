import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCustomCSS } from '~/actions/getCustomCSS';

const CustomCSS = () => {
  const customCSS = useSelector((state) => state.customCSS?.result);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCustomCSS());
  }, [dispatch]);

  return customCSS ? (
    <style type="text/css" dangerouslySetInnerHTML={{ __html: customCSS }} />
  ) : null;
};

export default CustomCSS;
