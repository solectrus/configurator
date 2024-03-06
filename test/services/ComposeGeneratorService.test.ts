import type { Answers } from '@/stores/survey'
import { ComposeGeneratorService } from '@/services/ComposeGeneratorService'

const testCases: [string, Answers][] = [
  [
    'local-full',
    {
      installation_type: 'local',
      battery_vendor: 'battery_senec3',
      wallbox_vendor: 'wallbox_senec',
      heatpump_access: 'heatpump_shelly',
      q_forecast: true,
      q_updates: true,
      q_backup: true,
    },
  ],
  [
    'local-minimal',
    {
      installation_type: 'local',
      battery_vendor: 'battery_senec3',
    },
  ],
  [
    'distributed-local',
    {
      installation_type: 'distributed',
      q_distributed_choice: 'local',
      battery_vendor: 'battery_senec3',
    },
  ],
  [
    'distributed-cloud',
    {
      installation_type: 'distributed',
      q_distributed_choice: 'cloud',
      battery_vendor: 'battery_senec3',
    },
  ],
]

describe('ComposeGeneratorService', () => {
  test.each(testCases)(
    'correctly builds docker-compose.yml with different configurations',
    (expectedSnapshotFile, answers) => {
      const service = new ComposeGeneratorService(answers)
      const result = service.build().text()

      expect(result).toMatchFileSnapshot(
        `test/snapshots/ComposeGeneratorService/${expectedSnapshotFile}.yml`,
      )
    },
  )
})
