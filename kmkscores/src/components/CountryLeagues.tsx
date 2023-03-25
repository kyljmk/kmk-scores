import React, { useState } from "react";
import { FixtureResponse, ICountryLeagueProps } from "../Types";
import LiveLeaguesComponent from "./LiveLeaguesComponent";

function CountryLeagues({ country, menu }: ICountryLeagueProps) {
  const [showLeagues, setShowLeagues] = useState<boolean>(false);
  const orderedCountryElements: FixtureResponse[][] = Object.values(
    country
      .sort((a, b) => a.league.id - b.league.id)
      .reduce((x: any, y: any) => {
        (x[y.league.name] = x[y.league.name] || []).push(y);

        return x;
      }, {})
  );

  let countryElements: JSX.Element[] = orderedCountryElements.map((leagues) => {
    return (
      <LiveLeaguesComponent
        key={leagues[0].league.id}
        fixtures={leagues}
        menu={menu}
      />
    );
  });

  return (
    <div>
      <h2 onClick={() => setShowLeagues((prev) => !prev)}>
        {country[0].league.country}
      </h2>
      {showLeagues && countryElements}
    </div>
  );
}

export default CountryLeagues;