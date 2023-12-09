/**
 *
 * Asynchronously loads the component for AvanceVoyage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
