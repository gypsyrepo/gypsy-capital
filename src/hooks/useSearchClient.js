import { useMemo } from "react";
import useUserList from "./useUserList";

// eslint-disable-next-line import/no-anonymous-default-export
export default (searchedTerm) => {
  const [staffList] = useUserList(false);

  const searchResult = useMemo(() => {
    const refinedTerm = Number(searchedTerm);
    return staffList.filter((user) => {
      if (!isNaN(refinedTerm)) {
        return (
          user?.phoneNumber.includes(searchedTerm.replace("0", "234")) ||
          user?.more_info[0]?.bioData?.BVN.includes(searchedTerm) ||
          user?.more_info[0]?.bioData?.alternativePhoneNumber.includes(
            searchedTerm
          ) ||
          user?.more_info[0]?.bioData?.bvnPhoneNumber.includes(searchedTerm)
        );
      } else {
        return (
          user?.firstName.toLowerCase().includes(searchedTerm.toLowerCase()) ||
          user?.lastName.toLowerCase().includes(searchedTerm.toLowerCase())
        );
      }
    });
  }, [searchedTerm, staffList]);

  console.log(searchResult);

  return [searchResult];
};
