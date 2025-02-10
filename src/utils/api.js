window.api = {
  async fetchCategoryTree() {
    try {
      const response = await fetch('https://www.sefaria.org/api/index');
      if (!response.ok) {
        throw new Error('Failed to fetch category tree');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error fetching category tree: ' + error.message);
    }
  }
}; 