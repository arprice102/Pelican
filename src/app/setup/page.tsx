"use client"

import { useRouter } from "next/navigation";

export default function SetUpPage() {
    const router = useRouter();
    router.replace('/setup/intro');
}