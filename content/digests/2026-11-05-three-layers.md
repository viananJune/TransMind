---
title: 十一月笔记：三层不要写成一句
titleEn: November notes — three layers, not one sentence
date: 2026-11-05
summary: 把检索、解码和服务分开。这一期只核对已经在源录里的材料，不追加新的发布。
sources: rag, speculative, vllm, lora
---

这一期没有新的发布会。只把最近手记里容易写混的几层再排一次。

1. [RAG](/library/rag) 处理的是知识密集任务里的检索与生成。它没有证明幻觉消失。甄别页把“消除幻觉”记为夸大。
2. [投机解码](/library/speculative) 讨论的是分布可以不变的加速。加速比要和接受率一起读，不能单独引用。
3. [vLLM](/library/vllm) 讨论的是请求怎么排队、显存怎么分页。它不解释模型为什么答得对。
4. [LoRA](/library/lora) 放在最后，用来记住适配层的假设：低秩省下的是更新量，不是所有任务上的上限。

顺序就是这一、二、三、四。写笔记时一层一句。不要合成“检索加上推理加速已经够用”。
