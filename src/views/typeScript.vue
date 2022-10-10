<template>
  <div id="typescript">
    <h3>TypeScript</h3>
    <p>{{ msg }}</p>
    <p>Truck: {{ evaluatePrice(myTruck) }}</p>
    <p>Bicycle: {{ evaluatePrice(myBicycle) }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Bicycle {
  vType: "Bicycle";
  price: number;
}

interface Car {
  vType: "Car";
  price: number;
  speed: "fast" | "faster";
}

interface Truck {
  vType: "Truck";
  price: number;
  weight: "weight" | "weighter";
}

type Vehicle = Bicycle | Car | Truck; // 联合类型

const msg: any = ref("safer, stronger");

const EVALUATION_FACTOR = Math.PI;

// 类型守卫
function evaluatePrice(vehicle: Vehicle) {
  switch (vehicle.vType) {
    case "Bicycle":
      return vehicle.price * EVALUATION_FACTOR;
    case "Car":
      return vehicle.speed + " & " + vehicle.price;
    case "Truck":
      return vehicle.weight + " & " + vehicle.price;
  }
}

const myTruck: Truck = { vType: "Truck", weight: "weight", price: 999 };
const myBicycle: Bicycle = { vType: "Bicycle", price: 800 };
// evaluatePrice(myTruck);
</script>

<style scoped></style>
