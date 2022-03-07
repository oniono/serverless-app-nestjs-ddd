import { ArgumentOutOfRangeException } from '@libs/exceptions';
import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { Result } from '@src/libs/ddd/domain/utils/result.util';
import { StickerNotEnoughBalanceError } from '../../errors/dashboard.errors';
import { Summary } from '../value-objects/summary.value-object';

// Properties that are needed for a e-frequency dashboard creation
export interface CreateDashboardProps {
  userId: string;
}

// All properties that a e-frequency dashboard has
export interface DashboardProps extends CreateDashboardProps {
  balance: number;
  summary: Summary;
}

export interface UpdateDashboardProps {
  missionStickerCount: number,
  normalStickerCount: number
}

export class DashboardEntity extends AggregateRoot<DashboardProps> {
  protected readonly _id: UUID;

  static create(create: CreateDashboardProps): DashboardEntity {
    const id = UUID.generate();
    const props: DashboardProps = { 
      ...create, 
      balance: 0, 
      summary: new Summary ({
        freqCompletedPanCount: 0,
        totalNormalStickerCount: 0,
        totalMissionStickerCount: 0
      })};

    const dahsboard = new DashboardEntity({ id, props });

    return dahsboard;
  }

  update(update: UpdateDashboardProps): void {
    this.props.summary = this.props.summary.update(update);
  };


  sendgift(deduct: UpdateDashboardProps): void {
    this.props.summary = this.props.summary.withdraw(deduct);
  }

  // deposit(amount: number): void {
  //   this.props.balance += amount;
  // }

  /**
   * Protects e-frequency invariant.
   * This method is executed by a repository
   * before saving entity in a database.
   */
  public validate(): void {
    if (this.props.balance < 0) {
      throw new ArgumentOutOfRangeException(
        'Wallet balance cannot be less than 0',
      );
    }
  }
}
