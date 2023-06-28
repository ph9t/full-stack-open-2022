const CountryListItem = ({ name, show }) => (
  <>
    {name} <button onClick={show}>show</button>
    <br />
  </>
)

export default CountryListItem
