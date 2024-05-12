import { useEffect, useState } from "react";

// Määrittele geneerinen hook, useLocalStorage
export function useLocalStorage<T>(
    key: string,                  // Avain, jonka alle arvo tallennetaan localStorageen.
    initialValue: T | (() => T)   // Alkuarvo tilalle tai funktio, joka palauttaa sen.
) {
    // Tilahook, joka alustaa tilan localStoragesta löytyvään arvoon
    // tai annettuun alkuarvoon, jos localStoragesta ei löydy mitään.
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key); // Yritetään hakea tallennettu arvo localStoragesta.
        if (jsonValue != null) {
            return JSON.parse(jsonValue);// Jäsennetään JSON-merkkijono takaisin JS-arvoksi.
        }

        // Jos arvoa ei löydy ja alkuarvo on funktio,
        // suoritetaan funktio saadaksemme alkuarvon.
        if (typeof initialValue === "function") {
            return (initialValue as () => T)();
        } else {
            return initialValue;// Muussa tapauksessa käytetään suoraan alkuarvoa.
        }
    });

    // Vaikutushook, joka tallentaa tilan localStorageen aina,
    // kun `key` tai `value` muuttuu.
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value)); // Muunnetaan arvo JSON-merkkijonoksi ja tallennetaan se.
    }, [key, value]);

    // Palautetaan nykyinen tila ja funktio sen päivittämiseen.
    return [value, setValue] as [typeof value, typeof setValue];
}
