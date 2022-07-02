import { array_each } from './array_utils';

type subs<T> = (value: T) => void;

export const observer = <T>(value: T) => {
  const subscribers: subs<T>[] = [];
  const unsub_queue: subs<T>[] = [];

  const $subscribe = (subscriber: subs<T>, order?: number) => {
    if (order) subscribers[order] = subscriber;
    else subscribers.push(subscriber);

    return () => unsub_queue.push(subscriber);
  };

  const $broadcast = () => {
    array_each(subscribers, sub => sub(value));
    if (unsub_queue.length > 0) {
      array_each(unsub_queue, subscriber => {
        const index = subscribers.indexOf(subscriber);
        if (index >= 0) subscribers.splice(index, 1);
      });
      unsub_queue.length = 0;
    }
  };

  const $set = (setter: T) => {
    value = setter;
    $broadcast();
  };

  const $get = () => value;

  const $once = (subscriber: subs<T>) => {
    const unsubscribe = $subscribe(v => {
      subscriber(v);
      unsubscribe();
    });
  };

  const $equal = (val: T) => val === value;

  return {
    //
    $subscribe,
    $broadcast,
    $set,
    $get,
    $once,
    $equal,
    get v() {
      return value;
    },
    // [Symbol.toPrimitive]: () => value,
    // valueOf() { return value; }
  };
};

class wrap<T> {
  0 = (v: T) => observer(v);
}

export type t_observer<k> = ReturnType<wrap<k>[0]>;
