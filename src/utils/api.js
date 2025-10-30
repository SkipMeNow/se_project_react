const baseUrl = "http://localhost:3002";

// Static data for deployed version
const staticItems = [
  {
    "id": "5d52ceeb-44f9-4da8-a1f3-571a6c8c7f4a",
    "name": "Cap",
    "weather": "hot",
    "link": "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cce9f9798611"
  },
  {
    "id": "5d52ceeb-44f9-4da8-a1f3-571a6c8c7f4b",
    "name": "Hoodie",
    "weather": "cold",
    "link": "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8"
  },
  {
    "id": "5d52ceeb-44f9-4da8-a1f3-571a6c8c7f4c",
    "name": "Jacket",
    "weather": "cold",
    "link": "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad"
  },
  {
    "id": "5d52ceeb-44f9-4da8-a1f3-571a6c8c7f4d",
    "name": "Sneakers",
    "weather": "cold",
    "link": "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f"
  },
  {
    "id": "5d52ceeb-44f9-4da8-a1f3-571a6c8c7f4e",
    "name": "T-Shirt",
    "weather": "hot",
    "link": "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09"
  },
  {
    "id": "5d52ceeb-44f9-4da8-a1f3-571a6c8c7f4f",
    "name": "Winter coat",
    "weather": "cold",
    "link": "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4"
  },
  {
    "id": "5d52ceeb-44f9-4da8-a1f3-571a6c8c7f50",
    "name": "Shorts",
    "weather": "hot",
    "link": "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Shorts.png?etag=6390a3c0c72b6e89e2e00e9e6bd36c7c"
  },
  {
    "id": "5d52ceeb-44f9-4da8-a1f3-571a6c8c7f51",
    "name": "Scarf",
    "weather": "cold",
    "link": "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Scarf.png?etag=74efbee93b27b5fbce7b9b2f1074b408"
  },
  {
    "id": "5d52ceeb-44f9-4da8-a1f3-571a6c8c7f52",
    "name": "Boots",
    "weather": "cold",
    "link": "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Boots.png?etag=0953a2ea59f1ca6432a7e05cd24e6a4c"
  },
  {
    "id": "5d52ceeb-44f9-4da8-a1f3-571a6c8c7f53",
    "name": "Sandals",
    "weather": "hot",
    "link": "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sandals.png?etag=9dd4409bff1a85ba2d0157e0fdb8c4c5"
  },
  {
    "id": "5d52ceeb-44f9-4da8-a1f3-571a6c8c7f54",
    "name": "Dress",
    "weather": "warm",
    "link": "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Dress.png?etag=1f9cd8cbb618229b54be2d9b2de8c3a2"
  },
  {
    "id": "5d52ceeb-44f9-4da8-a1f3-571a6c8c7f55",
    "name": "Jeans",
    "weather": "warm",
    "link": "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jeans.png?etag=dcc6fbe1fd8c9c5c22b3b13c57e3c5b8"
  }
];

// Check if we're in development or production
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export const getItems = () => {
  if (isDevelopment) {
    return request(`${baseUrl}/items`);
  } else {
    // Return static data for production
    return Promise.resolve(staticItems);
  }
};

export const addItem = ({ name, imageUrl, weather }) => {
  if (isDevelopment) {
    return request(`${baseUrl}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        link: imageUrl,
        weather,
      }),
    });
  } else {
    // For production, simulate adding item (just return success)
    const newItem = {
      id: Date.now().toString(),
      name,
      link: imageUrl,
      weather,
    };
    return Promise.resolve(newItem);
  }
};

export const deleteItem = (id) => {
  if (isDevelopment) {
    return request(`${baseUrl}/items/${id}`, {
      method: "DELETE",
    });
  } else {
    // For production, simulate deletion (just return success)
    return Promise.resolve({ success: true });
  }
};