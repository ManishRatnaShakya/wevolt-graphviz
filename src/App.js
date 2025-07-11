import React, { useEffect, useState } from 'react';
import GraphvizRenderer from './components/GraphvizRenderer';
import { jsonToDot } from './utils/JsonToDot';
import { SitesList } from './services/sites.services';

const App = () => {
  const [sitesList, setSitesList] = useState([]);

  useEffect(() => {
    SitesList()
      .then((result) => {
        setSitesList(result);
        console.log('Fetched sites:', result);
      })
      .catch((err) => {
        console.error('Error fetching sites:', err);
      });
  }, []);

  return (
    <div>
      <h2>Graphviz DOT Graph</h2>
      <GraphvizRenderer dot={jsonToDot(sitesList)} />

      <h3>Available Sites</h3>
      {sitesList?.length > 0 ? (
        <ul>
          {sitesList.map((site) => (
            <li key={site.id || site.name}>{site.name}</li>
          ))}
        </ul>
      ) : (
        <p>Loading Graph...</p>
      )}
    </div>
  );
};

export default App;
