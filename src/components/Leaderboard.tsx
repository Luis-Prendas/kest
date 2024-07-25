import { CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Leaderboard({ setShowLeaderboard }: { setShowLeaderboard: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  const fetchLeaderboard = async () => {
    const { data, error } = await supabase
      .from('Leaderboard')
      .select('*')
      .order('points', { ascending: false });

    if (error) console.error('Error fetching leaderboard:', error);
    else setEntries(data || []);
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <section className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center backdrop-blur bg-black/40 z-50">
      <main className=" bg-slate-950 border border-slate-800 relative">
        <button className="absolute -top-10 -right-4" onClick={() => setShowLeaderboard(false)}><CircleX className="w-8 h-8" /></button>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Puntuación
              </th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {entry.name}
                </th>
                <td className="px-6 py-4 text-center">
                  {entry.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </section>
  )
}