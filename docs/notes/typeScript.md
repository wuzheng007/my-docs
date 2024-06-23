# TypeScript

- [TypeScript官网](https://www.typescriptlang.org/zh/)
- [《TypeScript 教程》阮一峰](https://wangdoc.com/typescript/)

## 开发准备

1. 安装

```sh
npm i -g typescript
```

安装好之后，就可以使用`tsc`命令来编译`ts`文件了。

2. 配置

`ts-node`：是一个 TypeScript 的执行和 REPL 环境，它允许你直接在 Node.js 中运行 TypeScript 代码，而无需先将其编译为 JavaScript。这大大加速了 TypeScript 代码的开发流程，因为它减少了编译步骤。

```sh
# 安装
npm i -g ts-node
```

```sh
# 运行
ts-node src/index.ts
```

`nodemon`: nodemon是一个为Node.js应用程序开发设计的实用工具，其主要功能是在检测到文件更改时自动重启Node.js应用程序。

```sh
# 安装
npm i -g nodemon
```

```sh
# 运行
nodemon --exec ts-node src/index.ts
```

配置npm脚本

```json
{
  "scripts": {
    "dev": "nodemon --exec ts-node src/index.ts"
  },
}
```

## any类型、unknown类型、never类型

### any类型

`any`类型表示没有任何限制，可以被赋予任意类型的值。变量类型一旦设为`any`，就会关闭这个变量的类型检查。

- `any`类型的变量，可以被赋值为任意类型的值，也可以赋值给任意类型的其他变量

### unknown类型

`unknown`类型表示类型不确定，可以被赋予任意类型的值，和`any`不同的是，他不能直接使用，主要有以下几个限制。

- `unknown`类型不能直接赋值给其他类型（除了`any`和`unknown` ）
- `unknown`类型的变量，不能直接调用其属性和方法，只有经过“类型缩小”后才可以使用
- `unknown`类型的变量，能进行的运算是有限制的，只能进行比较运算（运算符==、===、!=、!==、||、&&、?）、取反运算（运算符!）、`typeof`运算符和`instanceof`运算符这几种，其他运算都会报错。

### never类型

`never`类型表示"空类型"，即不可能有这样的值，`never`类型的变量，不能被赋予任意值，赋值即报错，但是`never`类型可以赋值给任意其他类型。

## 类型系统

### undefined类型、null类型

`undefined` 和 `null` 是两种独立的类型，各自都只有一个值。
注意：如果没有声明类型的变量，被赋值为 `undefined`或`null`，在关闭编译设置`noImplicitAny`和`strictNullChecks`时，他们的类型会被推断为`any`

### 包装对象类型

### 值类型

TypeScript 规定，单个值也是一种类型，称为“值类型”。

```ts
let x:'hello'
x = 'hello' // 正确
x = 'world' // 报错 不能将类型“"world"”分配给类型“"hello"”
```

TypeScript 推断类型时，遇到`const`命令声明的变量，如果代码里没有注明类型，就会推断该变量是值类型。

```ts
const x = 'hello'; // x的类型是 'hello'
const y:string = 'https'; // y的类型是 string
```

### 联合类型

联合类型指的是多个类型组成的一个新类型，使用符号 | 表示。

```ts
let setting:true|false;
let colors:'赤'|'橙'|'黄'|'绿'|'青'|'蓝'|'紫';
```

编译选项strictNullChecks打开后，其他类型的变量不能赋值为undefined或null，这时，如果如果某个变量确实可能包含空值，就可以采用联合类型的写法

```ts
let name:string|null;
name = 'john' // 正确
name = null // 正确
```

如果一个变量有多种类型，读取该变量时，往往需要进行"类型缩小"，区分该值到底属于哪一种类型，然后在进一步处理。

```ts
function printId(id:number|string) {
  if(typeof id === 'string') {
    console.log(id.toUpperCase())
  }else {
    console.log(id)
  }
}
```

"类型缩小"是TypeScript处理联合类型的标准方法，凡是遇到可能为多种类型的的场合，都需要先缩小类型，在进行处理。

### 交叉类型

交叉类型指的是多个类型组成的一个新类型，使用符号 & 表示。
交叉类型 A&B 表示，任何一个类型必须同时属于 A 和 B，才属于交叉类型 A&B，即交叉类型同时满足 A 和 B 的特征。

交叉类型的主要用途是表示对象的合成。常用来为对象类型添加新属性。

### type命令

`type` 命令用来定义一个类型的别名。

```ts
type Age = number;
let age:Age = 18
```

## tsconfig.json配置文件

```json
{
  "compilerOptions": {
    "strictNullChecks": true, // 在进行类型检查时，要考虑到“null”和“undefined”。打开后，undefined和null只能赋值给自身，或者any类型和unknown类型的变量。
    "target": "ES2017", // 编译目标版本
    "lib":["ES2017","DOM","DOM.Iterable"], // 需要引用的库
    "outDir": "./dist" // 指定输出目录，如果未指定和对应的.ts文件同目录
  },
  "include": ["src/**/*.ts"] // 指定需要编译的文件或目录
}
```
