import { Transport, ClientsModuleOptionsFactory, ClientProvider, RmqOptions } from '@nestjs/microservices';

export class RabbitMQConfig implements ClientsModuleOptionsFactory {
    createClientOptions(): RmqOptions {
        return {
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://localhost:5672'], // ganti dengan URL RabbitMQ di server produksi
            queue: 'bagman_queue', // Nama queue yang akan digunakan
            queueOptions: {
              durable: true,
            },
          },
        };
      }
  
}
