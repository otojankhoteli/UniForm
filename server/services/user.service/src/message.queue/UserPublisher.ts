
import {Inject, Service} from 'typedi';
import {RoutingSettings, UserPublisherSettings} from './topology';
import {Publisher} from './Publisher';


@Service()
export class UserPublisher extends Publisher {
  constructor(
      @Inject('Rabbit') rabbitInstance,
          settings: RoutingSettings = UserPublisherSettings) {
    super(rabbitInstance, UserPublisherSettings);
  }
}
