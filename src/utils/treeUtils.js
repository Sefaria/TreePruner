// src/utils/treeUtils.js
window.getNodePath = (node, parentPath = '') => {
  // Special case for root node
  if (!parentPath && node.category === 'Sefaria') {
    return 'Sefaria';
  }

  // For book nodes (leaf nodes with title)
  if (node.title) {
    return node.categories ? `${node.categories.join('/')}/${node.title}` : `${parentPath}/${node.title}`;
  }

  // For category nodes
  if (node.categories) {
    return node.categories.join('/');
  }

  if (node.category) {
    return parentPath ? `${parentPath}/${node.category}` : node.category;
  }

  console.warn('Node without proper identification:', node);
  return null;
};
  