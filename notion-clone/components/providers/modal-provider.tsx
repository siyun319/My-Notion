"use client";

import {useEffect, useState} from "react";

import { SettingsModal } from "@/components/modals/settings-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    // now it won't render on the server set
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }
    return (
        <>
            <SettingsModal />
        </>
    )
}
