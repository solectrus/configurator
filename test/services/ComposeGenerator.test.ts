import { ComposeGenerator } from '@/services/ComposeGenerator'

import { testCases } from '../fixtures/answers'

describe('ComposeGenerator', () => {
  test.each(testCases)(
    '$# - correctly builds compose.yaml with different configurations for %s',
    async (expectedSnapshotFile, answers) => {
      const service = new ComposeGenerator(answers)
      const result = service.build().text()

      await expect(result).toMatchFileSnapshot(
        `../snapshots/services/ComposeGenerator/${expectedSnapshotFile}.yml`,
      )
    },
  )

  test('builds empty compose.yaml when no services are configured', () => {
    const service = new ComposeGenerator({})
    const result = service.build().text()

    expect(result).toEqual('')
  })
})
