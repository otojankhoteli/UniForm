import {RoutingSettings} from './topology';

export interface Publish {
  publish(msg: any)
}


export class Publisher implements Publish {
  private readonly routingKey;
  private readonly type;
  private readonly exchange;
  private readonly rabbitInstance;

  protected constructor(
      rabbitInstance,
      settings: RoutingSettings) {
    this.routingKey = settings.routingKey;
    this.type = settings.type;
    this.exchange = settings.exchange;
    this.rabbitInstance = rabbitInstance;
  }

  publish({msg, type}) {
    return this.rabbitInstance.publish(
        this.exchange,
        {
          routingKey: this.routingKey,
          type: type || this.type,
          body: msg,
        },
    );
  }
}
