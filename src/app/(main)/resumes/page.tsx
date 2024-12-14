import { currentUser } from "@clerk/nextjs/server";

export default async function Page() {
  const user = await currentUser();
  return (
    <main>
      Here will be your resumes {user?.fullName?.toLocaleLowerCase() ?? ""}
    </main>
  );
}
