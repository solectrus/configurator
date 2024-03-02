import type { Answers } from '@/stores/survey'

export class FileGeneratorService {
  static generateComposeFile(answers: Answers): string {
    return `version: '3'
services:
  web:
    image: ghcr.io/solectrus/solectrus:latest
`
  }

  static generateEnvFile(answers: Answers): string {
    return 'FOO=bar'
  }
}
