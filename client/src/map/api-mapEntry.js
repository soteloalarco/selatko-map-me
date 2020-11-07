/* eslint-disable no-console */
/* eslint-disable consistent-return */
const create = async (mapEntry) => {
  try {
    const response = await fetch('/api/entries', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mapEntry),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export default create;
