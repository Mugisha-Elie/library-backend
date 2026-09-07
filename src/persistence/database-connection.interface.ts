import { type ITask } from 'pg-promise'

export type Transaction = ITask<unknown>

export abstract class IDatabaseConnection {
  abstract query<T>(query: string, values?: unknown): Promise<T>
  abstract transactional<T>(callback: (tx: Transaction) => Promise<T>): Promise<T>
}