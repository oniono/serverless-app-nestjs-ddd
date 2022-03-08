import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';

export abstract class TypeormEntityBase {
  constructor(props?: unknown) {
    if (props) {
      Object.assign(this, props);
    }
  }

  @PrimaryColumn({ update: false })
  id: string;

  @CreateDateColumn({
    // type: 'timestamptz', for Postgres
    type: 'timestamp', // for mysql
    update: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    // type: 'timestamptz', for Postgres
    type: 'timestamp', // for mysql
  })
  updatedAt: Date;
}
