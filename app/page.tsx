import { Charts } from "@/components/Charts";
import { isAuth } from "@/components/isAuth";
import { Table } from "@/components/Table";

export default async function Home() {
  return (await isAuth()) ? (
    <div>
      <Charts />
      <Table />
    </div>
  ) : (
    <div className="flex flex-1 items-center justify-center">
      <p>Veuillez vous connecter pour utiliser l&apos;application</p>
    </div>
  );
}
