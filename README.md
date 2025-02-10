# Sefaria Category Tree Explorer

A web-based tool for exploring and managing Sefaria's text categories. This tool allows users to view, filter, and manage the hierarchical structure of Sefaria's texts.

## Features

- **Full Tree View**: Interactive tree structure showing all categories and texts
  - Expandable/collapsible nodes
  - Checkbox selection with three states (selected, unselected, partial)
  - Parent node selection affects all children
  - Child selections affect parent state

- **Included View**: Shows only selected texts and their categories
  - Maintains the hierarchical structure
  - Expandable/collapsible nodes
  - Real-time updates as selections change

- **Excluded View**: Shows texts that are currently deselected
  - Quick restore functionality
  - Flat list for easy scanning

- **Persistence**:
  - Save selections to a JSON file
  - Load previously saved selections

## Usage

- Click the triangles (▶/▼) to expand/collapse nodes
- Use checkboxes to select/deselect texts and categories
- Selected items appear in the "Included" pane
- Deselected items appear in the "Excluded" pane
- Use the Save/Load buttons to persist your selections

## Setup

1. Clone the repository
2. Open `index.html` in a web browser using a local server

