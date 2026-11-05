---
title: DPO 省掉的是奖励模型
titleEn: DPO removes the reward model, not the preferences
date: 2026-11-09
summary: 直接偏好优化不单独训练奖励模型。偏好数据仍在，参考模型仍在。
tags: preference, reading
---

[DPO](/library/dpo) 把奖励写成当前策略和参考策略的差，于是训练循环里可以不再放一个独立的奖励模型。数据仍然是成对的偏好：同一提示下，哪一份回答更好。

读的时候先找参考模型是谁，以及偏好从哪来。来源若只写“人类偏好”四个字，没有任务和标注说明，这条笔记先标成存疑。

它不是“对齐已经结束”的证据，也不是在说强化学习不再出现。它只是把其中一条优化路径写短了。
