import { PrismaClient } from "@propayn/db/client";


const client = new PrismaClient();

export default function Home() {
  return (
    <div className="font-extrabold">
      hello
    </div>
  );
}
