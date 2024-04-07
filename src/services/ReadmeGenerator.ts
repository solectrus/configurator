import type { Answers } from '@/types/answers'

export class ReadmeGenerator {
  constructor(
    private answers: Answers,
    private language: string,
  ) {}

  async build(): Promise<string> {
    const result: string[] = []

    result.push(await this.introduction())

    if (this.answers.installation_type === 'cloud' || this.answers.distributed_choice === 'cloud') {
      result.push(await this.prerequisitesCloud())

      if (this.answers.traefik && this.answers.app_domain) {
        result.push(await this.prerequisitesDomain())
      }
    } else {
      result.push(await this.prerequisitesLocal())
    }

    result.push(await this.installation())
    result.push(await this.final())

    return result.join('\n')
  }

  private async introduction() {
    const raw = await this.loadMarkdown('1-introduction')
    const placeholders = await this.loadPlaceholders()

    let part
    if (this.answers.installation_type === 'distributed')
      if (this.answers.distributed_choice === 'cloud') part = placeholders.part_remote
      else part = placeholders.part_local
    else part = placeholders.part_global

    return this.replacePlaceholders(raw, {
      part,
    })
  }

  private async prerequisitesLocal() {
    const filename = {
      raspberry: '2-prerequisites-raspberry',
      synology: '2-prerequisites-synology',
      other: '2-prerequisites-local',
    }[this.answers.linux_machine!]

    if (filename) {
      const raw = await this.loadMarkdown(filename)
      return this.replacePlaceholders(raw, {})
    } else return ''
  }

  private async prerequisitesCloud() {
    const raw = await this.loadMarkdown('2-prerequisites-cloud')

    return this.replacePlaceholders(raw, {})
  }

  private async prerequisitesDomain() {
    const raw = await this.loadMarkdown('2-prerequisites-domain')

    return this.replacePlaceholders(raw, {
      domain: this.answers.app_domain,
    })
  }

  private async installation() {
    let filename
    let url

    if (
      this.answers.installation_type === 'distributed' &&
      this.answers.distributed_choice === 'local'
    ) {
      filename = '3-installation-distributed-local'
    } else {
      filename = '3-installation'
    }

    if (this.answers.traefik && this.answers.app_domain) {
      url = `https://${this.answers.app_domain}`
    } else if (this.answers.app_host) {
      url = `http://${this.answers.app_host}:3000`
    } else {
      url = 'http://[ip]:3000'
    }

    let folders = 'redis postgresql influxdb'
    if (this.answers.traefik) folders += ' traefik'

    const raw = await this.loadMarkdown(filename)
    return this.replacePlaceholders(raw, {
      url,
      folders,
    })
  }

  private async final() {
    const raw = await this.loadMarkdown('4-final')

    return this.replacePlaceholders(raw, {})
  }

  private async loadMarkdown(fileName: string): Promise<string> {
    try {
      const module = await import(`@/templates/readme/${this.language}/${fileName}.md?raw`)
      return module.default
    } catch (error) {
      // Fallback to English
      const fallbackModule = await import(`@/templates/readme/en/${fileName}.md?raw`)
      return fallbackModule.default
    }
  }

  private async loadPlaceholders(): Promise<any> {
    try {
      const module = await import(`@/templates/readme/${this.language}/placeholders.json`)
      return module.default
    } catch (error) {
      // Fallback to English
      const fallbackModule = await import('@/templates/readme/en/placeholders.json')
      return fallbackModule.default
    }
  }

  private replacePlaceholders(markdown: string, vars: any): string {
    return markdown.replace(/%\{([^}]+)\}/g, (match, key) => {
      return vars[key]
    })
  }
}
