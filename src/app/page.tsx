import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import SignOutButton from "./components/SignOutButton";

export default async function Home() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/login")
  }
  return (
    <div>
      <div className="flex justify-center items-center min-h-screen flex-col">
        <h1 className="bg-purple-300 text-3xl font-bold p-4 rounded-md mb-6">This is the home page</h1>
        <p>{JSON.stringify(session)}</p>
        <SignOutButton/>
      </div>
   </div>
  );
}
