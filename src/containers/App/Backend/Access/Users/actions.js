import {USER_DELETE, USER_LIST_PAGE_LOADED, USER_LIST_PAGE_UNLOADED,
    USER_LIST_PAGE_REQUESTED} from './constants';
import userAgent from './agent'

export const onLoadRequestAction = () => {
    return {
        type: USER_LIST_PAGE_REQUESTED,
    }
}

export const onLoadAction = (props) => {
    return {
        type: USER_LIST_PAGE_LOADED,
        payload: userAgent.list(props)
    }
}


export const onClickDeleteAction = (id) => {
    return {
        type: USER_DELETE,
        payload: userAgent.del(id)
    }
}

export const onUnloadAction = () => {
    return {
        type: USER_LIST_PAGE_UNLOADED
    }
}

