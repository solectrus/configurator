import { ReadmeGenerator } from '@/services/ReadmeGenerator'

import { testCases } from '../fixtures/answers'

describe('ReadmeGenerator', () => {
  test.each(testCases)(
    '$# - correctly builds readme with different configurations for %s',
    async (expectedSnapshotFile, answers) => {
      let readmeFile

      // Test German
      await new ReadmeGenerator(answers, 'de').build().then((readme) => {
        readmeFile = readme
      })

      expect(readmeFile).toMatchFileSnapshot(
        `../snapshots/services/ReadmeGenerator/de/${expectedSnapshotFile}.md`,
      )

      // Test English
      await new ReadmeGenerator(answers, 'en').build().then((readme) => {
        readmeFile = readme
      })

      expect(readmeFile).toMatchFileSnapshot(
        `../snapshots/services/ReadmeGenerator/en/${expectedSnapshotFile}.md`,
      )
    },
  )
})
