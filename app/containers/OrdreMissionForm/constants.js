/*
 *
 * OrdreMissionForm constants
 *
 */

export const DEFAULT_ACTION = 'app/OrdreMissionForm/DEFAULT_ACTION';

export const LOAD_STATIC_DATA = 'app/OrdreMissionForm/LOAD_STATIC_DATA';
export const LOAD_STATIC_DATA_SUCCESS =
  'app/OrdreMissionForm/LOAD_STATIC_DATA_SUCCESS';
export const LOAD_STATIC_DATA_ERROR =
  'app/OrdreMissionForm/LOAD_STATIC_DATA_ERROR';

export const LOAD_ORDRE_MISSION_DETAILS =
  'app/OrdreMissionForm/LOAD_ORDRE_MISSION_DETAILS';
export const LOAD_ORDRE_MISSION_DETAILS_SUCCESS =
  'app/OrdreMissionForm/LOAD_ORDRE_MISSION_DETAILS_SUCCESS';
export const LOAD_ORDRE_MISSION_DETAILS_ERROR =
  'app/OrdreMissionForm/LOAD_ORDRE_MISSION_DETAILS_ERROR';

export const ADD_ORDRE_MISSION = 'app/OrdreMissionForm/ADD_ORDRE_MISSION';
export const ADD_ORDRE_MISSION_SUCCESS =
  'app/OrdreMissionForm/ADD_ORDRE_MISSION_SUCCESS';
export const ADD_ORDRE_MISSION_ERROR =
  'app/OrdreMissionForm/ADD_ORDRE_MISSION_ERROR';

export const UPDATE_ORDRE_MISSION = 'app/OrdreMissionForm/UPDATE_ORDRE_MISSION';
export const UPDATE_ORDRE_MISSION_SUCCESS =
  'app/OrdreMissionForm/UPDATE_ORDRE_MISSION_SUCCESS';
export const UPDATE_ORDRE_MISSION_ERROR =
  'app/OrdreMissionForm/UPDATE_ORDRE_MISSION_ERROR';

export const SUBMIT_ORDRE_MISSION = 'app/OrdreMissionForm/SUBMIT_ORDRE_MISSION';
export const SUBMIT_ORDRE_MISSION_SUCCESS =
  'app/OrdreMissionForm/SUBMIT_ORDRE_MISSION_SUCCESS';
export const SUBMIT_ORDRE_MISSION_ERROR =
  'app/OrdreMissionForm/SUBMIT_ORDRE_MISSION_ERROR';

export const DOWNLOAD_ORDRE_MISSION_DOCUMENT =
  'app/OrdreMissionForm/DOWNLOAD_ORDRE_MISSION_DOCUMENT';
export const DOWNLOAD_ORDRE_MISSION_DOCUMENT_SUCCESS =
  'app/OrdreMissionForm/DOWNLOAD_ORDRE_MISSION_DOCUMENT_SUCCESS';
export const DOWNLOAD_ORDRE_MISSION_DOCUMENT_ERROR =
  'app/OrdreMissionForm/DOWNLOAD_ORDRE_MISSION_DOCUMENT_ERROR';

export const CHANGE_ABROAD_ACTION = 'app/OrdreMissionForm/CHANGE_ABROAD_ACTION';
export const CHANGE_TRANSPORTATION_METHOD_ACTION =
  'app/OrdreMissionForm/CHANGE_TRANSPORTATION_METHOD_ACTION';

export const CHANGE_ONBEHALF_SELECTION_ACTION =
  'app/OrdreMissionForm/ON_BEHALF_SELECTION';

export const CLEANUP_STORE_ACTION = 'app/OrdreMissionForm/CLEANUP_STORE_ACTION';

export const webService = {
  LOAD_STATIC_DATA: '/User/ActualRequesterStaticInfo/All',
  ADD_ORDRE_MISSION: '/OrdreMission/Create',
  UPDATE_ORDRE_MISSION: '/OrdreMission/Modify',
  SUBMIT_ORDRE_MISSION: '/OrdreMission/Submit',
  LOAD_ORDRE_MISSION_DETAILS: '/OrdreMission/View',
  DOWNLOAD_ORDRE_MISSION_DOCUMENT: '/AvanceVoyage/Document/Download',
};
