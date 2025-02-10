const { useState, useEffect } = React;

function App() {
  const [categoryTree, setCategoryTree] = useState(null);
  const [selectedNodes, setSelectedNodes] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await window.api.fetchCategoryTree();
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error('Invalid data format received from API');
        }
        
        // Create a root node to hold the categories
        const rootNode = {
          category: 'Sefaria',
          contents: data
        };
        
        console.log('Root node:', rootNode);
        setCategoryTree(rootNode);
        // Initially select all nodes
        const allNodes = getAllNodePaths(rootNode);
        console.log('All node paths:', allNodes);
        setSelectedNodes(new Set(allNodes));
        setLoading(false);
      } catch (err) {
        console.error('Error in loadData:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const getAllNodePaths = (node, parentPath = '', paths = new Set()) => {
    const currentPath = window.getNodePath(node, parentPath);
    if (currentPath) {
      paths.add(currentPath);
    }
    if (node.contents) {
      node.contents.forEach(child => {
        getAllNodePaths(child, currentPath, paths);
      });
    }
    return Array.from(paths);
  };
  
  const findNode = (node, targetPath, parentPath = '') => {
    const currentPath = window.getNodePath(node, parentPath);
    if (currentPath === targetPath) {
      return { node, parentPath };
    }
    if (node.contents) {
      for (const child of node.contents) {
        const result = findNode(child, targetPath, currentPath);
        if (result) return result;
      }
    }
    return null;
  };
  
  

  const handleNodeToggle = (path) => {
    const newSelected = new Set(selectedNodes);
    const found = findNode(categoryTree, path);
    if (!found) return;
    const { node } = found;

    // First, determine if we're selecting or deselecting based on the clicked node
    const isCurrentlySelected = newSelected.has(path);
    
    // Get all paths that need to be updated
    const allPaths = [path, ...getAllNodePaths(node)];
    
    // Update all paths based on the new desired state
    allPaths.forEach(p => {
      if (isCurrentlySelected) {
        newSelected.delete(p);
      } else {
        newSelected.add(p);
      }
    });

    setSelectedNodes(newSelected);
  };

  const handleSave = () => {
    window.fileIO.saveSelections(Array.from(selectedNodes));
  };

  const handleLoad = async () => {
    const loaded = await window.fileIO.loadSelections();
    if (loaded) {
      setSelectedNodes(new Set(loaded));
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="app">
      <div className="controls">
        <button onClick={handleSave}>Save Selections</button>
        <button onClick={handleLoad}>Load Selections</button>
      </div>
      <div className="panes">
        <div className="pane">
          <h2>Full Tree</h2>
          <TreeView 
            tree={categoryTree} 
            selectedNodes={selectedNodes}
            onNodeToggle={handleNodeToggle}
          />
        </div>
        <div className="pane">
          <h2>Included</h2>
          <FilteredTree 
            tree={categoryTree}
            selectedNodes={selectedNodes}
          />
        </div>
        <div className="pane">
          <h2>Excluded</h2>
          <DeselectedList 
            tree={categoryTree}
            selectedNodes={selectedNodes}
            onNodeToggle={handleNodeToggle}
          />
        </div>
      </div>
    </div>
  );
}

window.App = App; 