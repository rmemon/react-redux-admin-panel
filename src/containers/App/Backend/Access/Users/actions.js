import {
  USER_LIST_PAGE_LOADED,
  USER_LIST_PAGE_UNLOADED,
  USER_LIST_PAGE_REQUESTED,
  USER_VIEW_PAGE_LOADED,
  USER_VIEW_PAGE_UNLOADED,
  USER_CREATE,
  USER_UPDATE,
  USER_FORM_PAGE_LOADED,
  USER_FORM_PAGE_UNLOADED,
  USER_DELETE,
} from './constants';
import agent from './agent';

export const onLoadRequestAction = () => {
  return {
    type: USER_LIST_PAGE_REQUESTED,
  };
};

export const onLoadAction = props => {
  return {
    type: USER_LIST_PAGE_LOADED,
    payload: agent.list(props),
  };
};

export const onClickDeleteAction = id => {
  return {
    type: USER_DELETE,
    payload: agent.del(id),
  };
};

export const onUnloadAction = () => {
  return {
    type: USER_LIST_PAGE_UNLOADED,
  };
};

export const onViewPageLoad = id => {
  return {
    type: USER_VIEW_PAGE_LOADED,
    payload: agent.get(id),
  };
};

export const onViewUnload = () => {
  return {
    type: USER_VIEW_PAGE_UNLOADED,
  };
};

export const postUser = values => {
  if (values.id) {
    return { type: USER_UPDATE, payload: agent.update(values) };
  } else {
    return { type: USER_CREATE, payload: agent.create(values) };
  }
};

export const onFormLoad = id => {
  let payload = null;
  if (id) {
    payload = agent.get(id);
  }
  return { type: USER_FORM_PAGE_LOADED, payload };
};

export const onFormUnLoad = id => {
  return { type: USER_FORM_PAGE_UNLOADED };
};
