/**
 *
 * Asynchronously loads the component for TabPanel
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
