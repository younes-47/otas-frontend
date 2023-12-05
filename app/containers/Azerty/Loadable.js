/**
 *
 * Asynchronously loads the component for Azerty
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
