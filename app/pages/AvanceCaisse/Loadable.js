/**
 *
 * Asynchronously loads the component for AvanceCaisse
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
