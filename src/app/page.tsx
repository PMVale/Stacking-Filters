import Image from "next/image";
import Body from "./components/Body";

type ApiReturn = {

}

export default async function Home() {
  const apiCall = await fetch('https://swapi.dev/api/planets');
  const apiConvert = await apiCall.json();
  const apiData = await apiConvert.results;


  return (
    <>
      <header>Title</header>
      <Body apiData={apiData}/>
    </>
  );
}
