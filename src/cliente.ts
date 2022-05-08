import * as net from 'net';

type RequestType = {
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
export class cliente{
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
    public execute(): string{
        const client = new net.Socket();
        let output: string = "";
        client.connect({port: this.puerto}, () => {
            console.log('Conexión establecida con el servidor con puerto: ' + this.puerto);
            
            const json_command = JSON.stringify(this.comando);
            client.write(json_command);

            console.log('Enviando comando: ' + this.comando);
            
            client.on('data', function(chunk) {
                console.log(`Datos recibidos:\n${chunk.toString()}`);
                output = chunk.toString();
            });
        });
        return output;
    }
}