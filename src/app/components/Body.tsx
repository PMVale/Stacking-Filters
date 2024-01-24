'use client'
import React, { useMemo, useState } from 'react'
import Table from './Table'
import FilterInputs from './FilterInputs'

type BodyProps = {
  apiData: {
    name: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: string;
    population: string;
    films: string;
    residents: string[];
    created: string;
    edited: string;
    url: string;
  }[]
}

const Body: React.FC<BodyProps> = ({apiData}) => {
  const [filteredData, setFilteredData] = useState(apiData);
  const [searchName, setSearchName] = useState('');

  const nameInput = useMemo(() => ({
    searchName,
    setSearchName
  }), [searchName])

  return (
    <main>
      <FilterInputs nameInput={nameInput}/>
      <Table data={filteredData} searchName={searchName}/>
    </main>
  )
}

export default Body