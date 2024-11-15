"use client"

import { useEffect } from 'react';
import { useAtom, useAtomValue, getDefaultStore } from 'jotai';
import { useRouter } from 'next/navigation';
import { placesAtom } from '../state/placesAtom';
import { setupCompleteAtom } from '../state/setupCompleteAtom';
import Dashboard from './Dashboard';

export interface Place {
  id?: number;
  forecast?: any;
  place_id: string;
  osm_id: string;
  osm_type: "node" | "way" | "relation";
  licence: string;
  lat: string;
  lon: string;
  boundingbox: [string, string, string, string];
  class: string;
  type: string;
  display_name: string;
  display_place: string;
  display_address: string;
  address: {
    name: string;
    road?: string;
    neighbourhood?: string;
    suburb?: string;
    city?: string;
    state?: string;
    postcode?: string;
    country: string;
    country_code: string;
  };
}

export default function PelicanApp() {
  const [places, setPlaces] = useAtom(placesAtom);
  const [setupComplete, setSetupComplete] = useAtom(setupCompleteAtom);
  const router = useRouter();

  useEffect(() => {
    if(!setupComplete) {
      router.replace('/setup/step1');
    }
  }, [setupComplete, router]);


  return (
    <div className="pelicanapp">
      <Dashboard places={places} setPlaces={setPlaces} />
    </div>
  );
}