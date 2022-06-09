interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
}

export class Queue<T> implements IQueue<T> {
  container: Array<T | null>;
  head = 0;
  tail = 0;
  private readonly size: number = 0;
  length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = new Array(size);
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

    if (this.tail === this.size - 1 || (this.length === 0 && this.tail === this.head)) {
      this.tail = 0; // обнуляем хвост, если очередь заполнена и если изначально не было head
    } else {
      this.tail++;
    }
      this.container[this.tail] = item;
      this.length++;

    // console.log("tail..." + this.tail)
    // console.log("length..." + this.length)
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    this.container[this.head] = null;
    this.length--;
    if (this.head === this.size - 1) {
      this.head = 0; // обнуляем голову, если очередь заполнена
    } else {
      this.head++;
    }

    // console.log("head..." + this.head);
    // console.log("lengthhhh..." + this.length)
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    } else {
      return this.container[this.head]
    }
    // return null;
  };

  clean = (): void => {
    this.container = Array(this.size);
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  }

  isEmpty = () => this.length === 0;
}