# VSCode 插件开发

::: info 环境

1. node: 确保已经安装好 node.js
   :::

## 准备工作

全局安装 yo 和 generator-code。

```sh
npm install --global yo generator-code
```

::: tip 说明

1. yo (Yeoman):
   yo 是 Yeoman 的命令行工具。Yeoman 是一个通用的脚手架工具，可以帮助你快速生成任何类型的项目，如网页应用、Node.js 模块、Angular 应用等。
   它通过“生成器”（generator）来工作，这些生成器是 npm 包，可以定义项目的结构和文件。
2. generator-code:
   generator-code 是一个 Yeoman 生成器，用于生成 Visual Studio Code 扩展。
   如果你想为 Visual Studio Code 开发扩展，这个生成器可以帮助你快速设置项目结构并包含一些基本的文件和设置。
   :::

## 创建项目

以下命令会启动一个交互式向导，引导你完成创建 VSCode 扩展的各个步骤。

```sh
yo code
```

### 目录结构

```md
.
├── .vscode
│ ├── launch.json // 这是一个用于配置启动和调试扩展的设置文件。通过它，您可以定义如何启动扩展并在 VSCode 内置的调试器中调试它
│ └── tasks.json // 这是一个任务配置文件，用于定义构建任务，比如编译 TypeScript 到 JavaScript。当您运行构建任务时，VSCode 会根据此文件中的配置来执行相应的操作。
├── .gitignore // 忽略构建输出和 node_modules 文件
├── README.md // 一个友好的插件文档
├── src
│ └── extension.ts // 插件源代码
├── package.json // 插件配置清单
├── tsconfig.json // TypeScript 配置
```

## VSCode 界面

![An image](/images/notes/vscode-ui.png)

## 效率

### concurrently

[concurrently](https://github.com/open-cli-tools/concurrently) 是一个流行的 Node.js 第三方库，用于并行（同时）运行多个命令。这个库特别适用于开发环境，其中可能需要同时启动和监控多个服务或进程，如前端构建工具、后端服务器、数据库等。

#### 安装和使用

```sh
npm install --save-dev concurrently
```

安装完成后，你可以在 package.json 文件的 scripts 部分配置 concurrently 来并行运行多个命令。例如：

```json
"scripts": {
  "dev": "concurrently \"npm run server\" \"npm run client\"",
  "server": "node server.js",
  "client": "react-scripts start"
}
```

在这个例子中，运行 npm run dev 将会同时启动服务器端和客户端。

可通过添加参数-k 或 --kill-others，当其中一个子进程退出时，此选项会终止其他所有子进程。这对于确保所有相关进程在其中一个失败时都能被清理很有用。`install:all`脚本可安装当前工程的依赖项，并会进入 build-list-webview 目录安装依赖项.

```json
"scripts": {
  "dev": "concurrently \"npm run server\" \"npm run client\" -k",
  "server": "node server.js",
  "client": "react-scripts start",
  "install:all": "npm install && cd build-list-webview && npm install"
}
```

## 命令

注册命令，可以绑定一个回调函数，在内部执行我们的逻辑代码，vscode本身也有很多的内置命令。注册的命令可以通过代码调用，也可以通过菜单或快捷键调用。

### 注册命令

```ts
export function activate(context: vscode.ExtensionContext) {
  // 注册一个命令
  const disposable = vscode.commands.registerCommand(
    "extension.sayHello",
    () => {
      // 显示一个消息框
      vscode.window.showInformationMessage("Hello World from my extension!");
    }
  );
  // 将命令添加到上下文中
  context.subscriptions.push(disposable);
}
```

为命令提供 UI，即可通过命令面板、菜单和快捷键等方式进行调用。

```json
// package.json
{
  "contributes": {
    "commands": [
      {
        "command": "extension.sayHello",
        "title": "Hello World"
      }
    ]
  }
}
```

### 调用命令

1. 通过编程方式调用命令 `vscode.commands.executeCommand("extension.sayHello");`

2. 通过命令面板调用命令

   - 打开命令面板 `ctrl+shift+p` 输入 `Hello World`
   - 选择 `Hello World` 命令

## 菜单

菜单项定义包含：

1. command：选中时应调用的命令
2. when：显示的条件
3. group：菜单项的分组
4. alt：按照alt键选中菜单时，执行的替代命令

```json
// package.json
{
  "contributes": {
    "commands": [
      {
        "command": "zheng.getCurrentFilePath",
        "title": "获取当前文件（夹）路径"
      },
      {
        "command": "zheng.testMenuShow",
        "title": "这个菜单仅在js文件中显示",
        "icon": {
          "dark": "./images/tool-light.svg",
          "light": "./images/tool-dark.svg"
        }
      }
    ],
    "menus": {
      "editor/context": [ // 在编辑器上下文菜单中添加菜单项
        {
          "when": "editorFocus", // 当编辑器处于焦点时显示菜单项
          "command": "zheng.getCurrentFilePath", // 选择该菜单项时执行的命令，该命令必须要在 commands 中注册
          "group": "navigation@1", // 定义菜单项的排序和分组
        },
        {
          "when": "resourceLangId === javascript", // 当资源语言为 JavaScript 时显示菜单项
          "command": "zheng.testMenuShow",
          "group": "navigation@1"
        }
      ],
      "editor/title": [ // 在编辑器标题菜单中添加菜单项
        {
          "when": "resourceLangId === javascript",
          "command": "zheng.testMenuShow",
          "group": "navigation@1"
        }
      ],
      "editor/title/context": [ // 在编辑器选项卡下文菜单中添加菜单项
        {
          "when": "resourceLangId === javascript",
          "command": "zheng.testMenuShow",
          "group": "navigation@1"
        }
      ]
    }
  }
}
```

1. "editor/context"
  ![An image](/images/vscode-extension/image.png)
1. "editor/title"
  ![An image](/images/vscode-extension/2024-08-04_15-35-04.png)
1. "editor/title/context"
  ![An image](/images/vscode-extension/2024-08-04_15-36-36.png)

## 快捷键

## 常见问题

### 1. webview 视图如何加载本地资源?

```ts
context.subscriptions.push(
  vscode.commands.registerCommand("catCoding.start", () => {
    // 创建并显示新的 Web 视图面板。
    const panel = vscode.window.createWebviewPanel(
      "catCoding", // 标识 Web 视图面板的类型。
      "猫猫编码", // 面板的标题
      vscode.ViewColumn.Active // 在编辑器中显示 Web 视图的位置，在当前激活的列显示
    );

    // 获取磁盘上的资源路径
    const onDiskPath = vscode.Uri.joinPath(
      context.extensionUri,
      "resources",
      "giphy.gif"
    );

    // 将一个文件系统URI（在这种情况下是onDiskPath）转换为一个Webview可以加载的URI
    const catGifSrc = panel.webview.asWebviewUri(onDiskPath);
  })
);
```

### 2. 扩展和 webview 通信

[vscode 脚本和消息传递](https://code.visualstudio.com/api/extension-guides/webview#scripts-and-message-passing)

## 相关命令

| 命令                                |                            描述                             |         快捷键 |
| ----------------------------------- | :---------------------------------------------------------: | -------------: |
| `Developer: Toggle Developer Tools` | 打开一个开发人员工具窗口，您可以使用调试和检查您的 web 视图 | `Ctrl+Shift+I` |

## 参考链接

1. [VSCode 插件开发指南](https://code.visualstudio.com/api)
2. [VSCode 插件开发指南-中文(非官方)](https://vscode.github.net.cn/api/)
3. [VSCode 插件开发指南-中文(非官方)](https://www.bookstack.cn/read/VS-Code-Extension-Doc-ZH/README.md)
4. [掘金一下 | 从零开发一款基于 webview 的 vscode 扩展)](https://juejin.cn/post/7000589186898231333?searchId=20240519194956C89A4A61F0DD0BE5BC6A#heading-52)
5. [小茗同学-vscode-plugin-demo](https://github.com/sxei/vscode-plugin-demo)
6. [VSCode 插件开发全攻略](https://blog.haoji.me/vscode-plugin-overview.html)
