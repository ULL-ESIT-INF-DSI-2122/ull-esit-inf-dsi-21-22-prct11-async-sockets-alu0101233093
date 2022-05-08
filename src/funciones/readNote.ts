import { accessSync, constants, readFileSync } from 'fs';
import chalk from 'chalk';

/**
 * Colorea un texto
 * @param text Texto a colorear
 * @param color Color
 * @returns Texto coloreado
 */
function printColor(text: string, color: string): string{
    color = color[0].toUpperCase() + color.slice(1).toLowerCase();
    switch(color){
        case 'Black': return chalk.black(text);
        case 'Red': return chalk.red(text);
        case 'Green': return chalk.green(text);
        case 'Yellow': return chalk.yellow(text);
        case 'Blue': return chalk.blue(text);
        case 'Magenta': return chalk.magenta(text);
        case 'Cyan': return chalk.cyan(text);
        case 'White': return chalk.white(text);
        default: return text;
    }
}

/**
 * Lee el contenido de una nota
 * @param user Escritor de la nota
 * @param title Título de la nota
 * @returns Título y contenido de la nota o mensaje de error en caso de que no se encuentre.
 */
export function readNote(user: string, title: string): string{ 
    try {     // Si la nota existe

      accessSync('notes/' + user + '/' + title + '.json', constants.R_OK | constants.W_OK);
      let data: string = readFileSync('notes/' + user + '/' + title + '.json').toString();  // Carga los datos

      // Imprime los datos
      return JSON.parse(data).title + '\n' + printColor(JSON.parse(data).content,JSON.parse(data).color)

    } catch (err) { // Si la nota no existe
      return chalk.red("Note not found");
    }
}