import { EventEmitter } from 'events';
import ICommand from '../contracts/interfaces/command.interface.js';

class BaseCommand implements ICommand {
  constructor() {
    Object.assign(this, EventEmitter.prototype);
  }

  on(eventName: string | symbol, listener: (...args: any[]) => void): this {
    throw new Error('Method not implemented.');
  }

  emit(event: string, data: any): void {
    throw new Error('Method not implemented.');
  }

  execute(args: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
}

export default BaseCommand;
