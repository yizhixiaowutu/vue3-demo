export enum Direction {
  NORTH = "north",
  SOUTH = "south",
  WEST = "west",
  EAST = "east",
}

type EventName = "click" | "change" | "focus";

const e: EventName = "click";
console.log(e);
