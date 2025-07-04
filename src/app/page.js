"use client";
import React from "react";
import UserList from "../components/UserList";

export default function Home() {
  return (
    <div className="grid grid-rows-[1fr] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-1 items-center sm:items-start w-full">
        <UserList />
      </main>
    </div>
  );
}
