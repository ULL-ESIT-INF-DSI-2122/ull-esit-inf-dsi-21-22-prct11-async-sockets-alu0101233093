import yargs from 'yargs';
import * as net from 'net';

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
    constructor(private puerto: number, private comando: string[] = []){}

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
                this.comando = comando;
                break;
            case 'listNotes':
                this.comando = [comando[0],comando[1],"","",""];
                break;
            case 'modifyNote':
                this.comando = comando;
                break;
            case 'readNote':
                this.comando = [comando[0],comando[1],comando[2],"",""];
                break;
            case 'removeNote':
                this.comando = [comando[0],comando[1],comando[2],"",""];
                break;
            default: console.log('El comando introducido no existe.');
        }
    }

    /**
     * Función para mandar comando al servidor
     */
    public execute(){
        if(process.argv.length > 2){
            const client = new net.Socket();
            
            client.connect({port: this.puerto}, () => {
                console.log('Conexión establecida con el servidor con puerto: ' + this.puerto);
                
                const json_command = JSON.stringify({command: this.comando[0], user: this.comando[1], title: this.comando[2], color: this.comando[3], body: this.comando[4]});
                client.write(json_command);
        
                console.log('Enviando comando: ' + this.comando.join(" "));
                
                client.on('data', function(chunk) {
                    console.log(`Datos recibidos:\n${chunk.toString()}`)
                });
            });
        
        } else
            console.log("Debe indicar un comando para realizar en el servidor.");
    }
}

let c: cliente = new cliente(60300);

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
            c.setCommand(["addNote", argv.user, argv.title, argv.color, argv.body]);
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
        c.setCommand(["listNotes", argv.user]);
        c.execute();
    }
  }
});

yargs.parse();