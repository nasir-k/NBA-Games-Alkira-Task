import { useEffect, useState } from "react";
import { IMatch, IRow } from "./../components/Table/tableTypes";

const useFetch = (uri: string) => {
  const [data, setData] = useState<IRow[] | IMatch[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const data = await fetch(uri);

    const parsedData = await data.json();

    setData(parsedData.data as IRow[]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uri]);

  return { data, isLoading };
};

export default useFetch;
