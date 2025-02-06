---
# type: docs 
title: 太好了，是春节联欢晚会魔术，我们没救了
date: 2025-02-06T17:13:09+08:00
featured: false
description: 关于刘谦魔术中的小秘密……？
comment: true
toc: true
reward: true
pinned: false
carousel: false
series:
categories: [闲聊]
tags: []
images: []
---

刘谦在春晚的舞台上活跃了七次，他那句“接下来，就是见证奇迹的时刻。”也成为了家喻户晓的经典名言。然而，随着春晚的整体质量下降，他的魔术在网友的口中也没有那么神奇，甚至数年前还爆出[偷换茶壶](https://hk.on.cc/hk/bkn/cnt/cnnews/20190205/bkn-20190205144225423-0205_00952_001.html) ，那么2025年他又带来了什么呢？

一个有关于三个物品的小『魔术』：筷子、杯子、勺子三样物品，首先允许观众随意摆放它们，然后将筷子与筷子左边的物品交换，杯子与杯子右边的物品交换，勺子与勺子左边的物品交换，最后观众会『惊讶』的发现杯子在最右边。~~一开始还趁机调侃了尼格买提去年春晚的失误。~~

那么，这到底是怎么一回事呢，我想了一下，用Python解释了这个魔术：

```Python
import random

def init():
    list = ["筷子", "杯子", "勺子"]
    random.shuffle(list)
    return list

def find_thing(list):
    for i in range(3):
        if list[i] == "筷子":
            kuaizi_id = i
        elif list[i] == "杯子":
            beizi_id = i
        else:
            shaozi_id = i
    return kuaizi_id, beizi_id, shaozi_id

def swap(list, swap1, swap2):
    list[swap1], list[swap2] = list[swap2], list[swap1]

list = init()
kuaizi_id, beizi_id, shaozi_id = find_thing(list)
print(kuaizi_id, beizi_id, shaozi_id)
print(list)
if(kuaizi_id != 0):
    swap(list, kuaizi_id, kuaizi_id-1)
print(list)
kuaizi_id, beizi_id, shaozi_id = find_thing(list)
if(beizi_id != 2):
    swap(list, beizi_id, beizi_id+1)
print(list)
kuaizi_id, beizi_id, shaozi_id = find_thing(list)
if(shaozi_id != 0):
    swap(list, shaozi_id, shaozi_id-1)
print(list)
```

从逻辑上来说，这三次操作假设以杯子为参照物的话，可以发现筷子和勺子一直相对于杯子向左运动，由于一共只有三个物品，当筷子和勺子相对于杯子向左运动三次后，无论杯子在哪个位置，它始终会在最右边。程序每次的运行结果也符合上述推测。

魔术一旦被揭露就没有了其震撼的效果，但是随着这几年的春晚逐渐走向政治化，歌功颂德的成分越来越多，这样的『魔术』无疑质量不如从前，其迷惑性和技术性都下降了。这也许是人们的悲哀。
