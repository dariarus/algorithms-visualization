interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;

  head: { value: T | null, index: number };
  tail: { value: T | null, index: number };
  elements: Array<T | null>;

  isEmpty: boolean;
}

export class Queue<T> implements IQueue<T> {
  private container: Array<T | null>;
  private _head: number = 0;
  private _tail: number = 0;
  private readonly size: number = 0;
  length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = new Array(size);
  }

  get isEmpty() {
    return this.length === 0
  }

  get elements() {
    return this.container
  }

  get head() {
    return ({
      value: this.container[this._head],
      index: this._head
    })
  }

  get tail() {
    return {
      value: this.container[this._tail],
      index: this._tail
    }
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    /*----- в данном примере можно обойтись без this.tail % this.size, но означает это то же самое.
    size = 4, tail при полном заполнении очереди будет равен 4. (4 % 4) = 0 - tail вернулся на индекс 0.
    size = 4, tail на следующей итерации будет равен уже 5. (5 % 4) = 1 - tail вернулся на индекс 1.
    Очень полезно для выяснения текущего положения указателя после запуска алгоритма n раз!
    Вместо этой операции проверяем tail === size и сбрасываем tail -----*/

    if (this._tail === this.size - 1 || (this.length === 0 && this._tail === this._head)) {
      this._tail = 0; // обнуляем хвост, если очередь заполнена и если изначально не было head
    } else {
      this._tail++;
    }
    this.container[this._tail] = item;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty) {
      throw new Error("No elements in the queue");
    }
    this.container[this._head] = null;
    this.length--;
    if (this._head === this.size - 1) {
      this._head = 0; // обнуляем голову, если очередь заполнена
    } else {
      this._head++;
    }
  };

  peak = (): T | null => {
    if (this.isEmpty) {
      throw new Error("No elements in the queue");
    } else {
      return this.container[this._head]
    }
    // return null;
  };

  clean = (): void => {
    this.container = Array(this.size);
    this._head = 0;
    this._tail = 0;
    this.length = 0;
  }
}