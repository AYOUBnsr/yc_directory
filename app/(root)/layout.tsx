import Nav from "../../components/Nav";
import React from "react";

export default function Layout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <main className="font-work-sans">
        <Nav />

        {children}
        </main>
    )
}