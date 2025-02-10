const { useState } = React;

function TreeView({ tree, selectedNodes, onNodeToggle }) {
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

  const handleCheckboxChange = (e, path) => {
    e.stopPropagation();
    onNodeToggle(path);
  };

  const getNodeState = (node, parentPath = '') => {
    const currentPath = window.getNodePath(node, parentPath);
    
    if (!node.contents) {
      // Leaf node - simple selected/not selected
      return selectedNodes.has(currentPath) ? 'checked' : 'unchecked';
    }

    // For non-leaf nodes, check children states
    const childStates = node.contents.map(child => 
      getNodeState(child, currentPath)
    );

    if (childStates.every(state => state === 'checked')) {
      return 'checked';
    }
    if (childStates.every(state => state === 'unchecked')) {
      return 'unchecked';
    }
    return 'indeterminate';
  };

  const renderNode = (node, parentPath = '') => {
    const currentPath = window.getNodePath(node, parentPath);
    const nodeName = node.title || node.category;
    const hasChildren = node.contents && node.contents.length > 0;
    const isExpanded = expanded.has(currentPath);
    const nodeState = getNodeState(node, parentPath);

    if (!currentPath) return null;

    return (
      <div key={currentPath} className="tree-node">
        <div className="node-content">
          {hasChildren && (
            <span 
              className="expand-toggle"
              onClick={(e) => toggleExpand(e, currentPath)}
            >
              {isExpanded ? '▼' : '▶'}
            </span>
          )}
          <input
            type="checkbox"
            checked={nodeState === 'checked'}
            ref={input => {
              if (input) {
                input.indeterminate = nodeState === 'indeterminate';
              }
            }}
            onChange={(e) => handleCheckboxChange(e, currentPath)}
          />
          <span className="node-title">{nodeName}</span>
        </div>
        {hasChildren && isExpanded && (
          <div className="node-children">
            {node.contents.map(child => renderNode(child, currentPath))}
          </div>
        )}
      </div>
    );
  };

  return tree ? <div className="tree-view">{renderNode(tree)}</div> : null;
}

window.TreeView = TreeView;