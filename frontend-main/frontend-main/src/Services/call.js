export const call = async (func, ...args) => {
  try {
      await func(...args);
  } catch (err) {
      alert('Something went wrong!!!');
  }
}