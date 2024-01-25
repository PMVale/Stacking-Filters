import React from 'react'

type DeployedFilters = {
  column: string, comparison: string, value: number
}

type FilterProps = {
  inputStates: {
    searchName: string;
    setSearchName: React.Dispatch<React.SetStateAction<string>>
    columnFilter: string;
    setColumnFilter: React.Dispatch<React.SetStateAction<string>>
    deployedFilters: DeployedFilters[];
    comparisonFilter: string;
    setComparisonFilter: React.Dispatch<React.SetStateAction<string>>;
    valueFilter: number;
    setValueFilter: React.Dispatch<React.SetStateAction<number>>;
    handleFilter: () => void;
  }
}

const FilterInputs: React.FC<FilterProps> = ({inputStates}) => {
  const {searchName, setSearchName, 
    columnFilter, setColumnFilter,
    deployedFilters,
    comparisonFilter, setComparisonFilter,
    valueFilter, setValueFilter,
    handleFilter,
  } = inputStates;

  return (
    <section>
      <label htmlFor="searchName">
        Planet:
        <input
          type="text" 
          name='searchName'
          value={searchName}
          onChange={({target: {value}}) => setSearchName(value)}
          className='text-black'
        />
      </label>
      <label htmlFor="columnFilter">
        Column
        <select
          name="columnFilter" 
          id="columnFilter"
          value={columnFilter}
          onChange={({target: {value}}) => setColumnFilter(value)}
          disabled={columnFilter === ''}
          className='text-black'
        >
          {!deployedFilters.some((item) => item.column === 'population') 
            && <option value='population'>Population</option>}
          {!deployedFilters.some((item) => item.column === 'orbital_period') 
            && <option value='orbital_period'>Orbital Period</option>}
          {!deployedFilters.some((item) => item.column === 'diameter') 
            && <option value='diameter'>Diameter</option>}
          {!deployedFilters.some((item) => item.column === 'rotation_period') 
            && <option value='rotation_period'>Rotation Period</option>}
          {!deployedFilters.some((item) => item.column === 'surface_water') 
            && <option value='surface_water'>Surface Water</option>}
        </select>
      </label>
      <label htmlFor="comparisonFilter">
        Operator
        <select
          name="comparisonFilter"
          id=""
          value={comparisonFilter}
          onChange={({target: {value}}) => setComparisonFilter(value)}
          className='text-black'
        >
          <option value="higher">Higher than</option>
          <option value="lower">Lower than</option>
          <option value="equal">Equal to</option>
        </select>
      </label>
      <label htmlFor="valueFilter">
        Number
        <input
          type="number"
          name='valueFilter'
          value={valueFilter}
          onChange={({target: {value}}) => setValueFilter(parseInt(value))}
          className='text-black' 
        />  
      </label>
      <button onClick={handleFilter}>Filter</button>
    </section>
  )
}

export default FilterInputs