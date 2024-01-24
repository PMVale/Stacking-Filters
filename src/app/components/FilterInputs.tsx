import React from 'react'

type FilterProps = {
  nameInput: {
    searchName: string;
    setSearchName: (string: string) => any;
  }
}

const FilterInputs: React.FC<FilterProps> = ({nameInput}) => {
  return (
    <section>
      <input
        type="text" 
        name='searchName'
        value={nameInput.searchName}
        onChange={(e) => nameInput.setSearchName(e.target.value)}
        className='text-black'
      />
    </section>
  )
}

export default FilterInputs