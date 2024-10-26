# SVN

## 场景问题

### 判断当前本地指定文件和和远程仓库的对应文件版本是否一致？

解决方法：

1. 使用命令：`svn status trunk/index.ts` 用于查看指定文件或目录在本地工作副本中的状态。如果有输出，说明该文件有变动。
2. 使用命令：`svn diff -r BASE:HEAD trunk/index.ts`，比较工作副本中 trunk/index.ts 文件的 BASE 版本和远程仓库中 HEAD 版本之间的差异。
   BASE：指的是工作副本中文件的基准版本，通常是你最后一次从远程仓库更新（update）到本地工作副本的版本。
   HEAD：指的是远程仓库中的最新版本，也就是最新的修订版（revision）。
   trunk/index.ts：这是你想要比较的文件的路径，这里假设你的工作副本中有一个名为 trunk 的目录，其中包含一个名为 index.ts 的文件

## 相关链接

1. [SVN 官方网站](https://subversion.org.cn/packages.html)
2. [SVN 代码托管平台](https://svnbucket.com/)
3. [SVN 教程书籍](https://svnbook.subversion.org.cn/)
