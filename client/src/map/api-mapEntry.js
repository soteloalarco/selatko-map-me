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

const remove = async (params, credentials) => {
  try {
    const response = await fetch(`/api/entries/${params.userId}/${params.entryId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${credentials.t}`,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export {
  create, remove,
};
