import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
  <div className="flex flex-col items-center justify-center h-full">
    <header>
      <h1 className="text-6xl mb-11 text-center">What will you do?</h1>
      <h3 className="text-center text-sm">Discover how your choices can affect evidence admissibility.</h3>
    </header>
    <Link href={"/quiz"}>
      <Button className="mt-24">Take the quiz</Button>
    </Link>
  </div>
  )
}