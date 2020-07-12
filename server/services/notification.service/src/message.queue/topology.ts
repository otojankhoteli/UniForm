import {config} from '../config';


interface RoutingSettings {
  exchange: string
  routingKey: string
  type: string
  queue?: string
}

const NotificationPublisherSettings: RoutingSettings = {
  exchange: 'notification',
  routingKey: 'newNotification',
  type: 'notification.add',
  queue: 'notification-q',
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
    {name: 'notification', type: 'direct', durable: true},
  ],
  queues: [
    {name: 'user-q', durable: true, subscribe: true},
    {name: 'notification-q', durable: true, subscribe: true},
  ],
  bindings: [
    {exchange: 'user', target: 'user-q', keys: ['newUser']},
    {exchange: 'notification', target: 'notification-q', keys: ['newNotification']},
  ],
};
export {settings, RoutingSettings, NotificationPublisherSettings};
