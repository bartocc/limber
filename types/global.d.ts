// Types for compiled templates
declare module 'limber/templates/*' {
  import type { TemplateFactory } from 'htmlbars-inline-precompile';
  const tmpl: TemplateFactory;
  export default tmpl;
}

type LazyTrackedArgs = {
  positional?: Array<unknown>;
  named?: Record<string, unknown>;
}

declare module 'split-grid';

declare module 'ember-could-get-used-to-this' {
  type FunctionModifier<Args extends LazyTrackedArgs> = ((element: HTMLElement, args: Args['positional']) => () => void) | ((element: HTMLElement, args: Args['positional']) => void);

  export const use: PropertyDecorator;
  export const modifier: <Args extends LazyTrackedArgs>(
    callback: FunctionModifier<Args>
  ) => void;
  export class Resource<Args extends LazyTrackedArgs> {
    protected args: Args;

    // This is a lie, but makes the call site nice
    constructor(fn: () => Args['positional'] | Args);
  }
}

declare module '@ember/template-compilation' {
  export interface CompileOptions {
    moduleName: string;
    strictMode: boolean;
    locals: Array<unknown>;
    isProduction: boolean;
    meta: Record<string, unknown>;
    plugins: {
      ast: Array<unknown>
    }
  }
  export function compileTemplate(template: string, options: CompileOptions): any;
}
