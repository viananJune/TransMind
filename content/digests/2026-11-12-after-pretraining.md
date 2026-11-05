---
title: 预训练之后：比例、偏好、公开和本机
titleEn: After pretraining — ratio, preference, openness, and a local machine
date: 2026-11-12
summary: 第二期把算力拟合、偏好优化、训练是否可复查，以及本机推理分成四层。不和十一月五日那期的服务层混写。
sources: chinchilla, dpo, olmo, llama-cpp
---

上一期把检索、解码和服务分开。这一期看预训练结束之后，人们最容易合成一句的四件事。

1. [算力最优训练](/library/chinchilla) 是一条曲线，不是“每个参数二十个 token”的法令。甄别页把后一种说法记为存疑。
2. [直接偏好优化](/library/dpo) 省掉的是单独的奖励模型。偏好数据还在。把这说成对齐不再需要数据，是夸大。
3. [OLMo](/library/olmo) 用来区分两种“开放”：最终权重可以下载，以及数据、代码和检查点也可以复查。
4. [llama.cpp](/library/llama-cpp) 是本机上的量化推理。它不回答请求怎么在服务器里排队，那一层仍看 vLLM。

四层各写一句。不要收成“开源模型加上偏好对齐就已经够用”。
