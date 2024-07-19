import { envConfig, EnvConfig } from './env-config';

export class AppConfigService {
  private readonly config: EnvConfig;

  constructor() {
    this.config = envConfig();
  }

  public get<T extends keyof EnvConfig>(key: T): EnvConfig[T] | undefined {
    return this.config[key];
  }

  public getOrThrow<T extends keyof EnvConfig>(
    key: T,
  ): Exclude<EnvConfig[T], undefined> {
    const value = this.config[key];
    if (value === undefined || value === null) {
      throw new Error(`Config key ${key} is missing`);
    }
    return value as Exclude<EnvConfig[T], undefined>;
  }
}
