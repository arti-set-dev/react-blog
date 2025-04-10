import { createReduxStore } from './config/store';
import type { AppDispatch } from './config/store';
import { StoreProvider } from './ui/StoreProvider';
import type {
  StateSchema,
  StateSchemaKey,
  ReduxStoreWithManager,
  ThunkConfig,
} from './config/StateSchema';

export {
  StoreProvider,
  createReduxStore,
  StateSchema,
  AppDispatch,
  ThunkConfig,
  StateSchemaKey,
  ReduxStoreWithManager,
};
