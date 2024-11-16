import { Charts } from "@/components/Charts";
import { isAuth } from "@/components/isAuth";
import { Table } from "@/components/Table";

export default async function Home() {
  return (await isAuth()) ? (
    <div className="">
      <Charts />
      <Table />
    </div>
  ) : (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <p>Veuilez vous connecter pour utiliser l&apos;application</p>
    </div>
  );
}
