interface ICommand {
  execute(args: Record<string, any>): Promise<any>;
  emit(event: string, data: Record<string, any>): void;
}

export default ICommand;
