for file in ./*.up.sql; do
    psql -d colouringlondon -f "${file}"
done