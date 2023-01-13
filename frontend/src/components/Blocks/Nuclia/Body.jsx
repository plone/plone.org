import React from 'react';

let __NUCLIA_SEARCH_LOADED__ = false;
const loadNucliaSearch = (callback) => {
  const scriptSrc = `https://cdn.nuclia.cloud/nuclia-video-widget.umd.js`;
  if (__NUCLIA_SEARCH_LOADED__ && callback) {
    callback(true);
  } else {
    __NUCLIA_SEARCH_LOADED__ = true;
    if (callback) callback(false);
    const script = document.createElement('script');
    script.src = scriptSrc;
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => {
      document.body.removeChild(script);
      if (callback) callback(true);
    };
  }
};

const Body = (props) => {
  const { data } = props;
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    loadNucliaSearch(setLoaded);
  }, []);

  return (
    <div className="nuclia-block">
      {loaded && (
        <>
          <nuclia-search-bar
            knowledgebox={data.knowledgebox}
            zone={data.zone}
            features={data.features}
            placeholder="Search for Plone videos"
            lang="en"
          ></nuclia-search-bar>
          <nuclia-search-results></nuclia-search-results>
        </>
      )}
    </div>
  );
};

export default Body;
