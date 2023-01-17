export const getEnvironments = () => {
  // console.log(process.env);
  console.log(import.meta.env);
  import.meta?.env;

  return {
    ...import.meta.env,
  };
};
