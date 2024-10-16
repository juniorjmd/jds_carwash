export class CustomConsole {
    private static environment: string;
  
    public static setEnvironment(env: string = 'produccion'): void {
      CustomConsole.environment = env;
    }
  
    public static log(message?: any, ...optionalParams: any[]): void {
      if (CustomConsole.environment === 'dev') {
        console.log(message, ...optionalParams);
      }
    }
  
    public static error(message?: any, ...optionalParams: any[]): void {
      console.error(message, ...optionalParams);
    }
  
    public static warn(message?: any, ...optionalParams: any[]): void {
      console.warn(message, ...optionalParams);
    }
  
    public static info(message?: any, ...optionalParams: any[]): void {
      console.info(message, ...optionalParams);
    }
   
  }
  