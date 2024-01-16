import { accessControlRules } from './accessControlRules';
import { camelToKebab } from './stringManipulation';

const checkLogin = () => {
  if (localStorage.getItem('token') && localStorage.getItem('role')) {
    return true;
  }
  return false;
};

const filterAccessControlRules = (RulesObject, role) => {
  const filtered = {};
  Object.keys(RulesObject).forEach((key) => {
    // inside here means that the object was deemed accessible now we need to determin the content (worst case retun is {} otherwise more)
    if (key !== 'accessLevel' && key !== 'path') {
      if (RulesObject[key].accessLevel.includes(role)) {
        if (Object.keys(RulesObject[key]).length === 2) {
          filtered[key] = {};
        } else {
          filtered[key] = filterAccessControlRules(RulesObject[key], role);
        }
      }
    }
  });
  return filtered;
};

export const getAccessiblePages = () => {
  const role = localStorage.getItem('role');
  return filterAccessControlRules(accessControlRules, role);
};
const generatePaths = (obj, parentPath = '', paths = []) => {
  Object.keys(obj).forEach((key) => {
    let path = `${parentPath}/${key}`;
    if (parentPath === '') {
      path = `/${key}`;
    }
    paths.push(camelToKebab(path));
    if (typeof obj[key] === 'object') {
      generatePaths(obj[key], path, paths);
    }
  });
  return paths;
};
// const generatePathsByRole = (obj, role, paths = []) => {
//   Object.keys(obj).forEach((key) => {
//     // inside here means that the object was deemed accessible now we need to determin the content (worst case retun is {} otherwise more)
//     if (key !== 'accessLevel' && key !== 'path') {
//       if (obj[key].accessLevel.includes(role)) {
//         if (Object.keys(obj[key]).length === 2) {
//           paths.push(obj[key].path);
//         } else {
//           generatePathsByRole(obj[key], role, paths);
//         }
//       }
//     }
//   });
//   return paths;
// };

const getAdminPaths = () => {
  const pages = filterAccessControlRules(accessControlRules, 'decider');
  const paths = generatePaths(pages);
  paths.push('/login');
  paths.push('/unauthorized');
  paths.push('/not-found');
  paths.push('/access-denied');
  return paths;
};
const getAccessiblePaths = () => {
  const pages = getAccessiblePages();
  const paths = generatePaths(pages);
  paths.push('/login');
  paths.push('/unauthorized');
  paths.push('/not-found');
  paths.push('/access-denied');

  return paths;
};

const AccessController = (history, path) => {
  if (checkLogin()) {
    // if logged in Check accessLevel
    const adminPaths = getAdminPaths();
    const accessiblePaths = getAccessiblePaths();
    if (!accessiblePaths.includes(path)) {
      if (!adminPaths.includes(path)) {
        history.push('/not-found');
      } else {
        history.push('/unauthorized');
      }
    }
  } else {
    // reroute Login page
    history.push('/login');
  }
};
export default AccessController;
