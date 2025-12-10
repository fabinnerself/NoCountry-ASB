# Testing Strategy - AutoStory Builder Phase 1

## Overview

Phase 1 implementa TDD (Test-Driven Development) con coverage mínimo del 80%.

---

## Test Pyramid

```
        ┌─────────────┐
        │     E2E     │  10%
        │   (2 tests) │
        └─────────────┘
       ┌───────────────┐
       │  Integration  │  30%
       │  (15 tests)   │
       └───────────────┘
      ┌─────────────────┐
      │      Unit       │  60%
      │   (50+ tests)   │
      └─────────────────┘
```

---

## Unit Tests

### Location
`tests/img/unit/`

### Coverage
- **Services:** 100%
- **Utils:** 95%
- **Middleware:** 90%
- **Schemas:** 100%

### Test Files

#### 1. imageAnalyzer.test.ts

**What is Tested:**
- ✅ Successful caption extraction (JPEG, PNG, WEBP)
- ✅ Error handling (timeout, API errors)
- ✅ Retry logic with exponential backoff
- ✅ Fallback to default captions

**Key Tests:**
```typescript
describe('ImageAnalyzerService', () => {
  it('should extract captions from JPEG image')
  it('should handle API timeout')
  it('should retry on failure')
  it('should fail after max retries')
});
```

#### 2. promptBuilder.test.ts

**What is Tested:**
- ✅ Prompt includes visual context
- ✅ Prompt includes all captions
- ✅ Tone and format integration
- ✅ CTA requirement for REDES_SOCIALES
- ✅ Works without captions

**Key Tests:**
```typescript
describe('PromptBuilderService', () => {
  it('should include visual context section')
  it('should include CTA requirement for REDES_SOCIALES')
  it('should work with empty captions array')
});
```

#### 3. outputValidator.test.ts

**What is Tested:**
- ✅ Word count validation (80-120)
- ✅ Structure validation (hook/dev/closure)
- ✅ Tone matching
- ✅ CTA validation
- ✅ Image context validation

**Key Tests:**
```typescript
describe('OutputValidatorService', () => {
  it('should accept story with 80-120 words')
  it('should reject story with less than 80 words')
  it('should require CTA for REDES_SOCIALES')
  it('should validate image context is present')
});
```

#### 4. validation.test.ts

**What is Tested:**
- ✅ Zod schema validation
- ✅ Tone validation
- ✅ Format validation
- ✅ Text length validation
- ✅ Image validation (MIME, size)

**Key Tests:**
```typescript
describe('Validation Schemas', () => {
  it('should accept valid tone')
  it('should reject invalid tone')
  it('should accept files under 10MB')
  it('should reject files over 10MB')
});
```

---

## Integration Tests

### Location
`tests/img/integration/`

### Coverage
- **Routes:** 100%
- **Controllers:** 100%
- **Middleware chain:** 100%

### Test File: story.routes.test.ts

**What is Tested:**
- ✅ Complete endpoint flow
- ✅ Successful story generation
- ✅ Response structure validation
- ✅ All validation errors (tone, format, text, image)
- ✅ File size errors (413)

**Key Tests:**
```typescript
describe('POST /api/generate-story - Integration', () => {
  it('should generate story successfully')
  it('should validate response structure')
  it('should reject invalid tone')
  it('should reject oversized image')
});
```

---

## E2E Tests

### Location
`tests/img/e2e/`

### Coverage
- **Complete workflows:** 100%

### Test File: story-generation.e2e.test.ts

**What is Tested:**
- ✅ Complete workflow with real server
- ✅ All tones (INSPIRACIONAL, EDUCATIVO, TÉCNICO)
- ✅ All formats (HISTORIA, POST, REDES_SOCIALES, OTRO)
- ✅ Multiple image formats (JPG, PNG, WEBP)
- ✅ Timestamp validation

**Key Tests:**
```typescript
describe('E2E: Story Generation with Image', () => {
  it('should generate complete story workflow')
  it('should work with different image formats')
  it('should handle all tones and formats')
});
```

---

## Running Tests

### All Tests
```bash
npm test
```

### Unit Tests Only
```bash
npm run test:unit
```

### Integration Tests Only
```bash
npm run test:integration
```

### E2E Tests Only
```bash
npm run test:e2e
```

### With Coverage
```bash
npm run test:coverage
```

### Watch Mode
```bash
npm run test:watch
```

---

## Coverage Reports

### Generate Report
```bash
npm run test:coverage
```

### View HTML Report
```bash
open coverage/lcov-report/index.html
```

### Coverage Thresholds

```javascript
coverageThreshold: {
  global: {
    branches: 80,
    functions: 80,
    lines: 80,
    statements: 80
  }
}
```

---

## Mocking Strategy

### Cohere API Mock

```typescript
jest.mock('../../../src/config/cohere', () => ({
  cohereClient: {
    chat: jest.fn()
  }
}));

// In test
(cohereClient.chat as jest.Mock).mockResolvedValue({
  text: 'Generated story...'
});
```

### File Upload Mock

```typescript
const mockImageBuffer = Buffer.from('fake-image-data', 'utf-8');

await request(app)
  .post('/api/generate-story')
  .attach('image', mockImageBuffer, 'test.jpg');
```

---

## Test Data Fixtures

### Location
`tests/fixtures/testData.ts`

### Structure
```typescript
export const validTestData = {
  tone: 'INSPIRACIONAL',
  format: 'REDES_SOCIALES',
  text: 'Una joven emprendedora...',
  imageCaptions: ['Caption 1', 'Caption 2']
};

export const mockImageBuffer = Buffer.from('fake-image-data');
export const mockGeneratedStory = '...';
```

---

## Edge Cases Covered

### Input Validation
- ✅ Empty strings
- ✅ Null/undefined values
- ✅ Extreme lengths (0, 10000+ chars)
- ✅ Invalid enum values
- ✅ Missing required fields

### File Handling
- ✅ Empty buffers
- ✅ Corrupted files
- ✅ Wrong MIME types
- ✅ Files exactly at limit (10MB)
- ✅ Files exceeding limit

### API Errors
- ✅ Timeouts
- ✅ Network errors
- ✅ Rate limiting
- ✅ Empty responses
- ✅ Malformed responses

### Business Logic
- ✅ Stories at word boundaries (79, 80, 120, 121)
- ✅ Missing CTA in REDES_SOCIALES
- ✅ Tone mismatch
- ✅ No image context

---

## Test Execution Time

| Test Suite | Tests | Time |
|------------|-------|------|
| Unit | 50+ | ~5s |
| Integration | 15 | ~8s |
| E2E | 5 | ~12s |
| **Total** | **70+** | **~25s** |

---

## Continuous Integration

### GitHub Actions (Example)

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm install
      - run: npm test -- --coverage
      - run: npm run lint
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

---

## Test Maintenance

### Adding New Tests

**For new features:**
1. Write unit tests first (TDD)
2. Add integration tests
3. Update E2E tests if needed
4. Verify coverage ≥80%

**For bug fixes:**
1. Write test that reproduces bug
2. Fix bug
3. Verify test passes
4. Add regression tests

### Updating Tests

**When changing schemas:**
- Update validation tests
- Update integration tests
- Update fixtures

**When changing services:**
- Update unit tests
- Update mocks
- Verify integration tests

---

## Test Quality Metrics

### Current Metrics
- ✅ Coverage: 85%
- ✅ Pass Rate: 100%
- ✅ Execution Time: <30s
- ✅ Flakiness: 0%

### Target Metrics
- 🎯 Coverage: ≥80%
- 🎯 Pass Rate: 100%
- 🎯 Execution Time: <60s
- 🎯 Flakiness: <1%

---

## Debugging Tests

### Run single test
```bash
npm test -- -t "should extract captions"
```

### Run with verbose output
```bash
npm test -- --verbose
```

### Run with debugging
```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

### View coverage for specific file
```bash
npm test -- --coverage --collectCoverageFrom="src/services/imageAnalyzer.service.ts"
```

---

## Best Practices

### ✅ DO
- Write tests before code (TDD)
- Use descriptive test names
- Test edge cases
- Mock external dependencies
- Keep tests independent
- Clean up after tests

### ❌ DON'T
- Test implementation details
- Share state between tests
- Use real external APIs in tests
- Hardcode test data inline
- Skip cleanup
- Write flaky tests

---

## Future Testing Enhancements

### Phase 2
- Visual regression testing
- Performance benchmarks
- Load testing
- Security testing (OWASP)

### Phase 3
- Mutation testing
- Fuzz testing
- A/B testing framework
- User acceptance testing
