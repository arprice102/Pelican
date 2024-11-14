"use client"

import { atom, useAtom } from 'jotai';
import { TextField, Autocomplete } from '@mui/material';
import retrievePlaceSuggestions from '../library/retrievePlaceSuggestions';
import throttle from '../library/throttle';
import { useEffect, useCallback } from 'react';
import { Place } from '../page';

const inputAtom = atom<undefined | string>(undefined);
const suggestionsAtom = atom<[] | Place[]>([]);

export default function SearchBox({ onChange }: { onChange: (value: Place) => void }) {
    const [input, setInput] = useAtom(inputAtom);
    const [suggestions, setsuggestions] = useAtom(suggestionsAtom);

    // Throttle the autocomplete retrieval function and make it stable across renders
    const throttledRetrievePlaceSuggestions = useCallback(
        throttle((input: string) => {
            retrievePlaceSuggestions(input, (data: Place[]) => {
                setsuggestions(data);
            });
        }, 500),
        []
    );

    // Trigger the retrieval function only when `input` changes
    useEffect(() => {
        if (input && input.length >= 3) {
            throttledRetrievePlaceSuggestions(input);
        } else {
            setsuggestions([]); // Clear suggestions if input is empty or too short
        }
    }, [input, throttledRetrievePlaceSuggestions]);

    return (
        <Autocomplete
            options={suggestions}
            getOptionLabel={(option: Place) => option.display_name}
            onInputChange={(event, newInputValue) => {
                if(newInputValue) {
                    setInput(newInputValue);
                }
            }}
            onChange={(event, suggestion: Place) => {
                if(suggestion) {
                    onChange(suggestion);
                }
            }}

            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search Cities"
                    variant="outlined"
                    placeholder="Type to search..."
                />
            )}
        />
    );
}