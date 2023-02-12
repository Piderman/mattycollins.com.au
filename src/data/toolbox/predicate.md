---
date: 2023-02-12
title: Type Predicate
category: typescript
tags:
  - guard
  - utility
---

```js

export const isNarrowedType = (union) : union is TheNarrowedType {
  return
}
```

eg: bunch of records from the cms,

## Predicate with descriminitory key

```ts
type ArticleRecord = {
	__typename: 'ArticleRecord';
	author: { id: string };
};

export const isArticleRecord = (record): record is ArticleRecord => {
	return record.typename === 'ArticleRecord';
};
```
