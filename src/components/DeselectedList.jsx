function DeselectedList({ tree, selectedNodes, onNodeToggle }) {
  const getDeselectedNodes = (node, parentPath = '', deselected = []) => {
    const currentPath = window.getNodePath(node, parentPath);
    if (!selectedNodes?.has(currentPath)) {
      deselected.push({ path: currentPath, name: node.title || node.category });
    }
    if (node.contents) {
      node.contents.forEach(child => getDeselectedNodes(child, currentPath, deselected));
    }
    return deselected;
  };

  const deselectedNodes = tree ? getDeselectedNodes(tree) : [];

  return (
    <div className="deselected-list">
      {deselectedNodes.map(({ path, name }) => (
        <div key={path} className="deselected-item">
          <span>{name}</span>
          <button 
            className="restore-button"
            onClick={() => onNodeToggle(path)}
            title="Restore to tree"
          >
            ↩️
          </button>
        </div>
      ))}
    </div>
  );
}

window.DeselectedList = DeselectedList;
