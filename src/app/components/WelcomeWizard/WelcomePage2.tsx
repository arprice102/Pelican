"use client"

import React, { useEffect } from 'react';
import { atom, useAtom } from "jotai";
import { welcomeWizardNextDisableAtom } from "@/app/state/welcomeWizardNextDisable";
import { placesAtom } from '@/app/state/placesAtom';
import addPlace from '@/app/library/addPlace';
import SearchBox from '@/app/components/SearchBox';
import PlacePreview, { PlacePreviewProps } from '@/app/components/PlacePreview';
import { Place } from '@/app/components/PelicanApp';

const previewAtom = atom<PlacePreviewProps>({
    place: undefined,
    status: "Select place"
})

export default function WelcomePage2() {
    const [nextDisable, setNextDisable] = useAtom(welcomeWizardNextDisableAtom);
    const [places, setPlaces] = useAtom(placesAtom);
    const [preview, setPreview] = useAtom(previewAtom);

    useEffect(() => {
        // Restore disable flag to false (in case user breaks wizard sequence)
        setNextDisable(false);
    })

    function handleSearchSuggestion(suggestion: Place) {
        let placeMatchFlag = false;

        // Clone preview object to avoid mutation
        let newPreview: PlacePreviewProps = structuredClone(preview) as PlacePreviewProps;

        for (const storedPlace of places) {
            if (suggestion === storedPlace) {
                placeMatchFlag = true;
            }
        }

        // If placed already found in places array change preview contents
        if (placeMatchFlag) {
            newPreview.status = "This place has already been added!";
        } else {
            newPreview.status = "Add this place?";
            setNextDisable(false);
        }

        // Either way set preview place to match selected suggestion for display
        newPreview.place = suggestion;

        // Update atom to trigger rerender
        setPreview(newPreview);

        // Add place to places array once user confirms choice
        //addPlace(suggestion, places, setPlaces);
    }

    return (
        <>
            <div className="setup__content-main">
                <h1>Step 1 - Where is your home located?</h1>

                <SearchBox onChange={handleSearchSuggestion} />

                <PlacePreview place={preview.place} status={preview.status} />
            </div>

            <div className="setup__content-tooltip">
                <h3>Tooltip</h3>
                <p>Pelican needs to know the approximate location of your home so it can look up local weather conditions essential for making humidity calculations.</p>
            </div>
        </>
    )
}