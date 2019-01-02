Remove-Item alias:sls
sls deploy

#functions
sls invoke local --f role-handler --p test/check.json

sls invoke local --f role-check --p test/check.json

sls invoke local --f role-create --p test/create.json

sls invoke local --f role-update --p test/update.json

sls invoke local --f role-delete --p test/delete.json