export const filterStaff = (stafflist, staffId) => {
  return stafflist.filter((staff) => staff._id === staffId)[0];
};
