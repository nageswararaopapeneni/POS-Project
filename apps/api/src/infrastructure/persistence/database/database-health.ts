import type { DatabaseClient } from "./database-client";

export interface DatabaseHealth {
  readonly connected: boolean;
}

export async function checkDatabaseHealth(
  client: DatabaseClient,
): Promise<DatabaseHealth> {
  return {
    connected: client.isConnected(),
  };
}