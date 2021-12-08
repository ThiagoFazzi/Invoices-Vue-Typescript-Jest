import { BareActionContext } from 'vuex-typex';
// eslint-disable-next-line import/no-cycle
import { storeBuilder, RootState } from '@/store/RootState';

// state
interface User {
  name: string
}

// state
export class AuthState {
  authUser: User | null = null
}

const b = storeBuilder.module<AuthState>('Auth', new AuthState());

// const state: AuthState = {
//   authUser: null,
// };

// getters
const authUser = b.read((state) => state.authUser, 'authUser');

// function authUser(state: AuthState) : User | null {
//   return state.authUser;
// }

export const getters = {
  get authUser() : User | null {
    return authUser();
  },
};

// mutations
function setUser(state: AuthState, user: User) : void {
  state.authUser = user;
}

export const mutations = {
  setUser: b.commit(setUser),
};

// actions
type ActionContext = BareActionContext<AuthState, RootState>

async function fakeUserLoginService(username: string, password: string) : Promise<User | null> {
  // do something with username and password
  console.log(username);
  console.log(password);

  return {
    name: 'Fake User',
  };
}

async function login(context: ActionContext, payload: {username: string, password: string}) {
  const { username, password } = payload;
  const user = await fakeUserLoginService(username, password);
  if (user) {
    mutations.setUser(user);
  }
}
export const actions = {
  login: b.dispatch(login),
};
