import chalk from 'chalk';
import { accessSync, constants, writeFileSync } from 'fs';

/**
 * Modifica el contenido de una nota ya creada
 * @param user Escritor
 * @param title Título
 * @param color Color del texto
 * @param content Contenido de la nota
 * @returns Mensaje con el resultado de la modificación
 */
export function modifyNote(user: string, title: string, color: string, content: string): string{
  try {     // Si existe la nota
    accessSync('notes/' + user + '/' + title + '.json', constants.R_OK | constants.W_OK);

    writeFileSync('notes/' + user + '/' + title + '.json', JSON.stringify({title, content, color}, null, ' '));
    return chalk.green("Note modified!");

  } catch (err) { // Si NO existe la nota
    return chalk.red("Note not found");
  }
}