import dotenv from "dotenv";

const isProduction = process.env.NODE_ENV === "production";

if (!isProduction) {
    const envFound = dotenv.config();
    console.log(envFound)
    if (envFound.error) {
      throw new Error("⚠️  Couldn't find .env file  ⚠️");
    }
}
  
export default {
    MONGO_URI: process.env.MONGO_URI!,
    IPV4URL: "http://192.168.1.79:3000",
    PORT: process.env.PORT || 5000,
    CLIENT_URL: "http://localhost:3000",
    SALT_ROUNDS: 10,
    SESSION_SECRET: process.env.SESSION_SECRET!,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET!
}