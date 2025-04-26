import ICommand from '../../domain/contracts/interfaces/command.interface.js';

interface IFactory {
  create: () => ICommand;
}

export default IFactory;
