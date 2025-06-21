#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 獲取命令行參數
const args = process.argv.slice(2);
const title = args[0];

if (!title) {
  console.log('使用方法: node scripts/create-post.js "文章標題"');
  console.log('範例: node scripts/create-post.js "如何培養孩子的時間管理能力"');
  process.exit(1);
}

// 生成文件名（移除特殊字符，轉換為小寫，空格替換為連字符）
const filename = title
  .toLowerCase()
  .replace(/[^\w\s-]/g, '') // 移除特殊字符
  .replace(/\s+/g, '-') // 空格替換為連字符
  .replace(/--+/g, '-') // 多個連字符替換為單個
  .trim();

// 獲取當前日期
const now = new Date();
const pubDate = now.toISOString().split('T')[0]; // YYYY-MM-DD 格式

// 文章模板
const template = `---
title: '${title}'
description: '在這裡輸入文章描述...'
pubDate: '${pubDate}'
heroImage: '../../assets/blog-placeholder-1.jpg'
category: '教育' # 可選：教育、親子、任務管理、遊戲化、技術分享、產品更新
tags: []
author: 'TaskyVenture 團隊'
featured: false
readingTime: 5
ageGroup: '6-12歲'
difficulty: '初級' # 可選：初級、中級、高級
draft: true # 設為 false 時才會發布
---

## 引言

在這裡寫下你的開場白...

### 主要內容

#### 第一部分

寫下你的內容...

#### 第二部分

繼續你的內容...

### 實用技巧

1. 技巧一
2. 技巧二
3. 技巧三

### 總結

總結你的主要觀點...

---

*如果你覺得這篇文章有幫助，歡迎分享給其他家長！*

### 相關閱讀

- [相關文章標題](link)
- [另一篇相關文章](link)

---

*有任何問題或建議，歡迎透過 [聯絡我們](mailto:contact@taskyventure.com) 與我們交流。*
`;

// 創建文件路徑
const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog');
const filePath = path.join(blogDir, `${filename}.md`);

// 檢查文件是否已存在
if (fs.existsSync(filePath)) {
  console.log(`❌ 文件已存在: ${filename}.md`);
  process.exit(1);
}

// 創建文件
try {
  fs.writeFileSync(filePath, template);
  console.log(`✅ 成功創建文章: ${filename}.md`);
  console.log(`📂 位置: ${filePath}`);
  console.log(`\n📝 下一步：`);
  console.log(`1. 編輯文件內容`);
  console.log(`2. 將 draft: true 改為 draft: false 以發布`);
  console.log(`3. 運行 npm run dev 預覽效果`);
} catch (error) {
  console.error('❌ 創建文件時出錯:', error.message);
  process.exit(1);
} 