/**
 *
 * Asynchronously loads the component for Liquidation
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
