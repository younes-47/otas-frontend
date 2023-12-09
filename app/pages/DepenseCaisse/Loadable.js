/**
 *
 * Asynchronously loads the component for DepenseCaisse
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
