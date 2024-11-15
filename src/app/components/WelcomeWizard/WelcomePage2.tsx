"use client"

import React from 'react';
import { atom, useAtom } from "jotai";
import SearchBox from '@/app/components/SearchBox';
import { Place } from '@/app/components/PelicanApp';

const placeAtom = atom<undefined | Place>(undefined);

export default function WelcomePage2() {
    const [place, setPlace] = useAtom(placeAtom);

    return (
        <div>
            <h1>Step 1 - Where is your home located?</h1>

            <SearchBox />

            <p>Pelican needs to know the approximate location of your home so it can look up local weather conditions essential for making humidity calculations.</p>
        </div>
    )
}