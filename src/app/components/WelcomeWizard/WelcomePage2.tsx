"use client"

import React, { useEffect } from 'react';
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { welcomeWizardMemoryAtom } from '@/app/state/welcomeWizardMemoryAtom';
import { welcomeWizardNextDisableAtom } from "@/app/state/welcomeWizardNextDisableAtom";
import { placesAtom } from '@/app/state/placesAtom';
import addPlace from '@/app/library/addPlace';
import SearchBox from '@/app/components/SearchBox';
import PlacePreview, { PlacePreviewProps } from '@/app/components/PlacePreview';
import { Place } from '@/app/components/PelicanApp';
import { WelcomeWizardMemory } from '@/app/state/welcomeWizardMemoryAtom';

const previewAtom = atom<PlacePreviewProps>({
    place: undefined,
    status: "Select place"
})

export default function WelcomePage2() {
    const setNextDisable = useSetAtom(welcomeWizardNextDisableAtom);
    const [wizardMemory, setWizardMemory] = useAtom(welcomeWizardMemoryAtom);
    const places = useAtomValue(placesAtom);
    const [preview, setPreview] = useAtom(previewAtom);

    useEffect(() => {
        // Default to disable next button if no place stored in wizard memory
        if(wizardMemory.place) {
            setNextDisable(false);
        } else {
            setNextDisable(true);
        }
    }, []);

    // Updates location in wizard memory without mutating original object
    function updatePlaceInWizardMemory(place: Place) {
        let newMemory: WelcomeWizardMemory = structuredClone(wizardMemory) as WelcomeWizardMemory;
        newMemory.place = place;
        setWizardMemory(newMemory);
    }

    function updatePreviewAtom(place: Place, status: string) {
        let newPreview: PlacePreviewProps = structuredClone(preview) as PlacePreviewProps;
        
        if(place) {
            newPreview.place = place;
        }

        if(status) {
            newPreview.status = status;
        }

        setPreview(newPreview);
    }

    // Handles onChange event from searchbox
    function handleSearchSuggestion(suggestion: Place) {
        let placeExistsInStorageFlag: boolean = false;
        let newStatus = undefined;
        let newPlace = undefined;

        // Check if the place has already been added to the app before and update flag
        for (const storedPlace of places) {
            if (suggestion.place_id === storedPlace.place_id) {
                placeExistsInStorageFlag = true;
            }
        }

        // If place already found on app update preview to reflect that
        if (placeExistsInStorageFlag) {
            newStatus = "This place has already been added!";
        } else {
            newStatus = "Add this place?";
            setNextDisable(false);
        }

        // Either way set preview place to match selected suggestion for display
        newPlace = suggestion;

        // Update preview atom to trigger rerender
        updatePreviewAtom(newPlace, newStatus);

        // Update wizard memory with new place
        updatePlaceInWizardMemory(newPlace);
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