// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace NodeJS {
  export interface ProcessEnv {
    NEXTAUTH_URL: string
    NEXTAUTH_SECRET: string
    GITHUB_ID?: string
    GITHUB_SECRET?: string
  }
}
