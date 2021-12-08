import { getStoreBuilder } from 'vuex-typex';
// eslint-disable-next-line import/no-cycle
import { AuthState } from './modules/auth';

export interface RootState {
  auth: AuthState,
}

export const storeBuilder = getStoreBuilder<RootState>();
