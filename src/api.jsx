// api.js

// Функция для выполнения GET запроса
export const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error; // Пробрасываем ошибку для обработки в вызывающем коде
  }
};

// Функция для выполнения POST запроса
export const postData = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('There was a problem with the POST request:', error);
    throw error;
  }
};

// Функция для выполнения PUT запроса
export const updateData = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('There was a problem with the PUT request:', error);
    throw error;
  }
};

// Функция для выполнения DELETE запроса
export const deleteData = async (url) => {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('There was a problem with the DELETE request:', error);
    throw error;
  }
};
