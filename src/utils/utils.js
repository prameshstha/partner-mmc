export const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

export const validateAustralianMobile = (phoneNumber) => {
  const re = /^(\+?61|0)4\d{8}$/;
  return re.test(phoneNumber);
};

export const setToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeFromStorage = (key) => {
  localStorage.removeItem(key);
};

export const getFromStorage = (key) => {
  const value = localStorage.getItem(key);
  if (value) return JSON.parse(value);
  return null;
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const checkAllKeysHasValues = (keys, object) => {
  return keys.every((key) => {
    return object.hasOwnProperty(key) && object[key].trim() !== "";
  });
};

export const makeSearchQueryParam = (param) => {
  const url = new URL("http://localhost:8000/api/events");
  const searchParams = new URLSearchParams();
  Object.entries(param).forEach(([key, value]) => {
    searchParams.append(key, value);
  });

  url.search = searchParams.toString();
  return url.toString();
};

// Save to local storage and params
export const setSearchParamAndSetToStorage = (
  searchTerm,
  selectedFromDate,
  selectedToDate
) => {
  const params = new URLSearchParams();
  if (searchTerm) {
    params.set("searchTerm", searchTerm);
    setToStorage("searchTerm", searchTerm);
  }
  if (selectedFromDate) {
    params.set("from", selectedFromDate);
    setToStorage("from", selectedFromDate);
  }
  if (selectedToDate) {
    params.set("to", selectedToDate);
    setToStorage("to", selectedToDate);
  }
  return params;
};

export const setSearchParamFromDate = (selectedFromDate) => {
  const params = new URLSearchParams();
  if (selectedFromDate) {
    params.set("from", selectedFromDate);
    setToStorage("from", selectedFromDate);
  }
};
export const setSearchParamToDate = (selectedToDate) => {
  const params = new URLSearchParams();

  if (selectedToDate) {
    params.set("to", selectedToDate);
    setToStorage("to", selectedToDate);
  }
};

// later ask chat gpt to get exact plular words such as box => boxes
export const getSingularPularWord = (word, length) => {
  return length > 1 ? word + "s" : word;
};
