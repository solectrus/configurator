import { ComposeGenerator } from '@/services/ComposeGenerator'
import { EnvGenerator } from '@/services/EnvGenerator'

import { testCases } from '../fixtures/answers'

describe('EnvGenerator', () => {
  test.each(testCases)(
    '$# - correctly builds .env with different configurations for %s',
    (expectedSnapshotFile, answers) => {
      const compose = new ComposeGenerator(answers).build()
      const service = new EnvGenerator(compose.raw(), answers)
      const result = service.build()

      expect(result).toMatchFileSnapshot(
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
