import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import pgPromise, { type IInitOptions, type IMain, type IDatabase } from "pg-promise";
import { IDatabaseConnection, type Transaction } from "./database-connection.interface";

@Injectable()
export class DatabaseConnection extends IDatabaseConnection implements OnModuleInit, OnModuleDestroy {
  private readonly pgp: IMain
  private readonly db: IDatabase<unknown>

  constructor() {
    super()
    const initOptions: IInitOptions = {}

    this.pgp = pgPromise(initOptions)

    this.db = this.pgp({
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME
    })
  }

  async onModuleInit(): Promise<void> {
    const connection = await this.db.connect()
    connection.done()
  }

  async onModuleDestroy(): Promise<void> {
    this.pgp.end()
  }

  async query<T>(query: string, values?: unknown): Promise<T> {
    return this.db.query(query, values)
  }

  async transactional<T>(callback: (tx: Transaction) => Promise<T>): Promise<T> {
    return this.db.tx(callback)
  }
}