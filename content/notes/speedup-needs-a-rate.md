---
title: 加速比不能单独引用
titleEn: Do not cite the speedup alone
date: 2026-10-28
summary: 投机解码的加速比挂在接受率上。笔记里如果只有一个倍数，就还没读完。
tags: inference, reading
---

[投机解码](/library/speculative) 允许草稿模型先写 token，再由目标模型决定收还是退。输出分布可以对齐原来的模型，延迟是否下降，取决于有多少草稿被接受。

手记里至少留下这两者的关系：接受率，以及对应的加速比。只写下“快了两倍”时，这条笔记不合格。

服务层的排队是另一件事，去看 [vLLM](/library/vllm)。不要把解码分布和服务吞吐写进同一句结论。
