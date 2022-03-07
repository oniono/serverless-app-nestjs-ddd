import {
  Command,
  CommandProps,
} from '@src/libs/ddd/domain/base-classes/command.base';
import { UUID } from '@src/libs/ddd/domain/value-objects/uuid.value-object';

export class CreateStickerCommand extends Command {
  constructor(props: CommandProps<CreateStickerCommand>) {
    super(props);
    this.freqDashboardId = props.freqDashboardId;
    this.userId = props.userId;
    this.missionStickerCount = props.missionStickerCount;
    this.normalStickerCount = props.normalStickerCount;
  }

  readonly freqDashboardId: string;

  readonly userId: string;

  readonly missionStickerCount: number;

  readonly normalStickerCount: number;
}
