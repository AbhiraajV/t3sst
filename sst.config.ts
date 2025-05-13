// sst.config.ts
const config = {
  config(_input: any) {
    // Dynamically import SSTConfig type if needed:
    // const { SSTConfig } = await import("sst");
    return {
      name: "project-management",
      region: "us-east-1",
    };
  },

  stacks(app: any) {
    app.stack(async ({ stack }: any) => {
      // Dynamic import of NextjsSite construct
      const { NextjsSite } = await import("sst/constructs");

      const site = new NextjsSite(stack, "site", {
        path: ".",  
        environment: {
          DATABASE_URL: process.env.DATABASE_URL!,
          SUPABASE_URL: process.env.SUPABASE_URL!,
          SUPABASE_KEY: process.env.SUPABASE_KEY!,
        },
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
};

export default config;
