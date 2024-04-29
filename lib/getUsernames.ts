const GetUsernamesFromDB = async () => {
  try {
    const res = await fetch(`/api/accounts`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export { GetUsernamesFromDB };
