export let libraryItems = (() => {
  try {
    const stored = localStorage.getItem('libraryItems');
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    return parsed || [];
  } catch (error) {
    console.error('Error parsing libraryItems from localStorage:', error);
    return [];
  }
})();

// Function to update libraryItems and localStorage
export function updateLibraryItems(newItems) {
  libraryItems = newItems;
  localStorage.setItem('libraryItems', JSON.stringify(newItems));
}
