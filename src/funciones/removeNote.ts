import chalk from 'chalk';
import { accessSync, constants, readdirSync, rmdirSync, unlinkSync } from 'fs';

/**
 * Elimina una nota
 * @param user Escritor
 * @param title Título
 * @returns Mensaje con el resultado de la eliminación
 */
export function removeNote(user: string, title: string): string{
  try{    // Si la nota existe
      accessSync('notes/' + user + '/' + title + '.json', constants.R_OK | constants.W_OK);
      unlinkSync('notes/' + user + '/' + title + '.json');

      if(readdirSync('notes/' + user).length == 0){
        rmdirSync('notes/' + user);
      }

      if(readdirSync('notes').length == 0){
        rmdirSync('notes');
      }
      
      return chalk.green("Note removed!");
  } catch (err){
      return chalk.red("Note not found");
  }
}