export class DeleteStickerCommand {
  constructor(props: DeleteStickerCommand) {
    this.stickerId = props.stickerId;
  }

  readonly stickerId: string;
}
