import chalk from 'chalk';
import { accessSync, constants, writeFileSync, mkdirSync } from 'fs';

/**
 * Agrega una nota
 * @param user Escritor
 * @param title Título
 * @param color Color del texto
 * @param content Contenido de la nota
 * @returns Mensaje con el resultado de la inserción
 */
export function addNote(user: string, title: string, color: string, content: string): string{

  try{    // Si no existe notes/ lo crea
    accessSync('notes/', constants.R_OK | constants.W_OK);
  } catch (err){
    mkdirSync('notes/');
  }

  try {     // Si el usuario está registrado
    accessSync('notes/' + user, constants.R_OK | constants.W_OK);

    try{    // Si la nota existe
      accessSync('notes/' + user + '/' + title + '.json', constants.R_OK | constants.W_OK);
      return chalk.red("Note title taken!");
    } catch (err){
      writeFileSync('notes/' + user + '/' + title + '.json', JSON.stringify({title, content, color}, null, ' '));
      return chalk.green("New note added!");
    }

  } catch (err) { // Si el usuario NO está registrado

    mkdirSync('notes/' + user);
    writeFileSync('notes/' + user + '/' + title + '.json', JSON.stringify({title, content, color}, null, ' '));
    return chalk.green("New note added!");
  }
}