/**
 *
 * Asynchronously loads the component for MinimalAccess
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
