import { Tracker } from 'meteor/tracker';
import { useContext, useEffect, useReducer } from 'react';
import QueryContext from './QueryContext';

const PENDING = 0;
const RESOLVED = 1;
const REJECTED = 2;

export default function useFind(Collection, ...args) {
  const key = JSON.stringify({
    collection: Collection._name,
    args: JSON.stringify(args),
  });
  const [, forceUpdate] = useReducer((x) => {
    return x + 1;
  }, 0);

  const queryCache = useContext(QueryContext);

  let reference = queryCache.cache.get(key);

  if (!reference) {
    reference = {
      state: PENDING,
      value: undefined,
      promise: new Promise((resolve) => {
        Tracker.autorun(
          (computation) => {
            const result = Collection.find(...args).fetch();

            if (result.length) {
              reference.state = RESOLVED;
              reference.value = result;
              resolve();
              computation.stop();
            }
          },
          {
            onError(error) {
              reference.state = REJECTED;
              reference.value = error;
            },
          },
        );
      }),
    };

    queryCache.cache.set(key, reference);
  }

  useEffect(() => {
    let computation;
    Tracker.autorun((c) => {
      computation = c;
      const result = Collection.find(...args).fetch();
      reference.value = result;
      forceUpdate();
    });
    return () => {
      computation.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  if (reference.state === RESOLVED) {
    return reference.value;
  } else if (reference.state === REJECTED) {
    throw reference.value;
  }

  throw reference.promise;
}
