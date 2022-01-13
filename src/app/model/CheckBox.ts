export class CheckBox {

  private readonly _name: string;
  private _isChecked: boolean;

  constructor(name: string) {
    this._name = name;
    this._isChecked = false;
  }


  get name(): string {
    return this._name;
  }

  get isChecked(): boolean {
    return this._isChecked;
  }


  set setChecked(value: boolean) {
    this._isChecked = value;
  }
}

