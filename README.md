
# Summary

This repository demonstrates a bug in Bun v1.2.7 where importing `fake-indexeddb/auto` in a test preload file fails due to incorrect module type detection. Bun appears to treat `.mjs` files from `fake-indexeddb` as CommonJS, causing a `SyntaxError`. The issue does not occur in Bun v1.2.6. Changing `fake-indexeddb/auto/package.json` from `"type": "commonjs"` to `"type": "module"` resolves it in v1.2.7, but this is a workaround.

The bug broke our CI pipeline, and this minimal example isolates the issue for reporting to the

## Notice: Test with Both Bun Versions

Bun v1.2.7 (failing):

```
curl -fsSL https://bun.sh/install | bash -s "bun-v1.2.7"
bun --revision  # Should show v1.2.7 (e.g., 5c0fa6dc)
bun test test.ts --preload ./bunTestConfig.ts
```

Bun v1.2.6 (working):

```
curl -fsSL https://bun.sh/install | bash -s "bun-v1.2.6"
bun --revision  # Should show v1.2.7 (e.g., 5c0fa6dc)
bun test test.ts --preload ./bunTestConfig.ts
```

## Steps to recreate

1. Create a project with Bun as the test runner.
2. Install `fake-indexeddb` as a dependency:

```bash
   bun add fake-indexeddb --dev
```

3. Create a test config file that imports fake-indexeddb/auto

```javascript
// bunTestConfig.ts
import 'fake-indexeddb/auto';
import { beforeEach } from 'bun:test';

beforeEach(() => {
  console.log('Test setup');
});
```

4. Write a simple test file:

```bash
// test.ts
import { test } from 'bun:test';

test('example', () => {
  console.log('Running test');
});
```

5. Run the test with Bun v1.2.7:

```bash
bun test test.ts --preload ./bunTestConfig.ts
```

The issue occurs when Bun v1.2.7 loads fake-indexeddb/auto, which internally imports .mjs files (e.g., fakeIndexedDB.js or FDBCursor.js). Bun seems to treat these as CommonJS despite the .mjs extension and package.json "exports" field indicating ESM.
