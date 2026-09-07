import { Global, Module } from "@nestjs/common";
import { DatabaseConnection } from "./database-connection";
import { IDatabaseConnection } from "./database-connection.interface";

@Global()
@Module({
  providers: [
    {
      provide: IDatabaseConnection,
      useClass: DatabaseConnection
    },
  ],
  exports: [IDatabaseConnection]
})
export class PersistenceModule {}