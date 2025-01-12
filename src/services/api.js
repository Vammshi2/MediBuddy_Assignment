import axios from 'axios';

const API_URL = 'https://677f757b0476123f76a68a42.mockapi.io/api/labs/v1/page_config';

export const fetchLabTests = async () => {
  try {
    const response = await axios.get(API_URL);
    const pageConfig = response.data;
    const categories = pageConfig
      .find((section) => section.title === 'Icons')
      ?.props || [];
    return categories;
  } catch (error) {
    console.error('Error fetching lab tests:', error);
    return [];
  }
};
