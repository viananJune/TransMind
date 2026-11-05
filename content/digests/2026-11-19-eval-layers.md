---
title: 评测三层：窗口、任务配置、提示断言
titleEn: Three layers of evaluation — window, task config, prompt assertions
date: 2026-11-19
summary: 这一期只核对长上下文是否被用到，以及一个分数到底覆盖了哪些任务。不收新的排行榜。
sources: lost-in-the-middle, lm-eval-harness, promptfoo
---

上一期把比例、偏好、公开和本机分开。这一期看评测里最容易被合成一句的三层。

1. [Lost in the Middle](/library/lost-in-the-middle) 测的是位置。窗口写得很长，相关信息放在中间时仍可能用不上。甄别页把“更长就等于每段都被用到”记为夸大。
2. [lm-evaluation-harness](/library/lm-eval-harness) 测的是一组选定的任务。分数要连同任务名和版本一起读。换任务，名次可以变。
3. [Promptfoo](/library/promptfoo) 测的是具体提示和断言。它用来看一条工作流有没有退步，不是用来发模型总榜。

三层不要写成“基准更高，所以窗口和提示都没问题”。合成偏好能否完全取代人类偏好，这一期没有新的原文可引，先不收录这句口号。
