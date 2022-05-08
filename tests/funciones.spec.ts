import 'mocha';
import { expect } from 'chai';
import { addNote } from '../src/funciones/addNote';
import { readNote } from '../src/funciones/readNote';
import { listNotes } from '../src/funciones/listNotes';
import { removeNote } from '../src/funciones/removeNote';
import { modifyNote } from '../src/funciones/modifyNote';
import chalk from 'chalk';

describe("Tests de la función addNote()", () => {
    it('Añade una nota si el usuario no está registrado', () => {
        expect(addNote("edusegre","Red note","red","This is a red note")).to.be.eql(chalk.green("New note added!"));
        removeNote("edusegre","Red note");
    });

    it('No añade una nota si el título de esta ya existe', () => {
        addNote("edusegre","Red note","red","This is a red note")
        expect(addNote("edusegre","Red note","red","This is a second red note")).to.be.eql(chalk.red("Note title taken!"));
        removeNote("edusegre","Red note");
    });

    it('Añade una nota si el usuario está registrado', () => {
        expect(addNote("edusegre","Yellow note","yellow","This is a yellow note")).to.be.eql(chalk.green("New note added!"));
        removeNote("edusegre","Yellow note");
    });
})

describe("Tests de la función readNote()", () => {
    it('Lee una nota existente', () => {
        addNote("edusegre","Black note","black","This is a black note");
        addNote("edusegre","Red note","red","This is a red note");
        addNote("edusegre","Green note","green","This is a green note");
        addNote("edusegre","Yellow note","yellow","This is a yellow note");
        addNote("edusegre","Blue note","blue","This is a blue note");
        addNote("edusegre","Magenta note","magenta","This is a magenta note");
        addNote("edusegre","Cyan note","cyan","This is a cyan note");
        addNote("edusegre","White note","white","This is a white note");
        addNote("edusegre","Uncolored note","undefined","This is an uncolored note");
        expect(readNote("edusegre","Black note")).to.be.eql("Black note\n" + chalk.black("This is a black note"));
        expect(readNote("edusegre","Red note")).to.be.eql("Red note\n" + chalk.red("This is a red note"));
        expect(readNote("edusegre","Green note")).to.be.eql("Green note\n" + chalk.green("This is a green note"));
        expect(readNote("edusegre","Yellow note")).to.be.eql("Yellow note\n" + chalk.yellow("This is a yellow note"));
        expect(readNote("edusegre","Blue note")).to.be.eql("Blue note\n" + chalk.blue("This is a blue note"));
        expect(readNote("edusegre","Magenta note")).to.be.eql("Magenta note\n" + chalk.magenta("This is a magenta note"));
        expect(readNote("edusegre","Cyan note")).to.be.eql("Cyan note\n" + chalk.cyan("This is a cyan note"));
        expect(readNote("edusegre","White note")).to.be.eql("White note\n" + chalk.white("This is a white note"));
        expect(readNote("edusegre","Uncolored note")).to.be.eql("Uncolored note\n" + "This is an uncolored note");
        removeNote("edusegre","Black note");
        removeNote("edusegre","Red note");
        removeNote("edusegre","Green note");
        removeNote("edusegre","Yellow note");
        removeNote("edusegre","Blue note");
        removeNote("edusegre","Magenta note");
        removeNote("edusegre","Cyan note");
        removeNote("edusegre","White note");
        removeNote("edusegre","Uncolored note");
    });
    
    it('No lee una nota inexistente', () => {
        expect(readNote("edusegre","Red note")).to.be.eql(chalk.red("Note not found"));
    });
})

describe("Tests de la función removeNote()", () => {
    it('Elimina una nota existente', () => {
        addNote("edusegre","Red note","red","This is a red note");
        expect(removeNote("edusegre","Red note")).to.be.eql(chalk.green("Note removed!"));
    });
    
    it('No elimina una nota inexistente', () => {
        expect(removeNote("edusegre","Red note")).to.be.eql(chalk.red("Note not found"));
    });
})

describe("Tests de la función listNotes()", () => {
    it('Lista las notas de un usuario existente', () => {
        addNote("edusegre","Red note","red","This is a red note");
        addNote("edusegre","Yellow note","yellow","This is a yellow note");
        expect(listNotes("edusegre")).to.be.equal("Your notes\nRed note\nYellow note\n");
        removeNote("edusegre","Red note");
        removeNote("edusegre","Yellow note");
    });
    
    it('No lista las notas de un usuario inexistente', () => {
        expect(listNotes("edusegre")).to.be.equal(chalk.red("User not found"));
    });
})

describe("Tests de la función modifyNote()", () => {
    it('Modifica una nota existente', () => {
        addNote("edusegre","Red note","red","This is a red note");
        expect(modifyNote("edusegre","Red note","red","This is a red note modified")).to.be.eql(chalk.green("Note modified!"));
        removeNote("edusegre","Red note");
    });
    
    it('No modifica una nota existente', () => {
        expect(modifyNote("edusegre","Red note","red","This is a red note modified")).to.be.eql(chalk.red("Note not found"));
    });
})