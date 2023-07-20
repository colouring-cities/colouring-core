while read p; do
  if git diff master other/master -- $p | grep -q "i18next"; then
    echo $p
  fi
done < target_files_filter.txt