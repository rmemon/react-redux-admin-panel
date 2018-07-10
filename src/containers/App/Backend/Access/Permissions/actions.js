import {
  PERMISSION_LIST_PAGE_LOADED,
  PERMISSION_LIST_PAGE_UNLOADED,
  PERMISSION_LIST_PAGE_REQUESTED,
  PERMISSION_VIEW_PAGE_LOADED,
  PERMISSION_VIEW_PAGE_UNLOADED,
  PERMISSION_CREATE,
  PERMISSION_UPDATE,
  PERMISSION_FORM_PAGE_LOADED,
  PERMISSION_FORM_PAGE_UNLOADED,
  PERMISSION_DELETE,
} from './constants';
import agent from './agent';

export const onLoadRequestAction = () => {
  return {
    type: PERMISSION_LIST_PAGE_REQUESTED,
  };
};

export const onLoadAction = props => {
  return {
    type: PERMISSION_LIST_PAGE_LOADED,
    payload: agent.list(props),
  };
};

export const onClickDeleteAction = id => {
  return {
    type: PERMISSION_DELETE,
    payload: agent.del(id),
  };
};

export const onUnloadAction = () => {
  return {
    type: PERMISSION_LIST_PAGE_UNLOADED,
  };
};

export const onViewPageLoad = id => {
  return {
    type: PERMISSION_VIEW_PAGE_LOADED,
    payload: agent.get(id),
  };
};

export const onViewUnload = () => {
  return {
    type: PERMISSION_VIEW_PAGE_UNLOADED,
  };
};

export const postUser = values => {
  if (values.id) {
    return { type: PERMISSION_UPDATE, payload: agent.update(values) };
  } else {
    return { type: PERMISSION_CREATE, payload: agent.create(values) };
  }
};

export const onFormLoad = id => {
  let payload = null;
  if (id) {
    payload = agent.get(id);
  }
  return { type: PERMISSION_FORM_PAGE_LOADED, payload };
};

export const onFormUnLoad = id => {
  return { type: PERMISSION_FORM_PAGE_UNLOADED };
};
