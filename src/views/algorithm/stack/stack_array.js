// 数组模拟栈

const stack = [];

// 元素入栈
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);

// 访问栈顶元素
stack[stack.length - 1];

// 元素出栈
const pop = stack.pop();
console.log("pop = ", pop);

// 获取栈的大小
const length = stack.length;

// 判断栈是否为空
const isEmpty = length === 0;

console.log("isEmpty = ", isEmpty);
