import chalk from 'chalk';
import { accessSync, constants, readdirSync } from 'fs';

/**
 * Lista las notas de un escritor
 * @param user Escritor
 * @returns Lista de notas o mensaje de error
 */
export function listNotes(user: string): string{ 
    try {     // Si el usuario

      accessSync('notes/' + user , constants.R_OK | constants.W_OK);
      let notes: string[] = readdirSync('notes/' + user);
      let result: string;

      result = "Your notes\n";
      notes.forEach(n => result += n.slice(0,n.indexOf('.')) + '\n');
      return result;

    } catch (err) { // Si el usuario no
      return chalk.red("User not found");
    }
}