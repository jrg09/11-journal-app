export const getEnvironments = () => {
  // console.log(process.env);
  import.meta?.env;

  return {
    ...import.meta?.env,
  };
};
