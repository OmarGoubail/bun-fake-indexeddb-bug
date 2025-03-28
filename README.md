
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
