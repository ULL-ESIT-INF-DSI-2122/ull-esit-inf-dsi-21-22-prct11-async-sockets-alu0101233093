import yargs from 'yargs';
import * as net from 'net';

export type RequestType = {
    command: 'addNote' | 'listNotes' | 'modifyNote' | 'readNote' | 'removeNote';
    user?: string;
    title?: string;
    body?: string;
    color?: string;
  }

/**
 * @class cliente
 * @description permite crear un socket cliente
 */
class cliente{
    /**
     * Constructor de la clase cliente
     * @param puerto Puerto al que se desea conectar
     * @param comando Comando que se desea ejecutar
     */
    constructor(private puerto: number, private username: string, private comando: RequestType){}

    public setUsername(name: string){
        this.username = name;
    }

    /**
     * Función setter para definir el comando
     * @param comando comando
     */
    public setCommand(comando: string[]){
        if(comando.length < 2){
            console.log("Se necesitan más argumentos");
            return;
        }

        switch(comando[0]){
            case 'addNote':
                this.comando.command = 'addNote';
                this.comando.user = this.username;
                this.comando.title = comando[1];
                this.comando.color = comando[2];
                this.comando.body = comando[3];
                break;
            case 'listNotes':
                this.comando.command = 'listNotes';
                this.comando.user = this.username;
                break;
            case 'modifyNote':
                this.comando.command = 'addNote';
                this.comando.user = this.username;
                this.comando.title = comando[1];
                this.comando.color = comando[2];
                this.comando.body = comando[3];
                break;
            case 'readNote':
                this.comando.command = 'readNote';
                this.comando.user = this.username;
                this.comando.title = comando[1];
                break;
            case 'removeNote':
                this.comando.command = 'removeNote';
                this.comando.user = this.username;
                this.comando.title = comando[1];
                break;
            default: console.log('El comando introducido no existe.');
        }
    }

    /**
     * Función para mandar comando al servidor
     */
    public execute(){
        if(this.username == "" || typeof this.comando.title === 'undefined'){
            const client = new net.Socket();
            client.connect({port: this.puerto}, () => {
                console.log('Conexión establecida con el servidor con puerto: ' + this.puerto);
                
                const json_command = JSON.stringify(this.comando);
                client.write(json_command);
        
                console.log('Enviando comando: ' + this.comando);
                
                client.on('data', function(chunk) {
                    console.log(`Datos recibidos:\n${chunk.toString()}`)
                });
            });
        } 
        
        if(this.username == "")
            console.log("Debe indicar un nombre de usuario para conectar con el servidor.");

        if(typeof this.comando.title === 'undefined')
            console.log("Debe indicar un nombre de usuario para conectar con el servidor.");
    }
}


let c: cliente = new cliente(60300,"",{command:'addNote'});
c.execute();

yargs.command({
    command: 'add',
    describe: 'add a note',
    builder: {
      user: {
        describe: 'name of the user',
        demandOption: true,
        type: 'string',
      },
      title: {
        describe: 'title of the note',
        demandOption: true,
        type: 'string',
      },
      body: {
        describe: 'color of the note',
        demandOption: true,
        type: 'string',
      },
      color: {
        describe: 'color of the note',
        demandOption: true,
        type: 'string',
      }
    },
    handler(argv) {
        if(typeof argv.user === 'string' && typeof argv.title === 'string' && typeof argv.color === 'string' && typeof argv.body === 'string'){
            c.setUsername(argv.user);
            c.setCommand(["addNote", argv.title, argv.color, argv.body]);
            c.execute();
        }
    }
});

yargs.command({
  command: 'modify',
  describe: 'modify a note',
  builder: {
    user: {
      describe: 'name of the user',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'title of the note',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'color of the note',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'color of the note',
      demandOption: true,
      type: 'string',
    }
  },
  handler(argv) {
    if(typeof argv.user === 'string' && typeof argv.title === 'string' && typeof argv.color === 'string' && typeof argv.body === 'string'){
        c.setUsername(argv.user);
        c.setCommand(["modifyNote", argv.user, argv.title, argv.color, argv.body]);
        c.execute();
    }
  }
});

yargs.command({
  command: 'read',
  describe: 'read a note',
  builder: {
    user: {
      describe: 'name of the user',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'title of the note',
      demandOption: true,
      type: 'string',
    }
  },
  handler(argv) {
    if(typeof argv.user === 'string' && typeof argv.title === 'string'){
        c.setUsername(argv.user);
        c.setCommand(["readNote", argv.user, argv.title]);
        c.execute();
    }
  }
});

yargs.command({
  command: 'remove',
  describe: 'remove a note',
  builder: {
    user: {
      describe: 'name of the user',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'title of the note',
      demandOption: true,
      type: 'string',
    }
  },
  handler(argv) {
    if(typeof argv.user === 'string' && typeof argv.title === 'string'){
        c.setUsername(argv.user);
        c.setCommand(["removeNote", argv.user, argv.title]);
        c.execute();
    }
  }
});

yargs.command({
  command: 'list',
  describe: 'list notes of an user',
  builder: {
    user: {
      describe: 'name of the user',
      demandOption: true,
      type: 'string',
    }
  },
  handler(argv) {
    if(typeof argv.user === 'string'){
        c.setUsername(argv.user);
        c.setCommand(["listNotes", argv.user]);
        c.execute();
    }
  }
});