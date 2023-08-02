export default class Unit {
  constructor(unit) {
    this.unit = unit;
  }

  get formatted() {
    if (this.unit === "Unit" || this.unit === "Number") {
      return "Units";
    }
    if (this.unit === "Rs.") {
      return " LKR";
    }
    return this.unit;
  }
}
