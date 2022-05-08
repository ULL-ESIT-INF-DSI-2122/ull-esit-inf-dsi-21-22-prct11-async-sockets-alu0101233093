import * as net from 'net';
import { addNote } from './funciones/addNote';
import { listNotes } from './funciones/listNotes';
import { modifyNote } from './funciones/modifyNote';
import { readNote } from './funciones/readNote';
import { removeNote } from './funciones/removeNote';

/**
 * @class Servidor
 * @description Permite crear un servidor y conexiones con clientes mediante sockets
 */
class Servidor{
  /**
   * Constructor de la clase servidor
   * @param puerto Puerto de conexión del servidor
   */
  constructor(private puerto: number){}

  /**
   * @description Método para iniciar el servidor
   */
  start(){
    net.createServer({allowHalfOpen:true}, (connection) => {
      connection.allowHalfOpen = true;
      console.log('Un cliente se ha conectado.');
    
      connection.write(`Conexión establecida.\n`);
    
      connection.on('close', () => {
        console.log('Un cliente se ha desconectado.');
      });
    
      connection.on('data', (command) => {
        const message = JSON.parse(command.toString())
        console.log('Ejecutando comando: ' + message.command + " " + message.user + " " + message.title + " " + message.color + " " + message.body);
    
        switch(message.command){
            case 'addNote':
                if(typeof message.user === 'string' && typeof message.title === 'string' && typeof message.color === 'string' && typeof message.body === 'string')
                    connection.write(addNote(message.user, message.title, message.color, message.body));
                break;
            case 'listNotes':
                if(typeof message.user === 'string')
                    connection.write(listNotes(message.user));
                break;
            case 'modifyNote':
                if(typeof message.user === 'string' && typeof message.title === 'string' && typeof message.color === 'string' && typeof message.body === 'string')
                    connection.write(modifyNote(message.user, message.title, message.color, message.body));
                break;
            case 'readNote':
                if(typeof message.user === 'string' && typeof message.title === 'string')
                    connection.write(readNote(message.user, message.title));
                break;
            case 'removeNote':
                if(typeof message.user === 'string' && typeof message.title === 'string')
                    connection.write(removeNote(message.user, message.title));
                break;
            default: console.log('El comando introducido no existe.');
        }

        connection.end();
      });
      
    }).listen(this.puerto, () => {
      console.log('Esperando clientes...');
    });
  }
}

let s: Servidor = new Servidor(60300);
s.start();