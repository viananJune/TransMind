---
title: 创刊文摘：先把骨架读稳
titleEn: Opening issue — steady the skeleton first
date: 2026-03-20
summary: 这一期不追新模型发布，只把后面所有笔记都会用到的五份材料按阅读顺序放在一起。
sources: attention, illustrated-transformer, nanogpt, lora, rag
---

创刊这一期故意慢。新的模型卡片每周都有，骨架很少变。先把这五份读稳，后面的发布会才听得懂哪些句子是新的。

## 建议顺序

1. 先读 [Attention Is All You Need](/library/attention)。不要从解读视频开始。记住编码器、解码器和注意力在原文里各解决什么。
2. 再用 [The Illustrated Transformer](/library/illustrated-transformer) 对照张量形状。它是讲解，不是证据；引用机制时回到论文。
3. 然后通读 [nanoGPT](/library/nanogpt) 的训练循环。目标不是跑出最好的损失，是把“训练一步”对应到代码。
4. 接着看 [LoRA](/library/lora)。问自己：什么时候低秩更新就够了，什么时候这个假设会伤到任务。
5. 最后读 [RAG 原文](/library/rag)。先分清它要解决的知识密集任务，再看今天的检索产品是不是同一条管线。

## 这一期先不做什么

不比较聊天产品，不记录测速，不收“十个必备仓库”。那些材料不是不能读，是还没有资格和上面五份放在同一条引用链里。

读完如果只能留下一句：后来的绝大多数改动，是在注意力、适配、检索和服务这几层上换零件。先知道层，再看零件。
