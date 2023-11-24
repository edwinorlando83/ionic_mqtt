import { Component } from '@angular/core';


declare var mqtt: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private client: any;

  topic: any;
  mensaje:any;

  constructor() {
    //const brokerUrl = 'mqtt://test.mosquitto.org';
    const brokerUrl = 'wss://test.mosquitto.org:8081/mqtts'
    this.client = mqtt.connect(brokerUrl);

    this.client.on('connect', () => {
      console.log('Conectado al servidor MQTT');
      this.client.subscribe('DATOS');
    });

    this.client.on('message', (topic: string, message: any) => {
      this.topic= topic;
      this.mensaje = message;
      console.log(`Mensaje recibido en el tema ${topic}: ${message.toString()}`);
    });

    this.client.on('error', (error: Error) => {
      console.error('Error en el cliente MQTT:', error);
    });
  }

  publishMessage(message: string): void {
    this.client.publish('DATA', message);
  }

  disconnect(): void {
    if (this.client) {
      this.client.end();
      console.log('Desconectado del servidor MQTT');
    }
  }
}
