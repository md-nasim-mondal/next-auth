import SignOutButton from "./components/signOutButton";

export default function Home() {
  return (
    <div>
      <div className="flex justify-center items-center min-h-screen flex-col">
        <h1 className="bg-purple-300 text-3xl font-bold p-4 rounded-md mb-6">This is the home page</h1>
        <SignOutButton/>
      </div>
   </div>
  );
}
