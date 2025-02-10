const { useState } = React;

function FilteredTree({ tree, selectedNodes }) {
  const [expanded, setExpanded] = useState(new Set(['Sefaria']));

  const toggleExpand = (e, path) => {
    e.stopPropagation();
    const newExpanded = new Set(expanded);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpanded(newExpanded);
  };

  const filterTree = (node, parentPath = '') => {
    const currentPath = window.getNodePath(node, parentPath);
    if (!selectedNodes?.has(currentPath)) return null;

    const filteredNode = { ...node };
    if (node.contents) {
      filteredNode.contents = node.contents
        .map(child => filterTree(child, currentPath))
        .filter(Boolean);
    }
    return filteredNode;
  };

  const filteredTree = tree ? filterTree(tree) : null;
  
  const renderNode = (node, parentPath = '') => {
    const currentPath = window.getNodePath(node, parentPath);
    const nodeName = node.title || node.category;
    const hasChildren = node.contents && node.contents.length > 0;
    const isExpanded = expanded.has(currentPath);

    if (!currentPath) return null;

    return (
      <div key={currentPath} className="filtered-node">
        <div className="node-content">
          {hasChildren && (
            <span 
              className="expand-toggle"
              onClick={(e) => toggleExpand(e, currentPath)}
            >
              {isExpanded ? '▼' : '▶'}
            </span>
          )}
          <span className="node-title">{nodeName}</span>
        </div>
        {hasChildren && isExpanded && (
          <div className="filtered-children">
            {node.contents.map(child => renderNode(child, currentPath))}
          </div>
        )}
      </div>
    );
  };

  return filteredTree ? (
    <div className="filtered-tree">{renderNode(filteredTree)}</div>
  ) : null;
}

window.FilteredTree = FilteredTree;
