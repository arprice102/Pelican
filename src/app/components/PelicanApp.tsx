"use client";
import { useAtom, useAtomValue, getDefaultStore } from 'jotai';
import { placesAtom } from '../state/placesAtom';
import Dashboard from './Dashboard';

const store = getDefaultStore();

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

  return (
    <div>
      <Dashboard places={places} setPlaces={setPlaces} />
    </div>
  );
}