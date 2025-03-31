---
# type: docs 
title: 移除 Git 历史记录中的文件
date: 2025-03-31T17:38:25+08:00
featured: false
description: 记录一次修改 Git 历史的操作
comment: true
toc: true
reward: true
pinned: false
carousel: false
series:
categories: [Tech]
tags: []
images: []
---

在 Git 仓库中，常常会混入不该出现的东西。为了删除它们，人们通常会多次优化 `.gitignore` ，添加诸如 `.DS-Store`，`node_modules/`、`__pycache__/`、`*.log` 等文件或文件夹，并手动执行 `git rm --cached <file>` 将其从暂存区移除，日后也会停止追踪。然而，这种方法仅适用于未来的提交，历史记录中仍然会保留这些文件。

保留这些垃圾并没有什么坏处，但是如果它们存有API密钥等隐私信息，显然，对于公开的或者将要公开的 Git 仓库来说，这是灾难性的。因此，我们需要彻底修改以前的 Git 历史。这里，`git filter-repo` 提供了更彻底的解决方案。  

## 如何操作？

首先，你需要先在 Python 环境下安装`filter-repo`：

```python
pip install git-filter-repo
```

如果你误提交了一个不该包含的文件（如 `config.json`），你可以执行以下操作彻底移除它：  

```git
git filter-repo --path config.json --invert-paths
```

多个文件可以同时删除，例如：
```git
git filter-repo --path secrets.env --path old_logs/ --invert-paths
```

执行完 `git filter-repo` 后，Git 会删除 `origin` 远程地址，并且分支可能会丢失。因此，我们需要重建远程和`main`分支：  

```git
git remote add origin https://github.com/your-username/your-repo.git
git remote -v # 检查远程是否修改
git checkout -b main
git pugit origin --force --all
```

这样，远程仓库就会同步新的历史，删除的文件不会再出现在 Git 记录中。  

## 注意事项？

1. 这会直接修改所有与文件有关的 Git 历史，虽然提交还在，但以前的 Commit ID 等都会全部修改。

2. 修改完成以后，所有的本地仓库都需要重新克隆，否则会出现冲突。


