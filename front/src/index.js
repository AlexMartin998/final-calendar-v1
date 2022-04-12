import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

import { CalendarApp } from './CalendarApp';

ReactDOM.render(<CalendarApp />, document.getElementById('root'));

// // // React v18: https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#updates-to-client-rendering-apis
// import { createRoot } from 'react-dom/client';
// import { CalendarApp } from './CalendarApp';

// const container = document.getElementById('root');
// const root = createRoot(container);
// root.render(<CalendarApp />);
