import {RoutingSettings} from './topology';

export abstract class Publisher {
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

  publish(msg: any) {
    return this.rabbitInstance.publish(
        this.exchange,
        {
          routingKey: this.routingKey,
          type: this.type,
          body: msg,
        },
    );
  }
}
