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
    } else {
      result.push(await this.prerequisitesLocal())
    }

    result.push(await this.installation())

    return result.join('\n')
  }

  private async introduction() {
    const raw = await this.loadMarkdown('1-introduction')

    return this.replacePlaceholders(raw, {})
  }

  private async prerequisitesLocal() {
    const raw = await this.loadMarkdown('2-prerequisites-local')

    return this.replacePlaceholders(raw, {})
  }

  private async prerequisitesCloud() {
    const raw = await this.loadMarkdown('2-prerequisites-cloud')

    return this.replacePlaceholders(raw, {})
  }

  private async installation() {
    const raw = await this.loadMarkdown('3-installation')

    const url = this.answers.app_domain
      ? `https://${this.answers.app_domain}`
      : this.answers.app_host
        ? `http://${this.answers.app_host}:3000`
        : 'http://[ip]:3000'

    return this.replacePlaceholders(raw, {
      url,
    })
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

  private replacePlaceholders(markdown: string, vars: any): string {
    return markdown.replace(/%\{([^}]+)\}/g, (match, key) => {
      return vars[key]
    })
  }
}
