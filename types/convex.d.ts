declare module "convex/schema" {
  export const defineTable: any;
  export const v: any;
}

declare module "convex/values" {
  export const defineTable: any;
  export const v: any;
}

declare module "convex/react" {
  export class ConvexReactClient {
    constructor(url?: string);
  }
  export const ConvexProvider: any;
  export const useMutation: any;
  export const useQuery: any;
}
