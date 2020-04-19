import {config} from '../config';


interface RoutingSettings {
  exchange: string
  routingKey: string
  type: string
  queue?: string
}

const UserPublisherSettings: RoutingSettings = {
  exchange: 'user',
  routingKey: 'newUser',
  type: 'user.add',
  queue: 'user-q',
};


const settings = {
  connection: {
    user: config.rabbitmq.user,
    pass: config.rabbitmq.pass,
    server: config.rabbitmq.url,
    port: config.rabbitmq.port,
  },
  exchanges: [
    {name: 'user', type: 'direct', durable: true},
  ],
  queues: [
    {name: 'user-q', durable: true, subscribe: true},
  ],
  bindings: [{
    exchange: 'user',
    target: 'user-q',
    keys: ['newUser'],
  }],
};

export {settings, RoutingSettings, UserPublisherSettings};
