import { ComposeGeneratorService } from '@/services/ComposeGeneratorService'

import { testCases } from '../fixtures/answers'

describe('ComposeGeneratorService', () => {
  test.each(testCases)(
    '$# - correctly builds compose.yml with different configurations for %s',
    (expectedSnapshotFile, answers) => {
      const service = new ComposeGeneratorService(answers)
      const result = service.build().text()

      expect(result).toMatchFileSnapshot(
        `../snapshots/services/ComposeGeneratorService/${expectedSnapshotFile}.yml`,
      )
    },
  )

  test('builds empty compose.yml when no services are configured', () => {
    const service = new ComposeGeneratorService({})
    const result = service.build().text()

    expect(result).toEqual('')
  })
})
