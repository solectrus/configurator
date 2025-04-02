import { ComposeGenerator } from '@/services/ComposeGenerator'
import { EnvGenerator } from '@/services/EnvGenerator'

import { testCases } from '../fixtures/answers'

describe('EnvGenerator', () => {
  test.each(testCases)(
    '$# - correctly builds .env with different configurations for %s',
    async (expectedSnapshotFile, answers) => {
      const compose = new ComposeGenerator(answers).build()
      const service = new EnvGenerator(compose.raw(), answers)
      const result = service.build()

      await expect(result).toMatchFileSnapshot(
        `../snapshots/services/EnvGenerator/${expectedSnapshotFile}.env`,
      )
    },
  )

  test('builds empty .env when no services are configured', () => {
    const compose = new ComposeGenerator({}).build()
    const service = new EnvGenerator(compose.raw(), {})
    const result = service.build()

    expect(result).toEqual('')
  })
})

describe('EnvGenerator internals', () => {
  const env = new EnvGenerator({ services: {} }, {})

  test.each([
    ['simple string', 'abc', 'abc'],
    ['string with space', 'abc def', '"abc def"'],
    ['string with quotes', 'a"b', '"a\\"b"'],
    ['string with dollar', 'abc$def', '"abc$def"'],
    ['string with equal sign', 'abc=def', '"abc=def"'],
    ['string with hash', 'abc#def', '"abc#def"'],
    ['string with backslash', 'abc\\def', '"abc\\def"'],
    ['multiline string', 'line1\nline2', '"line1\nline2"'],
    ['numeric value', 1234, '1234'],
  ])('%s → %p', (_desc, input, expected) => {
    // @ts-expect-error accessing private method for test
    const result = env.formatEnvValue(input)
    expect(result).toBe(expected)
  })
})
