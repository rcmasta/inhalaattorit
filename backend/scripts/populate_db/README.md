## populate database from an .xlsx file 

run ``` npm run populate_db -- {path/to/file} ```.

the way npm xlsx parses .xlsx files leads to many empty column names (\_\_EMPTY\_{i}) with the format this scripts expects, so if the .xlsx file has any column changes the indices in xlsxIndices.js will have to be edited manually.

note that the .xlsx file this script expects hasn't been shared publicly as of writing this.
