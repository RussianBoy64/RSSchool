export interface CarProps {
  name: string;
  color: string;
  id: number;
}

export class Car implements CarProps {
  public name;

  public color;

  public id;

  constructor(name: string, color: string, id: number) {
    this.name = name;
    this.color = color;
    this.id = id;
  }
}
