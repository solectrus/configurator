import { ComposeGeneratorService } from '@/services/ComposeGeneratorService'
import { EnvGeneratorService } from '@/services/EnvGeneratorService'

import { testCases } from '../fixtures/answers'

describe('EnvGeneratorService', () => {
  test.each(testCases)(
    '$# - correctly builds .env with different configurations for %s',
    (expectedSnapshotFile, answers) => {
      const compose = new ComposeGeneratorService(answers).build()
      const service = new EnvGeneratorService(compose.raw(), answers)
      const result = service.build()

      expect(result).toMatchFileSnapshot(
        `../snapshots/services/EnvGeneratorService/${expectedSnapshotFile}.env`,
      )
    },
  )
})
