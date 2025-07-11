import React, { useEffect, useRef } from 'react';
import Viz from 'viz.js';
import { Module, render } from 'viz.js/full.render.js';

const GraphvizRenderer = ({ dot }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const viz = new Viz({ Module, render });

    viz.renderString(dot)
      .then((svg) => {
        if (containerRef.current) containerRef.current.innerHTML = svg;
      })
      .catch((error) => {
        console.error("Graphviz rendering error:", error);
        if (containerRef.current)
          containerRef.current.innerHTML = `<pre style="color:red;">${error}</pre>`;
      });
  }, [dot]);

  return <div ref={containerRef} />;
};

export default GraphvizRenderer;
