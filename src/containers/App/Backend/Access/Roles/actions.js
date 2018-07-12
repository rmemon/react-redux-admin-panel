import {
  ROLE_LIST_PAGE_LOADED,
  ROLE_LIST_PAGE_UNLOADED,
  ROLE_LIST_PAGE_REQUESTED,
  ROLE_VIEW_PAGE_LOADED,
  ROLE_VIEW_PAGE_UNLOADED,
  ROLE_CREATE,
  ROLE_UPDATE,
  ROLE_FORM_PAGE_LOADED,
  ROLE_FORM_PAGE_UNLOADED,
  ROLE_DELETE,
} from './constants';

import agent from './agent';

export const onLoadRequestAction = () => {
  return {
    type: ROLE_LIST_PAGE_REQUESTED,
  };
};

export const onLoadAction = props => {
  return {
    type: ROLE_LIST_PAGE_LOADED,
    payload: agent.list(props),
  };
};

export const onClickDeleteAction = id => {
  return {
    type: ROLE_DELETE,
    payload: agent.del(id),
  };
};

export const onUnloadAction = () => {
  return {
    type: ROLE_LIST_PAGE_UNLOADED,
  };
};

export const onViewPageLoad = id => {
  return {
    type: ROLE_VIEW_PAGE_LOADED,
    payload: agent.get(id),
  };
};

export const onViewUnload = () => {
  return {
    type: ROLE_VIEW_PAGE_UNLOADED,
  };
};

export const postRole = values => {
  if (values.id) {
    return { type: ROLE_UPDATE, payload: agent.update(values) };
  } else {
    return { type: ROLE_CREATE, payload: agent.create(values) };
  }
};

export const onFormLoad = id => {
  return { type: ROLE_FORM_PAGE_LOADED, payload: agent.get(id) };
};

export const onFormUnLoad = id => {
  return { type: ROLE_FORM_PAGE_UNLOADED };
};
