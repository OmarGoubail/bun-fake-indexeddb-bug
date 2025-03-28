// bunTestConfig.ts
import 'fake-indexeddb/auto';
import { beforeEach } from 'bun:test';

beforeEach(() => {
  console.log('Test setup running');
});
