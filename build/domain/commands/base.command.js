import { EventEmitter } from 'events';
class BaseCommand {
    constructor() {
        Object.assign(this, EventEmitter.prototype);
    }
    on(eventName, listener) {
        throw new Error('Method not implemented.');
    }
    emit(event, data) {
        throw new Error('Method not implemented.');
    }
    execute(args) {
        throw new Error('Method not implemented.');
    }
}
export default BaseCommand;
