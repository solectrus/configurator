import { ComposeGenerator } from '@/services/ComposeGenerator'

import { testCases } from '../fixtures/answers'

describe('ComposeGenerator', () => {
  test.each(testCases)(
    '$# - correctly builds compose.yml with different configurations for %s',
    (expectedSnapshotFile, answers) => {
      const service = new ComposeGenerator(answers)
      const result = service.build().text()

      expect(result).toMatchFileSnapshot(
        `../snapshots/services/ComposeGenerator/${expectedSnapshotFile}.yml`,
      )
    },
  )

  test('builds empty compose.yml when no services are configured', () => {
    const service = new ComposeGenerator({})
    const result = service.build().text()

    expect(result).toEqual('')
  })
})
