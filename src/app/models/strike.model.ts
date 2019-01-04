export class Strike {
  public constructor(empty: boolean) {
    this.isEmpty = empty;
  }

  public isEmpty: boolean = true;

  public set() {
    this.isEmpty = false;
  }
}