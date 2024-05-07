import Discover from "./components/Discover/Discover";
import Image from "next/image";
import Navbar from "./components/Navbar/page"
import Tv from "./components/Tv/Tv";
import { useEffect, useState } from "react";
import Genres from "./components/Genres/Genres";

export default function Home() {

  return (
    <main>
      <Navbar />
      <Genres />
      <Discover />
      <Tv />
    </main>
  );
}
