export interface DatabaseConfig {
  readonly provider: "postgresql";
  readonly url: string;
}

export function createDatabaseConfig(
  url: string | undefined,
): DatabaseConfig {
  if (!url) {
    throw new Error("DATABASE_URL is required");
  }

  return {
    provider: "postgresql",
    url,
  };
}