import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  @Index()
  email: string;

  @Column({ type: 'varchar', length: 100, select: false })
  password: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  name: string;

  // TODO
  // will be added later
  // @Column({ type: 'varchar', unique: true, nullable: true })
  // googleId?: string | null;

  // @Column({ type: 'varchar', unique: true, nullable: true })
  // @Index()
  // web3Address?: string | null;
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
