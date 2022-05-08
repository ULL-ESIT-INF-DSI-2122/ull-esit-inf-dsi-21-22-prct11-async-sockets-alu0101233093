import yargs from 'yargs';
import { cliente } from './cliente';

let c: cliente = new cliente(60300,"",{command:'addNote'});

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