import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Spinning from 'grommet/components/icons/Spinning';

const scriptLoader = (Wrapped, url) => {
  const script = document.createElement('script');
  script.errored = false;
  script.loaded = false;
  script.async = true;
  script.src = url;

  return class Wrapper extends Component {
    componentDidMount() {
      if (!document.head.contains(script)) {
        script.onload = this.onLoad;
        script.onerror = this.onError;
        document.head.appendChild(script);
      }
    }

    onLoad = e => {
      script.loaded = true;
      this.forceUpdate();
    };

    onError = e => {
      script.errored = true;
      this.forceUpdate();
    };

    render() {
      if (script.loaded) {
        return <Wrapped {...this.props} />;
      } else if (script.errored) {
        return (
          <Box flex={true} justify="center">
            An error happended, please reload the page.
          </Box>
        );
      } else {
        return (
          <Box flex={true} justify="center">
            <Spinning />
          </Box>
        );
      }
    }
  };
};

export default scriptLoader;
