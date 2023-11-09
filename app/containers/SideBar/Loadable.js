/**
 *
 * Asynchronously loads the component for SideBar
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
