const dev = {
  STRIPE_KEY: "pk_test_y9HGkQIextdPxPdKJ8y0cvVd00YpseB17I",
  s3: {
    REGION: "eu-central-1",
    BUCKET: "numify-dev-attachmentsbucket-eaoukmgvhz47"
  },
  apiGateway: {
    REGION: "eu-central-1",
    URL: "https://api.numify.co/dev"
  },
  cognito: {
    REGION: "eu-central-1",
    USER_POOL_ID: "eu-central-1_ZlifrrWdR",
    APP_CLIENT_ID: "m0a89nksg6ejch59194l710tg",
    IDENTITY_POOL_ID: "eu-central-1:43b979b3-8871-45fc-8a59-8b9fc751b41f"
  }
};

const prod = {
  STRIPE_KEY: "pk_test_y9HGkQIextdPxPdKJ8y0cvVd00YpseB17I",
  s3: {
    REGION: "eu-central-1",
    BUCKET: "numify-prod-attachmentsbucket-1fqupxotx72lf"
  },
  apiGateway: {
    REGION: "eu-central-1",
    URL: "https://api.numify.co/prod"
  },
  cognito: {
    REGION: "eu-central-1",
    USER_POOL_ID: "eu-central-1_c8D3g4hxv",
    APP_CLIENT_ID: "7bsormil1soo7e1mpgkrpk4c64",
    IDENTITY_POOL_ID: "eu-central-1:58e6270f-f45b-4fe0-a876-a6546350d6c5"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === "prod" ? prod : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};
