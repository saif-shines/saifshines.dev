#!/usr/bin/env bash
# Lists every skill name found in installed Claude Code plugins, one
# "name|marketplace/plugin" pair per line, sorted and deduped.
#
# Used to build the PLUGIN_SOURCE map in
# src/components/graph/SkillsGraph.astro — rerun this whenever plugins are
# installed/updated and the graph's plugin groupings need refreshing.
#
# Usage: scripts/list-plugin-skills.sh [> output-file]

set -euo pipefail

for d in ~/.claude/plugins/cache/*/*/*/skills; do
  marketplace=$(echo "$d" | awk -F'/' '{print $(NF-3)}')
  plugin=$(echo "$d" | awk -F'/' '{print $(NF-2)}')
  for skill in "$d"/*/; do
    [ -d "$skill" ] || continue
    name=$(basename "$skill")
    echo "$name|$marketplace/$plugin"
  done
done 2>/dev/null | sort -u
