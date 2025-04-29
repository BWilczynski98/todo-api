import { Methods } from "../Router.ts";

export function isMethod(method: any): method is Methods {
    return typeof method === 'string' && Object.values(Methods).includes(method as Methods);
  }
  