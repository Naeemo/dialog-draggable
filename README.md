# Dialog-draggable

<p>
  <a href="https://npmcharts.com/compare/dialog-draggable?minimal=true"><img src="https://img.shields.io/npm/dm/dialog-draggable.svg?sanitize=true" alt="Downloads"></a>
  <a href="https://www.jsdelivr.com/package/npm/dialog-draggable"><img src="https://data.jsdelivr.com/v1/package/npm/dialog-draggable/badge" ></a>
  <a href="https://www.npmjs.com/package/dialog-draggable"><img src="https://img.shields.io/npm/v/dialog-draggable.svg?sanitize=true" alt="Version"></a>
  <a href="https://www.npmjs.com/package/dialog-draggable"><img src="https://img.shields.io/npm/l/dialog-draggable.svg?sanitize=true" alt="License"></a>
</p>


Makes the HTML element [\<dialog\>] draggable.

[Live demo](https://naeemo.github.io/dialog-draggable)

## Quick start

Install

```shell
$ pnpm add dialog-draggable
# yarn add dialog-draggable
# npm i dialog-draggable
```

make all `<dialog>` elements draggable

```typescript
import { makeDialogDraggable } from 'dialog-draggable';

makeDialogDraggable();
```

## Trigger dragging by inner dom

add `data-dialog-draggable` attribute to inner tags, so they can trigger the outer `<dialog>` dragging. Notice
`<button>` and `<a>` tags are excluded.

```html
<!-- Example -->
<dialog id="dialog">
  <nav data-dialog-draggable>
    Dialog title
    <!-- buttons won't trigger dragging -->
    <button type="button">X</button>
  </nav>
  <!-- dialog contents -->
</dialog>
```

## Develop

```shell
# nvm use
$ corepack enable
$ pnpm install --frozen-lockfile
```

### local dev preview

```shell
pnpm dev
```

### test

```shell
pnpm test
```

---

Supported
by [JetBrains open source program](https://www.jetbrains.com/community/opensource/#support?from=dialog-draggable).

[\<dialog\>]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
