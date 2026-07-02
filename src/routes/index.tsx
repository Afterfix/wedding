import { createFileRoute } from "@tanstack/react-router";
import Invitation from "@/components/invitation";

export const Route = createFileRoute("/")({
    component: Invitation,
    head: () => ({
        meta: [
            { title: "Anas & Neha — 11 July 2026" },
            { name: "description", content: "A luxury digital wedding invitation for Muhammed Anas & Khadeeja Neha." },
        ],
    }),
});
