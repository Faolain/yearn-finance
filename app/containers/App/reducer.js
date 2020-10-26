import produce from 'immer';
import {
  CONNECTION_CONNECTED,
  ADDRESS_UPDATED,
} from 'containers/ConnectionProvider/constants';
import { VAULTS_LOADED } from './constants';

// The initial state of the App
export const initialState = {
  ready: false,
  connected: false,
  loading: {
    vaults: true,
    drizzle: true,
    account: true,
  },
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    // Utility functions
    const checkReadyState = () => {
      const { loading, connected } = draft;
      const ready =
        !loading.vaults &&
        !loading.drizzle &&
        !draft.loading.account &&
        connected;
      draft.ready = ready;
    };

    switch (action.type) {
      case VAULTS_LOADED:
        draft.vaults = action.vaults;
        draft.loading.vaults = false;
        checkReadyState();
        break;
      case CONNECTION_CONNECTED:
        draft.connected = true;
        checkReadyState();
        break;
      case ADDRESS_UPDATED:
        draft.loading.account = false;
        checkReadyState();
        break;
      case 'DRIZZLE_INITIALIZED':
        draft.loading.drizzle = false;
        checkReadyState();
        break;
    }
  });

export default appReducer;
