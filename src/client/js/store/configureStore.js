import { createStore } from 'redux';
import { rootReducer} from '../reducers/rootReducer';

export function configureStore() {
  const store = createStore(
    rootReducer
  );

  return store;
}
