import { ConvexReactClient } from "convex/react";

const client = new ConvexReactClient(
  import.meta.env.VITE_CONVEX_URL || "http://localhost:3210"
);

export default client;
