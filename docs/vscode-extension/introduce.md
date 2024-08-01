# 介绍

## package.json

关于 package.json 文件的内容介绍，可参考[小茗同学-VSCode插件开发全攻略（三）package.json详解](https://blog.haoji.me/vscode-plugin-package-json.html)

### contributes（贡献点）

[官网-contributes](https://code.visualstudio.com/api/references/contribution-points)。contributes 是 VSCode 扩展的核心，它定义了插件的功能和行为。contributes 是一个 JSON 对象，包含了多个键值对，每个键值对都对应一个 VSCode 扩展的功能或行为。

```json
// package.json
{
  "contributes": {
    // 命令
    "commands": [
      {
        "command": "extension.sayHello", // 命令名称
        "title": "Hello World", // 命令标题
      }
    ],
  }
}
```
